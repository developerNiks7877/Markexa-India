"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ProceduralArt from "./effects/ProceduralArt";
import { services } from "@/data/services";
import { media } from "@/data/media";

/** Expanding panels: horizontal on desktop, stacked accordion on mobile. The selected service drives the visual. */
export default function Services() {
  const [open, setOpen] = useState(0);
  return (
    <div className="services" role="list">
      {services.map((s, i) => {
        const on = i === open; const img = media.serviceImages[s.id];
        return (
          <div role="listitem" key={s.id} className={`svc ${on ? "is-open" : ""}`}>
            <button className="svc__head" aria-expanded={on} aria-controls={`svc-${s.id}`}
              onClick={() => setOpen(i)} onMouseEnter={() => matchMedia("(hover:hover) and (min-width:901px)").matches && setOpen(i)} onFocus={() => setOpen(i)}>
              <span className="svc__n">{String(i + 1).padStart(2, "0")}</span>
              <span className="svc__t">{s.title}</span>
            </button>
            <div className="svc__body" id={`svc-${s.id}`}>
              <div className="svc__art" aria-hidden={!on}>
                {img ? <Image src={img} alt="" fill sizes="40vw" /> : <ProceduralArt variant={s.art} hue={s.hue} />}
              </div>
              <div className="svc__txt">
                <h4 className="svc__name">{s.title}</h4>
                <p>{s.blurb}</p>
                <ul>{s.items.map((x) => <li key={x}>{x}</li>)}</ul>
                <Link className="svc__more" href={`/services/${s.id}`} tabIndex={on ? 0 : -1}>View service and work<span aria-hidden="true"> &rarr;</span></Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// "use client";
// import { useRef,useState, useMemo } from "react";
// import Image from "next/image";
// import ProceduralArt from "./effects/ProceduralArt";
// import { services } from "@/data/services";
// import { media } from "@/data/media";
// import Link from "next/link";


// /** Expanding panels: horizontal on desktop, stacked accordion on mobile. The selected service drives the visual. */
// export default function Services() {
//   const [open, setOpen] = useState(0);
//   return (
//     <div className="services" role="list">
//       {services.map((s, i) => {
//         const on = i === open; const img = media.serviceImages[s.id];
//         return (
//           <div role="listitem" key={s.id} className={`svc ${on ? "is-open" : ""}`}>
//             <button className="svc__head" aria-expanded={on} aria-controls={`svc-${s.id}`}
//               onClick={() => setOpen(i)} onMouseEnter={() => matchMedia("(hover:hover) and (min-width:901px)").matches && setOpen(i)} onFocus={() => setOpen(i)}>
//               <span className="svc__n">{String(i + 1).padStart(2, "0")}</span>
//               <span className="svc__t">{s.title}</span>
//             </button>
//             <div className="svc__body" id={`svc-${s.id}`}>
//               <div className="svc__art" aria-hidden={!on}>
//                 {img ? <Image src={img} alt="" fill sizes="40vw" /> : <ProceduralArt variant={s.art} hue={s.hue} />}
//               </div>
//               <div className="svc__txt">
//                 <h4 className="svc__name">{s.title}</h4>
//                 <p>{s.blurb}</p>
//                 <ul>{s.items.map((x) => <li key={x}>{x}</li>)}</ul>
//               </div>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }
