
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, BookOpen, Award, Heart } from 'lucide-react';
import { useData } from '@/contexts/DataContext';

const Profile = () => {
  const { leadership } = useData();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section with background image */}
      <section 
        className="relative min-h-[80vh] flex flex-col items-center justify-center bg-cover bg-center px-4 py-20"
        style={{ 
          backgroundImage: 'url("/lovable-uploads/65c78719-8577-46da-b5b4-2816088aa6b6.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'brightness(0.9)'
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
            Tentang At_Tauhid Mosque
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto"
          >
            Didirikan pada tahun 1985, Masjid At_Tauhid telah melayani masyarakat selama hampir empat dekade dengan komitmen terhadap kerohanian, pendidikan, dan pelayanan sosial.
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
              Perjalanan Kami
            </span>
            <h2 className="section-title mb-6">Kisah Kami</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Masjid At_Tauhid dimulai sebagai ruang shalat kecil di pusat komunitas pada tahun 1985. Didirikan oleh keluarga yang melihat kebutuhan akan pusat Islam yang berdedikasi dalam komunitas Muslim yang sedang berkembang.
              </p>
              <p>
                Selama bertahun-tahun, dengan dukungan dari komunitas kami dan para donatur yang dermawan, kami memperluas lokasi kami saat ini pada tahun 1995. Bangunan indah yang kami tempati saat ini selesai dibangun pada tahun 2005 setelah renovasi dan perluasan yang ekstensif.
              </p>
              <p>
                Saat ini, At_Tauhid melayani ribuan umat Islam di daerah tersebut, tidak hanya menyediakan tempat untuk beribadah tetapi juga sebagai pusat komunitas untuk pendidikan, layanan sosial, dan kegiatan budaya.
              </p>
              <p>
               Nama kami "At_Tauhid" (Keesaan) mencerminkan komitmen kami terhadap pendidikan dan penerapan prinsip-prinsip Islam yang bijaksana dalam kehidupan kontemporer.
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
                src="/lovable-uploads/fb100253-af39-4824-9a45-7c82e19583ee.png" 
                alt="Mosque Building" 
                className="rounded-2xl shadow-lg w-full h-96 object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-primary/10 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="font-medium">Melayani Sejak 1985</span>
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
              Tujuan Kami
            </span>
            <h2 className="section-title after:left-1/4 after:w-1/2 mx-auto mb-4">Misi & Nilai</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
             Misi dan nilai-nilai kami memandu semua yang kami lakukan di Masjid At_Tauhid.
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
              <h3 className="text-2xl font-bold font-heading mb-4">Misi Kami</h3>
              <p className="text-muted-foreground mb-6">
               Menyediakan tempat yang ramah untuk beribadah, pendidikan, dan pelayanan masyarakat berdasarkan prinsip-prinsip Islam, mendorong pertumbuhan spiritual dan keharmonisan sosial.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="rounded-full bg-primary/10 p-1 mr-3 mt-1">
                    <Award className="h-4 w-4 text-primary" />
                  </div>
                  <span>Menyediakan pendidikan Islam yang otentik untuk segala usia</span>
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-primary/10 p-1 mr-3 mt-1">
                    <Award className="h-4 w-4 text-primary" />
                  </div>
                  <span>Membangun pusat komunitas yang dinamis bagi umat Islam</span>
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-primary/10 p-1 mr-3 mt-1">
                    <Award className="h-4 w-4 text-primary" />
                  </div>
                  <span>Mempromosikan dialog dan pemahaman antar agama</span>
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-primary/10 p-1 mr-3 mt-1">
                    <Award className="h-4 w-4 text-primary" />
                  </div>
                  <span>Mendukung inisiatif kesejahteraan sosial di masyarakat luas</span>
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
              <h3 className="text-2xl font-bold font-heading mb-4">Nilai-Nilai Kami</h3>
              <p className="text-muted-foreground mb-6">
                Nilai-nilai inti kami berakar pada ajaran Islam dan memandu operasi dan interaksi kami.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="rounded-full bg-primary/10 p-1 mr-3 mt-1">
                    <Heart className="h-4 w-4 text-primary" />
                  </div>
                  <span>Belas kasih dan rasa hormat kepada semua orang</span>
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-primary/10 p-1 mr-3 mt-1">
                    <Heart className="h-4 w-4 text-primary" />
                  </div>
                  <span>Keunggulan dalam pelayanan dan pendidikan</span>
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-primary/10 p-1 mr-3 mt-1">
                    <Heart className="h-4 w-4 text-primary" />
                  </div>
                  <span>Inklusifitas dan keterbukaan kepada semua</span>
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-primary/10 p-1 mr-3 mt-1">
                    <Heart className="h-4 w-4 text-primary" />
                  </div>
                  <span>Integritas dan transparansi dalam semua kegiatan</span>
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-primary/10 p-1 mr-3 mt-1">
                    <Heart className="h-4 w-4 text-primary" />
                  </div>
                  <span>Keseimbangan antara tradisi dan kebutuhan kontemporer</span>
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
            Tim Kami
          </span>
          <h2 className="section-title mb-4 after:left-1/4 after:w-1/2 mx-auto">Kepemimpinan</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Temui individu-individu berdedikasi yang memimpin masjid dan komunitas kami.
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
          {leadership.length > 0 ? (
            leadership.map((member) => (
              <motion.div 
                key={member.id}
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
                    src={member.imageUrl} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://via.placeholder.com/150";
                    }}
                  />
                </div>
                <h3 className="text-xl font-bold font-heading mb-1">{member.name}</h3>
                <p className="text-primary text-sm mb-3">{member.position}</p>
                <p className="text-muted-foreground text-sm">
                  {member.education}
                </p>
              </motion.div>
            ))
          ) : (
            // Display 3 placeholder profiles if no leadership data is available
            <>
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
            </>
          )}
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
                <h3 className="text-3xl font-bold mb-2">500+</h3>
                <p className="text-muted-foreground">Anggota Komunitas</p>
              </div>
              
              <div>
                <div className="flex justify-center">
                  <div className="rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mb-4">
                    <Calendar className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold mb-2">39</h3>
                <p className="text-muted-foreground">Yahun Pelayanan</p>
              </div>
              
              <div>
                <div className="flex justify-center">
                  <div className="rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mb-4">
                    <BookOpen className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold mb-2">15+</h3>
                <p className="text-muted-foreground">Program Edukasi</p>
              </div>
              
              <div>
                <div className="flex justify-center">
                  <div className="rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mb-4">
                    <Heart className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold mb-2">50+</h3>
                <p className="text-muted-foreground">Acara Komunitas Tahunan</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
