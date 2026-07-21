import { planStartupMedia, type MediaBlock } from "@/lib/brandImageSizes";
import type { CaseStudyBlock, Startup } from "@/data/startups";
import {
  AutoMedia,
  CaseBody,
  CaseFooter,
  CaseHeader,
  CaseStudyShell,
  SectionFromBlock,
} from "./blocks";

/**
 * Build a readable founder-report sequence:
 * Overview → media → Problem+Opportunity → media → Solution → media →
 * Approach → media → Outcome → remaining media → Reflection
 */
function buildReportSequence(startup: Startup, blocks: MediaBlock[]) {
  const queue = [...blocks];
  const take = () => (queue.length > 0 ? queue.shift()! : null);

  type Piece =
    | { kind: "section"; block: CaseStudyBlock }
    | { kind: "sections"; blocks: CaseStudyBlock[] }
    | { kind: "media"; block: MediaBlock };

  const pieces: Piece[] = [];

  if (startup.overview) {
    pieces.push({ kind: "section", block: startup.overview });
    const m = take();
    if (m) pieces.push({ kind: "media", block: m });
  }

  const setup: CaseStudyBlock[] = [];
  if (startup.problem) setup.push(startup.problem);
  if (startup.opportunity) setup.push(startup.opportunity);
  if (setup.length > 0) {
    pieces.push({ kind: "sections", blocks: setup });
    const m = take();
    if (m) pieces.push({ kind: "media", block: m });
  }

  if (startup.solution) {
    pieces.push({ kind: "section", block: startup.solution });
    const m = take();
    if (m) pieces.push({ kind: "media", block: m });
  }

  if (startup.approach) {
    pieces.push({ kind: "section", block: startup.approach });
    const m = take();
    if (m) pieces.push({ kind: "media", block: m });
  }

  if (startup.outcome) {
    pieces.push({ kind: "section", block: startup.outcome });
  }

  while (queue.length > 0) {
    pieces.push({ kind: "media", block: queue.shift()! });
  }

  if (startup.reflection) {
    pieces.push({ kind: "section", block: startup.reflection });
  }

  return pieces;
}

/**
 * The auto-generated case study used for any startup without a bespoke layout
 * in components/startups/case-studies/. Interleaves the data-defined sections
 * with the planned media.
 */
export default function DefaultStartupCaseStudy({
  startup,
}: {
  startup: Startup;
}) {
  // The first screenshot is the page's main image (rendered in the header),
  // so the body sequences through the remaining screenshots.
  const bodyShots = (startup.screenshots ?? []).slice(1);
  const { hero, blocks } = planStartupMedia(bodyShots);
  const pieces = buildReportSequence(
    startup,
    hero ? [hero, ...blocks] : blocks,
  );

  return (
    <CaseStudyShell startup={startup}>
      <CaseHeader startup={startup} />

      <CaseBody>
        {pieces.map((piece, index) => {
          if (piece.kind === "section") {
            return (
              <SectionFromBlock
                key={`section-${piece.block.label}-${index}`}
                block={piece.block}
              />
            );
          }
          if (piece.kind === "sections") {
            return (
              <div key={`sections-${index}`} className="space-y-14 md:space-y-16">
                {piece.blocks.map((block) => (
                  <SectionFromBlock key={block.label} block={block} />
                ))}
              </div>
            );
          }
          return (
            <AutoMedia
              key={`media-${index}`}
              block={piece.block}
              altPrefix={`${startup.name} ${index + 1}`}
            />
          );
        })}
      </CaseBody>

      <CaseFooter startup={startup} />
    </CaseStudyShell>
  );
}
