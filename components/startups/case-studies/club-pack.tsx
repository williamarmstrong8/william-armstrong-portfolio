import type { Startup } from "@/data/startups";
import {
  CaseBody,
  CaseFooter,
  CaseHeader,
  CaseStudyShell,
  Divider,
  PullQuote,
  Section,
  SectionFromBlock,
  SoloImage,
  StatRow,
} from "../blocks";

/**
 * Bespoke layout for Club Pack.
 *
 * This file has full control over ordering. Reorder images and content simply
 * by moving JSX around, drop in any custom React component, and tune spacing or
 * styles per section. Anything you don't render here just won't appear.
 */
export default function ClubPackCaseStudy({ startup }: { startup: Startup }) {
  // screenshots[0] is the main image in the header; use the rest in the body.
  const [firstShot, secondShot] = (startup.screenshots ?? []).slice(1);

  return (
    <CaseStudyShell startup={startup}>
      <CaseHeader startup={startup} />

      <CaseBody>
        {/* Lead with the overview + the product screenshot */}
        {startup.overview && <SectionFromBlock block={startup.overview} />}
        {firstShot && (
          <SoloImage src={firstShot} alt="Club Pack dashboard" rounded priority />
        )}

        {/* A custom moment: pull quote to reframe the problem */}
        <PullQuote attribution="The insight behind Club Pack">
          Club founders don&apos;t want more software — they want one path from
          &ldquo;we should host this&rdquo; to &ldquo;everyone showed up and
          paid.&rdquo;
        </PullQuote>

        {startup.problem && <SectionFromBlock block={startup.problem} />}
        {startup.opportunity && <SectionFromBlock block={startup.opportunity} />}

        {startup.solution && <SectionFromBlock block={startup.solution} />}
        {secondShot && (
          <SoloImage src={secondShot} alt="Club Pack event flow" rounded />
        )}

        {startup.approach && <SectionFromBlock block={startup.approach} />}

        <Divider />

        {/* Custom stat band instead of the default outcome pillars */}
        <Section label="Outcome" title="Traction that unlocked the next build cycle.">
          <StatRow startup={startup} className="pt-2" />
        </Section>

        {startup.reflection && <SectionFromBlock block={startup.reflection} />}
      </CaseBody>

      <CaseFooter startup={startup} />
    </CaseStudyShell>
  );
}
