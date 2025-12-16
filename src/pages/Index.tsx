import Navbar from "@/components/layout/Navbar";
import ScrollToTop from "@/components/ScrollToTop";
import HomeHeroSection from "./Hero";

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-primary-foreground">
      <Navbar />
      <HomeHeroSection/>
      
      <ScrollToTop/>
    </div>
  );
};

export default Index;
