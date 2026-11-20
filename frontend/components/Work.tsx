import SceneTransition from "./SceneTransition";
import Portfolio from "./Portfolio";
import Services from "./Services";
import Partners from "./Partners";
import Process from "./Process";

export default function Work() {
  return (
    <SceneTransition id="work" className="work">
      <div className="work__glow" aria-hidden="true" />
      <div className="wrap">
        <h2 className="display work__title">Ideas are easy to say.<br /><span className="it">Harder to ignore.</span></h2>
        <p className="work__sub">Selected work. These are demonstration projects made to show how we think, not real client engagements.</p>
      </div>
      <Portfolio />
      <div className="wrap services-wrap">
        <h3 className="display display--s">What we do.</h3>
        <Services />
        <Process />
        <Partners />
      </div>
    </SceneTransition>
  );
}
