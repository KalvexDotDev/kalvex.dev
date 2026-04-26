(function () {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mobile = window.matchMedia('(max-width: 680px)').matches;

  document.addEventListener('DOMContentLoaded', () => {
    const layers = document.querySelectorAll('[data-hero-canvas], [data-quality-canvas]');
    if (!layers.length) return;

    layers.forEach((layer, layerIndex) => animateLayer(layer, layerIndex));
  });

  function animateLayer(layer, layerIndex) {
    const visualLayer = layer.hasAttribute('data-quality-canvas');

    if (mobile && !visualLayer) return;

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) return;

    layer.appendChild(canvas);

    const count = mobile ? 18 : visualLayer ? 34 : 44;
    const reach = visualLayer ? 132 : 168;
    const lineAlpha = mobile ? 0.22 : visualLayer ? 0.3 : 0.12;
    const dotAlpha = mobile ? 0.25 : visualLayer ? 0.34 : 0.16;
    const animate = !reduceMotion && (!mobile || visualLayer);
    const points = Array.from({ length: count }, (_, index) => ({
      x: ((index * 97) + layerIndex * 19) % 100,
      y: ((index * 53) + layerIndex * 31) % 100,
      vx: ((index % 5) - 2) * (visualLayer ? 0.014 : 0.012),
      vy: (((index + 2) % 5) - 2) * (visualLayer ? 0.012 : 0.01)
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
        if (animate) {
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

          if (distance < reach) {
            const alpha = lineAlpha * (1 - distance / reach);
            context.strokeStyle = visualLayer
              ? `rgba(137, 219, 255, ${alpha})`
              : `rgba(0, 51, 102, ${alpha})`;
            context.beginPath();
            context.moveTo(a.x, a.y);
            context.lineTo(b.x, b.y);
            context.stroke();
          }
        }
      }

      for (const point of points) {
        const pixel = toPixels(point, width, height);
        context.fillStyle = visualLayer
          ? `rgba(87, 224, 180, ${dotAlpha})`
          : `rgba(0, 0, 255, ${dotAlpha})`;
        context.beginPath();
        context.arc(pixel.x, pixel.y, visualLayer ? 1.7 : 1.4, 0, Math.PI * 2);
        context.fill();
      }

      if (animate) window.requestAnimationFrame(draw);
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
  }
})();
