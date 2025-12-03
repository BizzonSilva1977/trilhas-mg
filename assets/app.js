document.addEventListener('DOMContentLoaded', () => {
  carregarTrilhas();
});

async function carregarTrilhas() {
  try {
    const res = await fetch('data/trilhas.json');
    if (!res.ok) throw new Error(`Falha ao carregar JSON: ${res.status}`);
    const trilhas = await res.json();

    const lista = document.getElementById('lista-trilhas');
    if (!lista) {
      console.error('Elemento #lista-trilhas não encontrado.');
      return;
    }

    lista.innerHTML = trilhas.map(trilha => `
      <li>
        <strong>${trilha.nome}</strong> — ${trilha.cidade} • ${trilha.dificuldade} • ${trilha.distancia_km} km
        <br>Ponto de partida: ${trilha.ponto_partida}
        <br><a href="${trilha.mapa_url}" target="_blank">Ver mapa</a>
        <br>
        ${trilha.imagens && trilha.imagens.length > 0 
          ? trilha.imagens.map(img => `<img src="${img}" alt="${trilha.nome}" style="max-width:250px; border-radius:8px; margin:5px;">`).join('')
          : '<em>Sem imagens disponíveis</em>'
        }
      </li>
    `).join('');
  } catch (err) {
    console.error('Erro ao carregar trilhas:', err);
  }
}
