import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import travelHero from "@/assets/travel-hero.jpg";
import AppointmentSection from "@/components/AppointmentSection";
import ScrollToTop from "@/components/ScrollToTop";

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <Navbar />
      
      <div className="absolute inset-0">
        <img 
          src={travelHero} 
          alt="Travel destination" 
          className="object-cover w-full h-full"
        />
         <div className="absolute inset-0 bg-gradient-to-r from-primary/60 to-primary/30" />
      </div>
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-white px-6 pt-16">
        <div className="text-center max-w-4xl">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            Your Journey Begins Here
          </h1>
          <p className="text-xl md:text-2xl mb-12 opacity-90 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
            Discover unforgettable destinations, exclusive hotels, and curated tour packages. 
            Your next adventure awaits.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <Button 
              asChild 
              size="lg" 
              className="h-14 px-8 text-lg font-semibold bg-white text-primary hover:bg-white/90"
            >
              <Link to="/register">Get Started</Link>
            </Button>
            <Button 
              asChild 
              size="lg" 
              variant="outline"
              className="h-14 px-8 text-lg font-semibold bg-transparent text-white border-white hover:bg-white/20 hover:text-white"
            >
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </div>

        <div className="absolute bottom-8 left-0 right-0 text-center">
          <p className="text-sm opacity-75">Travel • Hotels • Tour Packages</p>
        </div>
      </div>
      <ScrollToTop/>
    </div>
  );
};

export default Index;
