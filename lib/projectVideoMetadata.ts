/** Keep video geometry and posters available before the browser downloads metadata. */
export const PROJECT_VIDEO_METADATA: Record<string, { width: number; height: number; poster: string }> = {
  "/projects/adviser_gpt/Adviser_GPT_Answer_DEMO.mp4": {
    width: 1920,
    height: 1080,
    poster: "/projects/adviser_gpt/linkedin_cover_photo.jpg",
  },
  "/projects/action-button-automation/action-button-automation.mp4": {
    width: 1920,
    height: 1080,
    poster: "/projects/action-button-automation/automation-cover.png",
  },
  "/projects/conveyor/horizontal-conveyor.mp4": {
    width: 1920,
    height: 1080,
    poster: "/projects/conveyor/horizontal-conveyor-poster.jpg",
  },
  "/projects/conveyor/vertical-conveyor.mp4": {
    width: 1080,
    height: 1920,
    poster: "/projects/conveyor/vertical-conveyor-poster.jpg",
  },
};
