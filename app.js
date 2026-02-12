// ===============================
// 1. 代表的な障害・病気ごとの情報（プルダウン用）
// ===============================
const conditionData = {
  asd: {
    name: "自閉スペクトラム症（ASD）",
    basicMeasures: [
      "抽象的な注意ではなく、具体的なルールを短く分かりやすく伝える（例：「この線から前には出ない」など）",
      "視覚的な手がかり（テープで立ち位置を示す、スケジュール表を見える場所に貼る）を用意する",
      "急な予定変更はできるだけ避け、必要な場合は事前に説明する",
      "パーソナルスペース（人との距離）について、事前にイラストや例で具体的に伝える"
    ],
    risks: [
      "他の子との距離が近くなりすぎる・後ろに立つ・急に触ってしまうことで、相手に恐怖や不安を与える可能性",
      "予想外の音・光・接触でパニックや強い不安反応が起こる可能性",
      "指示が伝わっていないと誤解され、叱られ続けることで自己肯定感が下がるリスク"
    ],
    specialMeasures: [
      "他の子への接近が頻繁に起きる場合、その子に近い位置に大人を配置し、行動を見守る",
      "繰り返しルール違反が起きる場合は、「稽古参加の条件」として保護者の付き添いを検討する",
      "女の子・男の子どちらも安心できるよう、必要であれば立ち位置やペアを見直す"
    ]
  },
  adhd: {
    name: "ADHD（注意欠如・多動症）",
    basicMeasures: [
      "説明は短く区切り、「今やること」をはっきりさせる",
      "長時間座り続けるより、小さな動きや役割（道具係など）を与える",
      "開始前に「動いていいタイミング」と「じっとするタイミング」を確認する"
    ],
    risks: [
      "走り出す・舞台装置に触るなど、安全面でのリスク",
      "他の子の集中を途切れさせてしまうことで、関係がぎくしゃくする可能性"
    ],
    specialMeasures: [
      "どうしても動いてしまう場合は、あえて少し動ける役割を与える（例：合図で小道具を運ぶ）",
      "危険な行動が続く場合は、保護者と相談し、参加時間を短くしたり付き添いを検討する"
    ]
  },
  intellectual: {
    name: "知的障害",
    basicMeasures: [
      "難しい言い回しを避け、短く具体的に説明する",
      "セリフや動きは、繰り返し・見本を見せながら練習する",
      "一度に多くのことを求めず、役割を絞る"
    ],
    risks: [
      "ルールを理解するまでに時間がかかり、周囲がイライラしてしまうリスク",
      "本人が失敗体験を重ねて、自信を失ってしまう可能性"
    ],
    specialMeasures: [
      "難易度の高い役割ではなく、成功体験を積みやすいポジションを用意する",
      "本人にとって分かりやすい形（イラスト・チェックリストなど）でルールを提示する"
    ]
  },
  epilepsy: {
    name: "てんかん",
    basicMeasures: [
      "事前に、どんな発作がどれくらいの頻度で起きるのか、保護者から聞いておく",
      "発作時の対応マニュアル（体勢・周りの安全確保・救急要請の目安）を共有しておく",
      "疲れや寝不足で発作が起きやすくなる場合は、稽古時間・強度を調整する"
    ],
    risks: [
      "発作時に頭を打つ・転倒するなどの身体的な危険",
      "周囲の子どもたちが驚き、不安を感じる可能性"
    ],
    specialMeasures: [
      "発作時にどうするかを、運営メンバーで事前に確認し、役割分担を決めておく",
      "1人のスタッフが付きっきりになる必要がある場合、保護者の付き添いを必須にすることも検討"
    ]
  },
  allergy: {
    name: "重度アレルギー（食物・薬・ハチなど）",
    basicMeasures: [
      "何にアレルギーがあるのか、どの程度の量で反応が出るのかを事前に確認する",
      "おやつ・差し入れなどのルールを決め、アレルゲンを持ち込まないよう保護者・参加者に周知する",
      "エピペンなどの緊急薬の保管場所と使い方を、関係者で共有しておく"
    ],
    risks: [
      "誤食・誤薬によるアナフィラキシーショックの危険",
      "周囲の子も食物を分け合うなどの行動で、意図せずリスクが高まる可能性"
    ],
    specialMeasures: [
      "食べ物を扱う場面では必ず大人が確認するようにし、本人任せにしない",
      "重度の場合は、必ず保護者か trained な大人が近くにいる体制をとる"
    ]
  },
  mental: {
    name: "不安障害・うつなどメンタル面の課題",
    basicMeasures: [
      "急に責める・大声で叱ることを避ける",
      "安心して休める場所（静かなスペース）をあらかじめ用意しておく",
      "体調や気分が落ちているときは、役割や負荷を下げる"
    ],
    risks: [
      "プレッシャーや人間関係のトラブルから、体調悪化や不登校につながる可能性",
      "突然の離脱（参加できなくなる）"
    ],
    specialMeasures: [
      "日によってコンディションが変わる場合、「当日相談して役割を調整してよい」と事前に決めておく",
      "自傷のリスクがある場合は、専門職・保護者としっかり連携したうえで参加可否を判断する"
    ]
  },
  none: {
    name: "特に診断名はないが、配慮が必要そう",
    basicMeasures: [
      "保護者とのコミュニケーションを丁寧に行い、「家で困っていること」「得意なこと」を聞く",
      "少しでも不安がある場合は、最初から役割や時間を小さめに設定し、様子を見ながら増やす",
      "子ども本人の「やりたいこと・苦手なこと」を尊重して、無理をさせすぎない"
    ],
    risks: [
      "見えにくい困難さがある場合、周囲から「わがまま」「やる気がない」と誤解されるリスク"
    ],
    specialMeasures: [
      "「何かあったらすぐ相談する」関係性を、保護者・本人・スタッフの間でつくっておく"
    ]
  }
};

// ========== 1-1. プルダウン表示処理 ==========
const conditionSelect = document.getElementById("conditionSelect");
const conditionInfo = document.getElementById("conditionInfo");
const basicMeasuresDiv = document.getElementById("basicMeasures");
const risksDiv = document.getElementById("risks");
const specialMeasuresDiv = document.getElementById("specialMeasures");

conditionSelect.addEventListener("change", () => {
  const value = conditionSelect.value;
  if (!value || !conditionData[value]) {
    conditionInfo.classList.add("hidden");
    basicMeasuresDiv.innerHTML = "";
    risksDiv.innerHTML = "";
    specialMeasuresDiv.innerHTML = "";
    return;
  }

  const data = conditionData[value];
  conditionInfo.classList.remove("hidden");

  basicMeasuresDiv.innerHTML = `
    <div class="info-section-title">基本的な対策（常に意識すること）</div>
    <ul>
      ${data.basicMeasures.map((m) => `<li>${m}</li>`).join("")}
    </ul>
  `;

  risksDiv.innerHTML = `
    <div class="info-section-title">想定されるリスク</div>
    <ul>
      ${data.risks.map((r) => `<li>${r}</li>`).join("")}
    </ul>
  `;

  specialMeasuresDiv.innerHTML = `
    <div class="info-section-title">その子に特別必要な処置・配慮の例</div>
    <ul>
      ${data.specialMeasures.map((s) => `<li>${s}</li>`).join("")}
    </ul>
  `;
});

// ===============================
// 2. チェックリスト評価ロジック
// ===============================
const evaluateButton = document.getElementById("evaluateChecklist");
const checklistResult = document.getElementById("checklistResult");

// 病名に応じた「チェックリストの読み方」説明
let currentDiagnosisKey = null; // 0番で最後に判定された病名キー

function getDiagnosisChecklistAdvice(key) {
  switch (key) {
    case "asd":
      return `
        <p class="small-text">
          【ASD向けの読み方】<br />
          ・「距離感」「パニック」「医療的リスク」に関する項目が複数つく場合、付き添い「推奨〜必須」を検討してください。<br />
          ・特に、他の子への接近やパニックが本番中に出ると危険なので、最初の数回は付き添いがあると安心です。
        </p>
      `;
    case "adhd":
      return `
        <p class="small-text">
          【ADHD向けの読み方】<br />
          ・「走り回る」「危険な場所に行く」などの項目がオンの場合、安全面から付き添い「推奨」です。<br />
          ・危険が繰り返されるようなら「原則必須」として、参加時間・役割の調整も検討してください。
        </p>
      `;
    case "epilepsy":
      return `
        <p class="small-text">
          【てんかん向けの読み方】<br />
          ・「医療」に関するチェックが1つでもついた場合は、付き添い「原則必須」と考えてください。<br />
          ・発作時の対応は、保護者や医師の指示に沿う必要があるため、単独での参加は基本的に避けます。
        </p>
      `;
    case "allergy":
      return `
        <p class="small-text">
          【重度アレルギー向けの読み方】<br />
          ・「医療」のチェックがある場合、誤食などのリスクを考え、付き添い「原則必須」です。<br />
          ・付き添いが難しい場合は、おやつの禁止や食物持ち込みルールの厳格化が必要になります。
        </p>
      `;
    case "mental":
      return `
        <p class="small-text">
          【メンタル面の課題向けの読み方】<br />
          ・「パニック」「不安」「トラブルに巻き込まれやすい」項目が多い場合、<br />
          　最初の数回は付き添い「推奨」、様子に応じて単独参加に切り替える形も考えられます。
        </p>
      `;
    case "ld":
      return `
        <p class="small-text">
          【学習障害(LD)向けの読み方】<br />
          ・安全面のチェックが少なければ、付き添いは「必須ではない」ことが多いです。<br />
          ・ただし、セリフや読み書きの負担については、家庭や学校での支援方法を共有してもらってください。
        </p>
      `;
    case "boderline":
      return `
        <p class="small-text">
          【境界知能向けの読み方】<br />
          ・安全面の項目が少なくても、「理解に時間がかかる」「からかわれやすい」項目が多い場合、<br />
          　最初の数回だけ付き添い「推奨」にして、慣れてきたら単独参加にする方法もあります。
        </p>
      `;
    default:
      return "";
  }
}

evaluateButton.addEventListener("click", () => {
  const dailyChecks = Array.from(
    document.querySelectorAll("#dailyChecklist input[type='checkbox']")
  );
  const schoolChecks = Array.from(
    document.querySelectorAll("#schoolChecklist input[type='checkbox']")
  );

  let dangerCount = 0;
  let supportCount = 0;
  let medicalCount = 0;

  const allChecks = dailyChecks.concat(schoolChecks);
  allChecks.forEach((chk) => {
    if (chk.checked) {
      if (chk.value === "danger") dangerCount++;
      if (chk.value === "support") supportCount++;
      if (chk.value === "medical") medicalCount++;
    }
  });

  let message = "";
  let levelTitle = "";

  if (medicalCount > 0 || dangerCount >= 2) {
    levelTitle = "付き添い「原則必須」レベルの可能性が高いです";
    message = `
      <p>
        ・危険な行動や医療的なリスクが確認されています。<br />
        ・原則として、保護者または支援者の付き添いを必須とし、団体として対応可能かどうかを慎重に検討してください。
      </p>
      <ul>
        <li>事前に、具体的なリスクと対応方法を保護者から詳しく聞く</li>
        <li>スタッフだけで対応しきれないと判断した場合は、参加形態の変更や短時間参加なども視野に入れる</li>
      </ul>
    `;
  } else if (dangerCount === 1 || supportCount >= 2) {
    levelTitle = "付き添い「推奨」レベルの可能性があります";
    message = `
      <p>
        ・いくつかの場面で、1対1のサポートや見守りがあった方が安全・安心と考えられます。<br />
        ・初期の数回だけでも、保護者の付き添いをお願いし、様子を一緒に確認することを検討してください。
      </p>
      <ul>
        <li>付き添いが難しい場合は、参加時間を短くする・役割を限定するなどの工夫を検討する</li>
        <li>学校や療育先での支援状況も参考にしながら、団体内で受け入れ体制を話し合う</li>
      </ul>
    `;
  } else if (dangerCount === 0 && supportCount <= 1 && medicalCount === 0) {
    levelTitle = "付き添い「必須ではない」可能性が高いです";
    message = `
      <p>
        ・現時点の情報からは、常時の保護者付き添いがなくても対応できる可能性があります。<br />
        ・ただし、初めての場では予想外の反応が出ることもあるため、最初の数回は連絡がつきやすい状態にしてもらいましょう。
      </p>
      <ul>
        <li>何か気になる行動があれば、その都度保護者と情報共有する</li>
        <li>子ども本人にも、困ったときに相談できる大人をはっきり示しておく</li>
      </ul>
    `;
  }

  if (!levelTitle) {
    levelTitle = "チェック項目が選択されていません";
    message = `
      <p>
        ・日常生活や学校での様子を、保護者や学校の先生に確認したうえで、もう一度チェックしてみてください。
      </p>
    `;
  }

  // 病名に応じたコメントを追加
  const extraAdvice = currentDiagnosisKey
    ? getDiagnosisChecklistAdvice(currentDiagnosisKey)
    : "";

  checklistResult.classList.remove("hidden");
  checklistResult.innerHTML = `
    <div class="info-section-title">${levelTitle}</div>
    ${message}
    ${extraAdvice}
  `;
});

// ===============================
// 3. その場の対応フロー
// ===============================
const incidentTypeSelect = document.getElementById("incidentType");
const incidentFlowDiv = document.getElementById("incidentFlow");

// 病名に応じた「対応フローの見方」説明
function getDiagnosisIncidentAdvice(key) {
  switch (key) {
    case "asd":
      return `
        <p class="small-text">
          【ASDの場合】<br />
          ・「突然の大きな音や予定変更」がパニックのきっかけになりやすいです。<br />
          ・パニック時は説得よりも「安全な場所へ移動→落ち着く時間」を優先してください。
        </p>
      `;
    case "adhd":
      return `
        <p class="small-text">
          【ADHDの場合】<br />
          ・「immediateDanger（身体の危険）」のフローを特に意識し、<br />
          　走り出しそうな場所・タイミングを事前に把握しておくと事故を減らせます。
        </p>
      `;
    case "epilepsy":
      return `
        <p class="small-text">
          【てんかんの場合】<br />
          ・医療的緊急事態（medicalEmergency）のフローが最重要です。<br />
          ・発作の種類や救急要請のラインを、保護者から事前に文書で受け取っておくと安心です。
        </p>
      `;
    case "allergy":
      return `
        <p class="small-text">
          【重度アレルギーの場合】<br />
          ・「medicalEmergency」のフローと、エピペンの使い方を事前に確認してください。<br />
          ・誤食が起きたら時間との勝負になるため、誰が119番するかも決めておきます。
        </p>
      `;
    case "mental":
      return `
        <p class="small-text">
          【メンタル面の課題の場合】<br />
          ・「psychological（心理的な不安）」のフローを重視し、安心できる場所と人を決めておきます。<br />
          ・本番前後のプレッシャーで症状が強く出ることもあるので、当日の様子をよく観察してください。
        </p>
      `;
    default:
      return "";
  }
}

incidentTypeSelect.addEventListener("change", () => {
  const value = incidentTypeSelect.value;
  if (!value) {
    incidentFlowDiv.classList.add("hidden");
    incidentFlowDiv.innerHTML = "";
    return;
  }

  let html = "";

  if (value === "immediateDanger") {
    html = `
      <div class="info-section-title">身体の危険がある場合の対応フロー</div>
      <ol>
        <li><strong>すぐに安全を確保する</strong>：<br />
          ・走り出した子どもを安全な場所まで誘導し、危険物や段差から遠ざける<br />
          ・他の子が巻き込まれないよう、近くの子どもを少し離す
        </li>
        <li><strong>場を一時停止する</strong>：<br />
          ・可能であれば進行を一旦止め、大人2名以上で対応する（1人は全体、1人は当事者）
        </li>
        <li><strong>落ち着いた場所で状況を確認する</strong>：<br />
          ・大きな声で叱るより、短く具体的に「何が危険だったか」「どうすると安全か」を伝える
        </li>
        <li><strong>その日の中でのルール再確認</strong>：<br />
          ・「もう一度同じことが起きたら、その日は見学に切り替える」など、分かりやすいルールを提示
        </li>
        <li><strong>終了後に保護者へ共有</strong>：<br />
          ・具体的な行動・対応・子どもの反応を伝え、今後の付き添いや参加方法を一緒に検討する
        </li>
      </ol>
    `;
  } else if (value === "psychological") {
    html = `
      <div class="info-section-title">他の子が怖がっている・不安な場合の対応フロー</div>
      <ol>
        <li><strong>まず「怖がっている側」を安心させる</strong>：<br />
          ・安全な場所に移動し、「怖かったね」「びっくりしたね」と気持ちを受け止める
        </li>
        <li><strong>その場を分ける</strong>：<br />
          ・当事者同士をすぐに直接話し合わせるのではなく、まず物理的な距離を取る
        </li>
        <li><strong>行動と人を分けて考える</strong>：<br />
          ・「あの行動はよくなかった」と伝え、人そのものを否定しない
        </li>
        <li><strong>必要に応じて、場のルールを全体に共有</strong>：<br />
          ・誰かを特定・非難せず、「みんなで守るルール」として確認する
        </li>
        <li><strong>保護者への説明</strong>：<br />
          ・事実と対応を冷静に共有し、感情的な blame にならないよう注意する
        </li>
      </ol>
    `;
  } else if (value === "ruleBreak") {
    html = `
      <div class="info-section-title">ルール違反が何度も続く場合の対応フロー</div>
      <ol>
        <li><strong>「具体的にどの行動か」を言語化する</strong>：<br />
          ・「ちゃんとして」ではなく、「○○のときに△△をしたのが困っている」と具体的に伝える
        </li>
        <li><strong>環境やルール側の工夫を考える</strong>：<br />
          ・ルールが難しすぎないか？情報量が多すぎないか？<br />
          ・立ち位置や役割を変えることで改善できないか？
        </li>
        <li><strong>それでも繰り返される場合</strong>：<br />
          ・「これ以上続くと、その日は見学に切り替える」「保護者に一度来てもらう」など、次のステップを事前に伝える
        </li>
        <li><strong>保護者と一緒に振り返る</strong>：<br />
          ・団体側だけで抱え込まず、家庭での様子や工夫を聞きながら、共通の方針を決める
        </li>
      </ol>
    `;
  } else if (value === "medicalEmergency") {
    html = `
      <div class="info-section-title">医療的な緊急事態（発作・アレルギーなど）の対応フロー</div>
      <ol>
        <li><strong>まず安全を確保する</strong>：<br />
          ・周囲の危険物（硬いもの・角があるもの）を遠ざける<br />
          ・倒れている場合は頭を守り、無理に抑えつけない
        </li>
        <li><strong>事前に聞いている「対応マニュアル」に従う</strong>：<br />
          ・エピペンや救急薬の使用条件・使い方を思い出し、可能なら複数人で確認しながら対応する
        </li>
        <li><strong>必要に応じて119番通報</strong>：<br />
          ・意識がない／呼吸が苦しそう／症状がどんどん強くなっている場合は、迷わず救急要請する
        </li>
        <li><strong>他の子どもたちへの対応</strong>：<br />
          ・状況を簡単に説明し、不安を煽らないように安心させる
        </li>
        <li><strong>事後に保護者・関係機関としっかり振り返る</strong>：<br />
          ・何が起きたか・どう対応したかを共有し、今後の参加方法や条件を一緒に決めていく
        </li>
      </ol>
    `;
  }

  // 病名に応じたアドバイスを追加
  const extraIncidentAdvice = currentDiagnosisKey
    ? getDiagnosisIncidentAdvice(currentDiagnosisKey)
    : "";

  incidentFlowDiv.classList.remove("hidden");
  incidentFlowDiv.innerHTML = html + extraIncidentAdvice;
});

// ===============================
// 4. フリーワード欄：診断名→対処法 + 2,3に反映
// ===============================

// 0番フリーワードの病名ごとの対処データ
const diagnosisMap = {
  asd: {
    labels: ["asd", "自閉", "自閉症", "自閉スペクトラム"],
    key: "asd",
    title: "自閉スペクトラム症（ASD）の対処のポイント",
    body: `
      <ul>
        <li>予定変更はできるだけ事前に伝え、「今日やること」を紙やホワイトボードに見える形で示します。</li>
        <li>パーソナルスペースのルール（距離感）を、全体ルールとして共有し、視覚的にも示します。</li>
        <li>女の子の後ろに立つ・特定の子に近づきすぎる場合は、大人が近くで見守り、立ち位置を工夫します。</li>
      </ul>
    `
  },
  adhd: {
    labels: ["adhd", "注意欠如", "多動", "多動症"],
    key: "adhd",
    title: "ADHD（注意欠如・多動症）の対処のポイント",
    body: `
      <ul>
        <li>長い説明を一気にしないで、「今やること」だけに絞って指示します。</li>
        <li>座り続けるのが難しい場合、立ってもよい位置・小さな役割（道具を配るなど）をあらかじめ用意します。</li>
        <li>走り回って危険なときは、大人が近くで見守りつつ、「走っていい場所と時間」を分けて設定します。</li>
      </ul>
    `
  },
  intellectual: {
    labels: ["知的障害", "知的しょうがい", "発達遅滞"],
    key: "intellectual",
    title: "知的障害のある子の対処のポイント",
    body: `
      <ul>
        <li>セリフや動きは「見本を見せる＋一緒にやってみる」を繰り返し、急がせないようにします。</li>
        <li>難しい役割より、「成功しやすい・分かりやすい」役割を優先します。</li>
        <li>その子専用の簡単なチェックリスト（今日やること）を作るのも有効です。</li>
      </ul>
    `
  },
  ld: {
    labels: ["学習障害", "ld", "ディスレクシア", "読み書き障害"],
    key: "ld",
    title: "学習障害（LD・ディスレクシアなど）の対処のポイント",
    body: `
      <ul>
        <li>セリフの読み書きが難しい場合は、音声で覚える・ペアで読むなどの工夫をします。</li>
        <li>文字情報だけでなく、立ち位置や動きを図や色で示すと理解しやすくなります。</li>
        <li>「暗記が遅い＝やる気がない」ではないことを、スタッフ全員で共有しておきます。</li>
      </ul>
    `
  },
  boderline: {
    labels: ["境界知能", "ボーダー", "境界線知能"],
    key: "boderline",
    title: "境界知能の子の対処のポイント",
    body: `
      <ul>
        <li>一見「普通」に見えても、理解に時間がかかったり、複雑な指示で混乱しやすいことがあります。</li>
        <li>説明は「短く・一つずつ」にして、分かっているかどうかを確認しながら進めます。</li>
        <li>失敗体験が重なりやすいので、小さな成功をしっかり褒めることが大事です。</li>
      </ul>
    `
  },
  selectiveMutism: {
    labels: ["選択性緘黙", "場面緘黙", "緘黙"],
    key: "selectiveMutism",
    title: "選択性緘黙の子の対処のポイント",
    body: `
      <ul>
        <li>緊張する場面では声が出にくくなりますが、家では普通に話せることも多いです。</li>
        <li>無理に話をさせようとせず、ジェスチャーやカード、相づちだけでも参加できるようにします。</li>
        <li>安心できる人（友達や特定のスタッフ）と一緒にいる時間を増やすことで、少しずつ声が出ることもあります。</li>
      </ul>
    `
  },
  dcd: {
    labels: ["発達性協調運動障害", "dcd", "協調運動障害"],
    key: "dcd",
    title: "発達性協調運動障害（DCD）の子の対処のポイント",
    body: `
      <ul>
        <li>動きのぎこちなさや不器用さが目立つことがありますが、努力不足ではありません。</li>
        <li>複雑な振り付けより、シンプルな動きや立ち位置だけの役割を検討します。</li>
        <li>転びやすい・物を落としやすい場合、舞台装置や小道具の配置に特に配慮してください。</li>
      </ul>
    `
  },
  tic: {
    labels: ["チック", "トゥレット", "トゥレット症"],
    key: "tic",
    title: "チック症・トゥレット症の子の対処のポイント",
    body: `
      <ul>
        <li>瞬き・咳払い・声などが無意識に出ることがありますが、本人の意思で完全に止めることは難しいです。</li>
        <li>無理に注意し続けると悪化することもあるため、「病気の症状」であることを一部スタッフで共有します。</li>
        <li>本番中にどうするかは、保護者・本人・場合によっては医師と事前に相談して決めておくと安心です。</li>
      </ul>
    `
  }
};

// 診断名テキストから該当データを探す
function findDiagnosisInfo(input) {
  if (!input) return null;
  const k = input.toLowerCase();

  for (const key in diagnosisMap) {
    const item = diagnosisMap[key];
    if (item.labels.some((label) => k.includes(label.toLowerCase()))) {
      return item;
    }
  }
  return null;
}

const globalFreeSearchInput = document.getElementById("globalFreeSearch");
const globalFreeSearchBtn = document.getElementById("globalFreeSearchBtn");
const globalFreeSearchResult = document.getElementById("globalFreeSearchResult");

globalFreeSearchBtn.addEventListener("click", () => {
  const keyword = globalFreeSearchInput.value.trim();
  let html = "";

  if (!keyword) {
    currentDiagnosisKey = null;
    html = `
      <p>診断名や特性名を入力してください。（例：自閉スペクトラム症、ADHD、学習障害 など）</p>
    `;
  } else {
    const info = findDiagnosisInfo(keyword);
    if (info) {
      currentDiagnosisKey = info.key; // 2,3番用に保存

      html = `
        <div class="info-section-title">${info.title}</div>
        <p>入力された診断名・特性名：<strong>${keyword}</strong></p>
        ${info.body}
        <p class="small-text">※ここに書かれているのは現場での一般的な配慮の例です。最終的な判断は保護者・専門家と相談して行ってください。</p>
      `;
    } else {
      currentDiagnosisKey = null;
      html = `
        <div class="info-section-title">この診断名・特性名に特化した情報は登録されていません</div>
        <p>入力された診断名・特性名：<strong>${keyword}</strong></p>
        <ul>
          <li>まずは、保護者に「日常生活での困りごと」「学校での支援内容」「医師や専門家から言われている注意点」を詳しく聞いてください。</li>
          <li>このツールの他の項目（ASD・ADHD・メンタルなど）の内容を参考にしながら、共通点のある対処法を取り入れてください。</li>
          <li>必要に応じて、学校や療育先、専門職に「集団活動での配慮ポイント」を相談してもらうのも有効です。</li>
        </ul>
      `;
    }
  }

  globalFreeSearchResult.classList.remove("hidden");
  globalFreeSearchResult.innerHTML = html;
});
