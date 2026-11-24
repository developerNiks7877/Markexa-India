import Reveal from "@/components/blog/Reveal";
import ProceduralArt from "@/components/effects/ProceduralArt";
import WorkCard, { Arrow } from "./WorkCard";
import type { WorkItem } from "@/data/work";
import type { Layout } from "@/data/service-pages";

/** Presents a service's work in a layout that suits the medium. Card markup is shared; only the arrangement changes. */
export default function WorkShowcase({ items, layout, accent }: { items: WorkItem[]; layout: Layout; accent: string }) {
  const card = (i: WorkItem, frame: "none" | "browser" | "phone" | "play" = "none", ar?: string) => <WorkCard key={i.id} item={i} frame={frame} ar={ar} hue={accent} />;

  if (layout === "social") {
    const profiles = items.filter((i) => i.type === "social-profile");
    const reels = items.filter((i) => i.type === "reel");
    const posts = items.filter((i) => i.type !== "social-profile" && i.type !== "reel");
    return (
      <div className="wkset wkset--social">
        {profiles.length > 0 && (
          <Reveal>
            <h3 className="wkset__sub">Profiles we manage</h3>
            <ul className="wkprof">
              {profiles.map((p) => {
                const ext = !!p.url && /^https?:/.test(p.url);
                const inner = (
                  <>
                    <span className="wkprof__av"><ProceduralArt variant={p.art ?? "orb"} hue={p.hue ?? accent} bg="#070707" /></span>
                    <span className="wkprof__txt"><strong>{p.name}</strong><em>{p.description}</em></span>
                    <span className="wkprof__go">{p.url ? (ext ? "Open profile" : "View") : "Placeholder"}{p.url && <Arrow />}</span>
                  </>
                );
                return (
                  <li key={p.id} data-status={p.status ?? "live"}>
                    {p.url ? <a href={p.url} {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{inner}{ext && <span className="sr"> (opens in a new tab)</span>}</a> : <div>{inner}</div>}
                  </li>
                );
              })}
            </ul>
          </Reveal>
        )}
        {posts.length > 0 && <Reveal><h3 className="wkset__sub">Campaigns, posts and strategy</h3><div className="wkgrid wkgrid--posts">{posts.map((i) => card(i))}</div></Reveal>}
        {reels.length > 0 && <Reveal><h3 className="wkset__sub">Reels and video content</h3><div className="wkgrid wkgrid--reels">{reels.map((i) => card(i, "play"))}</div></Reveal>}
      </div>
    );
  }

  const frame = layout === "web" ? "browser" : layout === "app" ? "phone" : layout === "video" ? "play" : "none";
  return (
    <Reveal className="wkset">
      <div className={`wkgrid wkgrid--${layout}`}>
        {items.map((i, n) => card(i, i.type === "ad" && layout === "video" ? "play" : frame, layout === "brand" ? (n === 0 ? "16 / 9" : "4 / 3") : layout === "video" ? "16 / 9" : layout === "case" ? "3 / 2" : layout === "web" ? undefined : undefined))}
      </div>
    </Reveal>
  );
}
