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
        <h2 className="display work__title">Transforming ideas into<br /><span className="it">digital success.</span></h2>
        <p className="work__sub">From concept and strategy to design, development, content, and campaign execution — we bring bold ideas to life.</p>
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
