import type { Startup } from "@/data/startups";
import DefaultStartupCaseStudy from "./DefaultStartupCaseStudy";
import { getCustomCaseStudy } from "./case-studies";

interface StartupCaseStudyProps {
  startup: Startup;
}

/**
 * Renders a startup's bespoke case-study layout if one is registered in
 * components/startups/case-studies/, otherwise falls back to the auto-generated
 * report layout.
 */
export default function StartupCaseStudy({ startup }: StartupCaseStudyProps) {
  const Custom = getCustomCaseStudy(startup.slug);
  if (Custom) {
    return <Custom startup={startup} />;
  }
  return <DefaultStartupCaseStudy startup={startup} />;
}
