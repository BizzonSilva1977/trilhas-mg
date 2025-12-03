document.addEventListener('DOMContentLoaded', () => {
  carregarTrilhas();
});

async function carregarTrilhas() {
  try {
    const res = await fetch('data/trilhas.json');
    const trilhas = await res.json();
    const lista = document.getElementById('lista-trilhas');

    lista.innerHTML = trilhas.map(trilha => `
      <li>
        <strong>${trilha.nome}</strong> — ${trilha.cidade} • ${trilha.dificuldade} • ${trilha.distancia_km} km
        <br>Ponto de partida: ${trilha.ponto_partida}
        <br><a href="${trilha.mapa_url}" target="_blank">Ver mapa</a>
      </li>
    `).join('');
  } catch (err) {
    console.error('Erro ao carregar trilhas:', err);
  }
}
