import Link from "next/link";
import ProceduralArt from "@/components/effects/ProceduralArt";
import type { WorkItem, WorkType } from "@/data/work";

const typeLabel: Record<WorkType, string> = {
  website: "Website", app: "App", "social-profile": "Social profile", post: "Post design", reel: "Reel", campaign: "Campaign", strategy: "Content strategy",
  identity: "Identity", logo: "Logo", poster: "Poster", packaging: "Packaging", ad: "Advertising", video: "Video", "case-study": "Case study",
};
const ratio: Partial<Record<WorkType, string>> = { campaign: "4 / 5", strategy: "4 / 5", poster: "3 / 4", logo: "1 / 1", packaging: "4 / 5", ad: "4 / 3", post: "4 / 5", reel: "9 / 16", "social-profile": "1 / 1" };

export const Arrow = () => (
  <svg className="wk__arrow" width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M3 11 11 3M5 3h6v6" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
);

const hostOf = (u?: string) => { try { return u ? new URL(u).host : ""; } catch { return ""; } };

export default function WorkCard({ item, frame = "none", ar, hue }: { item: WorkItem; frame?: "none" | "browser" | "phone" | "play"; ar?: string; hue: string }) {
  const status = item.status ?? "live";
  const external = !!item.url && /^https?:/.test(item.url);
  const art =  item.videoUrl ? (
  <video
    className="wk__video"
    src={item.videoUrl}
    poster={item.image}
    controls
    playsInline
    preload="none"
    muted
    autoPlay
  />
) : (
    item.image
      ? <img src={item.image}
       alt={status === "placeholder" ? "" : item.name}
        loading="lazy" decoding="async"
         />
      : <ProceduralArt variant={item.art ?? "orb"} 
         hue={item.hue ?? hue}
          bg="#070707" />
  );
  return (
    <article className="wk" data-status={status} style={{ "--ar": ar ?? ratio[item.type] ?? "4 / 3" } as React.CSSProperties}>
      <div className={`wk__media wk__media--${frame}`}>
        {frame === "browser" && <div className="wk__bar" aria-hidden="true"><i /><i /><i /><span>{hostOf(item.url) || "yourproject.com"}</span></div>}
        <div className="wk__img">{art}</div>
        {/* {frame === "play" && <span className="wk__play" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 18 18"><path d="M4 2l12 7-12 7z" fill="currentColor" /></svg></span>} */}
      </div>{frame === "play" && !item.videoUrl && <span className="wk__play">...</span>}
      <div className="wk__body">
        <div className="wk__tags">
          <span>{typeLabel[item.type]}</span><span>{item.category}</span>
          {status === "placeholder" && <span className="wk__badge">Placeholder</span>}
          {status === "demo" && <span className="wk__badge">Demo concept</span>}
        </div>
        <h3 className="wk__title">
          {item.url
            ? external
              ? <a className="wk__link" href={item.url} target="_blank" rel="noopener noreferrer">{item.name}<Arrow /><span className="sr"> (opens in a new tab)</span></a>
              : <Link className="wk__link" href={item.url}>{item.name}<Arrow /></Link>
            : item.name}
        </h3>
        <p className="wk__desc">{item.description}</p>
        {item.tech && <ul className="wk__chips" aria-label="Technologies used">{item.tech.map((t) => <li key={t}>{t}</li>)}</ul>}
        {item.details && <dl className="wk__dl">{item.details.map((d) => <div key={d.label}><dt>{d.label}</dt><dd>{d.value}</dd></div>)}</dl>}
        {item.results && <dl className="wk__dl wk__dl--res" aria-label="Results">{item.results.map((d) => <div key={d.label}><dt>{d.label}</dt><dd>{d.value}</dd></div>)}</dl>}
        {item.url && <span className="wk__cta" aria-hidden="true">{external ? `Visit ${hostOf(item.url)}` : "View project"}<Arrow /></span>}
        {item.gallery && item.gallery.length > 0 && (
          <details className="wk__gal">
            <summary>Gallery ({item.gallery.length})</summary>
            <div>{item.gallery.map((g, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={g} src={g} alt={`${item.name}, image ${i + 1}`} loading="lazy" decoding="async" />
            ))}</div>
          </details>
        )}
      </div>
    </article>
  );
}
