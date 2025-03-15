
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, BookOpen, Award, Heart } from 'lucide-react';

const Profile = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section with background image */}
      <section 
        className="relative min-h-[80vh] flex flex-col items-center justify-center bg-cover bg-center px-4 py-20"
        style={{ 
          backgroundImage: 'url("https://lh3.googleusercontent.com/gps-cs-s/AB5caB8Y7V3K7FkcufDmkIYzDVbxZRCiseUnWZgwpVn813DtaGKVn9CRxeaD9eJ_hDaRkBel6phxcw6sE-JtWx40ywvTpPjYvMyYFfQwEWBVUozEvja9FK3k1W-JPzy7qrNye1C9xCa4sQ=s1360-w1360-h1020")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-6xl font-bold text-white mb-6"
          >
            About At_Tauhid Mosque
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto"
          >
            Established in 1985, At_Tauhid Mosque has been serving the community for nearly four decades with a commitment to spirituality, education, and social service.
          </motion.p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.2 }}
            className="order-2 lg:order-1"
          >
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Our Journey
            </span>
            <h2 className="section-title mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                At_Tauhid Mosque began as a small prayer space in a community center in 1985. Founded by a group of 12 families who saw the need for a dedicated Islamic center in the growing Muslim community.
              </p>
              <p>
                Over the years, with the support of our community and generous donors, we expanded to our current location in 1995. The beautiful building we occupy today was completed in 2005 after extensive renovations and expansions.
              </p>
              <p>
                Today, At_Tauhid serves thousands of Muslims in the area, providing not only a place for worship but also a community hub for education, social services, and cultural activities.
              </p>
              <p>
                Our name "At_Tauhid" (The Oneness) reflects our commitment to education and thoughtful application of Islamic principles in contemporary life.
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.2 }}
            className="order-1 lg:order-2"
          >
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80" 
                alt="Mosque Building" 
                className="rounded-2xl shadow-lg w-full h-96 object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-primary/10 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="font-medium">Serving since 1985</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Mission & Values */}
      <section className="bg-primary/5 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-white text-primary rounded-full text-sm font-medium mb-4">
              Our Purpose
            </span>
            <h2 className="section-title after:left-1/4 after:w-1/2 mx-auto mb-4">Mission & Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our mission and values guide everything we do at At_Tauhid Mosque.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, amount: 0.2 }}
              className="glass-panel p-8"
            >
              <h3 className="text-2xl font-bold font-heading mb-4">Our Mission</h3>
              <p className="text-muted-foreground mb-6">
                To provide a welcoming space for worship, education, and community service based on Islamic principles, fostering spiritual growth and social harmony.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="rounded-full bg-primary/10 p-1 mr-3 mt-1">
                    <Award className="h-4 w-4 text-primary" />
                  </div>
                  <span>Provide authentic Islamic education for all ages</span>
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-primary/10 p-1 mr-3 mt-1">
                    <Award className="h-4 w-4 text-primary" />
                  </div>
                  <span>Establish a vibrant community center for Muslims</span>
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-primary/10 p-1 mr-3 mt-1">
                    <Award className="h-4 w-4 text-primary" />
                  </div>
                  <span>Promote interfaith dialogue and understanding</span>
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-primary/10 p-1 mr-3 mt-1">
                    <Award className="h-4 w-4 text-primary" />
                  </div>
                  <span>Support social welfare initiatives in the wider community</span>
                </li>
              </ul>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true, amount: 0.2 }}
              className="glass-panel p-8"
            >
              <h3 className="text-2xl font-bold font-heading mb-4">Our Values</h3>
              <p className="text-muted-foreground mb-6">
                Our core values are rooted in Islamic teachings and guide our operations and interactions.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="rounded-full bg-primary/10 p-1 mr-3 mt-1">
                    <Heart className="h-4 w-4 text-primary" />
                  </div>
                  <span>Compassion and respect for all people</span>
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-primary/10 p-1 mr-3 mt-1">
                    <Heart className="h-4 w-4 text-primary" />
                  </div>
                  <span>Excellence in service and education</span>
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-primary/10 p-1 mr-3 mt-1">
                    <Heart className="h-4 w-4 text-primary" />
                  </div>
                  <span>Inclusivity and openness to all</span>
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-primary/10 p-1 mr-3 mt-1">
                    <Heart className="h-4 w-4 text-primary" />
                  </div>
                  <span>Integrity and transparency in all operations</span>
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-primary/10 p-1 mr-3 mt-1">
                    <Heart className="h-4 w-4 text-primary" />
                  </div>
                  <span>Balance between tradition and contemporary needs</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="section-container">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Our Team
          </span>
          <h2 className="section-title mb-4 after:left-1/4 after:w-1/2 mx-auto">Leadership</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Meet the dedicated individuals who lead our mosque and community.
          </p>
        </div>
        
        <motion.div 
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <motion.div 
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: {
                y: 0,
                opacity: 1,
                transition: { duration: 0.5 }
              }
            }} 
            className="glass-panel p-6 text-center hover-scale"
          >
            <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" 
                alt="Imam Ahmad" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-bold font-heading mb-1">Imam Ahmad Rashid</h3>
            <p className="text-primary text-sm mb-3">Head Imam</p>
            <p className="text-muted-foreground text-sm">
              Leading our congregation since 2010, Imam Ahmad is a graduate of Al-Azhar University with a focus on comparative religious studies.
            </p>
          </motion.div>
          
          <motion.div 
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: {
                y: 0,
                opacity: 1,
                transition: { duration: 0.5 }
              }
            }}
            className="glass-panel p-6 text-center hover-scale"
          >
            <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" 
                alt="Dr. Fatima" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-bold font-heading mb-1">Dr. Fatima Hassan</h3>
            <p className="text-primary text-sm mb-3">Education Director</p>
            <p className="text-muted-foreground text-sm">
              Dr. Fatima oversees our educational programs, bringing her experience as a professor of Islamic Studies and childhood education expert.
            </p>
          </motion.div>
          
          <motion.div 
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: {
                y: 0,
                opacity: 1,
                transition: { duration: 0.5 }
              }
            }}
            className="glass-panel p-6 text-center hover-scale"
          >
            <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
                alt="Mr. Omar" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-bold font-heading mb-1">Mr. Omar Khan</h3>
            <p className="text-primary text-sm mb-3">Board President</p>
            <p className="text-muted-foreground text-sm">
              A founding member of At_Tauhid, Omar has helped guide our mosque's growth for over 30 years with his business acumen and community vision.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Community Stats */}
      <section className="bg-primary/5 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.2 }}
            className="glass-panel rounded-xl px-6 py-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div>
                <div className="flex justify-center">
                  <div className="rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mb-4">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold mb-2">5,000+</h3>
                <p className="text-muted-foreground">Community Members</p>
              </div>
              
              <div>
                <div className="flex justify-center">
                  <div className="rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mb-4">
                    <Calendar className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold mb-2">39</h3>
                <p className="text-muted-foreground">Years of Service</p>
              </div>
              
              <div>
                <div className="flex justify-center">
                  <div className="rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mb-4">
                    <BookOpen className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold mb-2">25+</h3>
                <p className="text-muted-foreground">Educational Programs</p>
              </div>
              
              <div>
                <div className="flex justify-center">
                  <div className="rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mb-4">
                    <Heart className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold mb-2">100+</h3>
                <p className="text-muted-foreground">Community Events Yearly</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
