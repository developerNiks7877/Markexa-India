import Link from "next/link";
import Reveal from "@/components/blog/Reveal";
import ProceduralArt from "@/components/effects/ProceduralArt";
import WorkShowcase from "./WorkShowcase";
import { services } from "@/data/services";
import type { Service } from "@/data/services";
import { servicePages } from "@/data/service-pages";
import { getWork,type WorkItem } from "@/data/work";
import { getVideos } from "@/lib/api/videos";
import type { Photo } from "@/lib/api/photos";


type Props = {
  service: Service;
  photos: Photo[];
};

export default async function ServiceDetail({ service, photos }: Props) {
  const page = servicePages[service.id];

  const servicePhotos = photos.filter((photo) => photo.isActive && photo.imageUrl);
  

  // Debug logs
  console.log("Current service ID:", service.id);

  console.table(
    photos.map((photo) => ({
      title: photo.title,
      section: photo.section,
      imageUrl: photo.imageUrl,
      isActive: photo.isActive,
    }))
  );

  console.log("Filtered photos:", servicePhotos);

  // Fetch videos only for the Video Editing service
  const apiVideos = service.id === "motion"
    ? await getVideos().catch((error) => {
        console.error("Could not load portfolio videos:", error);
        return [];
      })
    : [];


  // Convert API videos into your existing WorkItem format
  const videoWork: WorkItem[] = apiVideos.map((video) => ({
    id: video._id,
    name: video.title,
    serviceId: "motion",
    category: "Video",
    type: "video",
    description: video.description ?? "",
    image: video.thumbnailUrl,
    videoUrl: video.videoUrl,
  }));

  // Convert API photos into existing WorkItem format
const photoWork: WorkItem[] = servicePhotos.map((photo) => ({
  id: photo._id,
  name: photo.title,
  serviceId: service.id,
  category: "Portfolio",
  type: "campaign",
  description: photo.description ?? "",
  image: photo.imageUrl,
}));

// Combine API photos, videos and existing portfolio work
const items = [
  ...photoWork,
  ...videoWork,
  ...getWork(service.id),
];

const real = items.filter((i) => !i.status).length;
  

  const enquire = `/?service=${encodeURIComponent(service.title)}#contact`;
  const others = services.filter((s) => s.id !== service.id);

  // Keep the rest of your existing component exactly as it is.

  return (
    <article className="svp" style={{ "--accent": page.accent } as React.CSSProperties}>
      <header className="svp__head wrap">
        <div className="svp__text">
          <Link href="/#work" className="art__back"><span aria-hidden="true">&larr;</span> All services</Link>
          <h1 className="svp__title"><span>{service.title}</span></h1>
          <p className="svp__intro">{page.intro}</p>
          <div className="svp__ctas">
            <Link href={enquire} className="btn btn--solid"><span>Discuss this service</span></Link>
            <a href="#svc-work" className="btn btn--ghost"><span>See the work</span></a>
          </div>
        </div>
        <div className="svp__visual" data-v={page.layout} aria-hidden="true">
          <ProceduralArt variant={service.art} hue={page.accent} bg="#070707" />
          {page.layout === "web" && <span className="svp__chrome"><i /><i /><i /></span>}
          {page.layout === "video" && <span className="svp__play"><svg width="22" height="22" viewBox="0 0 18 18"><path d="M4 2l12 7-12 7z" fill="currentColor" /></svg></span>}
          <ul className="svp__chips">{service.items.map((x) => <li key={x}>{x}</li>)}</ul>
        </div>
      </header>

      <section className="svp__sec wrap" aria-labelledby="ov-h">
        <h2 id="ov-h" className="svp__h">About this service</h2>
        <Reveal className="svp__prose">{page.description.map((t) => <p key={t}>{t}</p>)}</Reveal>
      </section>

      <section className="svp__sec wrap" aria-labelledby="of-h">
        <h2 id="of-h" className="svp__h">What we offer</h2>
        <Reveal><ul className="svp__offers">{page.offers.map((o) => <li key={o.title}><h3>{o.title}</h3><p>{o.text}</p></li>)}</ul></Reveal>
      </section>

      <section className="svp__sec wrap" aria-labelledby="ap-h">
        <h2 id="ap-h" className="svp__h">Our approach</h2>
        <Reveal><ol className="svp__steps">{page.approach.map((a, i) => <li key={a.title}><b>{String(i + 1).padStart(2, "0")}</b><h3>{a.title}</h3><p>{a.text}</p></li>)}</ol></Reveal>
      </section>

      <section id="svc-work" className="svp__work wrap" aria-labelledby="wk-h">
        <div className="svp__workhead">
          <h2 id="wk-h" className="display display--s">Work in {service.title.toLowerCase()}</h2>
          <p className="note">
            {real > 0 ? `${real} real ${real === 1 ? "project" : "projects"} shown first. ` : "No real projects added yet. "}
            Items marked <em>Placeholder</em> or <em>Demo concept</em> are not client work. Add real projects in <code>data/work.ts</code>.
            {service.id === "marketing" && " Campaign results appear only when real data is supplied."}
          </p>
        </div>
        <WorkShowcase items={items} layout={page.layout} accent={page.accent} />
      </section>

      <section className="svp__cta wrap" aria-labelledby="cta-h">
        <Reveal className="svp__ctabox">
          <h2 id="cta-h" className="display display--s">Let’s talk about <span className="it">{page.short}.</span></h2>
          <div className="svp__ctas">
            <Link href={enquire} className="btn btn--solid btn--lg"><span>Enquire about {service.title}</span></Link>
          </div>
        </Reveal>
      </section>

      <nav className="svp__others wrap" aria-label="Other services">
        <h2 className="svp__h">Other services</h2>
        <ul>{others.map((s) => (
          <li key={s.id} style={{ "--accent": servicePages[s.id].accent } as React.CSSProperties}>
            <Link href={`/services/${s.id}`}><i aria-hidden="true" />{s.title}<span aria-hidden="true">&rarr;</span></Link>
          </li>
        ))}</ul>
      </nav>
    </article>
  );
}

