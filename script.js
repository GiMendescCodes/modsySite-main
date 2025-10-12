document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('video-modal');
  const videoPlayer = modal ? modal.querySelector('video') : null;

  // Só continua se o modal e o vídeo existirem
  if (!modal || !videoPlayer) {
    console.error('Modal ou vídeo não encontrado no HTML!');
    return;
  }

  // Clique nos cards
  document.querySelectorAll('.trabalho-item').forEach(item => {
    item.addEventListener('click', function () {
      const videoSrc = this.getAttribute('data-video');
      const posterSrc = this.getAttribute('data-poster');

      if (!videoSrc) {
        console.warn('Nenhum vídeo definido para este item:', this);
        return;
      }

      // Configura o vídeo
      videoPlayer.src = videoSrc;
      videoPlayer.poster = posterSrc || '';
      videoPlayer.muted = true; // ← ESSENCIAL para autoplay
      videoPlayer.load();

      // Mostra o modal
      modal.style.display = 'flex';

      // Tenta tocar (alguns navegadores exigem interação do usuário)
      videoPlayer.play().catch(e => {
        console.warn('Falha ao reproduzir automaticamente:', e);
        // O usuário pode clicar no play manualmente
      });
    });
  });

  // Fecha ao clicar fora
  modal.addEventListener('click', function (e) {
    if (e.target === modal) {
      modal.style.display = 'none';
      videoPlayer.pause();
      videoPlayer.src = ''; // Libera memória
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const carousel = document.querySelector('.carousel-wrapper');
  if (!carousel) return;

  let isDown = false;
  let startX;
  let scrollLeft;

  const handleMouseDown = (e) => {
    isDown = true;
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
    carousel.style.cursor = 'grabbing';
    carousel.style.userSelect = 'none'; // Evita seleção de texto ao arrastar
  };

  const handleMouseUp = () => {
    isDown = false;
    carousel.style.cursor = '';
    carousel.style.userSelect = '';
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 2; // Velocidade do scroll
    carousel.scrollLeft = scrollLeft - walk;
  };

  // Eventos de mouse
  carousel.addEventListener('mousedown', handleMouseDown);
  carousel.addEventListener('mouseup', handleMouseUp);
  carousel.addEventListener('mouseleave', handleMouseUp);
  carousel.addEventListener('mousemove', handleMouseMove);

  // Em dispositivos touch, o scroll é nativo — não precisamos interferir
});