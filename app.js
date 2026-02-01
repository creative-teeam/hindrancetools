// Sakamichi Fan Toolkit (Static / No backend)
// - No account, no tracking, no external scripts
// - Data stored only in localStorage
// - Safe external links (noopener/noreferrer)
// - No copyrighted content included

const STORE_KEY = "sakamichi_fan_toolkit_v1";

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

const state = {
  group: "common", // common | nogi | sakura | hinata
  quickSearch: "",
  theme: "auto",
  data: {
    notes: [],
    checklistByGroup: {},
    preLiveMemoByGroup: {},
    missionsByGroup: {},
    lastExport: ""
  }
};

// --- Config (edit here safely) ---
// NOTE: Put ONLY official or clearly trusted URLs.
// No lyrics, no reuploads, no shady short links.
const GROUPS = {
  common: { key: "common", name: "共通" },
  nogi: { key: "nogi", name: "乃木坂46" },
  sakura: { key: "sakura", name: "櫻坂46" },
  hinata: { key: "hinata", name: "日向坂46" }
};

// You can customize these without changing the UI logic.
const OFFICIAL_LINKS = {
  common: [
    {
      title: "詐欺・転売の注意",
      desc: "転売/詐欺/なりすましを避け、必ず公式告知や正規ルートを確認。",
      url: "",
      cta: []
    }
  ],
  nogi: [
    {
      title: "公式導線（乃木坂46）",
      desc: "公式サイト/公式ストア/公式SNS/公式YouTube/配信 へ。",
      cta: [
        // ↓ここはあなたが「公式URL」に差し替えてOK（初期は空）
        { label: "公式サイト", url: "" },
        { label: "公式ストア", url: "" },
        { label: "公式YouTube", url: "" },
        { label: "公式X", url: "" },
        { label: "配信で聴く", url: "" }
      ]
    }
  ],
  sakura: [
    {
      title: "公式導線（櫻坂46）",
      desc: "公式サイト/公式ストア/公式SNS/公式YouTube/配信 へ。",
      cta: [
        { label: "公式サイト", url: "" },
        { label: "公式ストア", url: "" },
        { label: "公式YouTube", url: "" },
        { label: "公式X", url: "" },
        { label: "配信で聴く", url: "" }
      ]
    }
  ],
  hinata: [
    {
      title: "公式導線（日向坂46）",
      desc: "公式サイト/公式ストア/公式SNS/公式YouTube/配信 へ。",
      cta: [
        { label: "公式サイト", url: "" },
        { label: "公式ストア", url: "" },
        { label: "公式YouTube", url: "" },
        { label: "公式X", url: "" },
        { label: "配信で聴く", url: "" }
      ]
    }
  ]
};

// Support cards at top (sales/awareness friendly)
const SUPPORT_CARDS = {
  common: [
    {
      title: "公式で買う・申し込む",
      desc: "CD/BD/グッズ/チケットは正規ルートで。転売やDM誘導は避ける。",
      actions: [
        { label: "公式リンクを開く", tab: "links" }
      ]
    },
    {
      title: "公式で聴く・観る",
      desc: "公式配信/公式YouTubeの再生や登録は認知・数字に繋がりやすい。",
      actions: [
        { label: "公式リンクへ", tab: "links" },
        { label: "応援ミッションへ", tab: "support" }
      ]
    },
    {
      title: "告知を“公式リンクで”拡散",
      desc: "ファン同士の共有は、公式投稿のリンクを使う（転載リスク回避）。",
      actions: [
        { label: "リンクをシェア", fn: "shareOfficial" }
      ]
    }
  ],
  nogi: [],
  sakura: [],
  hinata: []
};

// Missions (legal + practical)
const DEFAULT_MISSIONS = [
  { text: "公式サイト/公式SNSで告知を確認した", key: "check_official" },
  { text: "公式YouTubeを登録・視聴した（公式動画）", key: "watch_official" },
  { text: "公式配信で聴いた（サブスク/ダウンロード）", key: "stream" },
  { text: "正規ルートで購入/予約した（CD/BD/グッズ）", key: "buy" },
  { text: "公式投稿のリンクで共有した（転載しない）", key: "share_official" },
  { text: "転売/DM誘導/外部決済リンクを避けた", key: "avoid_scam" }
];

// Checklist template (group-neutral; users can add)
const DEFAULT_CHECKLIST = [
  "身分証（必要な場合）",
  "チケット/入場画面（公式アプリ等）",
  "現金/交通系IC",
  "スマホ充電（モバブ）",
  "イヤホン",
  "双眼鏡（必要なら）",
  "防寒/暑さ対策",
  "飲み物",
  "雨具",
  "常備薬/絆創膏"
];

// --- Storage ---
function load() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return;
    const obj = JSON.parse(raw);
    if (!obj || typeof obj !== "object") return;

    state.group = obj.group ?? state.group;
    state.theme = obj.theme ?? state.theme;
    state.data = {
      ...state.data,
      ...(obj.data || {})
    };
  } catch (e) {
    // ignore
  }
}

function save() {
  const obj = {
    group: state.group,
    theme: state.theme,
    data: state.data
  };
  localStorage.setItem(STORE_KEY, JSON.stringify(obj));
}

// --- Theme ---
function applyTheme(theme) {
  const root = document.documentElement;
  if (theme === "light") root.setAttribute("data-theme", "light");
  else if (theme === "dark") root.setAttribute("data-theme", "dark");
  else root.removeAttribute("data-theme");
}

function toggleTheme() {
  // cycle: auto -> dark -> light -> auto
  const cur = state.theme || "auto";
  const next = cur === "auto" ? "dark" : cur === "dark" ? "light" : "auto";
  state.theme = next;
  applyTheme(next);
  save();
  toast(`Theme: ${next}`);
}

// --- Tabs ---
function setTab(tabKey) {
  $$(".tab").forEach(btn => {
    btn.classList.toggle("is-active", btn.dataset.tab === tabKey);
  });
  $$(".panel").forEach(p => {
    p.classList.toggle("is-active", p.dataset.panel === tabKey);
  });
  // re-render relevant sections
  renderAll();
}

function bindTabs() {
  $$(".tab").forEach(btn => {
    btn.addEventListener("click", () => setTab(btn.dataset.tab));
  });
}

// --- Helpers ---
function nowDateISO() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function safeText(s) {
  return (s ?? "").toString().trim();
}

function parseTags(s) {
  const raw = safeText(s);
  if (!raw) return [];
  return raw
    .split(/\s+/)
    .map(t => t.trim())
    .filter(Boolean)
    .slice(0, 20);
}

function matchesQuery(text, q) {
  if (!q) return true;
  return (text || "").toLowerCase().includes(q.toLowerCase());
}

function toast(msg) {
  const el = $("#toast");
  el.textContent = msg;
  el.classList.add("is-show");
  window.clearTimeout(toast._t);
  toast._t = window.setTimeout(() => el.classList.remove("is-show"), 1600);
}

function getGroupName(key) {
  return GROUPS[key]?.name ?? "共通";
}

function ensureGroupBuckets() {
  const g = state.group;

  if (!state.data.checklistByGroup[g]) {
    state.data.checklistByGroup[g] = DEFAULT_CHECKLIST.map(t => ({ text: t, done: false, locked: true }));
  }
  if (!state.data.preLiveMemoByGroup[g]) {
    state.data.preLiveMemoByGroup[g] = "";
  }
  if (!state.data.missionsByGroup[g]) {
    state.data.missionsByGroup[g] = DEFAULT_MISSIONS.map(m => ({ key: m.key, text: m.text, done: false }));
  }
}

// --- Render ---
function renderSupport() {
  const wrap = $("#supportCards");
  if (!wrap) return;

  const base = SUPPORT_CARDS.common || [];
  const groupExtra = SUPPORT_CARDS[state.group] || [];
  const cards = [...base, ...groupExtra];

  wrap.innerHTML = "";
  cards.forEach(c => {
    const card = document.createElement("div");
    card.className = "card linkCard";
    card.innerHTML = `
      <h3 class="linkCard__title">${c.title}</h3>
      <p class="linkCard__desc">${c.desc}</p>
      <div class="linkCard__actions"></div>
    `;
    const actionsEl = card.querySelector(".linkCard__actions");
    (c.actions || []).forEach(a => {
      const btn = document.createElement("button");
      btn.className = "btn";
      btn.type = "button";
      btn.textContent = a.label;
      btn.addEventListener("click", () => {
        if (a.tab) setTab(a.tab);
        if (a.fn === "shareOfficial") shareOfficialLinks();
      });
      actionsEl.appendChild(btn);
    });
    wrap.appendChild(card);
  });

  renderMissions();
}

function renderMissions() {
  ensureGroupBuckets();
  const list = $("#missionList");
  const bar = $("#missionBar");
  const doneEl = $("#missionDone");
  const totalEl = $("#missionTotal");
  if (!list || !bar) return;

  const missions = state.data.missionsByGroup[state.group] || [];
  const q = state.quickSearch;

  list.innerHTML = "";
  const filtered = missions.filter(m => matchesQuery(m.text, q));

  filtered.forEach((m, idx) => {
    const li = document.createElement("li");
    li.className = "check";
    li.innerHTML = `
      <input type="checkbox" ${m.done ? "checked" : ""} aria-label="ミッション: ${m.text}">
      <div class="check__text">${m.text}</div>
    `;
    const cb = li.querySelector("input");
    cb.addEventListener("change", () => {
      // mutate original missions by key
      const all = state.data.missionsByGroup[state.group];
      const target = all.find(x => x.key === m.key) || all[idx];
      if (target) target.done = cb.checked;
      save();
      renderMissions();
    });
    list.appendChild(li);
  });

  const total = missions.length;
  const done = missions.filter(m => m.done).length;
  const pct = total ? Math.round((done / total) * 100) : 0;

  bar.style.width = `${pct}%`;
  doneEl.textContent = String(done);
  totalEl.textContent = String(total);
}

function renderLinks() {
  const grid = $("#linksGrid");
  if (!grid) return;

  const q = state.quickSearch;

  const list = [
    ...(OFFICIAL_LINKS.common || []),
    ...(OFFICIAL_LINKS[state.group] || [])
  ];

  grid.innerHTML = "";
  list.forEach(item => {
    const title = item.title || "";
    const desc = item.desc || "";
    const ctas = item.cta || [];

    const flatText = `${title} ${desc} ${ctas.map(c => c.label).join(" ")}`;
    if (!matchesQuery(flatText, q)) return;

    const card = document.createElement("div");
    card.className = "card linkCard";
    card.innerHTML = `
      <h3 class="linkCard__title">${title}</h3>
      <p class="linkCard__desc">${desc}</p>
      <div class="linkCard__actions"></div>
      <div class="hint">※URLはあなたが公式URLに差し替えて使えます。</div>
    `;

    const actions = card.querySelector(".linkCard__actions");
    ctas.forEach(cta => {
      const a = document.createElement("a");
      a.className = "btn";
      a.textContent = cta.label;
      a.href = cta.url || "#";
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      if (!cta.url) {
        a.addEventListener("click", (e) => {
          e.preventDefault();
          toast("まず app.js の公式URLを設定してください");
        });
      }
      actions.appendChild(a);
    });

    // share button (shares OFFICIAL link only)
    const shareBtn = document.createElement("button");
    shareBtn.className = "btn btn--ghost";
    shareBtn.type = "button";
    shareBtn.textContent = "公式リンクをシェア";
    shareBtn.addEventListener("click", () => shareOfficialLinks());
    actions.appendChild(shareBtn);

    grid.appendChild(card);
  });
}

function renderNotes() {
  const list = $("#notesList");
  if (!list) return;

  const q = safeText($("#noteFilter")?.value) || state.quickSearch;
  const sort = $("#noteSort")?.value || "new";

  const notes = state.data.notes
    .filter(n => n.group === state.group || n.group === "common")
    .filter(n => {
      const blob = `${n.date} ${n.venue} ${n.type} ${n.text} ${(n.tags || []).join(" ")}`;
      return matchesQuery(blob, q);
    })
    .sort((a, b) => {
      const da = (a.date || "0000-00-00");
      const db = (b.date || "0000-00-00");
      if (sort === "old") return da.localeCompare(db) || (a.createdAt - b.createdAt);
      return db.localeCompare(da) || (b.createdAt - a.createdAt);
    });

  list.innerHTML = "";
  if (notes.length === 0) {
    const empty = document.createElement("div");
    empty.className = "muted";
    empty.textContent = "メモがありません（または検索条件に一致しません）。";
    list.appendChild(empty);
    return;
  }

  notes.forEach(n => {
    const item = document.createElement("div");
    item.className = "item";

    const typeLabel = ({
      live: "ライブ",
      event: "イベント",
      online: "配信",
      meet: "ミーグリ/握手",
      other: "その他"
    })[n.type] || "メモ";

    item.innerHTML = `
      <div class="item__head">
        <div>
          <h3 class="item__title">${typeLabel} / ${getGroupName(n.group)}</h3>
          <div class="item__meta">${n.date || ""}${n.venue ? " ・ " + n.venue : ""}</div>
        </div>
        <div class="item__actions">
          <button class="btn btn--ghost" type="button" data-act="copy">コピー</button>
          <button class="btn btn--danger" type="button" data-act="del">削除</button>
        </div>
      </div>
      <div class="item__body"></div>
      <div class="badges"></div>
    `;

    item.querySelector(".item__body").textContent = n.text || "";

    const badges = item.querySelector(".badges");
    (n.tags || []).forEach(t => {
      const b = document.createElement("span");
      b.className = "badge";
      b.textContent = t;
      badges.appendChild(b);
    });

    item.querySelector('[data-act="del"]').addEventListener("click", () => {
      state.data.notes = state.data.notes.filter(x => x.id !== n.id);
      save();
      renderNotes();
      toast("削除しました");
    });

    item.querySelector('[data-act="copy"]').addEventListener("click", async () => {
      const text = `[${getGroupName(n.group)}] ${typeLabel}\n${n.date || ""} ${n.venue || ""}\n${(n.tags || []).join(" ")}\n\n${n.text || ""}`.trim();
      try {
        await navigator.clipboard.writeText(text);
        toast("コピーしました");
      } catch {
        toast("コピーできませんでした（権限設定を確認）");
      }
    });

    list.appendChild(item);
  });
}

function renderChecklist() {
  ensureGroupBuckets();
  const ul = $("#checkItems");
  if (!ul) return;

  const q = state.quickSearch;
  const items = state.data.checklistByGroup[state.group] || [];

  ul.innerHTML = "";
  items
    .filter(it => matchesQuery(it.text, q))
    .forEach((it, idx) => {
      const li = document.createElement("li");
      li.className = "check";
      li.innerHTML = `
        <input type="checkbox" ${it.done ? "checked" : ""} aria-label="チェック: ${it.text}">
        <div class="check__text"></div>
        <button class="check__del" type="button" aria-label="削除">削除</button>
      `;
      li.querySelector(".check__text").textContent = it.text;

      li.querySelector("input").addEventListener("change", (e) => {
        it.done = e.target.checked;
        save();
        renderChecklist();
      });

      li.querySelector(".check__del").addEventListener("click", () => {
        if (it.locked) {
          toast("テンプレ項目は削除できません（テンプレに戻すで管理）");
          return;
        }
        items.splice(idx, 1);
        save();
        renderChecklist();
        toast("削除しました");
      });

      ul.appendChild(li);
    });

  // Pre-live memo
  const pre = $("#preLiveMemo");
  if (pre) pre.value = state.data.preLiveMemoByGroup[state.group] || "";
}

function renderAll() {
  // status
  const s = $("#storageStatus");
  if (s) s.textContent = "保存：localStorage";

  renderSupport();
  renderLinks();
  renderNotes();
  renderChecklist();
}

// --- Actions ---
function addNote() {
  const date = safeText($("#noteDate")?.value) || nowDateISO();
  const type = safeText($("#noteType")?.value) || "other";
  const venue = safeText($("#noteVenue")?.value).slice(0, 80);
  const tags = parseTags($("#noteTags")?.value);
  const text = safeText($("#noteText")?.value);

  if (!text) {
    toast("メモ本文を入力してください");
    return;
  }

  // Lightweight "PII warning" (not perfect, but a nudge)
  const riskyWords = ["住所", "電話", "学校", "本名", "LINE", "メール", "@", "アカウント"];
  const hit = riskyWords.some(w => text.includes(w) || venue.includes(w));
  if (hit) {
    toast("個人情報っぽい内容が含まれるかも：保存前に見直してね");
    // allow save anyway (user may be noting a warning). We'll proceed.
  }

  state.data.notes.push({
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(16).slice(2),
    group: state.group,
    date,
    type,
    venue,
    tags,
    text,
    createdAt: Date.now()
  });

  // clear inputs (keep date as convenience)
  $("#noteVenue").value = "";
  $("#noteTags").value = "";
  $("#noteText").value = "";

  save();
  renderNotes();
  toast("保存しました");
}

function clearNotes() {
  const before = state.data.notes.length;
  state.data.notes = state.data.notes.filter(n => !(n.group === state.group));
  save();
  renderNotes();
  toast(`このグループのメモを削除（${before - state.data.notes.length}件）`);
}

function addCheckItem() {
  ensureGroupBuckets();
  const input = $("#newCheckItem");
  const text = safeText(input?.value).slice(0, 60);
  if (!text) {
    toast("追加する項目を入力してください");
    return;
  }
  state.data.checklistByGroup[state.group].push({ text, done: false, locked: false });
  input.value = "";
  save();
  renderChecklist();
  toast("追加しました");
}

function resetChecklist() {
  ensureGroupBuckets();
  state.data.checklistByGroup[state.group].forEach(it => it.done = false);
  save();
  renderChecklist();
  toast("チェックを全解除しました");
}

function restoreChecklist() {
  state.data.checklistByGroup[state.group] = DEFAULT_CHECKLIST.map(t => ({ text: t, done: false, locked: true }));
  save();
  renderChecklist();
  toast("テンプレに戻しました");
}

function savePreLiveMemo() {
  ensureGroupBuckets();
  const v = safeText($("#preLiveMemo")?.value);
  state.data.preLiveMemoByGroup[state.group] = v;
  save();
  toast("保存しました");
}

function resetMissions() {
  ensureGroupBuckets();
  state.data.missionsByGroup[state.group].forEach(m => m.done = false);
  save();
  renderMissions();
  toast("ミッションをリセットしました");
}

// Share ONLY official links (safe)
async function shareOfficialLinks() {
  const links = [
    ...(OFFICIAL_LINKS[state.group] || [])
  ].flatMap(x => x.cta || [])
   .filter(x => x.url);

  if (links.length === 0) {
    toast("app.js の公式URLを設定すると、シェアが使えます");
    return;
  }

  const gname = getGroupName(state.group);
  const top = links.slice(0, 3);
  const text = `${gname} 応援用公式リンク（非公式ツールから共有）\n` +
               top.map(l => `- ${l.label}: ${l.url}`).join("\n");

  // Prefer Web Share API
  try {
    if (navigator.share) {
      await navigator.share({ title: `${gname} 公式リンク`, text });
      toast("共有しました");
      return;
    }
  } catch {
    // fallthrough to clipboard
  }

  try {
    await navigator.clipboard.writeText(text);
    toast("共有文をコピーしました");
  } catch {
    toast("共有できませんでした（権限設定を確認）");
  }
}

// --- Export / Import ---
function buildExport() {
  const payload = {
    version: 1,
    exportedAt: new Date().toISOString(),
    group: state.group,
    theme: state.theme,
    data: state.data
  };
  const json = JSON.stringify(payload, null, 2);
  state.data.lastExport = json;
  save();

  $("#exportBox").value = json;
  $("#downloadData").disabled = false;
  toast("JSONを生成しました");
}

function downloadExport() {
  const text = $("#exportBox").value || state.data.lastExport || "";
  if (!text) return;
  const blob = new Blob([text], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `sakamichi-toolkit-export_${nowDateISO()}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();

  URL.revokeObjectURL(url);
}

function importData() {
  const raw = safeText($("#importBox")?.value);
  if (!raw) {
    toast("JSONを貼り付けてください");
    return;
  }
  try {
    const obj = JSON.parse(raw);
    if (!obj || typeof obj !== "object" || !obj.data) {
      toast("形式が不正です");
      return;
    }
    state.group = obj.group ?? state.group;
    state.theme = obj.theme ?? state.theme;
    state.data = {
      ...state.data,
      ...(obj.data || {})
    };
    applyTheme(state.theme);
    save();

    // update UI controls
    $("#groupSelect").value = state.group;

    renderAll();
    toast("インポートしました");
  } catch (e) {
    toast("JSONの解析に失敗しました");
  }
}

// --- Bind UI ---
function bindUI() {
  // theme
  $("#themeToggle")?.addEventListener("click", toggleTheme);

  // group
  $("#groupSelect")?.addEventListener("change", (e) => {
    state.group = e.target.value;
    ensureGroupBuckets();
    save();
    renderAll();
    toast(`グループ：${getGroupName(state.group)}`);
  });

  // quick search
  $("#quickSearch")?.addEventListener("input", (e) => {
    state.quickSearch = safeText(e.target.value);
    renderAll();
  });

  // notes
  $("#noteDate").value = nowDateISO();
  $("#addNote")?.addEventListener("click", addNote);
  $("#clearNotes")?.addEventListener("click", clearNotes);
  $("#noteFilter")?.addEventListener("input", renderNotes);
  $("#noteSort")?.addEventListener("change", renderNotes);

  // checklist
  $("#addCheckItem")?.addEventListener("click", addCheckItem);
  $("#resetChecklist")?.addEventListener("click", resetChecklist);
  $("#restoreChecklist")?.addEventListener("click", restoreChecklist);
  $("#savePreLiveMemo")?.addEventListener("click", savePreLiveMemo);

  // missions
  $("#resetMissions")?.addEventListener("click", resetMissions);

  // export/import
  $("#exportData")?.addEventListener("click", buildExport);
  $("#downloadData")?.addEventListener("click", downloadExport);
  $("#importData")?.addEventListener("click", importData);
}

// --- Init ---
function init() {
  load();
  ensureGroupBuckets();

  // apply theme
  applyTheme(state.theme);

  // set controls
  $("#groupSelect").value = state.group;

  bindTabs();
  bindUI();
  setTab("support");
  renderAll();

  toast("起動しました（端末内保存 / サーバー送信なし）");
}

document.addEventListener("DOMContentLoaded", init);
