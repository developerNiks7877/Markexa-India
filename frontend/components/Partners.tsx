import { partners } from "@/data/services";
/** Logo slots. Replace `partners` in data/services.ts (and render <Image/> here) once real collaborators are confirmed. */
export default function Partners() {
  const row = [...partners, ...partners];
  return (
    <div className="partners">
      <div className="partners__head"><h3>Collaborators</h3><p>Logo slots, awaiting confirmed partners.</p></div>
      <div className="marquee" aria-label="Partner logo placeholders">
        <div className="marquee__track">
          {row.map((p, i) => (
            <div className="plogo" key={i} aria-hidden={i >= partners.length}>
              <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true"><circle cx="13" cy="13" r="11" fill="none" stroke="currentColor" strokeWidth="1.2" /><path d="M7 17 L13 7 L19 17Z" fill="none" stroke="currentColor" strokeWidth="1.2" /></svg>
              {p}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
