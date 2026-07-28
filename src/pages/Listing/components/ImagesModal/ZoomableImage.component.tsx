import React, { useCallback, useEffect, useRef, useState } from 'react';

const MIN_SCALE = 1;
const MAX_SCALE = 4;
const DOUBLE_TAP_SCALE = 2.5;
const DOUBLE_TAP_MS = 300;
const SWIPE_THRESHOLD_PX = 60;

interface IZoomableImage {
  src: string;
  alt: string;
  /** Called on a horizontal swipe while the image is not zoomed in. */
  onSwipe?: (direction: 1 | -1) => void;
  /** Called on a single tap that is neither a pan, a pinch nor a double tap. */
  onTap?: () => void;
}

type Transform = { scale: number; x: number; y: number };

const IDENTITY: Transform = { scale: 1, x: 0, y: 0 };

const distanceBetween = (a: Touch, b: Touch) =>
  Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);

/**
 * A single photo that can be pinch-zoomed (touch), double-tapped to zoom and
 * dragged around once zoomed in. While at 1x, horizontal drags become swipes so
 * the parent can page through the gallery.
 */
const ZoomableImage = ({ src, alt, onSwipe, onTap }: IZoomableImage) => {
  const stageRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [transform, setTransform] = useState<Transform>(IDENTITY);
  const [isInteracting, setIsInteracting] = useState(false);
  // Touches also synthesise mouse events; without this the ghost dblclick would
  // immediately undo the zoom the touch handler just applied.
  const lastTouchEndAt = useRef(0);

  // Kept in a ref so the native listeners always read the live value without
  // having to be re-attached on every frame.
  const transformRef = useRef<Transform>(IDENTITY);
  transformRef.current = transform;

  const applyTransform = useCallback((next: Transform) => {
    transformRef.current = next;
    setTransform(next);
  }, []);

  // Reset zoom whenever a different photo is shown.
  useEffect(() => {
    applyTransform(IDENTITY);
  }, [src, applyTransform]);

  /** Keeps the image from being dragged past its own edges. */
  const clamp = useCallback((next: Transform): Transform => {
    const stage = stageRef.current;
    const image = imageRef.current;
    if (!stage || !image) return next;

    const scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, next.scale));
    // offsetWidth/Height are the untransformed layout size, i.e. the size of the
    // photo as fitted into the stage.
    const maxX = Math.max(0, (image.offsetWidth * scale - stage.clientWidth) / 2);
    const maxY = Math.max(0, (image.offsetHeight * scale - stage.clientHeight) / 2);

    return {
      scale,
      x: Math.min(maxX, Math.max(-maxX, next.x)),
      y: Math.min(maxY, Math.max(-maxY, next.y)),
    };
  }, []);

  /** Scales around a point (given in stage coordinates, origin at stage centre). */
  const zoomAround = useCallback(
    (targetScale: number, pointX: number, pointY: number) => {
      const current = transformRef.current;
      const scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, targetScale));
      if (scale === MIN_SCALE) {
        applyTransform(IDENTITY);
        return;
      }
      const ratio = scale / current.scale;
      applyTransform(
        clamp({
          scale,
          x: pointX - ratio * (pointX - current.x),
          y: pointY - ratio * (pointY - current.y),
        })
      );
    },
    [applyTransform, clamp]
  );

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    /** Converts a client point into stage coordinates with the origin at its centre. */
    const toStagePoint = (clientX: number, clientY: number) => {
      const rect = stage.getBoundingClientRect();
      return {
        x: clientX - (rect.left + rect.width / 2),
        y: clientY - (rect.top + rect.height / 2),
      };
    };

    let pinchStartDistance = 0;
    let pinchStartScale = 1;
    let panStart: { x: number; y: number } | null = null;
    let panOrigin: Transform = IDENTITY;
    let moved = false;
    let lastTapAt = 0;
    let gestureUsedTwoFingers = false;
    let singleTapTimer: ReturnType<typeof setTimeout> | null = null;

    const cancelPendingTap = () => {
      if (singleTapTimer !== null) {
        clearTimeout(singleTapTimer);
        singleTapTimer = null;
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      setIsInteracting(true);
      cancelPendingTap();
      if (e.touches.length === 2) {
        gestureUsedTwoFingers = true;
        moved = true;
        pinchStartDistance = distanceBetween(e.touches[0], e.touches[1]);
        pinchStartScale = transformRef.current.scale;
        panStart = null;
      } else if (e.touches.length === 1) {
        gestureUsedTwoFingers = false;
        moved = false;
        panStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        panOrigin = transformRef.current;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && pinchStartDistance > 0) {
        e.preventDefault();
        const midpoint = toStagePoint(
          (e.touches[0].clientX + e.touches[1].clientX) / 2,
          (e.touches[0].clientY + e.touches[1].clientY) / 2
        );
        const nextScale =
          (distanceBetween(e.touches[0], e.touches[1]) / pinchStartDistance) * pinchStartScale;
        zoomAround(nextScale, midpoint.x, midpoint.y);
        return;
      }

      if (e.touches.length !== 1 || !panStart) return;

      const dx = e.touches[0].clientX - panStart.x;
      const dy = e.touches[0].clientY - panStart.y;
      if (Math.abs(dx) > 8 || Math.abs(dy) > 8) moved = true;

      // At 1x there is nothing to pan, so the drag is a swipe instead — let the
      // parent page through on touchend and leave the image where it is.
      if (transformRef.current.scale <= MIN_SCALE) return;

      e.preventDefault();
      applyTransform(clamp({ scale: panOrigin.scale, x: panOrigin.x + dx, y: panOrigin.y + dy }));
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (e.touches.length > 0) return;
      setIsInteracting(false);
      lastTouchEndAt.current = performance.now();

      const wasPinch = gestureUsedTwoFingers;
      pinchStartDistance = 0;
      gestureUsedTwoFingers = false;

      const start = panStart;
      panStart = null;

      if (wasPinch) return;

      const endTouch = e.changedTouches[0];
      if (!endTouch) return;

      if (start && transformRef.current.scale <= MIN_SCALE) {
        const dx = endTouch.clientX - start.x;
        const dy = endTouch.clientY - start.y;
        if (Math.abs(dx) > SWIPE_THRESHOLD_PX && Math.abs(dx) > Math.abs(dy)) {
          onSwipe?.(dx < 0 ? 1 : -1);
          return;
        }
      }

      if (moved) return;

      const now = performance.now();
      if (now - lastTapAt < DOUBLE_TAP_MS) {
        lastTapAt = 0;
        const point = toStagePoint(endTouch.clientX, endTouch.clientY);
        const zoomedIn = transformRef.current.scale > MIN_SCALE;
        zoomAround(zoomedIn ? MIN_SCALE : DOUBLE_TAP_SCALE, point.x, point.y);
        return;
      }

      lastTapAt = now;
      // A tap on the letterboxing beside the photo closes the viewer, but only
      // once we know no second tap is coming.
      if (e.target === stage) {
        singleTapTimer = setTimeout(() => {
          singleTapTimer = null;
          onTap?.();
        }, DOUBLE_TAP_MS);
      }
    };

    // Desktop: ctrl/⌘ + wheel and trackpad pinch both surface as a ctrlKey wheel.
    const handleWheel = (e: WheelEvent) => {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      const point = toStagePoint(e.clientX, e.clientY);
      zoomAround(transformRef.current.scale * (e.deltaY < 0 ? 1.15 : 1 / 1.15), point.x, point.y);
    };

    stage.addEventListener('touchstart', handleTouchStart, { passive: false });
    stage.addEventListener('touchmove', handleTouchMove, { passive: false });
    stage.addEventListener('touchend', handleTouchEnd);
    stage.addEventListener('touchcancel', handleTouchEnd);
    stage.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      cancelPendingTap();
      stage.removeEventListener('touchstart', handleTouchStart);
      stage.removeEventListener('touchmove', handleTouchMove);
      stage.removeEventListener('touchend', handleTouchEnd);
      stage.removeEventListener('touchcancel', handleTouchEnd);
      stage.removeEventListener('wheel', handleWheel);
    };
  }, [applyTransform, clamp, onSwipe, onTap, zoomAround]);

  /** True for the mouse events Chrome synthesises right after a touch gesture. */
  const isGhostMouseEvent = () => performance.now() - lastTouchEndAt.current < 700;

  const handleDoubleClick = (e: React.MouseEvent) => {
    const stage = stageRef.current;
    if (!stage || isGhostMouseEvent()) return;
    const rect = stage.getBoundingClientRect();
    const point = {
      x: e.clientX - (rect.left + rect.width / 2),
      y: e.clientY - (rect.top + rect.height / 2),
    };
    const zoomedIn = transformRef.current.scale > MIN_SCALE;
    zoomAround(zoomedIn ? MIN_SCALE : DOUBLE_TAP_SCALE, point.x, point.y);
  };

  const isZoomed = transform.scale > MIN_SCALE;

  return (
    <div
      ref={stageRef}
      className={`zoomableImage${isZoomed ? ' zoomableImage--zoomed' : ''}`}
      onDoubleClick={handleDoubleClick}
      onClick={(e) => {
        if (e.detail > 1 || isGhostMouseEvent()) return; // double click, or a tap already handled
        if (e.target === e.currentTarget) onTap?.();
      }}
      data-testid="zoomable-image"
    >
      <img
        ref={imageRef}
        className="zoomableImage__img"
        src={src}
        alt={alt}
        draggable={false}
        style={{
          transform: `translate3d(${transform.x}px, ${transform.y}px, 0) scale(${transform.scale})`,
          transition: isInteracting ? 'none' : 'transform 0.2s ease-out',
        }}
      />
    </div>
  );
};

export default ZoomableImage;
