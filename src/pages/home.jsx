import Hero from "@/components/Hero";
import About from "@/components/About";
import Features from "@/components/Features";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen  flex flex-col bg-background">
      <main className="flex-1">
        <Hero />
        <About />
        <Features />
      </main>
      <Footer />
    </div>
  );
}
