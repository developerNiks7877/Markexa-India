
"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
  type KeyboardEvent,
  type WheelEvent,
} from "react";

import gsap from "gsap";
import "./DepthCarousel.css";
import {media} from "@/data/media";
import {team} from "@/data/team"



// Information each card can display
export type DepthCarouselItem = {
  image: string;
  alt?: string;
  name?: string;
  role?: string;
  description?: string;
};

// Default images if no items are provided
const DEFAULT_ITEMS: DepthCarouselItem[] = team.map((member, index) => ({
  image: media.teamImages[`member${index + 1}`],
  alt: member.name,
  name: member.name,
  role: member.role,
  description: member.note,
}));
// const teamMembers = [
//   {
//     image: media.teamImages.member1,
//     name: "Person One",
//     role: "Creative Director",
//   },
//   {
//     image: media.teamImages.member2,
//     name: "Person Two",
//     role: "Developer",
//   },
//   {
//     image: media.teamImages.member3,
//     name: "Person Three",
//     role: "Designer",
//   },
// ];

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

type Props = {
  items?: DepthCarouselItem[];
  cardWidth?: number;
  cardHeight?: number;
  radius?: number;
  tint?: string;
  depth?: number;
  spread?: number;
  tilt?: number;
  tiltDirection?: "left" | "right";
  perspective?: number;
  visibleCards?: number;
  falloff?: number;
  blur?: number;
  duration?: number;
  ease?: string;
  autoplay?: boolean;
  autoplayDelay?: number;
  loop?: boolean;
  showControls?: boolean;
  showIndicators?: boolean;
  className?: string;
  onChange?: (index: number, item: DepthCarouselItem) => void;
};

export default function DepthCarousel({
  items = DEFAULT_ITEMS,
  cardWidth = 400,
  cardHeight = 400,
  radius = 18,
  tint = "#05060a",
  depth = 220,
  spread = 90,
  tilt = 22,
  tiltDirection = "right",
  perspective = 1400,
  visibleCards = 4,
  falloff = 0.2,
  blur = 6,
  duration = 700,
  ease = "power3.out",
  autoplay = false,
  autoplayDelay = 3200,
  loop = true,
  showControls = true,
  showIndicators = true,
  onChange,
  className = "",
}: Props) {
  const data = useMemo(() => items, [items]);
  const count = data.length;

  const rootRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const overlayRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const positionRef = useRef(0);
  const focusRef = useRef(0);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  const scaleRef = useRef(1);
  const dragRef = useRef<{
    x: number;
    startPos: number;
    lastX: number;
    lastT: number;
    velocity: number;
    moved: boolean;
    id: number;
  } | null>(null);

  const wheelTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const reducedMotionRef = useRef(false);
  const onChangeRef = useRef(onChange);

  const [active, setActive] = useState(0);

  onChangeRef.current = onChange;

  // Settings used by the animation
  const configRef = useRef({
    count,
    depth,
    spread,
    tilt,
    tiltDirection,
    visibleCards,
    falloff,
    blur,
    duration,
    ease,
    loop,
    cardWidth,
    autoplayDelay,
  });

  configRef.current = {
    count,
    depth,
    spread,
    tilt,
    tiltDirection,
    visibleCards,
    falloff,
    blur,
    duration,
    ease,
    loop,
    cardWidth,
    autoplayDelay,
  };

  // Position every card in 3D space
  const layout = useCallback((position: number) => {
    const config = configRef.current;
    const direction = config.tiltDirection === "left" ? -1 : 1;

    for (let i = 0; i < config.count; i++) {
      const card = cardRefs.current[i];

      if (!card) continue;

      let distance = i - position;

      // Make the carousel loop infinitely
      if (config.loop && config.count > 1) {
        distance = ((distance % config.count) + config.count) % config.count;

        if (distance > config.count / 2) {
          distance -= config.count;
        }
      }

      const behind = Math.max(0, distance);
      const absoluteDistance = Math.abs(distance);

      const visible = absoluteDistance <= config.visibleCards + 0.5;

      const z = -config.depth * distance;
      const x = direction * config.spread * distance;

      const rotation =
        direction * config.tilt * clamp(distance, 0, 1);

      let opacity = distance < 0 ? Math.max(0, 1 + distance) : 1;

      if (!visible) opacity = 0;

      const brightness = Math.max(
        0.15,
        1 - behind * config.falloff
      );

      const blurAmount =
        config.blur > 0
          ? Math.min(
              config.blur,
              (behind / Math.max(1, config.visibleCards)) * config.blur
            )
          : 0;

      card.style.transform = `
        translate(-50%, -50%)
        scale(${scaleRef.current})
        translateX(${x}px)
        translateZ(${z}px)
        rotateY(${rotation}deg)
      `;

      card.style.opacity = String(opacity);

      card.style.filter = `
        brightness(${brightness})
        blur(${blurAmount}px)
      `;

      card.style.zIndex = String(Math.round(2000 - distance * 20));

      card.style.pointerEvents =
        visible && opacity > 0.05 ? "auto" : "none";

      const overlay = overlayRefs.current[i];

      if (overlay) {
        overlay.style.opacity = String(
          clamp(behind * config.falloff * 1.25, 0, 0.86)
        );
      }
    }
  }, []);

  // Update the active card
  const notify = useCallback(
    (index: number) => {
      setActive(index);
      onChangeRef.current?.(index, data[index]);
    },
    [data]
  );

  // Animate to a particular position
  const animateTo = useCallback(
    (target: number, animate: boolean) => {
      tweenRef.current?.kill();

      const config = configRef.current;

      const proxy = { position: positionRef.current };

      tweenRef.current = gsap.to(proxy, {
        position: target,
        duration:
          animate && !reducedMotionRef.current
            ? config.duration / 1000
            : 0,
        ease: config.ease,

        onUpdate: () => {
          positionRef.current = proxy.position;
          layout(proxy.position);
        },

        onComplete: () => {
          if (config.count > 0) {
            positionRef.current =
              ((positionRef.current % config.count) + config.count) %
              config.count;
          }

          layout(positionRef.current);
        },
      });
    },
    [layout]
  );

  // Select a card
  const setFocus = useCallback(
    (rawIndex: number, animate = true) => {
      const config = configRef.current;
      const n = config.count;

      if (!n) return;

      const index = config.loop
        ? ((rawIndex % n) + n) % n
        : clamp(rawIndex, 0, n - 1);

      let difference = index - positionRef.current;

      if (config.loop && n > 1) {
        difference = ((difference % n) + n) % n;

        if (difference > n / 2) {
          difference -= n;
        }
      }

      animateTo(positionRef.current + difference, animate);

      if (index !== focusRef.current) {
        focusRef.current = index;
        notify(index);
      }
    },
    [animateTo, notify]
  );

  // Move to the next or previous card
  const navigateBy = useCallback(
    (step: number) => {
      setFocus(focusRef.current + step, true);
    },
    [setFocus]
  );

  // Resize the carousel to fit its container
  useEffect(() => {
    const root = rootRef.current;

    if (!root) return;

    const observer = new ResizeObserver((entries) => {
      const width = entries[0].contentRect.width;
      const config = configRef.current;

      const needed =
        config.cardWidth + Math.abs(config.spread) * 2 + 120;

      scaleRef.current = clamp(width / needed, 0.4, 1);

      layout(positionRef.current);
    });

    observer.observe(root);

    return () => observer.disconnect();
  }, [layout]);

  // Mouse wheel navigation
  const handleWheel = useCallback(
    (event: WheelEvent<HTMLDivElement>) => {
      const config = configRef.current;

      if (config.count < 2) return;

     

      tweenRef.current?.kill();

      const raw =
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
          ? event.deltaX
          : event.deltaY;

      const delta = event.deltaMode === 1 ? raw * 24 : raw;

      const step = clamp(delta / (config.cardWidth * 0.9), -0.6, 0.6);

      positionRef.current += step;

      layout(positionRef.current);

      if (wheelTimerRef.current) {
        clearTimeout(wheelTimerRef.current);
      }

      wheelTimerRef.current = setTimeout(() => {
        setFocus(Math.round(positionRef.current), true);
      }, 130);
    },
    [layout, setFocus]
  );

  // Start dragging
  const handlePointerDown = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (configRef.current.count < 2) return;

      tweenRef.current?.kill();

      dragRef.current = {
        x: event.clientX,
        startPos: positionRef.current,
        lastX: event.clientX,
        lastT: performance.now(),
        velocity: 0,
        moved: false,
        id: event.pointerId,
      };
    },
    []
  );

  // Move cards while dragging
  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      const drag = dragRef.current;

      if (!drag) return;

      const config = configRef.current;

      const stepPx = Math.max(
        config.cardWidth * 0.55 * scaleRef.current,
        40
      );

      const dx = event.clientX - drag.x;

      if (!drag.moved && Math.abs(dx) > 4) {
        drag.moved = true;
        rootRef.current?.setPointerCapture(drag.id);
      }

      if (!drag.moved) return;

      const now = performance.now();
      const time = Math.max(now - drag.lastT, 1);

      drag.velocity = (event.clientX - drag.lastX) / time;

      drag.lastX = event.clientX;
      drag.lastT = now;

      positionRef.current = drag.startPos - dx / stepPx;

      layout(positionRef.current);
    },
    [layout]
  );

  // Finish dragging
  const handlePointerEnd = useCallback(() => {
    const drag = dragRef.current;

    if (!drag) return;

    dragRef.current = null;

    if (!drag.moved) return;

    const config = configRef.current;

    const stepPx = Math.max(
      config.cardWidth * 0.55 * scaleRef.current,
      40
    );

    const projected =
      positionRef.current - (drag.velocity * 180) / stepPx;

    setFocus(Math.round(projected), true);
  }, [setFocus]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        navigateBy(-1);
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        navigateBy(1);
      }
    },
    [navigateBy]
  );

  // Clicking a card brings it to the front
  const handleCardClick = useCallback(
    (index: number) => {
      if (dragRef.current?.moved) return;

      setFocus(index, true);
    },
    [setFocus]
  );

  // Autoplay
  useEffect(() => {
    reducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!autoplay || reducedMotionRef.current || count < 2) {
      return;
    }

    const root = rootRef.current;

    let hovered = false;
    let focused = false;

    const stop = () => {
      if (autoTimerRef.current) {
        clearInterval(autoTimerRef.current);
      }

      autoTimerRef.current = null;
    };

    const start = () => {
      stop();

      autoTimerRef.current = setInterval(() => {
        if (!hovered && !focused) {
          navigateBy(1);
        }
      }, Math.max(autoplayDelay, 600));
    };

    const onEnter = () => {
      hovered = true;
    };

    const onLeave = () => {
      hovered = false;
    };

    const onFocusIn = () => {
      focused = true;
    };

    const onFocusOut = () => {
      focused = false;
    };

    root?.addEventListener("mouseenter", onEnter);
    root?.addEventListener("mouseleave", onLeave);
    root?.addEventListener("focusin", onFocusIn);
    root?.addEventListener("focusout", onFocusOut);

    start();

    return () => {
      stop();

      root?.removeEventListener("mouseenter", onEnter);
      root?.removeEventListener("mouseleave", onLeave);
      root?.removeEventListener("focusin", onFocusIn);
      root?.removeEventListener("focusout", onFocusOut);
    };
  }, [autoplay, autoplayDelay, count, navigateBy]);

  // Update layout when settings change
  useEffect(() => {
    layout(positionRef.current);
  }, [
    layout,
    depth,
    spread,
    tilt,
    tiltDirection,
    visibleCards,
    falloff,
    blur,
    cardWidth,
    cardHeight,
    radius,
    count,
  ]);

  // Clean up animations and timers
  useEffect(() => {
    return () => {
      tweenRef.current?.kill();

      if (wheelTimerRef.current) {
        clearTimeout(wheelTimerRef.current);
      }

      if (autoTimerRef.current) {
        clearInterval(autoTimerRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className={`depth-carousel ${className}`.trim()}
      style={
        { "--dc-perspective": `${perspective}px` } as CSSProperties
      }
      role="group"
      aria-roledescription="carousel"
      aria-label="Team members"
      tabIndex={0}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
      onKeyDown={handleKeyDown}
      onWheel={handleWheel}
    >
      <div className="depth-carousel__stage">
        {data.map((item, index) => (
          <div
            key={`${item.name || "slide"}-${index}`}
            ref={(element) => {
              cardRefs.current[index] = element;
            }}
            className="depth-carousel__card"
            style={{
              width: cardWidth,
              height: cardHeight,
              borderRadius: radius,
            }}
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${count}: ${item.name || item.alt || "Slide"}`}
            aria-hidden={active !== index}
            onClick={() => handleCardClick(index)}
          >
            {item.image ? (
              <img
                className="depth-carousel__img"
                src={item.image}
                alt={item.alt || ""}
                draggable={false}
              />
            ) : (
              <div className="depth-carousel__placeholder" />
            )}

            <span
              ref={(element) => {
                overlayRefs.current[index] = element;
              }}
              className="depth-carousel__tint"
              style={{ background: tint }}
            />

            {(item.name || item.role || item.description) && (
              <div className="depth-carousel__info">
                {item.role && (
                  <span className="depth-carousel__role">
                    {item.role}
                  </span>
                )}

                {item.name && (
                  <h3 className="depth-carousel__name">
                    {item.name}
                  </h3>
                )}

                {item.description && (
                  <p className="depth-carousel__description">
                    {item.description}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {showControls && count > 1 && (
        <>
          <button
            type="button"
            className="depth-carousel__arrow depth-carousel__arrow--prev"
            aria-label="Previous slide"
            onClick={() => navigateBy(-1)}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path
                d="M15 5l-7 7 7 7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            type="button"
            className="depth-carousel__arrow depth-carousel__arrow--next"
            aria-label="Next slide"
            onClick={() => navigateBy(1)}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path
                d="M9 5l7 7-7 7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </>
      )}

      {showIndicators && count > 1 && (
        <div
          className="depth-carousel__dots"
          role="tablist"
          aria-label="Choose a slide"
        >
          {data.map((item, index) => (
            <button
              key={index}
              type="button"
              role="tab"
              aria-selected={active === index}
              aria-label={`Go to ${item.name || `slide ${index + 1}`}`}
              className={`depth-carousel__dot ${
                active === index ? "is-active" : ""
              }`}
              onClick={() => setFocus(index, true)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
