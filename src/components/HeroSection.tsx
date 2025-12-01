import cabImage from "@/assets/hero-bg.jpg";
import hotelImage from "@/assets/hero-hotel.jpg";

interface HeroSectionProps {
  pageType: 'hotel' | 'cab' | "tour"
}

const title = {
    cab:"Book Your Perfect Ride",
    hotel:"Find Your Perfect Stay"
}
const descrip = {
    tour:"Handcrafted travel experiences including hotels, meals, and transport. Your dream vacation starts here.",
    cab:" Choose from our wide range of comfortable and affordable cabs for your journey.",
    hotel:"Discover amazing hotels and resorts for your next adventure."
}

const HeroSection = ({ pageType }: HeroSectionProps) => {
  return (
     <header className="relative h-96 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${pageType == 'cab' ? cabImage :hotelImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40" />
        </div>
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          {pageType == "tour" ? <h1 className="text-5xl font-bold text-white mb-4">Explore the World with <br /><span className="text-accent">Perfect Tour Packages</span></h1>: 
          <h1 className="text-5xl font-bold text-white mb-4">{title[pageType]}</h1>}
           <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto mb-6">
             {descrip[pageType]}
           </p>
        </div>
      </header>
  );
};

export default HeroSection;



















    // <section className="relative h-96 flex items-center justify-center overflow-hidden inset-0 bg-cover bg-center" 
    // style={{ backgroundImage: `url(${heroImage})` }}>
    //     {/* Stats */}
        // <div className="animate-fade-in mt-12 flex flex-wrap justify-center gap-8 md:gap-16" style={{ animationDelay: '0.4s' }}>
        //   {[
        //     { value: '500+', label: 'Tour Packages' },
        //     { value: '50K+', label: 'Happy Travelers' },
        //     { value: '100+', label: 'Destinations' },
        //     { value: '4.9', label: 'Average Rating' },
        //   ].map((stat) => (
        //     <div key={stat.label} className="text-center">
        //       <div className="text-3xl md:text-4xl font-bold text-primary-foreground">{stat.value}</div>
        //       <div className="text-sm text-primary-foreground/70">{stat.label}</div>
        //     </div>
        //   ))}
        // </div>
    //   </div>
    // </section>