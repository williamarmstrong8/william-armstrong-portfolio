import type { Startup } from "@/data/startups";
import { planStartupMedia } from "@/lib/brandImageSizes";
import {
  AutoMedia,
  CaseBody,
  CaseFooter,
  CaseHeader,
  CaseStudyShell,
  ImagePair,
  SectionFromBlock,
  SoloImage,
} from "../blocks";

const OVERVIEW_IMAGES = [
  "/brands/modbrew/hand.jpeg",
  "/brands/modbrew/shop.jpeg",
] as const;

const LINE2 = "/brands/modbrew/line2.jpeg";
const SHOP2 = "/brands/modbrew/shop2.jpeg";
const LINE1 = "/brands/modbrew/line1.jpeg";
const WINDOW = "/brands/modbrew/window.jpeg";
const GROUP = "/brands/modbrew/group.jpeg";

/** Screenshots used elsewhere on the page — excluded from the body gallery. */
const RESERVED = new Set<string>([
  "/brands/modbrew/wide.jpeg",
  ...OVERVIEW_IMAGES,
  LINE2,
  SHOP2,
  LINE1,
  WINDOW,
  GROUP,
]);

/**
 * Bespoke layout for Mod Brew.
 * Overview is followed by the hand + shop images; remaining shots fill the body.
 */
export default function ModBrewCaseStudy({ startup }: { startup: Startup }) {
  const bodyShots = (startup.screenshots ?? []).filter((src) => !RESERVED.has(src));
  const { hero, blocks } = planStartupMedia(bodyShots);
  const galleryBlocks = hero ? [hero, ...blocks] : blocks;

  return (
    <CaseStudyShell startup={startup}>
      <CaseHeader startup={startup} />

      <CaseBody>
        {startup.overview && <SectionFromBlock block={startup.overview} />}
        <ImagePair
          images={[OVERVIEW_IMAGES[0], OVERVIEW_IMAGES[1]]}
          altPrefix="Mod Brew"
          priority
        />

        {startup.problem && <SectionFromBlock block={startup.problem} />}
        {startup.opportunity && <SectionFromBlock block={startup.opportunity} />}
        <ImagePair images={[WINDOW, GROUP]} altPrefix="Mod Brew opportunity" />

        {startup.solution && <SectionFromBlock block={startup.solution} />}

        {galleryBlocks.length > 0 && (
          <div className="space-y-3">
            {galleryBlocks.map((block, index) => (
              <AutoMedia
                key={`modbrew-media-${index}`}
                block={block}
                altPrefix={`${startup.name} ${index + 1}`}
              />
            ))}
          </div>
        )}

        {startup.approach && <SectionFromBlock block={startup.approach} />}
        <ImagePair images={[SHOP2, LINE1]} altPrefix="Mod Brew how it ran" />

        {startup.outcome && <SectionFromBlock block={startup.outcome} />}
        <SoloImage src={LINE2} alt="Mod Brew line" />

        {startup.reflection && <SectionFromBlock block={startup.reflection} />}
      </CaseBody>

      <CaseFooter startup={startup} />
    </CaseStudyShell>
  );
}
