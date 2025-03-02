
import React from 'react';
import { Heart, Mail, MapPin, Phone, ExternalLink, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary/5 border-t border-primary/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Mosque Information */}
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center space-x-2">
              <Sun className="h-8 w-8 text-primary" />
              <h3 className="font-heading text-xl font-bold">Al-Hikma Mosque</h3>
            </div>
            <p className="text-muted-foreground">A place of worship, learning, and community.</p>
            <div className="flex flex-col space-y-2 text-sm">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-0.5 text-primary" />
                <span>123 Peace Avenue, Harmony City, 12345</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-primary" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-primary" />
                <span>info@alhikma.org</span>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4 animate-fade-in [animation-delay:200ms]">
            <h3 className="font-heading text-xl font-bold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="flex items-center hover:text-primary transition-colors">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/profile" className="flex items-center hover:text-primary transition-colors">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/facilities" className="flex items-center hover:text-primary transition-colors">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Facilities
                </Link>
              </li>
              <li>
                <Link to="/activities" className="flex items-center hover:text-primary transition-colors">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Prayer Times
                </Link>
              </li>
              <li>
                <Link to="/contact" className="flex items-center hover:text-primary transition-colors">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Prayer Times */}
          <div className="space-y-4 animate-fade-in [animation-delay:400ms]">
            <h3 className="font-heading text-xl font-bold">Prayer Times</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Fajr</span>
                <span>5:30 AM</span>
              </div>
              <div className="flex justify-between">
                <span>Dhuhr</span>
                <span>12:30 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Asr</span>
                <span>3:45 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Maghrib</span>
                <span>6:30 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Isha</span>
                <span>8:00 PM</span>
              </div>
              <div className="mt-4 text-muted-foreground italic">
                *Prayer times updated daily
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-primary/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground order-2 md:order-1">
            &copy; {currentYear} Al-Hikma Mosque. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center mb-4 md:mb-0 order-1 md:order-2">
            Made with <Heart className="w-4 h-4 mx-1 text-red-500" /> for our community
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
