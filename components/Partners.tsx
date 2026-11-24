import Image from "next/image";
import { media } from "@/data/media";

const PARTNER_LIST = [
  { key: "SAGA",            label: "SAGA" },
  { key: "SAGA_JAWAI",      label: "Saga Jawai" },
  { key: "RKS",             label: "RKS" },
  { key: "PLUMERIA",        label: "Plumeria" },
  { key: "OLIVE_COURT",     label: "Olive Court" },
  { key: "LEGACY",          label: "Legacy" },
  { key: "LAXMI_LIGHTINGS", label: "Laxmi Lightings" },
  { key: "KUBERGARH",       label: "Kubergarh" },
  { key: "KREQ",            label: "KREQ" },
  { key: "HAPPY_PILLS",     label: "Happy Pills" },
  { key: "GURU_KALA",       label: "Guru Kala" },
  { key: "GARMENT_GURU",    label: "Garment Guru" },
  { key: "EPICO_SOLUTIONS",  label: "Epico Solutions" },
  { key: "ZOSTEL",          label: "Zostel" },
  { key: "UPL",             label: "UPL" },
  { key: "TED_X",           label: "TEDx" },
  { key: "TBT",             label: "TBT" },
  { key: "SWAROOP",         label: "Swaroop" },
  { key: "TREK",            label: "Trek" },
  { key: "DHARTI",          label: "Dharti" },
  { key: "DHANUSH_FIREWORKS", label: "Dhanush Fireworks" },
  { key: "CROWN_CREST",     label: "Crown Crest" },
  { key: "COLD_SWEAT_BAND", label: "Cold Sweat Band" },
  { key: "CAFE_LEAF",       label: "Cafe Leaf" },
  { key: "BLAC_EYE",        label: "Blac Eye" },
  { key: "BEAGLES",         label: "Beagles" },
];

export default function Partners() {
  const row = [...PARTNER_LIST, ...PARTNER_LIST]; // duplicate for seamless marquee loop
  return (
    <div className="partners">
      <div className="partners__head">
        <h3>Brands we&apos;ve worked with</h3>
        <p>Trusted by startups, local legends, and growing businesses.</p>
      </div>
      <div className="marquee" aria-label="Client logos">
        <div className="marquee__track">
          {row.map((p, i) => {
            const src = media.partnerLogos[p.key];
            return (
              <div className="plogo" key={i} aria-hidden={i >= PARTNER_LIST.length}>
                {src ? (
                  <Image
                    src={src}
                    alt={p.label}
                    width={120}
                    height={48}
                    style={{ objectFit: "contain", maxHeight: 48, width: "auto" }}
                    unoptimized
                  />
                ) : (
                  <span>{p.label}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
