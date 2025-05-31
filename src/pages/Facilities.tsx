
import React, { useEffect } from 'react';
import { Building, Wifi, Clipboard, Book, Car, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useData } from '@/contexts/DataContext';
import { Card, CardContent } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { useLanguage } from '@/contexts/LanguageContext';

const Facilities = () => {
  const { facilities } = useData();
  const { t } = useLanguage();
  
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
      title: t('facilities.main.prayer'),
      description: t('facilities.main.prayer.desc')
    },
    {
      icon: <Wifi className="h-10 w-10 text-primary" />,
      title: t('facilities.wifi.title'),
      description: t('facilities.wifi.desc')
    },
    {
      icon: <Clipboard className="h-10 w-10 text-primary" />,
      title: t('facilities.library.title'),
      description: t('facilities.library.desc')
    },
    {
      icon: <Book className="h-10 w-10 text-primary" />,
      title: t('facilities.education.title'),
      description: t('facilities.education.desc')
    },
    {
      icon: <Car className="h-10 w-10 text-primary" />,
      title: t('facilities.parking.title'),
      description: t('facilities.parking.desc')
    },
    {
      icon: <Clock className="h-10 w-10 text-primary" />,
      title: t('facilities.access.title'),
      description: t('facilities.access.desc')
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ 
            backgroundImage: 'url("/lovable-uploads/b616b8d3-28ae-4a1d-929e-303d6df90979.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
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
            {t('facilities.hero.title')}
          </motion.h1>
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto"
          >
            {t('facilities.hero.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Facilities Overview */}
      <section className="section-container">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            {t('facilities.overview.badge')}
          </span>
          <h2 className="section-title mb-4 after:left-1/4 after:w-1/2 mx-auto">{t('facilities.overview.title')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('facilities.overview.subtitle')}
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

      {/* Additional Facilities Grid */}
      <section className="section-container">
        <h2 className="section-title mb-12">{t('facilities.additional.title')}</h2>
        
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
                        alt="Arsitektur Modern" 
                        className="w-full h-full object-cover rounded-t-lg"
                      />
                    </AspectRatio>
                  </div>
                  <CardContent className="flex-1 p-6">
                    <h3 className="text-xl font-bold mb-2 font-heading">Arsitektur Modern</h3>
                    <p className="text-muted-foreground">
                      Masjid kami menampilkan arsitektur Islam kontemporer dengan desain hemat energi dan pola geometris yang indah.
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
                        alt="Aula Komunitas" 
                        className="w-full h-full object-cover rounded-t-lg"
                      />
                    </AspectRatio>
                  </div>
                  <CardContent className="flex-1 p-6">
                    <h3 className="text-xl font-bold mb-2 font-heading">Aula Komunitas Serbaguna</h3>
                    <p className="text-muted-foreground">
                      Ruang serbaguna untuk pertemuan komunitas, workshop, dan acara sosial dengan peralatan audiovisual modern.
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
