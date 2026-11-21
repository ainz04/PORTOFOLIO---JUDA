"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Pause, Play, SkipBack, SkipForward, X } from "lucide-react";
import type { TrackItem } from "@/data/portfolio";

interface LyricLine {
  time: number;
  text: string;
}

interface YTPlayerInstance {
  playVideo: () => void;
  pauseVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  loadVideoById: (videoId: string) => void;
  cueVideoById: (videoId: string) => void;
  destroy: () => void;
}

declare global {
  interface Window {
    YT?: {
      Player: new (
        elementId: string | HTMLElement,
        options: {
          height?: string | number;
          width?: string | number;
          videoId?: string;
          playerVars?: Record<string, number | string>;
          events?: {
            onReady?: (e: { target: YTPlayerInstance }) => void;
            onStateChange?: (e: { data: number; target: YTPlayerInstance }) => void;
            onError?: (e: { data: number }) => void;
          };
        }
      ) => YTPlayerInstance;
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

let ytApiPromise: Promise<void> | null = null;
function loadYouTubeApi(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.YT && window.YT.Player) return Promise.resolve();
  if (ytApiPromise) return ytApiPromise;

  ytApiPromise = new Promise<void>((resolve) => {
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      resolve();
    };
    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      document.head.appendChild(script);
    }
  });

  return ytApiPromise;
}

export function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?.*v=|embed\/|v\/)|music\.youtube\.com\/watch\?.*v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

function formatTime(seconds: number): string {
  const safe = !Number.isFinite(seconds) || seconds < 0 ? 0 : seconds;
  const mins = Math.floor(safe / 60);
  const secs = Math.floor(safe % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function parseLrc(raw: string): LyricLine[] {
  const lines: LyricLine[] = [];
  const timeTagRegex = /\[(\d{1,2}):(\d{2}(?:[.:]\d{1,3})?)\]/g;

  for (const row of raw.replace(/^\uFEFF/, "").split(/\r?\n/)) {
    const matches = [...row.matchAll(timeTagRegex)];
    if (matches.length === 0) continue;

    const text = row.replace(timeTagRegex, "").trim();
    if (!text || text.startsWith("🎵")) continue;

    for (const m of matches) {
      const time = Number(m[1]) * 60 + Number(m[2].replace(":", "."));
      lines.push({ time, text });
    }
  }

  return lines.sort((a, b) => a.time - b.time);
}

const MASK_GRADIENT =
  "linear-gradient(to bottom, transparent 0%, #000 20%, #000 80%, transparent 100%)";

export default function MusicPlayerOverlay({
  tracks,
}: {
  tracks: TrackItem[];
}) {
  const reactId = useId().replace(/:/g, "");
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [lyrics, setLyrics] = useState<LyricLine[]>([]);
  const [activeLyric, setActiveLyric] = useState(-1);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ytContainerRef = useRef<HTMLDivElement | null>(null);
  const ytPlayerRef = useRef<YTPlayerInstance | null>(null);
  const ytReadyRef = useRef(false);
  const pendingPlayRef = useRef(false);

  const lyricsBoxRef = useRef<HTMLDivElement | null>(null);
  const lyricBtnsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const isSeekingRef = useRef(false);
  const autoPlayNextRef = useRef(false);

  const currentTrack = tracks[trackIndex];
  const youtubeId = currentTrack ? extractYouTubeId(currentTrack.audioSrc) : null;
  const isYouTube = Boolean(youtubeId);
  const hasLyrics = lyrics.length > 0;

  // Initialize or switch track (HTML5 Audio vs YouTube IFrame API)
  useEffect(() => {
    if (!currentTrack) return;

    setActiveLyric(-1);
    setScrollOffset(0);
    setCurrentTime(0);
    setDuration(0);

    const shouldPlay = playing || autoPlayNextRef.current || pendingPlayRef.current;
    autoPlayNextRef.current = false;

    if (youtubeId) {
      // Pause HTML5 audio if it was playing
      audioRef.current?.pause();

      let cancelled = false;
      loadYouTubeApi().then(() => {
        if (cancelled) return;

        if (ytPlayerRef.current && ytReadyRef.current) {
          if (shouldPlay) {
            pendingPlayRef.current = false;
            ytPlayerRef.current.loadVideoById(youtubeId);
          } else {
            ytPlayerRef.current.cueVideoById(youtubeId);
          }
          return;
        }

        if (!ytContainerRef.current || !window.YT) return;
        ytReadyRef.current = false;

        ytPlayerRef.current = new window.YT.Player(ytContainerRef.current, {
          width: 1,
          height: 1,
          videoId: youtubeId,
          playerVars: {
            autoplay: shouldPlay ? 1 : 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
            playsinline: 1,
            rel: 0,
          },
          events: {
            onReady: (e) => {
              ytReadyRef.current = true;
              const d = e.target.getDuration();
              if (Number.isFinite(d) && d > 0) setDuration(d);
              if (pendingPlayRef.current || shouldPlay) {
                pendingPlayRef.current = false;
                e.target.playVideo();
              }
            },
            onStateChange: (e) => {
              // 1 = PLAYING, 2 = PAUSED, 0 = ENDED
              if (e.data === 1) {
                setPlaying(true);
                const d = e.target.getDuration();
                if (Number.isFinite(d) && d > 0) setDuration(d);
              } else if (e.data === 2) {
                setPlaying(false);
              } else if (e.data === 0) {
                if (tracks.length <= 1) {
                  e.target.seekTo(0, true);
                  e.target.playVideo();
                } else {
                  autoPlayNextRef.current = true;
                  setTrackIndex((i) => (i + 1) % tracks.length);
                }
              }
            },
          },
        });
      });

      return () => {
        cancelled = true;
      };
    } else {
      // HTML5 Audio track
      if (ytPlayerRef.current && ytReadyRef.current) {
        try {
          ytPlayerRef.current.pauseVideo();
        } catch {
          // ignore
        }
      }
      const audio = audioRef.current;
      if (audio) {
        audio.src = currentTrack.audioSrc;
        if (shouldPlay) {
          pendingPlayRef.current = false;
          audio.play().catch(() => setPlaying(false));
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackIndex, youtubeId]);

  // Clean up YT player on unmount
  useEffect(() => {
    return () => {
      try {
        ytPlayerRef.current?.destroy();
      } catch {
        // ignore
      }
    };
  }, []);

  // Load lyrics: either from local lrcSrc OR automatically from LRCLIB API
  useEffect(() => {
    let cancelled = false;
    if (!currentTrack) {
      setLyrics([]);
      return;
    }

    if (currentTrack.lrcSrc) {
      fetch(currentTrack.lrcSrc)
        .then((res) => (res.ok ? res.text() : Promise.reject(res.status)))
        .then((text) => {
          if (!cancelled) setLyrics(parseLrc(text));
        })
        .catch(() => {
          if (!cancelled) setLyrics([]);
        });
    } else {
      // Auto-fetch synced lyrics from LRCLIB by title & artist
      const q = new URLSearchParams({
        track_name: currentTrack.title,
        artist_name: currentTrack.artist,
      });
      fetch(`https://lrclib.net/api/search?${q.toString()}`)
        .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
        .then((items: Array<{ syncedLyrics?: string }>) => {
          if (cancelled) return;
          const match = Array.isArray(items)
            ? items.find((item) => Boolean(item.syncedLyrics))
            : undefined;
          setLyrics(match?.syncedLyrics ? parseLrc(match.syncedLyrics) : []);
        })
        .catch(() => {
          if (!cancelled) setLyrics([]);
        });
    }

    return () => {
      cancelled = true;
    };
  }, [currentTrack]);

  // Sync current time, duration, and active lyric line for both HTML5 Audio and YouTube
  useEffect(() => {
    let raf = 0;

    const getNow = (): number => {
      if (isYouTube) {
        if (ytPlayerRef.current && ytReadyRef.current) {
          try {
            return ytPlayerRef.current.getCurrentTime() || 0;
          } catch {
            return 0;
          }
        }
        return 0;
      }
      return audioRef.current?.currentTime || 0;
    };

    const getDur = (): number => {
      if (isYouTube) {
        if (ytPlayerRef.current && ytReadyRef.current) {
          try {
            const d = ytPlayerRef.current.getDuration();
            return Number.isFinite(d) && d > 0 ? d : 0;
          } catch {
            return 0;
          }
        }
        return 0;
      }
      const d = audioRef.current?.duration ?? 0;
      return Number.isFinite(d) && d > 0 ? d : 0;
    };

    const tick = () => {
      const now = getNow();
      const dur = getDur();

      if (!isSeekingRef.current) setCurrentTime(now);
      if (dur > 0) setDuration(dur);

      if (lyrics.length > 0) {
        let idx = -1;
        for (let i = 0; i < lyrics.length; i++) {
          if (lyrics[i].time <= now) idx = i;
          else break;
        }
        setActiveLyric((prev) => (prev === idx ? prev : idx));
      }

      if (playing) {
        raf = requestAnimationFrame(tick);
      }
    };

    if (playing) {
      raf = requestAnimationFrame(tick);
    } else {
      tick();
    }

    const audio = audioRef.current;
    const events = ["loadedmetadata", "durationchange", "timeupdate", "seeked"];
    if (!isYouTube && audio) {
      events.forEach((ev) => audio.addEventListener(ev, tick));
    }

    return () => {
      cancelAnimationFrame(raf);
      if (!isYouTube && audio) {
        events.forEach((ev) => audio.removeEventListener(ev, tick));
      }
    };
  }, [playing, trackIndex, isYouTube, lyrics]);

  useEffect(() => {
    if (!open) return;
    const container = lyricsBoxRef.current;
    const activeEl = lyricBtnsRef.current[Math.max(activeLyric, 0)];
    if (!container || !activeEl) return;

    const target =
      activeEl.offsetTop + activeEl.offsetHeight / 2 - container.clientHeight / 2;
    setScrollOffset(activeLyric < 0 ? 0 : Math.max(0, target));
  }, [activeLyric, lyrics, open]);

  const seekToSeconds = (nextTime: number) => {
    if (isYouTube) {
      if (ytPlayerRef.current && ytReadyRef.current) {
        ytPlayerRef.current.seekTo(nextTime, true);
      }
    } else if (audioRef.current) {
      audioRef.current.currentTime = nextTime;
    }
    setCurrentTime(nextTime);
  };

  const seekByClientX = (clientX: number) => {
    const slider = sliderRef.current;
    if (!slider || !duration) return;

    const rect = slider.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    seekToSeconds(ratio * duration);
  };

  const togglePlay = () => {
    if (isYouTube) {
      if (playing) {
        ytPlayerRef.current?.pauseVideo();
        setPlaying(false);
      } else {
        setOpen(true);
        if (ytPlayerRef.current && ytReadyRef.current) {
          ytPlayerRef.current.playVideo();
        } else {
          pendingPlayRef.current = true;
        }
      }
      return;
    }

    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      setOpen(true);
      audio.play().catch(() => {});
    }
  };

  const pauseAll = () => {
    if (isYouTube) {
      try {
        ytPlayerRef.current?.pauseVideo();
      } catch {
        // ignore
      }
      setPlaying(false);
    } else {
      audioRef.current?.pause();
    }
  };

  const nextTrack = () => {
    if (playing) autoPlayNextRef.current = true;
    setTrackIndex((i) => (i + 1) % tracks.length);
  };

  const prevTrack = () => {
    if (playing) autoPlayNextRef.current = true;
    setTrackIndex((i) => (i - 1 + tracks.length) % tracks.length);
  };

  const progressPct = duration ? (currentTime / duration) * 100 : 0;

  return (
    <>
      <audio
        ref={audioRef}
        onEnded={() => {
          if (isYouTube) return;
          if (tracks.length <= 1) {
            const audio = audioRef.current;
            if (audio) {
              audio.currentTime = 0;
              audio.play().catch(() => {});
            }
            return;
          }
          autoPlayNextRef.current = true;
          setTrackIndex((i) => (i + 1) % tracks.length);
        }}
        onPlay={() => {
          if (!isYouTube) setPlaying(true);
        }}
        onPause={() => {
          if (!isYouTube) setPlaying(false);
        }}
      />

      {/* Hidden container for YouTube IFrame Player API */}
      <div
        className="pointer-events-none absolute -left-[9999px] -top-[9999px] h-px w-px overflow-hidden opacity-0"
        aria-hidden="true"
      >
        <div id={`yt-player-${reactId}`} ref={ytContainerRef} />
      </div>

      {!open && (
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onClick={togglePlay}
          className="absolute bottom-3 right-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md"
          aria-label="Play music"
        >
          <Play size={16} className="ml-0.5" fill="currentColor" />
        </motion.button>
      )}

      <AnimatePresence>
        {open && currentTrack && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 z-20 flex flex-col justify-between bg-black/55 p-4 backdrop-blur-xl"
          >
            <button
              onClick={() => {
                pauseAll();
                setOpen(false);
              }}
              className="self-end text-white/70 hover:text-white"
              aria-label="Close player"
            >
              <X size={16} />
            </button>

            <div className="flex min-h-0 flex-1 items-center justify-center px-2">
              {hasLyrics ? (
                <div
                  ref={lyricsBoxRef}
                  className="h-full w-full overflow-hidden"
                  style={{
                    maskImage: MASK_GRADIENT,
                    WebkitMaskImage: MASK_GRADIENT,
                  }}
                >
                  <div
                    className="flex flex-col gap-3 py-[40%] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
                    style={{ transform: `translateY(${-scrollOffset}px)` }}
                  >
                    {lyrics.map((line, i) => {
                      const diff = i - activeLyric;
                      return (
                        <button
                          key={`${line.time}-${i}`}
                          ref={(el) => {
                            lyricBtnsRef.current[i] = el;
                          }}
                          onClick={() => {
                            seekToSeconds(line.time);
                            if (!playing) togglePlay();
                          }}
                          className={`text-left font-heading text-lg font-bold leading-snug transition-colors duration-500 hover:text-white/80 ${
                            diff === 0
                              ? "text-white"
                              : diff < 0
                                ? "text-white/30"
                                : "text-white/50"
                          }`}
                        >
                          {line.text}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="flex items-end gap-1">
                  {[0, 1, 2, 3, 4].map((bar) => (
                    <motion.span
                      key={bar}
                      animate={
                        playing
                          ? { height: ["20%", "100%", "40%", "80%", "20%"] }
                          : { height: "20%" }
                      }
                      transition={{
                        duration: 1 + 0.15 * bar,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="h-4 w-1 rounded-full bg-white/80"
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="text-center">
              <p className="truncate font-heading text-sm font-bold text-white">
                {currentTrack.title}
              </p>
              <p className="truncate text-xs text-white/70">
                {currentTrack.artist}
              </p>

              <div className="mt-3 flex items-center gap-2 text-[10px] tabular-nums text-white/70">
                <span className="w-7 text-right">
                  {formatTime(currentTime)}
                </span>
                <div
                  ref={sliderRef}
                  role="slider"
                  tabIndex={0}
                  aria-label="Seek"
                  aria-valuemin={0}
                  aria-valuemax={Math.round(duration)}
                  aria-valuenow={Math.round(currentTime)}
                  aria-valuetext={`${formatTime(currentTime)} of ${formatTime(duration)}`}
                  onKeyDown={(e) => {
                    if (!duration) return;
                    const delta =
                      e.key === "ArrowRight"
                        ? 5
                        : e.key === "ArrowLeft"
                          ? -5
                          : 0;
                    if (delta) {
                      e.preventDefault();
                      seekToSeconds(
                        Math.min(duration, Math.max(0, currentTime + delta))
                      );
                    }
                  }}
                  onPointerDown={(e) => {
                    isSeekingRef.current = true;
                    e.currentTarget.setPointerCapture(e.pointerId);
                    seekByClientX(e.clientX);
                  }}
                  onPointerMove={(e) => {
                    if (isSeekingRef.current) seekByClientX(e.clientX);
                  }}
                  onPointerUp={(e) => {
                    isSeekingRef.current = false;
                    e.currentTarget.releasePointerCapture(e.pointerId);
                  }}
                  onPointerCancel={() => {
                    isSeekingRef.current = false;
                  }}
                  className="group relative flex h-4 flex-1 cursor-pointer touch-none items-center outline-none"
                >
                  <div className="h-1 w-full overflow-hidden rounded-full bg-white/25">
                    <div
                      className="h-full rounded-full bg-white"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                  <div
                    className="pointer-events-none absolute h-3 w-3 -translate-x-1/2 scale-0 rounded-full bg-white shadow transition-transform group-hover:scale-100 group-focus-visible:scale-100"
                    style={{ left: `${progressPct}%` }}
                  />
                </div>
                <span className="w-7 text-left">{formatTime(duration)}</span>
              </div>

              <div className="mt-3 flex items-center justify-center gap-5">
                <button
                  onClick={prevTrack}
                  className="text-white/80 hover:text-white"
                  aria-label="Previous track"
                >
                  <SkipBack size={18} fill="currentColor" />
                </button>
                <button
                  onClick={togglePlay}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black"
                  aria-label={playing ? "Pause" : "Play"}
                >
                  {playing ? (
                    <Pause size={16} fill="currentColor" />
                  ) : (
                    <Play size={16} className="ml-0.5" fill="currentColor" />
                  )}
                </button>
                <button
                  onClick={nextTrack}
                  className="text-white/80 hover:text-white"
                  aria-label="Next track"
                >
                  <SkipForward size={18} fill="currentColor" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
