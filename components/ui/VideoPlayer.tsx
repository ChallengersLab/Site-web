"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { Play, Pause, Square, Volume2, VolumeX, Maximize } from "lucide-react";

interface VideoPlayerProps {
  webmSrc: string;
  mp4Src: string;
  className?: string;
}

export function VideoPlayer({ webmSrc, mp4Src, className = "" }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrubberRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const [speed, setSpeed] = useState(1);
  const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync play state
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onTimeUpdate = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("timeupdate", onTimeUpdate);

    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, []);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }, []);

  const stop = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
    setProgress(0);
  }, []);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  }, []);

  const cycleSpeed = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    const speeds = [1, 1.25, 1.5, 2];
    const nextIndex = (speeds.indexOf(speed) + 1) % speeds.length;
    const nextSpeed = speeds[nextIndex];
    video.playbackRate = nextSpeed;
    setSpeed(nextSpeed);
  }, [speed]);

  const goFullscreen = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.requestFullscreen) {
      video.requestFullscreen();
    }
  }, []);

  const scrub = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    const bar = scrubberRef.current;
    if (!video || !bar) return;
    const rect = bar.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const pct = x / rect.width;
    video.currentTime = pct * video.duration;
    setProgress(pct * 100);
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (hideTimeout.current) clearTimeout(hideTimeout.current);
    setShowControls(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    hideTimeout.current = setTimeout(() => setShowControls(false), 1500);
  }, []);

  return (
    <div
      className={`group/player relative overflow-hidden rounded-2xl ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glass border */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none z-20"
        style={{
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      />
      <div className="absolute inset-0 rounded-2xl pointer-events-none z-20"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
          maskImage: "linear-gradient(black 0%, transparent 30%)",
          WebkitMaskImage: "linear-gradient(black 0%, transparent 30%)",
        }}
      />

      {/* Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        onClick={togglePlay}
        className="w-full h-full object-cover cursor-pointer"
      >
        <source src={webmSrc} type="video/webm" />
        <source src={mp4Src} type="video/mp4" />
      </video>

      {/* Play/Pause overlay on click — big center button when paused */}
      {!isPlaying && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 z-10 flex items-center justify-center bg-black/30 transition-opacity"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
            <Play className="h-7 w-7 text-white ml-1" fill="white" />
          </div>
        </button>
      )}

      {/* Controls bar — bottom, appears on hover */}
      <div
        className="absolute bottom-0 left-0 right-0 z-30 transition-all duration-300"
        style={{
          opacity: showControls ? 1 : 0,
          transform: showControls ? "translateY(0)" : "translateY(8px)",
        }}
      >
        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />

        <div className="relative px-4 pb-3 pt-8">
          {/* Scrubber */}
          <div
            ref={scrubberRef}
            onClick={scrub}
            className="group/scrubber mb-3 cursor-pointer py-1"
          >
            <div className="relative h-[2px] group-hover/scrubber:h-1 bg-white/20 rounded-full transition-all duration-200">
              {/* Progress fill */}
              <div
                className="absolute left-0 top-0 h-full rounded-full transition-[width] duration-100"
                style={{
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, #EEFF66, #4ECBA0)",
                }}
              />
              {/* Thumb — visible on hover */}
              <div
                className="absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-white opacity-0 group-hover/scrubber:opacity-100 transition-opacity duration-200 shadow-[0_0_8px_rgba(238,255,102,0.4)]"
                style={{ left: `calc(${progress}% - 6px)` }}
              />
            </div>
          </div>

          {/* Buttons row */}
          <div className="flex items-center gap-1">
            {/* Play/Pause */}
            <button
              onClick={togglePlay}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all"
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4 ml-0.5" fill="currentColor" />
              )}
            </button>

            {/* Stop */}
            <button
              onClick={stop}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all"
            >
              <Square className="h-3.5 w-3.5" fill="currentColor" />
            </button>

            {/* Mute */}
            <button
              onClick={toggleMute}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all"
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </button>

            {/* Speed */}
            <button
              onClick={cycleSpeed}
              className="flex h-8 items-center justify-center rounded-lg px-2 text-[11px] font-medium text-white/50 hover:text-white hover:bg-white/10 transition-all tabular-nums"
            >
              {speed}x
            </button>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Fullscreen */}
            <button
              onClick={goFullscreen}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all"
            >
              <Maximize className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
