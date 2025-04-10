
import React, { useEffect } from 'react';
import { Building, Wifi, Clipboard, Book, Car, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useData } from '@/contexts/DataContext';
import { Card, CardContent } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const Facilities = () => {
  const { facilities } = useData();
  
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

  const mainFacilities = [
    {
      icon: <Building className="h-10 w-10 text-primary" />,
      title: "Main Prayer Hall",
      description: "Spacious prayer hall that can accommodate up to 1,000 worshippers with comfortable prayer mats and excellent acoustics."
    },
    {
      icon: <Wifi className="h-10 w-10 text-primary" />,
      title: "Free Wi-Fi",
      description: "High-speed internet access throughout the mosque premises for educational and research purposes."
    },
    {
      icon: <Clipboard className="h-10 w-10 text-primary" />,
      title: "Islamic Library",
      description: "Extensive collection of Islamic books, references, and digital resources available for reading and borrowing."
    },
    {
      icon: <Book className="h-10 w-10 text-primary" />,
      title: "Education Center",
      description: "Dedicated classrooms for Quran recitation, Islamic studies, and Arabic language courses for all age groups."
    },
    {
      icon: <Car className="h-10 w-10 text-primary" />,
      title: "Parking Area",
      description: "Large parking area with 200+ parking spaces, including designated spots for disabled visitors."
    },
    {
      icon: <Clock className="h-10 w-10 text-primary" />,
      title: "24/7 Access",
      description: "The mosque remains open 24 hours for prayers, with security personnel present at all times."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1496307653780-42ee777d4833?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
            filter: 'brightness(0.4)'
          }}
        />
        
        <div className="relative z-10 text-center max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-white font-heading mb-6"
          >
            Our Facilities
          </motion.h1>
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto"
          >
            At_Tauhid Mosque offers modern facilities to ensure a comfortable and enriching experience for all visitors.
          </motion.p>
        </div>
      </section>

      {/* Facilities Overview */}
      <section className="section-container">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Modern Amenities
          </span>
          <h2 className="section-title mb-4 after:left-1/4 after:w-1/2 mx-auto">What We Offer</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our mosque is equipped with a variety of facilities to serve the needs of our community members and visitors.
          </p>
        </div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {mainFacilities.map((facility, index) => (
            <motion.div 
              key={index}
              variants={itemVariants} 
              className="glass-panel p-6 hover-scale"
            >
              <div className="rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mb-4">
                {facility.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 font-heading">{facility.title}</h3>
              <p className="text-muted-foreground">{facility.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Featured Facility */}
      <section className="bg-primary/5 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.2 }}
            className="glass-panel overflow-hidden rounded-xl flex flex-col md:flex-row"
          >
            <div className="md:w-1/2 relative">
              <img 
                src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=1171&q=80" 
                alt="Main Prayer Hall" 
                className="w-full h-64 md:h-full object-cover object-center"
              />
            </div>
            
            <div className="p-6 md:p-8 md:w-1/2 flex flex-col justify-center">
              <h3 className="text-2xl md:text-3xl font-bold font-heading mb-4">State-of-the-art Prayer Hall</h3>
              <p className="text-muted-foreground mb-6">
                Our main prayer hall is designed to create a peaceful atmosphere for worship. With excellent acoustics, temperature control, and natural lighting, it provides an ideal environment for prayer and contemplation.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <div className="rounded-full bg-primary/20 p-1 mr-3">
                    <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Accommodates up to 1,000 worshippers</span>
                </li>
                <li className="flex items-center">
                  <div className="rounded-full bg-primary/20 p-1 mr-3">
                    <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Premium quality prayer mats</span>
                </li>
                <li className="flex items-center">
                  <div className="rounded-full bg-primary/20 p-1 mr-3">
                    <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Advanced sound system</span>
                </li>
                <li className="flex items-center">
                  <div className="rounded-full bg-primary/20 p-1 mr-3">
                    <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Climate controlled environment</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Additional Facilities Grid - Updated to match Photo Gallery format */}
      <section className="section-container">
        <h2 className="section-title mb-12">Additional Amenities</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.length > 0 ? (
            facilities.map((facility) => (
              <motion.div 
                key={facility.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, amount: 0.2 }}
                className="glass-panel overflow-hidden rounded-xl"
              >
                <Card className="h-full flex flex-col">
                  <div className="relative">
                    <AspectRatio ratio={4/3}>
                      <img 
                        src={facility.imageUrl || "https://images.unsplash.com/photo-1439337153520-7082a56a81f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1171&q=80"} 
                        alt={facility.name} 
                        className="w-full h-full object-cover rounded-t-lg"
                      />
                    </AspectRatio>
                  </div>
                  <CardContent className="flex-1 p-6">
                    <h3 className="text-xl font-bold mb-2 font-heading">{facility.name}</h3>
                    <p className="text-muted-foreground">
                      {facility.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, amount: 0.2 }}
                className="glass-panel overflow-hidden rounded-xl"
              >
                <Card className="h-full flex flex-col">
                  <div className="relative">
                    <AspectRatio ratio={4/3}>
                      <img 
                        src="https://images.unsplash.com/photo-1439337153520-7082a56a81f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1171&q=80" 
                        alt="Modern Architecture" 
                        className="w-full h-full object-cover rounded-t-lg"
                      />
                    </AspectRatio>
                  </div>
                  <CardContent className="flex-1 p-6">
                    <h3 className="text-xl font-bold mb-2 font-heading">Modern Architecture</h3>
                    <p className="text-muted-foreground">
                      Our mosque features contemporary Islamic architecture with energy-efficient design and beautiful geometric patterns.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, amount: 0.2 }}
                className="glass-panel overflow-hidden rounded-xl"
              >
                <Card className="h-full flex flex-col">
                  <div className="relative">
                    <AspectRatio ratio={4/3}>
                      <img 
                        src="https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=1171&q=80" 
                        alt="Community Hall" 
                        className="w-full h-full object-cover rounded-t-lg"
                      />
                    </AspectRatio>
                  </div>
                  <CardContent className="flex-1 p-6">
                    <h3 className="text-xl font-bold mb-2 font-heading">Multipurpose Community Hall</h3>
                    <p className="text-muted-foreground">
                      A versatile space for community gatherings, workshops, and social events with modern audiovisual equipment.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Facilities;
