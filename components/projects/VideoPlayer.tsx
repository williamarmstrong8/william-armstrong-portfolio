"use client";

import { useEffect, useRef, useState } from "react";
import { Maximize, Minimize, Pause, Play, Volume2, VolumeX } from "lucide-react";

interface VideoPlayerProps {
  src: string;
  poster: string;
  title: string;
  width: number;
  height: number;
  capPortrait?: boolean;
}

function formatTime(seconds: number) {
  const wholeSeconds = Math.floor(seconds);
  return `${Math.floor(wholeSeconds / 60)}:${String(wholeSeconds % 60).padStart(2, "0")}`;
}

type FullscreenVideo = HTMLVideoElement & { webkitEnterFullscreen?: () => void };

export default function VideoPlayer({ src, poster, title, width, height, capPortrait = true }: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<FullscreenVideo>(null);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [muted, setMuted] = useState(false);
  const [buffering, setBuffering] = useState(false);
  const [error, setError] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [canFullscreen, setCanFullscreen] = useState(false);
  const [controlMessage, setControlMessage] = useState("");

  useEffect(() => {
    // Cached/preloaded metadata may arrive before React attaches media handlers.
    const video = videoRef.current;
    if (video) {
      setDuration(Number.isFinite(video.duration) ? video.duration : 0);
      setCurrentTime(video.currentTime);
      setMuted(video.muted || video.volume === 0);
      setError(Boolean(video.error));
    }
    setCanFullscreen(Boolean(document.fullscreenEnabled || videoRef.current?.webkitEnterFullscreen));
    const onFullscreenChange = () => setFullscreen(document.fullscreenElement === containerRef.current);
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  async function togglePlayback() {
    const video = videoRef.current;
    if (!video || error) return;
    if (!video.paused) {
      video.pause();
      return;
    }
    if (video.ended) video.currentTime = 0;
    try {
      await video.play();
    } catch (cause) {
      // Pausing or navigating while play() is pending intentionally aborts it.
      if (cause instanceof DOMException && cause.name === "AbortError") return;
      setError(true);
      setBuffering(false);
    }
  }

  async function toggleFullscreen() {
    setControlMessage("");
    try {
      if (document.fullscreenElement === containerRef.current) {
        await document.exitFullscreen();
      } else if (document.fullscreenEnabled) {
        await containerRef.current?.requestFullscreen();
      } else {
        videoRef.current?.webkitEnterFullscreen?.();
      }
    } catch {
      setControlMessage("Fullscreen is unavailable in this browser.");
    }
  }

  const portrait = capPortrait && height > width;
  const progress = duration ? (currentTime / duration) * 100 : 0;
  const buttonClassName = "inline-flex h-11 w-11 items-center justify-center text-foreground hover:bg-muted transition-colors disabled:opacity-40 disabled:cursor-not-allowed";

  return (
    <div
      ref={containerRef}
      role="group"
      aria-label={`${title} video player`}
      className={`video-player overflow-hidden border border-border bg-background ${portrait ? "mx-auto w-full max-w-sm md:max-w-md" : "w-full"}`}
    >
      <div className="video-frame relative bg-muted" style={{ aspectRatio: `${width} / ${height}` }}>
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          width={width}
          height={height}
          aria-label={title}
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-contain"
          onLoadedMetadata={(event) => {
            const length = event.currentTarget.duration;
            setDuration(Number.isFinite(length) ? length : 0);
          }}
          onDurationChange={(event) => {
            const length = event.currentTarget.duration;
            setDuration(Number.isFinite(length) ? length : 0);
          }}
          onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
          onPlay={() => { setPlaying(true); setStarted(true); }}
          onPlaying={() => setBuffering(false)}
          onPause={() => { setPlaying(false); setBuffering(false); }}
          onEnded={() => setPlaying(false)}
          onWaiting={() => setBuffering(true)}
          onCanPlay={() => setBuffering(false)}
          onVolumeChange={(event) => setMuted(event.currentTarget.muted || event.currentTarget.volume === 0)}
          onError={() => { setError(true); setBuffering(false); setPlaying(false); }}
        />
        {!started && !error && (
          <button
            type="button"
            onClick={togglePlayback}
            aria-label="Play video"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex h-14 w-14 items-center justify-center border border-border bg-background/95 text-foreground hover:bg-background transition-colors"
          >
            <Play className="h-5 w-5" aria-hidden="true" />
          </button>
        )}
        <div role="status" aria-live="polite" className="pointer-events-none absolute inset-0 flex items-center justify-center">
          {error ? (
            <div className="pointer-events-auto max-w-xs border border-border bg-background/95 p-5 text-center text-sm text-foreground">
              <p>Video unavailable</p>
              <p className="mt-1 text-muted-foreground">The video could not be loaded.</p>
              <a href={src} className="mt-3 inline-block text-nav-active underline underline-offset-4">Open video file</a>
            </div>
          ) : buffering ? (
            <span className="border border-border bg-background/95 px-3 py-2 text-sm text-foreground">Loading video…</span>
          ) : null}
        </div>
      </div>

      <div className="grid grid-cols-[44px_1fr_44px_44px] items-center gap-x-1 border-t border-border bg-background px-2 py-1 sm:grid-cols-[44px_1fr_auto_44px_44px]">
        <button type="button" onClick={togglePlayback} disabled={error} aria-label={playing ? "Pause video" : "Play video"} className={`${buttonClassName} col-start-1 row-start-2 sm:row-start-1`}>
          {playing ? <Pause className="h-4 w-4" aria-hidden="true" /> : <Play className="h-4 w-4" aria-hidden="true" />}
        </button>
        <input
          type="range"
          min={0}
          max={duration || 0}
          step={0.1}
          value={currentTime}
          disabled={!duration || error}
          aria-label="Seek video"
          aria-valuetext={`${formatTime(currentTime)} of ${duration ? formatTime(duration) : "unknown duration"}`}
          onChange={(event) => {
            const time = Number(event.target.value);
            if (videoRef.current) videoRef.current.currentTime = time;
            setCurrentTime(time);
          }}
          className="video-progress col-span-4 row-start-1 h-11 w-full min-w-0 cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 sm:col-span-1 sm:col-start-2"
          style={{ backgroundImage: `linear-gradient(to right, hsl(var(--foreground)) ${progress}%, hsl(var(--border)) ${progress}%)` }}
        />
        <span aria-hidden="true" className="col-start-2 row-start-2 whitespace-nowrap px-2 text-xs tabular-nums text-muted-foreground sm:col-start-3 sm:row-start-1">
          {formatTime(currentTime)} / {duration ? formatTime(duration) : "—"}
        </span>
        <button type="button" disabled={error} aria-label={muted ? "Unmute video" : "Mute video"} onClick={() => {
          const video = videoRef.current;
          if (video) {
            video.muted = !muted;
            if (muted && video.volume === 0) video.volume = 1;
          }
        }} className={`${buttonClassName} col-start-3 row-start-2 sm:col-start-4 sm:row-start-1`}>
          {muted ? <VolumeX className="h-4 w-4" aria-hidden="true" /> : <Volume2 className="h-4 w-4" aria-hidden="true" />}
        </button>
        {canFullscreen && (
          <button type="button" onClick={toggleFullscreen} aria-label={fullscreen ? "Exit fullscreen" : "Enter fullscreen"} className={`${buttonClassName} col-start-4 row-start-2 sm:col-start-5 sm:row-start-1`}>
            {fullscreen ? <Minimize className="h-4 w-4" aria-hidden="true" /> : <Maximize className="h-4 w-4" aria-hidden="true" />}
          </button>
        )}
      </div>
      {controlMessage && <p role="status" className="px-4 pb-3 text-sm text-muted-foreground">{controlMessage}</p>}
      <noscript><p className="p-4 text-sm"><a href={src} className="underline">Open video file</a> to play without JavaScript.</p></noscript>
    </div>
  );
}
