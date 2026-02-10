function createSummary() {
  const topic = document.getElementById('topic').value.trim();
  const proClaim = document.getElementById('pro-claim').value.trim();
  const proReason = document.getElementById('pro-reason').value.trim();
  const conClaim = document.getElementById('con-claim').value.trim();
  const conReason = document.getElementById('con-reason').value.trim();
  const thirdCommon = document.getElementById('third-common').value.trim();
  const thirdMissing = document.getElementById('third-missing').value.trim();
  const thirdCompromise = document.getElementById('third-compromise').value.trim();
  const thirdFinal = document.getElementById('third-final').value.trim();

  const summaryDiv = document.getElementById('summary');
  summaryDiv.innerHTML = '';

  const container = document.createElement('div');
  container.className = 'output-card';

  const title = document.createElement('h3');
  title.textContent = topic ? `テーマ：${topic}` : 'テーマが未入力です';
  container.appendChild(title);

  const proP = document.createElement('p');
  proP.innerText =
    '【賛成の立場】\n' +
    (proClaim ? `主張：${proClaim}\n` : '') +
    (proReason ? `理由：${proReason}\n` : '');
  container.appendChild(proP);

  const conP = document.createElement('p');
  conP.innerText =
    '【反対の立場】\n' +
    (conClaim ? `主張：${conClaim}\n` : '') +
    (conReason ? `理由：${conReason}\n` : '');
  container.appendChild(conP);

  const thirdP = document.createElement('p');
  thirdP.innerText =
    '【第三の立場に向けたメモ】\n' +
    (thirdCommon ? `両方のもっともな点：${thirdCommon}\n` : '') +
    (thirdMissing ? `見落としていそうな点：${thirdMissing}\n` : '') +
    (thirdCompromise ? `折衷案のアイデア：${thirdCompromise}\n` : '') +
    (thirdFinal ? `今の自分の立場：${thirdFinal}\n` : '');
  container.appendChild(thirdP);

  summaryDiv.appendChild(container);

  // localStorage に最新セッションを保存（任意）
  const sessionData = {
    topic,
    proClaim,
    proReason,
    conClaim,
    conReason,
    thirdCommon,
    thirdMissing,
    thirdCompromise,
    thirdFinal,
    createdAt: new Date().toISOString()
  };

  try {
    localStorage.setItem('thirdPosition-latest', JSON.stringify(sessionData));
  } catch (e) {
    // localStorage が使えない環境では何もしない
    console.warn('localStorage に保存できませんでした:', e);
  }
}

function clearAll() {
  document.querySelectorAll('input[type="text"], textarea').forEach((el) => {
    el.value = '';
  });
  document.getElementById('summary').innerHTML = '';
}

function setupEventListeners() {
  const btnGenerate = document.getElementById('btn-generate-summary');
  const btnClear = document.getElementById('btn-clear');

  if (btnGenerate) {
    btnGenerate.addEventListener('click', createSummary);
  }

  if (btnClear) {
    btnClear.addEventListener('click', clearAll);
  }
}

document.addEventListener('DOMContentLoaded', setupEventListeners);
