"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useMotion } from "./MotionProvider";
import { nav, site } from "@/data/site";
import type { NavItem } from "@/data/site";
import { media } from "@/data/media";

export default function Navigation() {
  const { scrollTo, active } = useMotion();
  const pathname = usePathname();
  const sub = pathname !== "/";
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => { window.removeEventListener("keydown", esc); document.body.style.overflow = ""; };
  }, [open]);

  const go = (id: string) => (e: React.MouseEvent) => { e.preventDefault(); setOpen(false); setTimeout(() => scrollTo(id), open ? 250 : 0); };

  const isOn = (n: NavItem) => (sub ? n.href === pathname || (!!n.href && pathname.startsWith(n.href + "/")) : active === n.id);
  const link = (n: NavItem, props: { className?: string; style?: React.CSSProperties }) => {
    const on = isOn(n);
    const cls = `${props.className ?? ""} ${on ? "is-active" : ""}`.trim();
    if (n.href) return <Link key={n.id} href={n.href} onClick={() => setOpen(false)} aria-current={on ? "page" : undefined} className={cls} style={props.style}>{n.label}</Link>;
    if (sub) return <Link key={n.id} href={n.id === "home" ? "/" : `/#${n.id}`} onClick={() => setOpen(false)} className={cls} style={props.style}>{n.label}</Link>;
    return <a key={n.id} href={`#${n.id}`} onClick={go(n.id)} aria-current={on ? "true" : undefined} className={cls} style={props.style}>{n.label}</a>;
  };
  const cta = (cls: string) => sub
    ? <Link href="/#contact" className={cls} onClick={() => setOpen(false)}>Start a project</Link>
    : <a href="#contact" className={cls} onClick={go("contact")}>Start a project</a>;

  return (
    <header className={`nav ${solid ? "nav--solid" : ""}`}>
      
{sub ? (
  <Link href="/" className="nav__logo" aria-label={`${site.name} home`}>
    <Image
      src={media.logo}
      alt="Markexa India"
      width={130}
      height={38}
      priority
    />
  </Link>
) : (
  <a
    href="#home"
    className="nav__logo"
    onClick={go("home")}
    aria-label={`${site.name} home`}
  >
    <Image
      src={media.logo}
      alt="Markexa India"
      width={130}
      height={38}
      priority
    />
  </a>
)}

      <nav className="nav__links" aria-label="Primary">
        {nav.map((n) => link(n, {}))}
      </nav>
      {cta("nav__cta")}
      <button className="nav__burger" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>
        <span className="sr">{open ? "Close menu" : "Open menu"}</span><b /><b />
      </button>
      <div id="mobile-menu" className={`menu ${open ? "is-open" : ""}`} aria-hidden={!open} inert={!open}>
        {nav.map((n, i) => link(n, { style: { transitionDelay: open ? `${120 + i * 60}ms` : "0ms" } }))}
        {cta("menu__cta")}
      </div>
    </header>
  );
}


