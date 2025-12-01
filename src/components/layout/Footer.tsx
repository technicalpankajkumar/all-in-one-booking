import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const destinations = [
    "Goa",
    "Kerala",
    "Rajasthan",
    "Andaman",
    "Manali",
    "Ladakh",
  ];

  const quickLinks = [
    "About Us",
    "Contact",
    "FAQs",
    "Terms & Conditions",
    "Privacy Policy",
    "Cancellation Policy",
  ];

  const services = [
    "Domestic Tours",
    "International Tours",
    "Honeymoon Packages",
    "Group Tours",
    "Corporate Tours",
    "Adventure Tours",
  ];

  return (
    <footer className="bg-foreground text-primary-foreground">
      {/* Newsletter Section */}
      <div className="border-b border-primary-foreground/10">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-primary rounded-2xl p-8">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2">Subscribe to Our Newsletter</h3>
              <p className="text-primary-foreground/80">Get exclusive deals, travel tips, and inspiration delivered to your inbox.</p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <Input
                placeholder="Enter your email"
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 min-w-[250px]"
              />
              <Button variant="default">Subscribe</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-gradient-accent rounded-xl flex items-center justify-center">
                <Plane className="h-6 w-6 text-accent-foreground" />
              </div>
              <span className="text-2xl font-bold">TravelEase</span>
            </div>
            <p className="text-primary-foreground/70 mb-6 leading-relaxed">
              Your trusted travel partner for unforgettable experiences. We craft personalized tour packages that combine comfort, adventure, and value.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-primary-foreground/70">
                <MapPin className="h-5 w-5 text-accent" />
                <span>123 Travel Street, Mumbai, India 400001</span>
              </div>
              <div className="flex items-center gap-3 text-primary-foreground/70">
                <Phone className="h-5 w-5 text-accent" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3 text-primary-foreground/70">
                <Mail className="h-5 w-5 text-accent" />
                <span>hello@travelease.com</span>
              </div>
            </div>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Popular Destinations</h4>
            <ul className="space-y-3">
              {destinations.map((destination) => (
                <li key={destination}>
                  <a
                    href="#"
                    className="text-primary-foreground/70 hover:text-accent transition-colors"
                  >
                    {destination}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-primary-foreground/70 hover:text-accent transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <a
                    href="#"
                    className="text-primary-foreground/70 hover:text-accent transition-colors"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-primary-foreground/60 text-sm">
              © {currentYear} AllInOne Tour Hub. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent transition-colors group"
                >
                  <Icon className="h-5 w-5 text-primary-foreground/70 group-hover:text-accent-foreground" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
