import type { ComponentType } from "react";
import type { Startup } from "@/data/startups";
import ClubPackCaseStudy from "./club-pack";
import ModBrewCaseStudy from "./mod-brew";

export type CaseStudyComponent = ComponentType<{ startup: Startup }>;

/**
 * Per-slug custom case-study layouts.
 *
 * To make a startup feel unique, create a new file in this folder (compose the
 * primitives from ../blocks, add any custom React components you like), then map
 * its slug here. Any slug not listed falls back to the auto-generated layout in
 * DefaultStartupCaseStudy.
 */
const CUSTOM_CASE_STUDIES: Record<string, CaseStudyComponent> = {
  "club-pack": ClubPackCaseStudy,
  "mod-brew": ModBrewCaseStudy,
};

export function getCustomCaseStudy(slug: string): CaseStudyComponent | undefined {
  return CUSTOM_CASE_STUDIES[slug];
}
