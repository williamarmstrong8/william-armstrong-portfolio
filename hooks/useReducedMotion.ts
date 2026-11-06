"use client";

import { useSyncExternalStore } from "react";

let mediaQuery: MediaQueryList;
const getMediaQuery = () =>
  (mediaQuery ??= window.matchMedia("(prefers-reduced-motion: reduce)"));

function subscribe(onChange: () => void) {
  const query = getMediaQuery();
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

const getSnapshot = () => getMediaQuery().matches;
// Render readable, static content on the server and during hydration. Normal
// motion is progressive enhancement once the browser preference is known.
const getServerSnapshot = () => true;

export function useReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
