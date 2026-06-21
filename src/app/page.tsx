import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Introduction from "@/components/Introduction";
import SelectedWork from "@/components/SelectedWork";
import About from "@/components/About";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="w-full flex flex-col items-center justify-center overflow-x-hidden">
      <Navigation />
      <Hero />
      <Introduction />
      <SelectedWork />
      <About />
      <Footer />
    </main>
  );
}
