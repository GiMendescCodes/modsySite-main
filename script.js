document.addEventListener('DOMContentLoaded', function () {
  // === FUNCIONALIDADE 1: Modal de Vídeo (opcional) ===
  const modal = document.getElementById('video-modal');
  if (modal) {
    const videoPlayer = modal.querySelector('video');

    if (videoPlayer) {
      // Clique nos cards
      document.querySelectorAll('.trabalho-item').forEach(item => {
        item.addEventListener('click', function () {
          const videoSrc = this.getAttribute('data-video');
          const posterSrc = this.getAttribute('data-poster');

          if (!videoSrc) {
            console.warn('Nenhum vídeo definido para este item:', this);
            return;
          }

          videoPlayer.src = videoSrc;
          videoPlayer.poster = posterSrc || '';
          videoPlayer.muted = true;
          videoPlayer.load();

          modal.style.display = 'flex';

          videoPlayer.play().catch(e => {
            console.warn('Falha ao reproduzir automaticamente:', e);
          });
        });
      });

      // Fecha ao clicar fora
      modal.addEventListener('click', function (e) {
        if (e.target === modal) {
          modal.style.display = 'none';
          videoPlayer.pause();
          videoPlayer.src = '';
        }
      });
    }
  }

  // === FUNCIONALIDADE 2: Carrossel (sempre ativo se existir) ===
  const carousel = document.querySelector('.carousel-wrapper');
  if (carousel) {
    let isDown = false;
    let startX;
    let scrollLeft;

    const handleMouseDown = (e) => {
      isDown = true;
      startX = e.pageX - carousel.offsetLeft;
      scrollLeft = carousel.scrollLeft;
      carousel.style.cursor = 'grabbing';
      carousel.style.userSelect = 'none';
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
      const walk = (x - startX) * 2;
      carousel.scrollLeft = scrollLeft - walk;
    };

    carousel.addEventListener('mousedown', handleMouseDown);
    carousel.addEventListener('mouseup', handleMouseUp);
    carousel.addEventListener('mouseleave', handleMouseUp);
    carousel.addEventListener('mousemove', handleMouseMove);
  }
});