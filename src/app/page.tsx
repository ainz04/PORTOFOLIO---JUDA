import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Experience from "@/components/Experience";
import TechStack from "@/components/TechStack";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Preloader />

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 text-black opacity-[0.04] dark:text-white dark:opacity-[0.05]"
      >
        <div
          className="grid-pattern absolute inset-0"
          style={{ color: "currentColor" }}
        />
      </div>

      <Navbar />

      <main className="relative z-10">
        <Hero />
        <Marquee />
        <About />
        <Experience />
        <TechStack />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
