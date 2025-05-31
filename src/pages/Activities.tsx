
import React, { useState, useEffect } from 'react';
import { Calendar, BookOpen, Users, Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import { useData } from '@/contexts/DataContext';
import { Button } from '@/components/ui/button';
import ActivityRegistrationModal from '@/components/ActivityRegistrationModal';

const Activities = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<{id: string, name: string} | null>(null);
  const { activities } = useData();
  
  // Create activity types mapping to classify activities
  const getActivityType = (name: string, description: string) => {
    const nameAndDesc = (name + ' ' + description).toLowerCase();
    
    if (nameAndDesc.includes('prayer') || nameAndDesc.includes('sermon') || nameAndDesc.includes('eid')) {
      return 'prayer';
    } else if (nameAndDesc.includes('class') || nameAndDesc.includes('study') || nameAndDesc.includes('quran') || nameAndDesc.includes('education') || nameAndDesc.includes('lecture')) {
      return 'education';
    } else if (nameAndDesc.includes('youth') || nameAndDesc.includes('young')) {
      return 'youth';
    } else if (nameAndDesc.includes('charity') || nameAndDesc.includes('community') || nameAndDesc.includes('iftar')) {
      return 'community';
    }
    
    return 'community'; // Default type
  };

  function getDefaultImage(type: string) {
    switch(type) {
      case 'prayer':
        return "https://images.unsplash.com/photo-1564939558297-fc396f18e5c7?auto=format&fit=crop&w=1171&q=80";
      case 'education':
        return "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=1171&q=80";
      case 'community':
        return "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1171&q=80";
      case 'youth':
        return "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1171&q=80";
      default:
        return "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=1171&q=80";
    }
  }

  const transformedActivities = activities.map(activity => {
    const type = getActivityType(activity.name, activity.description || '');
    
    console.log(`Activity: ${activity.name}, Image URL: ${activity.imageUrl}`);
    
    return {
      id: activity.id,
      title: activity.name,
      description: activity.description || '',
      date: activity.date,
      type: type,
      image: activity.imageUrl && activity.imageUrl.trim() !== '' 
        ? activity.imageUrl 
        : getDefaultImage(type)
    };
  });

  const filteredActivities = transformedActivities.filter(activity => {
    const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          activity.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || activity.type === filter;
    
    return matchesSearch && matchesFilter;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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

  const handleRegisterClick = (activity: {id: string, title: string}) => {
    setSelectedActivity({id: activity.id, name: activity.title});
    setIsRegistrationModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsRegistrationModalOpen(false);
    setSelectedActivity(null);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ 
            backgroundImage: 'url("/lovable-uploads/5ae82c25-a1ce-459c-b23e-779b56c24df9.png")',
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
            Aktivitas Kami
          </motion.h1>
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto"
          >
            Bergabunglah bersama kami dalam berbagai kegiatan kajian, pendidikan, dan komunitas sepanjang tahun.
          </motion.p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Cari Aktivitas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <span className="text-sm font-medium">Filter by:</span>
              <select
                className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">Semua Aktivitas</option>
                <option value="prayer">Prayer</option>
                <option value="education">Education</option>
                <option value="community">Community</option>
                <option value="youth">Youth</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Activities List */}
      <section className="section-container">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Bergabung Bersama Kami
          </span>
          <h2 className="section-title mb-4 after:left-1/4 after:w-1/2 mx-auto">Kegiatan Mendatang</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Jelajahi acara dan program kami yang akan datang. Semua kegiatan terbuka untuk komunitas kecuali ditentukan lain.
          </p>
        </div>
        
        {filteredActivities.length === 0 ? (
          <div className="text-center py-16">
            <div className="mb-4">
              <Calendar className="h-12 w-12 mx-auto text-gray-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">Tidak Ada Aktivitas yang Ditemukan</h3>
            <p className="text-muted-foreground">
             Tidak ada kegiatan yang cocok dengan kriteria pencarian dan filter Anda saat ini. Coba sesuaikan pencarian Anda atau periksa kembali nanti.
            </p>
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredActivities.map((activity) => (
              <motion.div 
                key={activity.id}
                variants={itemVariants}
                className="glass-panel overflow-hidden rounded-xl hover-scale"
              >
                <div className="relative h-48">
                  <img 
                    src={activity.image} 
                    alt={activity.title} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      console.error(`Failed to load image: ${activity.image}`);
                      const target = e.target as HTMLImageElement;
                      target.src = getDefaultImage(activity.type);
                    }}
                  />
                  <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 text-xs font-medium">
                    {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center text-primary mb-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">{format(parseISO(activity.date), 'MMMM d, yyyy')}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 font-heading">{activity.title}</h3>
                  <p className="text-muted-foreground mb-4">{activity.description}</p>
                  
                  <Button 
                    onClick={() => handleRegisterClick(activity)}
                    className="w-full bg-primary hover:bg-primary/90 text-white"
                  >
                    Daftar
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      {/* Regular Programs */}
      <section className="bg-primary/5 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title mb-4 after:left-1/4 after:w-1/2 mx-auto">Program Reguler</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Selain acara khusus kami, kami menawarkan program reguler ini sepanjang minggu.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, amount: 0.2 }}
              className="glass-panel p-6"
            >
              <div className="flex items-start">
                <div className="mr-4">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 font-heading">Kelas Quran Harian</h3>
                  <p className="text-muted-foreground mb-4">
                    Belajar membaca Al-Quran yang benar dengan kaidah tajwid. Kelas tersedia untuk semua kelompok usia dan tingkat kemahiran.
                  </p>
                  <div className="bg-primary/5 p-3 rounded-lg">
                    <p className="font-medium mb-1">Jadwal:</p>
                    <ul className="text-sm space-y-1">
                      <li>Pemula: Senin & Rabu, 18:00 - 19:30</li>
                      <li>Tingkat Menengah: Selasa & Kamis, 18:00 - 19:30</li>
                      <li>Tingkat Lanjut: Sabtu, pukul 10:00 - 12:00 siang</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, amount: 0.2 }}
              className="glass-panel p-6"
            >
              <div className="flex items-start">
                <div className="mr-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 font-heading">Halaqah Kajian Mingguan</h3>
                  <p className="text-muted-foreground mb-4">
                    Bergabunglah dengan halaqah mingguan kami di mana kami mendiskusikan berbagai topik keislaman, isu-isu kontemporer, dan pengembangan pemahaman agama.
                  </p>
                  <div className="bg-primary/5 p-3 rounded-lg">
                    <p className="font-medium mb-1">Jadwal:</p>
                    <ul className="text-sm space-y-1">
                      <li>Akhwat: Minggu, 11:00 - 12:30 siang</li>
                      <li>Ikhwan: Minggu, pukul 14.00 - 15.30</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-container">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">Ingin Mengusulkan Kegiatan?</h2>
          <p className="text-lg text-muted-foreground mb-8">
           Kami selalu terbuka untuk ide-ide baru yang dapat bermanfaat bagi komunitas kami. Jika Anda memiliki saran untuk kegiatan atau program, silakan bagikan dengan kami.
          </p>
          <button className="btn-primary inline-flex items-center">
           Hubungi Kami
            <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </motion.div>
      </section>

      {/* Registration Modal */}
      {selectedActivity && (
        <ActivityRegistrationModal
          isOpen={isRegistrationModalOpen}
          onClose={handleCloseModal}
          activityName={selectedActivity.name}
          activityId={selectedActivity.id}
        />
      )}
    </div>
  );
};

export default Activities;
