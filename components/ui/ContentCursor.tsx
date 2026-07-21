"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const DOT_SIZE = 12;
const PILL_HEIGHT = 34;
const PILL_PADDING_X = 14;

/**
 * Content-aware custom cursor.
 * Elements with `data-cursor-quip="Two words"` expand the square cursor into a
 * label pill. The box animates to a *measured* pixel width (not `auto`) so the
 * expansion is smooth, and width/height share one spring so it never collapses
 * into a vertical sliver.
 */
export default function ContentCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [quip, setQuip] = useState<string | null>(null);
  // Keep the last label mounted (and measured) while the pill collapses.
  const [labelText, setLabelText] = useState<string>("");
  const [labelWidth, setLabelWidth] = useState(0);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const x = useSpring(mouseX, { stiffness: 500, damping: 40, mass: 0.4 });
  const y = useSpring(mouseY, { stiffness: 500, damping: 40, mass: 0.4 });

  const quipRef = useRef<string | null>(null);
  const measureRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduceMotion) return;

    setEnabled(true);

    const onMove = (e: PointerEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setVisible(true);
    };

    const onLeaveWindow = () => setVisible(false);

    const onOver = (e: PointerEvent) => {
      const target = (e.target as HTMLElement | null)?.closest?.("[data-cursor-quip]");
      const next = target?.getAttribute("data-cursor-quip")?.trim() || null;
      if (next === quipRef.current) return;
      quipRef.current = next;
      setQuip(next);
      if (next) setLabelText(next);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeaveWindow);

    return () => {
      document.body.classList.remove("content-cursor-active");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeaveWindow);
    };
  }, [mouseX, mouseY]);

  // Measure the label so we can animate to a real pixel width.
  useLayoutEffect(() => {
    if (measureRef.current) {
      setLabelWidth(measureRef.current.offsetWidth);
    }
  }, [labelText]);

  // The blue square replaces the native cursor everywhere, so hide the native
  // cursor whenever the custom cursor is enabled.
  useEffect(() => {
    if (!enabled) return;
    document.body.classList.add("content-cursor-active");
    return () => document.body.classList.remove("content-cursor-active");
  }, [enabled]);

  if (!enabled) return null;

  const active = Boolean(quip);
  const pillWidth = labelWidth + PILL_PADDING_X * 2;

  return (
    <>
      {/* Offscreen measurer — matches the pill's typography exactly. */}
      <span
        ref={measureRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 -z-10 whitespace-nowrap font-serif text-[13px] font-medium tracking-tight opacity-0"
      >
        {labelText}
      </span>

      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{ x, y }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.15 }}
      >
        <motion.div
          className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center overflow-hidden bg-nav-active text-nav-active-foreground"
          animate={{
            width: active ? pillWidth : DOT_SIZE,
            height: active ? PILL_HEIGHT : DOT_SIZE,
          }}
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        >
          <motion.span
            className="whitespace-nowrap font-serif text-[13px] font-medium tracking-tight"
            animate={{ opacity: active ? 1 : 0 }}
            transition={{ duration: 0.12, delay: active ? 0.08 : 0 }}
          >
            {labelText}
          </motion.span>
        </motion.div>
      </motion.div>
    </>
  );
}
