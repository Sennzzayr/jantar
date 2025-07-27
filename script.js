// Função para criar brilhos caindo
function criarBrilhos(qtd = 30) {
  const container = document.querySelector('.brilhos');
  for(let i = 0; i < qtd; i++) {
    const brilho = document.createElement('div');
    brilho.classList.add('brilho');
    brilho.style.left = Math.random() * 100 + 'vw';
    brilho.style.animationDuration = (3 + Math.random() * 3) + 's';
    brilho.style.animationDelay = (Math.random() * 5) + 's';
    brilho.style.width = (2 + Math.random() * 4) + 'px';
    brilho.style.height = (8 + Math.random() * 10) + 'px';
    container.appendChild(brilho);
  }
}

// Salvar e carregar Informações do Jantar no localStorage
function salvarInfo() {
  const info = {
    local: document.getElementById('local').value,
    data: document.getElementById('data').value,
    horario: document.getElementById('horario').value,
    comida: document.getElementById('comida').value,
    assunto: document.getElementById('assunto').value,
  };
  localStorage.setItem('infoJantar', JSON.stringify(info));
  mostrarMensagem('Informações do jantar salvas!');
}
function carregarInfo() {
  const infoStr = localStorage.getItem('infoJantar');
  if (infoStr) {
    const info = JSON.parse(infoStr);
    document.getElementById('local').value = info.local || '';
    document.getElementById('data').value = info.data || '';
    document.getElementById('horario').value = info.horario || '';
    document.getElementById('comida').value = info.comida || '';
    document.getElementById('assunto').value = info.assunto || '';
  }
}

// Função para garantir tbody está editável
function garantirEditavel() {
  const tbody = document.querySelector('#convidadosTable tbody');
  if (!tbody.hasAttribute('contenteditable')) {
    tbody.setAttribute('contenteditable', 'true');
  }
}

// Função para adicionar convidado na tabela
function adicionarConvidado() {
  garantirEditavel();
  const tbody = document.querySelector('#convidadosTable tbody');
  const tr = document.createElement('tr');
  const td = document.createElement('td');
  td.textContent = '...';
  tr.appendChild(td);
  tbody.appendChild(tr);
}

// Salvar convidados no localStorage
function salvarConvidados() {
  const tbody = document.querySelector('#convidadosTable tbody');
  const linhas = Array.from(tbody.querySelectorAll('tr'));
  const nomes = linhas.map(tr => tr.cells[0].textContent.trim());
  localStorage.setItem('listaConvidados', JSON.stringify(nomes));
  mostrarMensagem('Lista de convidados salva!');
}

// Carregar convidados do localStorage
function carregarConvidados() {
  const str = localStorage.getItem('listaConvidados');
  const tbody = document.querySelector('#convidadosTable tbody');
  if (str) {
    const nomes = JSON.parse(str);
    tbody.innerHTML = '';
    nomes.forEach(nome => {
      const tr = document.createElement('tr');
      const td = document.createElement('td');
      td.textContent = nome;
      tr.appendChild(td);
      tbody.appendChild(tr);
    });
  } else {
    // Se não tiver nada salvo, colocar valores padrão
    tbody.innerHTML = `
      <tr><td>Exemplo: Ana</td></tr>
      <tr><td>Exemplo: João</td></tr>
    `;
  }
  garantirEditavel();
}

// Resetar lista de convidados
function resetarConvidados() {
  localStorage.removeItem('listaConvidados');
  const tbody = document.querySelector('#convidadosTable tbody');
  tbody.innerHTML = `
    <tr><td>Exemplo: Ana</td></tr>
    <tr><td>Exemplo: João</td></tr>
  `;
  garantirEditavel();
  mostrarMensagem('Lista de convidados resetada!');
}

function mostrarMensagem(msg) {
  const el = document.getElementById('mensagem');
  el.textContent = msg;
  setTimeout(() => { el.textContent = ''; }, 3000);
}

document.addEventListener('DOMContentLoaded', () => {
  criarBrilhos(40);
  carregarInfo();
  carregarConvidados();

  document.getElementById('salvarInfoBtn').addEventListener('click', salvarInfo);
  document.getElementById('addConvidadoBtn').addEventListener('click', () => {
    adicionarConvidado();
    mostrarMensagem('Novo convidado adicionado! Lembre-se de salvar.');
  });
  document.getElementById('salvarConvidadosBtn').addEventListener('click', salvarConvidados);
  document.getElementById('resetarConvidadosBtn').addEventListener('click', resetarConvidados);
});
