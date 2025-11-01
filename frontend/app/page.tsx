import Navbar from "./(layouts)/Navbar";
import Hero from "./(sections)/Hero";
import About from "./(sections)/About";
import Benefits from "./(sections)/Benefits";
import RoutesMap from "./(sections)/RoutesMap";
import Testimonials from "./(sections)/Testimonials";
import JoinForm from "./(sections)/JoinForm";
import Footer from "./(sections)/Footer";

export default function Home() {
  return (
    <main className="min-h-screen font-sans" suppressHydrationWarning>
      <Navbar />
      <Hero />
      <About />
      <Benefits />
      <RoutesMap />
      <Testimonials />
      <JoinForm />
      <Footer />
    </main>
  );
}
