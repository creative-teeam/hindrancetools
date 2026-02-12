// ===============================
// 1. 障害・病気ごとの情報データ
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

// ========== 1. 障害・病気セクション ==========

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

// ========== 2. チェックリスト評価ロジック ==========

const evaluateButton = document.getElementById("evaluateChecklist");
const checklistResult = document.getElementById("checklistResult");

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

  checklistResult.classList.remove("hidden");
  checklistResult.innerHTML = `
    <div class="info-section-title">${levelTitle}</div>
    ${message}
  `;
});

// ========== 3. その場の対応フロー ==========

const incidentTypeSelect = document.getElementById("incidentType");
const incidentFlowDiv = document.getElementById("incidentFlow");

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

  incidentFlowDiv.classList.remove("hidden");
  incidentFlowDiv.innerHTML = html;
});

// ========== 4. 想定外用キーワード判定 ==========

function categorizeKeyword(keyword) {
  const k = keyword.toLowerCase();
  if (!k.trim()) return "empty";

  if (
    k.includes("叩") ||
    k.includes("殴") ||
    k.includes("蹴") ||
    k.includes("押") ||
    k.includes("走り") ||
    k.includes("飛び出") ||
    k.includes("危険") ||
    k.includes("刃物") ||
    k.includes("暴力")
  ) {
    return "danger";
  }

  if (
    k.includes("距離") ||
    k.includes("近づ") ||
    k.includes("後ろに立") ||
    k.includes("女の子") ||
    k.includes("男の子") ||
    k.includes("特定の子") ||
    k.includes("追いかけ")
  ) {
    return "boundary";
  }

  if (
    k.includes("音") ||
    k.includes("光") ||
    k.includes("匂い") ||
    k.includes("感覚過敏") ||
    k.includes("大きな音") ||
    k.includes("耳をふさ")
  ) {
    return "sensory";
  }

  if (k.includes("話せ") || k.includes("喋れ") || k.includes("緘黙")) {
    return "communication";
  }

  if (
    k.includes("発作") ||
    k.includes("痙攣") ||
    k.includes("てんかん") ||
    k.includes("アレルギ") ||
    k.includes("エピペン") ||
    k.includes("呼吸") ||
    k.includes("意識")
  ) {
    return "medical";
  }

  if (
    k.includes("パニック") ||
    k.includes("癇癪") ||
    k.includes("かんしゃく") ||
    k.includes("大声") ||
    k.includes("叫") ||
    k.includes("笑い続け")
  ) {
    return "emotional";
  }

  return "general";
}

// ========== 5. 検索欄ごとの「メッセージ生成」 ==========

// 5-1. 全体検索用
function generateGlobalHint(category, keyword) {
  if (category === "empty") {
    return `
      <p>キーワードが入力されていません。診断名や特性名、行動の様子などを入力してみてください。</p>
    `;
  }

  let intro = `
    <p>
      入力されたキーワード：<strong>${keyword}</strong><br />
      （全体的な見立てと、まず押さえておきたいポイントです）
    </p>
  `;

  let body = "";

  switch (category) {
    case "danger":
      body = `
        <ul>
          <li>身体の安全に関わる可能性が高いので、「安全の確保」を最優先に考えます。</li>
          <li>団体だけで無理に抱えず、保護者・学校・療育先と連携して対応方針を決めてください。</li>
          <li>一時的に役割や参加時間を減らすことも選択肢に入れて構いません。</li>
        </ul>
      `;
      break;
    case "boundary":
      body = `
        <ul>
          <li>人との距離や関係性の課題が中心になっている可能性があります。</li>
          <li>「悪気はないが相手が怖い」という状況になりやすいので、双方を守る視点が重要です。</li>
          <li>パーソナルスペースを見える形で示す工夫（床テープなど）を、全体ルールとして導入するのも有効です。</li>
        </ul>
      `;
      break;
    case "sensory":
      body = `
        <ul>
          <li>感覚（音・光・匂いなど）に強い苦手さがある場合、まず環境調整を検討してください。</li>
          <li>「演劇」という特性上、音・光の刺激が大きくなりやすいので、段階的な参加も選択肢になります。</li>
        </ul>
      `;
      break;
    case "communication":
      body = `
        <ul>
          <li>話す・伝えることが難しい場合でも、理解力は保たれていることがあります。</li>
          <li>カード・ジェスチャー・チェックシートなど、別の伝え方を一緒に探してください。</li>
        </ul>
      `;
      break;
    case "medical":
      body = `
        <ul>
          <li>医療面のリスクが疑われる場合、保護者から必ず詳細を聞いてください。</li>
          <li>緊急時の連絡体制・薬の有無・発作の頻度などを、紙にまとめておくと安心です。</li>
        </ul>
      `;
      break;
    case "emotional":
      body = `
        <ul>
          <li>感情の波が大きいタイプかもしれません。安心できる人・場所を事前に確保しておきます。</li>
          <li>「怒らないでほしい」がベースにあることも多いので、叱責よりも環境調整・予告・クールダウンを重視します。</li>
        </ul>
      `;
      break;
    case "general":
    default:
      body = `
        <ul>
          <li>個別の事情が大きい可能性があるため、まずは保護者から丁寧に話を聞くことが重要です。</li>
          <li>分からないまま決めつけず、「試してみて、振り返る」サイクルで対応を組み立ててください。</li>
        </ul>
      `;
      break;
  }

  return intro + body;
}

// 5-2. 「この子に特有の特性」用
function generateConditionHint(category, keyword) {
  if (category === "empty") {
    return `<p>この子に特有の行動や心配ごとを、できる範囲で言葉にして入力してみてください。</p>`;
  }

  let intro = `
    <p>
      入力された特性・行動：<strong>${keyword}</strong><br />
      （個別の特性に合わせた見守りポイントです）
    </p>
  `;

  let body = "";

  switch (category) {
    case "danger":
      body = `
        <ul>
          <li>この行動が「いつ」「どこで」「誰に対して」起こりやすいか、パターンをメモしておきます。</li>
          <li>パターンが見えてきたら、その時間帯・場面だけ大人を近くに配置するなど、ピンポイントで見守ります。</li>
        </ul>
      `;
      break;
    case "boundary":
      body = `
        <ul>
          <li>特定の子に近づきすぎる場合、立ち位置やペアの組み方を変えることでリスクを下げられます。</li>
          <li>「ここからは入らない線」「この距離ならOK」など、本人と一緒にルールを決めると効果的です。</li>
        </ul>
      `;
      break;
    case "sensory":
      body = `
        <ul>
          <li>嫌がる刺激が出やすい場面（音出し、照明テストなど）を、あらかじめ短時間だけ試す機会を作ってもよいです。</li>
          <li>しんどそうな時は、無理に続けさせず一時退室を選べるようにしておきます。</li>
        </ul>
      `;
      break;
    case "communication":
      body = `
        <ul>
          <li>セリフのある演劇の場合、「声を出す役」「動きだけの役」を分けて考えてもよいかもしれません。</li>
          <li>本人が安心して出せる声・タイミングを一緒に探していけると理想的です。</li>
        </ul>
      `;
      break;
    case "medical":
      body = `
        <ul>
          <li>特性の裏に医療的な事情が隠れていることもあります。保護者に医師からの指示などがないか確認してください。</li>
        </ul>
      `;
      break;
    case "emotional":
      body = `
        <ul>
          <li>感情が大きく動きやすい場合、「予告」と「選択肢」をセットで伝えると落ち着きやすくなります。</li>
          <li>例：「あと5分で休憩終わり」「しんどかったらここで休んでもいい」など。</li>
        </ul>
      `;
      break;
    case "general":
    default:
      body = `
        <ul>
          <li>本人・保護者に「どうされると一番つらいか／どうされると安心か」を具体的に聞いてみてください。</li>
        </ul>
      `;
      break;
  }

  return intro + body;
}

// 5-3. チェックリスト用
function generateChecklistHint(category, keyword) {
  if (category === "empty") {
    return `<p>チェックリストでは拾えなかった「心配な行動」を、一言で構いませんので入力してみてください。</p>`;
  }

  let intro = `
    <p>
      入力された行動・状況：<strong>${keyword}</strong><br />
      （付き添い判断を補うための視点です）
    </p>
  `;

  let body = "";

  switch (category) {
    case "danger":
      body = `
        <ul>
          <li>今のチェックリスト項目に加えて、<strong>付き添い「原則必須」より</strong>に考えてよいレベルです。</li>
          <li>稽古場では再現したくない危険もあるので、家庭や学校での様子をさらに詳しく聞いて判断してください。</li>
        </ul>
      `;
      break;
    case "boundary":
      body = `
        <ul>
          <li>物理的な危険と、心理的な安心の両方を守る必要があります。</li>
          <li>今のチェックリスト評価に、<strong>「一部の時間だけ付き添い」</strong>などの条件付き参加も選択肢として加えてください。</li>
        </ul>
      `;
      break;
    case "sensory":
      body = `
        <ul>
          <li>感覚過敏が強いと、「普段は大丈夫でも本番の大音量でパニック」なども起こり得ます。</li>
          <li>初回〜数回は、保護者が近くにいると安心なケースも多いです。</li>
        </ul>
      `;
      break;
    case "medical":
      body = `
        <ul>
          <li>チェックリストの「医療」に加えて、このキーワードも出ているため、付き添いを<strong>原則必須</strong>で検討してよい状況です。</li>
          <li>団体として対応しきれない場合は、正直に伝え、別の形で関わる機会を一緒に考えることも大切です。</li>
        </ul>
      `;
      break;
    default:
      body = `
        <ul>
          <li>判断に迷う場合は、「試しに1〜2回は付き添いあり」で運営してから、継続可否を話し合う方法もあります。</li>
        </ul>
      `;
      break;
  }

  return intro + body;
}

// 5-4. 対応フロー用
function generateIncidentHint(category, keyword) {
  if (category === "empty") {
    return `<p>具体的な場面（例：本番中に大声を出す など）を、短く入力してみてください。</p>`;
  }

  let intro = `
    <p>
      入力された場面：<strong>${keyword}</strong><br />
      （その場の対応を考えるためのヒントです）
    </p>
  `;

  let body = "";

  switch (category) {
    case "danger":
      body = `
        <ul>
          <li>まずはどのカテゴリ（即時危険／ルール違反など）に近いかを、上のプルダウンで選び、フローと合わせて考えてください。</li>
          <li>「危険が続くなら、その日は退場も含める」というラインをチーム内で共通認識にしておきます。</li>
        </ul>
      `;
      break;
    case "boundary":
      body = `
        <ul>
          <li>距離感の問題で他の子が怖がっている場合、「psychological（心理的な不安）」のフローも参考になります。</li>
          <li>場を分ける／立ち位置を変える／大人を間に入れる、という3つの基本を意識してください。</li>
        </ul>
      `;
      break;
    case "sensory":
      body = `
        <ul>
          <li>音や光に反応しているなら、「本番前にテストして慣れる」「イヤーマフを許可する」なども検討可能です。</li>
        </ul>
      `;
      break;
    case "emotional":
      body = `
        <ul>
          <li>感情の爆発は、その場で説得しても難しいことが多いため、まずはクールダウンの場へ案内します。</li>
          <li>落ち着いた後に、「何が嫌だったか」「次はどうしてほしいか」を少しずつ聞くようにしてください。</li>
        </ul>
      `;
      break;
    case "medical":
      body = `
        <ul>
          <li>医療的要因が疑われる場面では、救急要請のライン（意識・呼吸・時間）をあらかじめ決めておくと判断しやすくなります。</li>
        </ul>
      `;
      break;
    default:
      body = `
        <ul>
          <li>その場で判断しきれない場合、「いったん安全を確保して止める」「後日、保護者と一緒に振り返る」の2段階で考えてください。</li>
        </ul>
      `;
      break;
  }

  return intro + body;
}

// ========== 6. 各検索欄のイベント ==========

// 6-1. 全体用
const globalFreeSearchInput = document.getElementById("globalFreeSearch");
const globalFreeSearchBtn = document.getElementById("globalFreeSearchBtn");
const globalFreeSearchResult = document.getElementById("globalFreeSearchResult");

globalFreeSearchBtn.addEventListener("click", () => {
  const keyword = globalFreeSearchInput.value.trim();
  const category = categorizeKeyword(keyword);
  const html = generateGlobalHint(category, keyword || "（未入力）");
  globalFreeSearchResult.classList.remove("hidden");
  globalFreeSearchResult.innerHTML = html;
});

// 6-2. 条件セクション用
const conditionFreeSearchInput = document.getElementById("conditionFreeSearch");
const conditionFreeSearchBtn = document.getElementById("conditionFreeSearchBtn");
const conditionFreeSearchResult = document.getElementById("conditionFreeSearchResult");

conditionFreeSearchBtn.addEventListener("click", () => {
  const keyword = conditionFreeSearchInput.value.trim();
  const category = categorizeKeyword(keyword);
  const html = generateConditionHint(category, keyword || "（未入力）");
  conditionFreeSearchResult.classList.remove("hidden");
  conditionFreeSearchResult.innerHTML = html;
});

// 6-3. チェックリスト用
const checklistFreeSearchInput = document.getElementById("checklistFreeSearch");
const checklistFreeSearchBtn = document.getElementById("checklistFreeSearchBtn");
const checklistFreeSearchResult = document.getElementById("checklistFreeSearchResult");

checklistFreeSearchBtn.addEventListener("click", () => {
  const keyword = checklistFreeSearchInput.value.trim();
  const category = categorizeKeyword(keyword);
  const html = generateChecklistHint(category, keyword || "（未入力）");
  checklistFreeSearchResult.classList.remove("hidden");
  checklistFreeSearchResult.innerHTML = html;
});

// 6-4. 対応フロー用
const incidentFreeSearchInput = document.getElementById("incidentFreeSearch");
const incidentFreeSearchBtn = document.getElementById("incidentFreeSearchBtn");
const incidentFreeSearchResult = document.getElementById("incidentFreeSearchResult");

incidentFreeSearchBtn.addEventListener("click", () => {
  const keyword = incidentFreeSearchInput.value.trim();
  const category = categorizeKeyword(keyword);
  const html = generateIncidentHint(category, keyword || "（未入力）");
  incidentFreeSearchResult.classList.remove("hidden");
  incidentFreeSearchResult.innerHTML = html;
});
