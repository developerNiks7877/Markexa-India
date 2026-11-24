import Link from "next/link";
import Reveal from "./Reveal";
import ReadingProgress from "./ReadingProgress";
import { formatDate, readLabel, relatedTo } from "@/data/blog";
import type { Article } from "@/data/blog";

export default function ArticleView({ article: a }: { article: Article }) {
  const related = relatedTo(a);
  return (
    <article className="art" style={{ "--accent": a.accent } as React.CSSProperties}>
      <ReadingProgress />
      <header className="art__head wrap">
        <Link href="/blog" className="art__back"><span aria-hidden="true">&larr;</span> Back to blog</Link>
        <div className="art__meta">
          <span className="art__cat"><i />{a.category}</span>
          {a.date && (
  <time dateTime={a.date}>{formatDate(a.date)}</time>
)}
          <span>{readLabel(a)}</span>
        </div>
        <h1 className="art__title"><span>{a.title}</span></h1>
        <p className="art__intro">{a.intro}</p>
        
      </header>

      <div className="art__cover wrap">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={a.image} alt="" width={1200} height={800} fetchPriority="high" />
      </div>

      <div id="article-body" className="art__body">
        {a.blocks.map((b, i) => {
          if (b.type === "h2") return <Reveal key={i} className="art__col"><h2>{b.text}</h2></Reveal>;
          if (b.type === "p") return <Reveal key={i} className="art__col"><p>{b.text}</p></Reveal>;
          if (b.type === "quote") return <Reveal key={i} className="art__col"><blockquote>{b.text}</blockquote></Reveal>;
          if (b.type === "list") return <Reveal key={i} className="art__col"><ul>{b.items.map((x) => <li key={x}>{x}</li>)}</ul></Reveal>;
          return (
            <Reveal key={i} className={`art__fig ${b.wide ? "is-wide" : "art__col"}`}>
              <figure>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={b.src} alt={b.alt} width={1200} height={800} loading="lazy" decoding="async" />
                {b.caption && <figcaption>{b.caption}</figcaption>}
              </figure>
            </Reveal>
          );
        })}
      </div>

      <aside className="art__related wrap" aria-labelledby="rel-h">
        <div className="art__relhead"><h2 id="rel-h">Keep reading</h2><Link href="/blog">All articles</Link></div>
        <ul>
          {related.map((r) => (
            <li key={r.slug} style={{ "--accent": r.accent } as React.CSSProperties}>
              <Link href={`/blogs/${r.slug}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={r.image} alt="" width={600} height={400} loading="lazy" decoding="async" />
                <span className="art__cat"><i />{r.category}</span>
                <strong>{r.title}</strong>
                <em>{readLabel(r)}</em>
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </article>
  );
}
