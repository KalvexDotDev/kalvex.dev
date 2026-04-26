(function () {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mobile = window.matchMedia('(max-width: 680px)').matches;
  if (mobile) return;

  document.addEventListener('DOMContentLoaded', () => {
    const layer = document.querySelector('[data-hero-canvas]');
    if (!layer) return;

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) return;

    layer.appendChild(canvas);

    const points = Array.from({ length: 44 }, (_, index) => ({
      x: (index * 97) % 100,
      y: (index * 53) % 100,
      vx: ((index % 5) - 2) * 0.012,
      vy: (((index + 2) % 5) - 2) * 0.01
    }));

    function resize() {
      const rect = layer.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(rect.width * ratio));
      canvas.height = Math.max(1, Math.floor(rect.height * ratio));
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    function draw() {
      const width = layer.clientWidth;
      const height = layer.clientHeight;
      context.clearRect(0, 0, width, height);

      for (const point of points) {
        if (!reduceMotion) {
          point.x = wrap(point.x + point.vx);
          point.y = wrap(point.y + point.vy);
        }
      }

      context.lineWidth = 1;

      for (let i = 0; i < points.length; i += 1) {
        for (let j = i + 1; j < points.length; j += 1) {
          const a = toPixels(points[i], width, height);
          const b = toPixels(points[j], width, height);
          const distance = Math.hypot(a.x - b.x, a.y - b.y);

          if (distance < 168) {
            context.strokeStyle = `rgba(0, 51, 102, ${0.12 * (1 - distance / 168)})`;
            context.beginPath();
            context.moveTo(a.x, a.y);
            context.lineTo(b.x, b.y);
            context.stroke();
          }
        }
      }

      for (const point of points) {
        const pixel = toPixels(point, width, height);
        context.fillStyle = 'rgba(0, 0, 255, 0.16)';
        context.beginPath();
        context.arc(pixel.x, pixel.y, 1.4, 0, Math.PI * 2);
        context.fill();
      }

      if (!reduceMotion) window.requestAnimationFrame(draw);
    }

    function wrap(value) {
      if (value > 102) return -2;
      if (value < -2) return 102;
      return value;
    }

    function toPixels(point, width, height) {
      return {
        x: (point.x / 100) * width,
        y: (point.y / 100) * height
      };
    }

    window.addEventListener('resize', resize);
    resize();
    draw();
  });
})();
