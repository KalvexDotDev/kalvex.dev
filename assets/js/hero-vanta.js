(() => {
  const target = document.querySelector('[data-vanta-hero]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const smallScreen = window.matchMedia('(max-width: 760px)').matches;

  if (!target || reduceMotion || smallScreen || !window.VANTA || !window.VANTA.NET) {
    return;
  }

  const effect = window.VANTA.NET({
    el: target,
    mouseControls: false,
    touchControls: false,
    gyroControls: false,
    minHeight: 200,
    minWidth: 200,
    scale: 1,
    scaleMobile: 1,
    color: 0x0000ff,
    backgroundColor: 0xf5f8fb,
    points: 6,
    maxDistance: 17,
    spacing: 23,
    showDots: false
  });

  window.addEventListener('pagehide', () => {
    if (effect && typeof effect.destroy === 'function') {
      effect.destroy();
    }
  });
})();
