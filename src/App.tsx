import Nav from './sections/Nav';
import Hero from './sections/Hero';
import Showcase from './sections/Showcase';
import Services from './sections/Services';
import Allies from './sections/Allies';
import Process from './sections/Process';
import Gallery from './sections/Gallery';
import Faq from './sections/Faq';
import WebPromo from './sections/WebPromo';
import { Contact, Footer, WhatsAppFloat } from './sections/Contact';

export default function App() {
  return (
    <>
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <Nav />
      <main id="contenido">
        <Hero />
        <Gallery />
        <Showcase />
        <Services />
        <Allies />
        <Process />
        <Faq />
        <Contact />
        <WebPromo />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
