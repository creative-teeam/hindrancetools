// ==========================
// 基本参照
// ==========================
const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");
const inputCount = document.getElementById("inputCount");
const outputCount = document.getElementById("outputCount");
const modeTabs = document.getElementById("modeTabs");
const modeDescription = document.getElementById("modeDescription");
const applyModeBtn = document.getElementById("applyMode");
const clearInputBtn = document.getElementById("clearInput");
const swapTextsBtn = document.getElementById("swapTexts");
const restoreDraftBtn = document.getElementById("restoreDraft");
const analyzeToneBtn = document.getElementById("analyzeTone");
const writingHint = document.getElementById("writingHint");
const copyOutputBtn = document.getElementById("copyOutput");
const downloadOutputBtn = document.getElementById("downloadOutput");
const readabilityBar = document.getElementById("readabilityBar");
const readabilityLabel = document.getElementById("readabilityLabel");
const toneBar = document.getElementById("toneBar");
const toneLabel = document.getElementById("toneLabel");
const issueChips = document.getElementById("issueChips");
const toastEl = document.getElementById("toast");
const toastMsgEl = document.getElementById("toastMsg");
const toastIconEl = document.getElementById("toastIcon");

const STORAGE_KEY_INPUT = "humantouch_input";
const STORAGE_KEY_OUTPUT = "humantouch_output";

// ==========================
// モード説明 / 設定
// ==========================
const modeConfigs = {
  soften: {
    label: "柔らかくする",
    description:
      "強すぎる・断定的な表現を、できるだけ柔らかく・丁寧な言い回しにします。",
    hint: "「絶対」「必ず」などの強い表現は、状況によっては圧を与えることがあります。",
  },
  clarify: {
    label: "はっきりさせる",
    description:
      "あいまいな表現を、少しだけ具体的・明確な言い回しに近づけます。",
    hint: "「ちゃんと」「しっかり」などの言葉は、人によってイメージが違います。",
  },
  emotion: {
    label: "感情を添える",
    description:
      "味気ない文章に、少しだけ共感・ねぎらいなどの感情表現を補います。",
    hint: "あなたが本当に伝えたい感情を、一言でいいので書き足してみてください。",
  },
  polish: {
    label: "整えて読みやすく",
    description:
      "文の長さや接続詞を見ながら、少しスッキリした形に整えることを目指します。",
    hint: "一文が長くなりすぎたら、思い切って2〜3文に分けてみましょう。",
  },
};

let currentMode = "soften";
let lastDraft = "";

// ==========================
// 文字数カウント
// ==========================
function updateCharCount() {
  inputCount.textContent = inputText.value.length + "文字";
  outputCount.textContent = outputText.value.length + "文字";
}

inputText.addEventListener("input", () => {
  updateCharCount();
  saveDraft();
});
outputText.addEventListener("input", () => {
  updateCharCount();
  saveDraft();
});

// ==========================
// ローカルストレージ保存/復元
// ==========================
function saveDraft() {
  try {
    localStorage.setItem(STORAGE_KEY_INPUT, inputText.value);
    localStorage.setItem(STORAGE_KEY_OUTPUT, outputText.value);
  } catch (e) {
    // localStorage禁止環境などでは何もしない
  }
}

function restoreDraftFromStorage() {
  try {
    const inSaved = localStorage.getItem(STORAGE_KEY_INPUT);
    const outSaved = localStorage.getItem(STORAGE_KEY_OUTPUT);
    if (inSaved !== null) inputText.value = inSaved;
    if (outSaved !== null) outputText.value = outSaved;
  } catch (e) {}
  updateCharCount();
}

restoreDraftFromStorage();

// ==========================
// 簡易トースト
// ==========================
function showToast(msg, type = "info") {
  toastMsgEl.textContent = msg;
  toastIconEl.textContent = type === "error" ? "⚠️" : "✅";
  toastEl.classList.add("show");
  setTimeout(() => {
    toastEl.classList.remove("show");
  }, 2300);
}

// ==========================
// モード切り替え
// ==========================
modeTabs.addEventListener("click", (e) => {
  const btn = e.target.closest(".mode-btn");
  if (!btn) return;
  const mode = btn.dataset.mode;
  currentMode = mode;

  for (const el of modeTabs.querySelectorAll(".mode-btn")) {
    el.classList.toggle("active", el === btn);
  }

  modeDescription.textContent = modeConfigs[mode].description;
  writingHint.innerHTML = "<strong>ヒント：</strong> " + modeConfigs[mode].hint;
});

// ==========================
// 変換ルール（辞書ベース）
// ==========================
const softenMap = [
  ["必ず", "できるだけ"],
  ["絶対に", "なるべく"],
  ["絶対", "できるだけ"],
  ["〜しなければならない", "〜していただけると助かります"],
  ["しなければならない", "していただけると助かります"],
  ["しなければいけません", "していただけるとありがたいです"],
  ["してください", "していただけますと幸いです"],
  ["しなさい", "してもらえると嬉しいです"],
  ["禁止です", "ご遠慮いただけますと幸いです"],
  ["できません", "難しいかもしれません"],
];

const clarifyMap = [
  ["ちゃんと", "具体的に"],
  ["しっかり", "明確に"],
  ["適当に", "状況に応じて"],
  ["なるべく早く", "◯日以内を目安に"],
  ["後ほど", "◯時頃までに"],
  ["いつか", "◯月頃を目安に"],
  ["最近", "直近数週間で"],
  ["よくある", "比較的頻繁に見られる"],
];

const emotionMap = [
  ["ご確認ください", "ご確認いただけますと幸いです"],
  ["ご検討ください", "ご検討いただけますと嬉しく思います"],
  ["よろしくお願いいたします", "何卒よろしくお願いいたします"],
  ["申し訳ありません", "ご迷惑をおかけして申し訳ありません"],
  ["ありがとうございます", "本当にありがとうございます"],
  ["助かります", "大変助かります"],
];

// 正規表現ベース置換
function applyMap(text, map) {
  let result = text;
  map.forEach(([from, to]) => {
    const escaped = from.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp(escaped, "g");
    result = result.replace(re, to);
  });
  return result;
}

// 一文が長すぎるかどうかざっくり見る
function splitLongSentences(text) {
  return text.replace(/。(.{20,})/g, "。\n$1");
}

function transformText(text, mode) {
  let t = text;
  if (!t.trim()) return t;

  if (mode === "soften") {
    t = applyMap(t, softenMap);
  } else if (mode === "clarify") {
    t = applyMap(t, clarifyMap);
  } else if (mode === "emotion") {
    t = applyMap(t, emotionMap);
  } else if (mode === "polish") {
    t = splitLongSentences(t);
    // 連続する同じ接続詞を少し削る
    t = t.replace(/しかし、しかし、/g, "しかし、");
    t = t.replace(/また、また、/g, "また、");
  }
  return t;
}

// ==========================
// 読みやすさ・感情スコアの簡易解析
// ==========================
const positiveWords = ["嬉しい", "ありがたい", "助かります", "幸い", "光栄", "感謝"];
const negativeWords = ["申し訳", "残念", "困る", "難しい", "できません", "不安"];

function analyzeText(text) {
  const chars = text.replace(/\s/g, "").length;
  const sentences = text.split(/[。！？\?!]/).filter((s) => s.trim()).length;
  const words = text.split(/\s+/).filter((w) => w.trim()).length || 1;
  const avgSentenceLength = chars / (sentences || 1);

  // 読みやすさ（超ざっくり）
  let readabilityScore = 0;
  if (avgSentenceLength < 18) {
    readabilityScore = 70 + (18 - avgSentenceLength) * 1.2;
  } else if (avgSentenceLength < 45) {
    readabilityScore = 70 - (avgSentenceLength - 18) * 0.7;
  } else {
    readabilityScore = 45 - (avgSentenceLength - 45) * 0.4;
  }
  readabilityScore = Math.max(5, Math.min(95, Math.round(readabilityScore)));

  // 感情スコア
  let posCount = 0;
  let negCount = 0;
  positiveWords.forEach((w) => {
    const re = new RegExp(w, "g");
    const m = text.match(re);
    if (m) posCount += m.length;
  });
  negativeWords.forEach((w) => {
    const re = new RegExp(w, "g");
    const m = text.match(re);
    if (m) negCount += m.length;
  });

  const totalEmotion = posCount + negCount;
  let toneScore = 50;
  if (totalEmotion > 0) {
    const ratio = posCount / totalEmotion; // 0〜1
    toneScore = 30 + ratio * 40; // 30〜70くらいに
  }
  toneScore = Math.round(toneScore);

  const issues = [];
  if (avgSentenceLength > 40) {
    issues.push("一文がやや長めです。区切ってみると読みやすくなります。");
  }
  if (negCount > posCount) {
    issues.push(
      "ネガティブな表現が少し多めかもしれません。感謝やねぎらいを添えると和らぎます。"
    );
  }
  if (!/です。|ます。/.test(text) && chars > 0) {
    issues.push(
      "です・ます調やだ・である調など、文体をどちらかにそろえると安定します。"
    );
  }

  return {
    chars,
    sentences,
    words,
    avgSentenceLength: Math.round(avgSentenceLength * 10) / 10,
    readabilityScore,
    toneScore,
    issues,
  };
}

function updateMetrics(text) {
  if (!text.trim()) {
    readabilityBar.style.width = "0%";
    toneBar.style.width = "0%";
    readabilityLabel.textContent = "-";
    toneLabel.textContent = "-";
    issueChips.innerHTML = "";
    return;
  }

  const r = analyzeText(text);
  readabilityBar.style.width = r.readabilityScore + "%";
  toneBar.style.width = r.toneScore + "%";

  let readabilityComment = "";
  if (r.readabilityScore >= 75) {
    readabilityComment = "かなり読みやすい";
  } else if (r.readabilityScore >= 55) {
    readabilityComment = "おおむね読みやすい";
  } else if (r.readabilityScore >= 40) {
    readabilityComment = "やや難しめ";
  } else {
    readabilityComment = "かなり難しめ";
  }

  let toneComment = "";
  if (r.toneScore >= 65) {
    toneComment = "ポジティブ寄り";
  } else if (r.toneScore >= 45) {
    toneComment = "中立〜バランス";
  } else {
    toneComment = "ややネガティブ寄り";
  }

  readabilityLabel.textContent = `${readabilityComment}`;
  toneLabel.textContent = `${toneComment}`;

  issueChips.innerHTML = "";
  r.issues.forEach((issue) => {
    const chip = document.createElement("span");
    chip.className = "chip";
    chip.textContent = issue;
    issueChips.appendChild(chip);
  });
}

// ==========================
// イベント: 変換
// ==========================
applyModeBtn.addEventListener("click", () => {
  const text = inputText.value;
  if (!text.trim()) {
    showToast("元の文章を入力してください。", "error");
    return;
  }
  lastDraft = outputText.value || text;
  const result = transformText(text, currentMode);
  outputText.value = result;
  updateCharCount();
  saveDraft();
  updateMetrics(result);
  showToast("変換しました。");
});

// ==========================
// イベント: クリア
// ==========================
clearInputBtn.addEventListener("click", () => {
  if (inputText.value && !confirm("元の文章をクリアしますか？")) return;
  inputText.value = "";
  updateCharCount();
  saveDraft();
});

// ==========================
// イベント: 入れ替え
// ==========================
swapTextsBtn.addEventListener("click", () => {
  const inText = inputText.value;
  const outText = outputText.value;
  inputText.value = outText;
  outputText.value = inText;
  updateCharCount();
  saveDraft();
  updateMetrics(outputText.value);
});

// ==========================
// イベント: 復元
// ==========================
restoreDraftBtn.addEventListener("click", () => {
  if (!lastDraft) {
    showToast("復元できる下書きがありません。", "error");
    return;
  }
  outputText.value = lastDraft;
  updateCharCount();
  saveDraft();
  updateMetrics(lastDraft);
  showToast("最後の下書きを復元しました。");
});

// ==========================
// イベント: トーン解析
// ==========================
analyzeToneBtn.addEventListener("click", () => {
  const text = outputText.value || inputText.value;
  if (!text.trim()) {
    showToast("解析する文章がありません。", "error");
    return;
  }
  updateMetrics(text);
  showToast("トーンを解析しました。");
});

// ==========================
// イベント: コピー
// ==========================
copyOutputBtn.addEventListener("click", async () => {
  const text = outputText.value;
  if (!text.trim()) {
    showToast("コピーする文章がありません。", "error");
    return;
  }
  try {
    await navigator.clipboard.writeText(text);
    showToast("結果をクリップボードにコピーしました。");
  } catch (e) {
    showToast("コピーに失敗しました。", "error");
  }
});

// ==========================
// イベント: ダウンロード
// ==========================
downloadOutputBtn.addEventListener("click", () => {
  const text = outputText.value;
  if (!text.trim()) {
    showToast("保存する文章がありません。", "error");
    return;
  }
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  a.href = url;
  a.download = `humantouch-${stamp}.txt`;
  a.click();
  URL.revokeObjectURL(url);
  showToast("テキストファイルとして保存しました。");
});

// 初期メトリクス
updateMetrics(outputText.value);
