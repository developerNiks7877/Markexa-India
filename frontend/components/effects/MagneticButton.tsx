"use client";
import { useRef } from "react";
import type { ReactNode, MouseEvent } from "react";

type Props = { children: ReactNode; href?: string; onClick?: (e: MouseEvent) => void; className?: string; type?: "button" | "submit"; disabled?: boolean };

/** Magnetic hover on fine pointers; plain button/link otherwise. */
export default function MagneticButton({ children, href, onClick, className = "", type = "button", disabled }: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const move = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.22}px, ${(e.clientY - r.top - r.height / 2) * 0.3}px)`;
  };
  const leave = () => { if (ref.current) ref.current.style.transform = ""; };
  const common = { className: `btn ${className}`, onPointerMove: move, onPointerLeave: leave };
  return href ? (
    <a {...common} href={href} onClick={onClick} ref={(n) => { ref.current = n; }}><span>{children}</span></a>
  ) : (
    <button {...common} type={type} onClick={onClick} disabled={disabled} ref={(n) => { ref.current = n; }}><span>{children}</span></button>
  );
}
