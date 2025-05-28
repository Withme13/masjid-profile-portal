
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Map, Users, BookOpen, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const { t } = useLanguage();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const heroVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } }
  };

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
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={heroVariants}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ 
            backgroundImage: 'url("/lovable-uploads/9b43433c-52f5-46f4-8443-5e29596085a9.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: 'brightness(0.4)'
          }}
        />
        
        {/* Overlay gradient for better text visibility */}
        <div 
          className="absolute inset-0 z-0 bg-gradient-to-b from-black/60 to-black/40"
        />
        
        <div className="relative z-10 text-center max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-white font-heading mb-6"
          >
            {t('home.hero.title')}
          </motion.h1>
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto"
          >
            {t('home.hero.subtitle')}
          </motion.p>
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link to="/profile" className="btn-primary">
              {t('home.hero.learn')}
            </Link>
            <Link to="/contact" className="btn-outline text-white border-white hover:bg-white/10">
              {t('home.hero.contact')}
            </Link>
          </motion.div>
        </div>
        
        <div className="absolute bottom-10 left-0 right-0 flex justify-center">
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-white cursor-pointer"
            onClick={() => window.scrollTo({
              top: window.innerHeight,
              behavior: 'smooth'
            })}
          >
            <ArrowRight className="h-6 w-6 transform rotate-90" />
          </motion.div>
        </div>
      </motion.section>

      {/* Main Features Section */}
      <section className="section-container">
        
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            {t('home.community.badge')}
          </span>
          <h2 className="section-title mb-4 after:left-1/4 after:w-1/2 mx-auto">{t('home.community.title')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('home.community.subtitle')}
          </p>
        </div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <motion.div variants={itemVariants} className="glass-panel p-6 hover-scale">
            <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2 font-heading">{t('home.education.title')}</h3>
            <p className="text-muted-foreground">
              {t('home.education.desc')}
            </p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="glass-panel p-6 hover-scale">
            <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2 font-heading">{t('home.prayer.title')}</h3>
            <p className="text-muted-foreground">
              {t('home.prayer.desc')}
            </p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="glass-panel p-6 hover-scale">
            <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2 font-heading">{t('home.support.title')}</h3>
            <p className="text-muted-foreground">
              {t('home.support.desc')}
            </p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="glass-panel p-6 hover-scale">
            <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
              <Map className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2 font-heading">{t('home.culture.title')}</h3>
            <p className="text-muted-foreground">
              {t('home.culture.desc')}
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Upcoming Event */}
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
                src="https://images.unsplash.com/photo-1564939558297-fc396f18e5c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80" 
                alt="Upcoming Event" 
                className="w-full h-64 md:h-full object-cover object-center"
              />
              <div className="absolute top-4 left-4 bg-primary/90 text-white rounded-lg px-4 py-2 text-sm font-medium">
                {t('home.event.badge')}
              </div>
            </div>
            
            <div className="p-6 md:p-8 md:w-1/2 flex flex-col justify-center">
              <div className="flex items-center text-primary mb-4">
                <Calendar className="h-5 w-5 mr-2" />
                <span className="text-sm font-medium">{t('home.event.date')}</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold font-heading mb-4">{t('home.event.title')}</h3>
              <p className="text-muted-foreground mb-6">
                {t('home.event.desc')}
              </p>
              <div className="mt-auto">
                <Link to="/activities" className="btn-primary inline-flex items-center">
                  {t('home.event.view')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 opacity-20"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1542379653-b38a3a8bfeb7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80")'
          }}
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.2 }}
          className="relative z-10 max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">{t('home.cta.title')}</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
            {t('home.cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/contact" className="btn-primary">
              {t('home.cta.contact')}
            </Link>
            <Link to="/activities" className="btn-outline">
              {t('home.cta.programs')}
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Index;
