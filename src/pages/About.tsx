import Navbar from "@/components/layout/Navbar";
import { Card } from "@/components/ui/card";
import { Globe, Award, Users, Heart } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Globe,
      title: "Global Reach",
      description: "Connecting travelers to destinations across 150+ countries",
    },
    {
      icon: Award,
      title: "Quality Service",
      description: "Award-winning customer service and travel experiences",
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Dedicated travel experts with years of experience",
    },
    {
      icon: Heart,
      title: "Customer First",
      description: "Your satisfaction and safety are our top priorities",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              About TravelHub
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your trusted partner in creating unforgettable travel experiences
            </p>
          </div>

          <Card className="p-8 mb-12">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold mb-4">Our Story</h2>
              <p className="text-muted-foreground mb-4">
                Founded in 2010, TravelHub has been helping travelers discover the world with ease and confidence. 
                What started as a small travel agency has grown into a comprehensive platform offering cabs, hotels, 
                and curated tour packages to destinations worldwide.
              </p>
              <p className="text-muted-foreground mb-4">
                We believe that travel is more than just visiting new places—it's about creating memories, 
                experiencing different cultures, and connecting with people from all walks of life. That's why 
                we're committed to providing seamless, personalized travel solutions that cater to every traveler's 
                unique needs and preferences.
              </p>
              <p className="text-muted-foreground">
                With over 500,000 satisfied customers and partnerships with the best hotels, airlines, and tour 
                operators globally, we continue to innovate and improve our services to make your travel dreams 
                a reality.
              </p>
            </div>
          </Card>

          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8">Our Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => (
                <Card key={value.title} className="p-6 text-center hover:shadow-medium transition-all">
                  <div className="inline-flex p-4 bg-primary/10 rounded-full mb-4">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </Card>
              ))}
            </div>
          </div>

          <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <p className="text-4xl font-bold text-primary mb-2">500K+</p>
                <p className="text-muted-foreground">Happy Customers</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-primary mb-2">150+</p>
                <p className="text-muted-foreground">Countries Covered</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-primary mb-2">15+</p>
                <p className="text-muted-foreground">Years of Experience</p>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default About;
