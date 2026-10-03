const canUseCursorTrail =
  window.matchMedia('(pointer: fine)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (canUseCursorTrail) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const points = [];
  const maxPoints = 28;
  const trailDuration = 3200; // Blijft ruim 3 seconden zichtbaar

  let drawingFrame = null;
  let previousPoint = null;
  let isInsideTargetArea = false;
  let devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);

  canvas.id = 'global-cursor-trail-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.appendChild(canvas);

  const resizeCanvas = () => {
    devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(window.innerWidth * devicePixelRatio);
    canvas.height = Math.round(window.innerHeight * devicePixelRatio);
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  };

  const drawTrail = () => {
    drawingFrame = null;
    const now = performance.now();

    context.clearRect(0, 0, window.innerWidth, window.innerHeight);

    while (points.length && now - points[0].time > trailDuration) {
      points.shift();
    }

    if (points.length >= 2) {
      context.lineCap = 'round';
      context.lineJoin = 'round';

      for (let index = 1; index < points.length; index += 1) {
        const previous = points[index - 1];
        const current = points[index];
        const age = now - current.time;
        const opacity = Math.max(0, 0.68 * (1 - age / trailDuration));

        context.beginPath();
        context.moveTo(previous.x, previous.y);
        context.lineTo(current.x, current.y);
        context.strokeStyle = `rgba(245, 245, 245, ${opacity})`;
        context.lineWidth = 1.75;
        context.stroke();
      }
    }

    if (points.length > 0 || isInsideTargetArea) {
      drawingFrame = window.requestAnimationFrame(drawTrail);
    }
  };

  const checkPointerPosition = (event) => {
    const targetElement = document.elementFromPoint(event.clientX, event.clientY);
    const trailContainer = targetElement ? targetElement.closest('[data-cursor-trail]') : null;

    if (trailContainer) {
      isInsideTargetArea = true;
      const point = {
        x: event.clientX,
        y: event.clientY,
        time: performance.now(),
      };

      if (previousPoint) {
        const distance = Math.hypot(point.x - previousPoint.x, point.y - previousPoint.y);
        if (distance < 6) return;
      }

      previousPoint = point;
      points.push(point);

      if (points.length > maxPoints) {
        points.shift();
      }

      if (!drawingFrame) {
        drawingFrame = window.requestAnimationFrame(drawTrail);
      }
    } else {
      isInsideTargetArea = false;
      previousPoint = null;
      if (!drawingFrame && points.length > 0) {
        drawingFrame = window.requestAnimationFrame(drawTrail);
      }
    }
  };

  window.addEventListener('pointermove', checkPointerPosition, { passive: true });
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
}