
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Bookmark, 
  Book, 
  Utensils, 
  Wifi, 
  Parking, 
  BookOpen, 
  Users, 
  Home, 
  Clock,
  Search,
  Check
} from 'lucide-react';

const Facilities = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Header Section */}
      <section className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 opacity-20"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1519817650390-64a93db51149?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80")'
          }}
        />
        
        <div className="relative z-10 max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-bold font-heading mb-6"
          >
            Our Facilities
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto"
          >
            Al-Hikma Mosque provides a range of facilities to support worship, education, and community activities in a comfortable and welcoming environment.
          </motion.p>
        </div>
      </section>

      {/* Main Facilities */}
      <section className="section-container">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Our Spaces
          </span>
          <h2 className="section-title mb-4 after:left-1/4 after:w-1/2 mx-auto">Main Facilities</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our purpose-built spaces designed to facilitate worship, learning, and community events.
          </p>
        </div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <motion.div variants={itemVariants} className="glass-panel overflow-hidden rounded-xl flex flex-col">
            <div className="relative h-64">
              <img 
                src="https://images.unsplash.com/photo-1591777327651-b226b98217fc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" 
                alt="Prayer Hall" 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-primary/90 text-white rounded-lg px-4 py-2 text-sm font-medium">
                Main Space
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center text-primary mb-2">
                <Bookmark className="h-5 w-5 mr-2" />
                <span className="font-medium">Prayer Hall</span>
              </div>
              <h3 className="text-2xl font-bold font-heading mb-4">Main Prayer Hall</h3>
              <p className="text-muted-foreground mb-6">
                Our spacious main prayer hall can accommodate up to 500 worshippers. Featuring beautiful calligraphy, natural light, and comfortable carpeting, the space provides a serene environment for daily prayers and Friday congregations.
              </p>
              <div className="flex flex-wrap gap-2 mt-auto">
                <span className="bg-secondary px-3 py-1 rounded-full text-xs">
                  500 capacity
                </span>
                <span className="bg-secondary px-3 py-1 rounded-full text-xs">
                  Air conditioned
                </span>
                <span className="bg-secondary px-3 py-1 rounded-full text-xs">
                  Audio system
                </span>
                <span className="bg-secondary px-3 py-1 rounded-full text-xs">
                  Separate women's area
                </span>
              </div>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="glass-panel overflow-hidden rounded-xl flex flex-col">
            <div className="relative h-64">
              <img 
                src="https://images.unsplash.com/photo-1565022536102-f7f2c7f10e25?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80" 
                alt="Educational Center" 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-primary/90 text-white rounded-lg px-4 py-2 text-sm font-medium">
                Learning
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center text-primary mb-2">
                <Book className="h-5 w-5 mr-2" />
                <span className="font-medium">Education</span>
              </div>
              <h3 className="text-2xl font-bold font-heading mb-4">Educational Center</h3>
              <p className="text-muted-foreground mb-6">
                Our modern educational center houses classrooms for Quran studies, Islamic sciences, and language courses. Equipped with the latest teaching technology, it provides an ideal learning environment for students of all ages.
              </p>
              <div className="flex flex-wrap gap-2 mt-auto">
                <span className="bg-secondary px-3 py-1 rounded-full text-xs">
                  8 classrooms
                </span>
                <span className="bg-secondary px-3 py-1 rounded-full text-xs">
                  Smart boards
                </span>
                <span className="bg-secondary px-3 py-1 rounded-full text-xs">
                  Library access
                </span>
                <span className="bg-secondary px-3 py-1 rounded-full text-xs">
                  Children's area
                </span>
              </div>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="glass-panel overflow-hidden rounded-xl flex flex-col">
            <div className="relative h-64">
              <img 
                src="https://images.unsplash.com/photo-1606836576983-8b458e75221d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80" 
                alt="Community Hall" 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-primary/90 text-white rounded-lg px-4 py-2 text-sm font-medium">
                Community
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center text-primary mb-2">
                <Users className="h-5 w-5 mr-2" />
                <span className="font-medium">Gatherings</span>
              </div>
              <h3 className="text-2xl font-bold font-heading mb-4">Community Hall</h3>
              <p className="text-muted-foreground mb-6">
                Our multi-purpose community hall hosts various events from Eid celebrations to weddings, lectures, and interfaith gatherings. The space is adaptable with modular furniture and state-of-the-art audiovisual equipment.
              </p>
              <div className="flex flex-wrap gap-2 mt-auto">
                <span className="bg-secondary px-3 py-1 rounded-full text-xs">
                  300 capacity
                </span>
                <span className="bg-secondary px-3 py-1 rounded-full text-xs">
                  Kitchen access
                </span>
                <span className="bg-secondary px-3 py-1 rounded-full text-xs">
                  Projector system
                </span>
                <span className="bg-secondary px-3 py-1 rounded-full text-xs">
                  Adaptable space
                </span>
              </div>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="glass-panel overflow-hidden rounded-xl flex flex-col">
            <div className="relative h-64">
              <img 
                src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1290&q=80" 
                alt="Library" 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-primary/90 text-white rounded-lg px-4 py-2 text-sm font-medium">
                Knowledge
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center text-primary mb-2">
                <BookOpen className="h-5 w-5 mr-2" />
                <span className="font-medium">Resources</span>
              </div>
              <h3 className="text-2xl font-bold font-heading mb-4">Islamic Library</h3>
              <p className="text-muted-foreground mb-6">
                Our extensive library contains over 5,000 books covering Islamic studies, history, comparative religion, and general knowledge. It includes rare manuscripts and digital resources, providing a quiet space for research and reading.
              </p>
              <div className="flex flex-wrap gap-2 mt-auto">
                <span className="bg-secondary px-3 py-1 rounded-full text-xs">
                  5,000+ volumes
                </span>
                <span className="bg-secondary px-3 py-1 rounded-full text-xs">
                  Digital catalogs
                </span>
                <span className="bg-secondary px-3 py-1 rounded-full text-xs">
                  Reading areas
                </span>
                <span className="bg-secondary px-3 py-1 rounded-full text-xs">
                  Computer access
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Additional Amenities */}
      <section className="bg-primary/5 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-white text-primary rounded-full text-sm font-medium mb-4">
              Convenience
            </span>
            <h2 className="section-title after:left-1/4 after:w-1/2 mx-auto mb-4">Additional Amenities</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We provide a range of additional amenities to ensure your comfort during your visit.
            </p>
          </div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <motion.div variants={itemVariants} className="glass-panel p-6 hover-scale">
              <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                <Utensils className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2 font-heading">Café & Dining Area</h3>
              <p className="text-muted-foreground">
                Our café offers refreshments and light meals, providing a place for community members to socialize and relax between prayers and activities.
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="glass-panel p-6 hover-scale">
              <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                <Wifi className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2 font-heading">Free Wi-Fi</h3>
              <p className="text-muted-foreground">
                High-speed internet access is available throughout the mosque complex, supporting educational activities and community needs.
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="glass-panel p-6 hover-scale">
              <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                <Parking className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2 font-heading">Ample Parking</h3>
              <p className="text-muted-foreground">
                Our facility includes a large parking area with 200 spaces, including designated areas for disabled access and electric vehicle charging points.
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="glass-panel p-6 hover-scale">
              <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                <Home className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2 font-heading">Ablution Facilities</h3>
              <p className="text-muted-foreground">
                Modern, clean wudu areas for men and women, designed with accessibility features and water-saving technology.
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="glass-panel p-6 hover-scale">
              <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2 font-heading">Extended Hours</h3>
              <p className="text-muted-foreground">
                The mosque is open from Fajr to Isha prayers daily, with extended hours during Ramadan and for special events.
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="glass-panel p-6 hover-scale">
              <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2 font-heading">Information Center</h3>
              <p className="text-muted-foreground">
                Our information desk provides guidance, resources, and assistance to visitors and newcomers to the mosque.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Booking Information */}
      <section className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Availability
            </span>
            <h2 className="section-title mb-6">Facility Booking</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Many of our facilities are available for community use, including the community hall, classrooms, and meeting rooms. We welcome bookings for:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="rounded-full bg-primary/10 p-1 mr-3 mt-1">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <span>Islamic weddings and celebrations</span>
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-primary/10 p-1 mr-3 mt-1">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <span>Educational workshops and seminars</span>
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-primary/10 p-1 mr-3 mt-1">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <span>Community organization meetings</span>
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-primary/10 p-1 mr-3 mt-1">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <span>Interfaith dialogue events</span>
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-primary/10 p-1 mr-3 mt-1">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <span>Charitable and fundraising activities</span>
                </li>
              </ul>
              <p className="mt-4">
                To inquire about availability and rates, please contact our administration office at <span className="text-primary">bookings@alhikma.org</span> or call <span className="text-primary">+1 (555) 123-4567</span>.
              </p>
              <div className="mt-6">
                <button className="btn-primary">
                  Booking Inquiry
                </button>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1470075801209-17f9ec0cada6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80" 
              alt="Facility Booking" 
              className="rounded-2xl shadow-lg w-full h-auto"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Facilities;
