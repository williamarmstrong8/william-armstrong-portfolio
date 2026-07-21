import { useState, useEffect, RefObject, useCallback } from "react";

export interface LineCoords {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

/**
 * Custom hook to calculate the SVG line coordinates between the nodes and the center image.
 * It uses bounding client rects relative to a shared container.
 */
export function useElementLines(
  leftRef: RefObject<HTMLElement | null>,
  rightRef: RefObject<HTMLElement | null>,
  centerRef: RefObject<HTMLElement | null>,
  containerRef: RefObject<HTMLElement | null>
) {
  const [coords, setCoords] = useState<{
    leftLine: LineCoords;
    rightLine: LineCoords;
    isValid: boolean;
  }>({
    leftLine: { x1: 0, y1: 0, x2: 0, y2: 0 },
    rightLine: { x1: 0, y1: 0, x2: 0, y2: 0 },
    isValid: false,
  });

  const updateCoords = useCallback(() => {
    if (
      !leftRef.current ||
      !rightRef.current ||
      !centerRef.current ||
      !containerRef.current
    ) {
      return;
    }

    const containerRect = containerRef.current.getBoundingClientRect();
    const leftRect = leftRef.current.getBoundingClientRect();
    const rightRect = rightRef.current.getBoundingClientRect();
    const centerRect = centerRef.current.getBoundingClientRect();

    // Check if elements are visible/have size
    if (leftRect.width === 0 || rightRect.width === 0 || centerRect.width === 0) {
      return;
    }

    const getRelative = (rect: DOMRect) => ({
      left: rect.left - containerRect.left,
      right: rect.right - containerRect.left,
      top: rect.top - containerRect.top,
      bottom: rect.bottom - containerRect.top,
      width: rect.width,
      height: rect.height,
      centerX: rect.left - containerRect.left + rect.width / 2,
      centerY: rect.top - containerRect.top + rect.height / 2,
    });

    const left = getRelative(leftRect);
    const right = getRelative(rightRect);
    const center = getRelative(centerRect);

    // Connect each node's nearest edge to the image. The nodes sit side-by-side
    // on wide screens and stack vertically on narrow ones, so pick the geometry
    // (horizontal vs vertical) based on how the node is offset from the image.
    const computeLine = (
      node: ReturnType<typeof getRelative>
    ): LineCoords => {
      const horizontalGap = Math.max(
        center.left - node.right,
        node.left - center.right
      );
      const verticalGap = Math.max(
        center.top - node.bottom,
        node.top - center.bottom
      );

      if (horizontalGap >= verticalGap) {
        return node.centerX < center.centerX
          ? { x1: node.right, y1: node.centerY, x2: center.left, y2: center.centerY }
          : { x1: node.left, y1: node.centerY, x2: center.right, y2: center.centerY };
      }

      return node.centerY < center.centerY
        ? { x1: node.centerX, y1: node.bottom, x2: center.centerX, y2: center.top }
        : { x1: node.centerX, y1: node.top, x2: center.centerX, y2: center.bottom };
    };

    setCoords({
      leftLine: computeLine(left),
      rightLine: computeLine(right),
      isValid: true,
    });
  }, [leftRef, rightRef, centerRef, containerRef]);

  useEffect(() => {
    // Initial calculation
    const timer = setTimeout(() => {
      updateCoords();
    }, 100); // Delay initial calculation to prevent flickering during mount

    // Resize listeners with debouncing
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        requestAnimationFrame(updateCoords);
      }, 100); // Debounce resize events
    };

    window.addEventListener("resize", handleResize);

    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        requestAnimationFrame(updateCoords);
      }, 100); // Debounce resize observer
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Capture the current refs to cleanup
    const currentContainer = containerRef.current;

    return () => {
      clearTimeout(timer);
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
      if (currentContainer) {
        resizeObserver.unobserve(currentContainer);
      }
      resizeObserver.disconnect();
    };
  }, [updateCoords, containerRef]);

  return coords;
}
