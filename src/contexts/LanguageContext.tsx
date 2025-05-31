
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: 'en' | 'id';
  setLanguage: (lang: 'en' | 'id') => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.profile': 'Profile',
    'nav.facilities': 'Facilities',
    'nav.activities': 'Activities',
    'nav.media-center': 'Media Center',
    'nav.contact': 'Contact',
    
    // Home Page
    'home.hero.title': 'Welcome to At_Tauhid Mosque',
    'home.hero.subtitle': 'A place of worship, learning, and community service. Join us in our journey of faith, knowledge, and compassion.',
    'home.hero.learn': 'Learn About Us',
    'home.hero.contact': 'Get in Touch',
    'home.community.badge': 'Our Community',
    'home.community.title': 'What We Offer',
    'home.community.subtitle': 'At_Tauhid Mosque is more than just a place of worship. We are a community hub offering various services and activities.',
    'home.education.title': 'Islamic Education',
    'home.education.desc': 'Classes for all ages, teaching Quran, Hadith, and Islamic principles in a modern context.',
    'home.prayer.title': 'Prayer Services',
    'home.prayer.desc': 'Daily prayers, Friday sermons, and special Ramadan and Eid celebrations.',
    'home.support.title': 'Community Support',
    'home.support.desc': 'Counseling services, youth programs, and community assistance initiatives.',
    'home.culture.title': 'Cultural Events',
    'home.culture.desc': 'Regular cultural programs fostering understanding and interfaith dialogue.',
    'home.event.badge': 'Coming Soon',
    'home.event.date': 'July 15, 2024',
    'home.event.title': 'Annual Community Gathering',
    'home.event.desc': 'Join us for our annual community gathering featuring guest speakers, family activities, food stalls, and much more. This event is open to everyone in the community.',
    'home.event.view': 'View All Events',
    'home.cta.title': 'Join Our Community Today',
    'home.cta.subtitle': 'Whether you\'re looking for a place to pray, learn, or connect with others, At_Tauhid Mosque welcomes you with open arms. Visit us to experience our community firsthand.',
    'home.cta.contact': 'Get in Touch',
    'home.cta.programs': 'View Our Programs',
    
    // Profile Page
    'profile.hero.title': 'About At_Tauhid Mosque',
    'profile.hero.subtitle': 'Learn about our history, mission, and the values that guide our community.',
    'profile.history.badge': 'Our Journey',
    'profile.history.title': 'Our Story',
    'profile.history.subtitle': 'At_Tauhid Mosque has been serving the community for over two decades, fostering spiritual growth and community bonds.',
    'profile.history.desc': 'Founded in 2001, At_Tauhid Mosque began as a small prayer space in a converted community center. Through the dedication of our founding members and the support of the local community, we have grown into a vibrant Islamic center that serves hundreds of families. Our mosque stands as a beacon of faith, education, and community service, welcoming people from all backgrounds to learn about Islam and participate in our various programs.',
    'profile.mission.title': 'Our Mission & Vision',
    'profile.mission.badge': 'Guiding Principles',
    'profile.mission.subtitle': 'We are committed to serving Allah and our community through worship, education, and compassionate service.',
    'profile.vision.title': 'Our Vision',
    'profile.vision.desc': 'To be a leading Islamic center that promotes spiritual growth, educational excellence, and community harmony while preserving Islamic values in a modern context.',
    'profile.mission.title2': 'Our Mission',
    'profile.mission.desc': 'To provide a welcoming space for worship, learning, and community building while serving the broader community through charitable initiatives and interfaith dialogue.',
    'profile.values.title': 'Our Core Values',
    'profile.faith.title': 'Faith & Devotion',
    'profile.faith.desc': 'Strengthening our relationship with Allah through regular worship and spiritual practices.',
    'profile.knowledge.title': 'Knowledge & Learning',
    'profile.knowledge.desc': 'Promoting Islamic education and lifelong learning for all community members.',
    'profile.compassion.title': 'Compassion & Service',
    'profile.compassion.desc': 'Serving those in need and building bridges within our diverse community.',
    'profile.unity.title': 'Unity & Brotherhood',
    'profile.unity.desc': 'Fostering strong bonds among community members and promoting mutual support.',
    'profile.leadership.title': 'Meet Our Leadership',
    'profile.leadership.subtitle': 'Our dedicated team of religious and community leaders guide our mosque with wisdom and compassion.',
    
    // Facilities Page
    'facilities.hero.title': 'Our Facilities',
    'facilities.hero.subtitle': 'At_Tauhid Mosque offers modern facilities to ensure a comfortable and enriching experience for all visitors.',
    'facilities.overview.badge': 'Modern Amenities',
    'facilities.overview.title': 'What We Offer',
    'facilities.overview.subtitle': 'Our mosque is equipped with a variety of facilities to serve the needs of our community members and visitors.',
    'facilities.main.prayer': 'Main Prayer Hall',
    'facilities.main.prayer.desc': 'Spacious prayer hall that can accommodate up to 1,000 worshippers with comfortable prayer mats and excellent acoustics.',
    'facilities.wifi.title': 'Free Wi-Fi',
    'facilities.wifi.desc': 'High-speed internet access throughout the mosque premises for educational and research purposes.',
    'facilities.library.title': 'Islamic Library',
    'facilities.library.desc': 'Extensive collection of Islamic books, references, and digital resources available for reading and borrowing.',
    'facilities.education.title': 'Education Center',
    'facilities.education.desc': 'Dedicated classrooms for Quran recitation, Islamic studies, and Arabic language courses for all age groups.',
    'facilities.parking.title': 'Parking Area',
    'facilities.parking.desc': 'Large parking area with 200+ parking spaces, including designated spots for disabled visitors.',
    'facilities.access.title': '24/7 Access',
    'facilities.access.desc': 'The mosque remains open 24 hours for prayers, with security personnel present at all times.',
    'facilities.featured.title': 'State-of-the-art Prayer Hall',
    'facilities.featured.desc': 'Our main prayer hall is designed to create a peaceful atmosphere for worship. With excellent acoustics, temperature control, and natural lighting, it provides an ideal environment for prayer and contemplation.',
    'facilities.featured.capacity': 'Accommodates up to 1,000 worshippers',
    'facilities.featured.mats': 'Premium quality prayer mats',
    'facilities.featured.sound': 'Advanced sound system',
    'facilities.featured.climate': 'Climate controlled environment',
    'facilities.additional.title': 'Additional Amenities',
    
    // Activities Page
    'activities.hero.title': 'Our Activities',
    'activities.hero.subtitle': 'Join us in our various programs designed to strengthen faith, build community, and promote learning.',
    'activities.programs.badge': 'Community Programs',
    'activities.programs.title': 'What We Do',
    'activities.programs.subtitle': 'We offer a wide range of activities and programs for people of all ages and backgrounds.',
    'activities.daily.title': 'Daily Prayers',
    'activities.daily.desc': 'Five daily prayers with congregation, creating a sense of unity and spiritual connection.',
    'activities.friday.title': 'Friday Sermons',
    'activities.friday.desc': 'Weekly Friday prayers with inspiring sermons on contemporary Islamic topics.',
    'activities.quran.title': 'Quran Classes',
    'activities.quran.desc': 'Learn proper Quran recitation and memorization with qualified instructors.',
    'activities.youth.title': 'Youth Programs',
    'activities.youth.desc': 'Engaging activities and discussions designed specifically for young Muslims.',
    'activities.women.title': 'Women\'s Circle',
    'activities.women.desc': 'Support group and educational sessions for women in our community.',
    'activities.ramadan.title': 'Ramadan Programs',
    'activities.ramadan.desc': 'Special activities during the holy month including Tarawih prayers and Iftar gatherings.',
    
    // Media Center Page
    'media.title': 'Media Center',
    'media.photos.title': 'Photo Gallery',
    'media.videos.title': 'Video Gallery',
    'media.loading.photos': 'Loading photos...',
    'media.loading.videos': 'Loading videos...',
    'media.no.photos': 'No photos available at the moment.',
    'media.no.videos': 'No videos available at the moment.',
    'media.view.larger': 'View Larger',
    
    // Contact Page
    'contact.hero.title': 'Get in Touch',
    'contact.hero.subtitle': 'We welcome you to visit us, ask questions, or get involved in our community activities.',
  },
  id: {
    // Navigation
    'nav.home': 'Beranda',
    'nav.profile': 'Profil',
    'nav.facilities': 'Fasilitas',
    'nav.activities': 'Kegiatan',
    'nav.media-center': 'Pusat Media',
    'nav.contact': 'Kontak',
    
    // Home Page
    'home.hero.title': 'Selamat Datang di Masjid At_Tauhid',
    'home.hero.subtitle': 'Tempat ibadah, pembelajaran, dan pelayanan masyarakat. Bergabunglah dengan kami dalam perjalanan iman, ilmu, dan kasih sayang.',
    'home.hero.learn': 'Pelajari Tentang Kami',
    'home.hero.contact': 'Hubungi Kami',
    'home.community.badge': 'Komunitas Kami',
    'home.community.title': 'Apa yang Kami Tawarkan',
    'home.community.subtitle': 'Masjid At_Tauhid lebih dari sekadar tempat ibadah. Kami adalah pusat komunitas yang menawarkan berbagai layanan dan kegiatan.',
    'home.education.title': 'Pendidikan Islam',
    'home.education.desc': 'Kelas untuk segala usia, mengajarkan Al-Quran, Hadits, dan prinsip-prinsip Islam dalam konteks modern.',
    'home.prayer.title': 'Layanan Shalat',
    'home.prayer.desc': 'Shalat harian, khutbah Jumat, dan perayaan khusus Ramadan dan Idul Fitri.',
    'home.support.title': 'Dukungan Komunitas',
    'home.support.desc': 'Layanan konseling, program pemuda, dan inisiatif bantuan komunitas.',
    'home.culture.title': 'Acara Budaya',
    'home.culture.desc': 'Program budaya reguler yang memupuk pemahaman dan dialog antar agama.',
    'home.event.badge': 'Segera Hadir',
    'home.event.date': '15 Juli 2024',
    'home.event.title': 'Pertemuan Komunitas Tahunan',
    'home.event.desc': 'Bergabunglah dengan kami untuk pertemuan komunitas tahunan yang menampilkan pembicara tamu, aktivitas keluarga, stan makanan, dan banyak lagi. Acara ini terbuka untuk semua orang di komunitas.',
    'home.event.view': 'Lihat Semua Acara',
    'home.cta.title': 'Bergabunglah dengan Komunitas Kami Hari Ini',
    'home.cta.subtitle': 'Apakah Anda mencari tempat untuk beribadah, belajar, atau terhubung dengan orang lain, Masjid At_Tauhid menyambut Anda dengan tangan terbuka. Kunjungi kami untuk merasakan komunitas kami secara langsung.',
    'home.cta.contact': 'Hubungi Kami',
    'home.cta.programs': 'Lihat Program Kami',
    
    // Profile Page
    'profile.hero.title': 'Tentang Masjid At_Tauhid',
    'profile.hero.subtitle': 'Pelajari tentang sejarah, misi, dan nilai-nilai yang memandu komunitas kami.',
    'profile.history.badge': 'Perjalanan Kami',
    'profile.history.title': 'Kisah Kami',
    'profile.history.subtitle': 'Masjid At_Tauhid telah melayani komunitas selama lebih dari dua dekade, memupuk pertumbuhan spiritual dan ikatan komunitas.',
    'profile.history.desc': 'Didirikan pada tahun 2001, Masjid At_Tauhid dimulai sebagai ruang shalat kecil di pusat komunitas yang dikonversi. Melalui dedikasi para anggota pendiri dan dukungan komunitas lokal, kami telah berkembang menjadi pusat Islam yang dinamis yang melayani ratusan keluarga. Masjid kami berdiri sebagai mercusuar iman, pendidikan, dan pelayanan masyarakat, menyambut orang-orang dari semua latar belakang untuk belajar tentang Islam dan berpartisipasi dalam berbagai program kami.',
    'profile.mission.title': 'Misi & Visi Kami',
    'profile.mission.badge': 'Prinsip Panduan',
    'profile.mission.subtitle': 'Kami berkomitmen untuk melayani Allah dan komunitas kami melalui ibadah, pendidikan, dan pelayanan yang penuh kasih.',
    'profile.vision.title': 'Visi Kami',
    'profile.vision.desc': 'Menjadi pusat Islam terkemuka yang mempromosikan pertumbuhan spiritual, keunggulan pendidikan, dan keharmonisan komunitas sambil melestarikan nilai-nilai Islam dalam konteks modern.',
    'profile.mission.title2': 'Misi Kami',
    'profile.mission.desc': 'Menyediakan ruang yang ramah untuk ibadah, pembelajaran, dan pembangunan komunitas sambil melayani komunitas yang lebih luas melalui inisiatif amal dan dialog antar agama.',
    'profile.values.title': 'Nilai-nilai Inti Kami',
    'profile.faith.title': 'Iman & Ketakwaan',
    'profile.faith.desc': 'Memperkuat hubungan kami dengan Allah melalui ibadah reguler dan praktik spiritual.',
    'profile.knowledge.title': 'Ilmu & Pembelajaran',
    'profile.knowledge.desc': 'Mempromosikan pendidikan Islam dan pembelajaran seumur hidup untuk semua anggota komunitas.',
    'profile.compassion.title': 'Kasih Sayang & Pelayanan',
    'profile.compassion.desc': 'Melayani mereka yang membutuhkan dan membangun jembatan dalam komunitas kami yang beragam.',
    'profile.unity.title': 'Persatuan & Persaudaraan',
    'profile.unity.desc': 'Memupuk ikatan yang kuat di antara anggota komunitas dan mempromosikan saling mendukung.',
    'profile.leadership.title': 'Kenali Kepemimpinan Kami',
    'profile.leadership.subtitle': 'Tim pemimpin agama dan komunitas yang berdedikasi membimbing masjid kami dengan kebijaksanaan dan kasih sayang.',
    
    // Facilities Page
    'facilities.hero.title': 'Fasilitas Kami',
    'facilities.hero.subtitle': 'Masjid At_Tauhid menawarkan fasilitas modern untuk memastikan pengalaman yang nyaman dan memperkaya untuk semua pengunjung.',
    'facilities.overview.badge': 'Fasilitas Modern',
    'facilities.overview.title': 'Apa yang Kami Tawarkan',
    'facilities.overview.subtitle': 'Masjid kami dilengkapi dengan berbagai fasilitas untuk melayani kebutuhan anggota komunitas dan pengunjung kami.',
    'facilities.main.prayer': 'Ruang Shalat Utama',
    'facilities.main.prayer.desc': 'Ruang shalat yang luas yang dapat menampung hingga 1.000 jamaah dengan sajadah yang nyaman dan akustik yang sangat baik.',
    'facilities.wifi.title': 'Wi-Fi Gratis',
    'facilities.wifi.desc': 'Akses internet berkecepatan tinggi di seluruh area masjid untuk tujuan pendidikan dan penelitian.',
    'facilities.library.title': 'Perpustakaan Islam',
    'facilities.library.desc': 'Koleksi luas buku-buku Islam, referensi, dan sumber daya digital yang tersedia untuk dibaca dan dipinjam.',
    'facilities.education.title': 'Pusat Pendidikan',
    'facilities.education.desc': 'Ruang kelas khusus untuk membaca Al-Quran, studi Islam, dan kursus bahasa Arab untuk semua kelompok usia.',
    'facilities.parking.title': 'Area Parkir',
    'facilities.parking.desc': 'Area parkir yang luas dengan 200+ tempat parkir, termasuk tempat khusus untuk pengunjung berkebutuhan khusus.',
    'facilities.access.title': 'Akses 24/7',
    'facilities.access.desc': 'Masjid tetap buka 24 jam untuk shalat, dengan petugas keamanan yang hadir setiap saat.',
    'facilities.featured.title': 'Ruang Shalat Berteknologi Tinggi',
    'facilities.featured.desc': 'Ruang shalat utama kami dirancang untuk menciptakan suasana damai untuk ibadah. Dengan akustik yang sangat baik, kontrol suhu, dan pencahayaan alami, ini menyediakan lingkungan yang ideal untuk shalat dan kontemplasi.',
    'facilities.featured.capacity': 'Menampung hingga 1.000 jamaah',
    'facilities.featured.mats': 'Sajadah berkualitas premium',
    'facilities.featured.sound': 'Sistem suara canggih',
    'facilities.featured.climate': 'Lingkungan yang dikontrol iklim',
    'facilities.additional.title': 'Fasilitas Tambahan',
    
    // Activities Page
    'activities.hero.title': 'Kegiatan Kami',
    'activities.hero.subtitle': 'Bergabunglah dengan kami dalam berbagai program yang dirancang untuk memperkuat iman, membangun komunitas, dan mempromosikan pembelajaran.',
    'activities.programs.badge': 'Program Komunitas',
    'activities.programs.title': 'Apa yang Kami Lakukan',
    'activities.programs.subtitle': 'Kami menawarkan berbagai macam kegiatan dan program untuk orang-orang dari segala usia dan latar belakang.',
    'activities.daily.title': 'Shalat Harian',
    'activities.daily.desc': 'Lima shalat harian berjamaah, menciptakan rasa persatuan dan koneksi spiritual.',
    'activities.friday.title': 'Khutbah Jumat',
    'activities.friday.desc': 'Shalat Jumat mingguan dengan khutbah yang menginspirasi tentang topik Islam kontemporer.',
    'activities.quran.title': 'Kelas Al-Quran',
    'activities.quran.desc': 'Belajar bacaan dan hafalan Al-Quran yang benar dengan instruktur yang berkualifikasi.',
    'activities.youth.title': 'Program Pemuda',
    'activities.youth.desc': 'Aktivitas dan diskusi yang menarik yang dirancang khusus untuk muslim muda.',
    'activities.women.title': 'Lingkaran Wanita',
    'activities.women.desc': 'Kelompok dukungan dan sesi edukasi untuk wanita di komunitas kami.',
    'activities.ramadan.title': 'Program Ramadan',
    'activities.ramadan.desc': 'Kegiatan khusus selama bulan suci termasuk shalat Tarawih dan kumpul buka puasa.',
    
    // Media Center Page
    'media.title': 'Pusat Media',
    'media.photos.title': 'Galeri Foto',
    'media.videos.title': 'Galeri Video',
    'media.loading.photos': 'Memuat foto...',
    'media.loading.videos': 'Memuat video...',
    'media.no.photos': 'Tidak ada foto yang tersedia saat ini.',
    'media.no.videos': 'Tidak ada video yang tersedia saat ini.',
    'media.view.larger': 'Lihat Lebih Besar',
    
    // Contact Page
    'contact.hero.title': 'Hubungi Kami',
    'contact.hero.subtitle': 'Kami menyambut Anda untuk mengunjungi kami, mengajukan pertanyaan, atau terlibat dalam kegiatan komunitas kami.',
  }
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<'en' | 'id'>('id');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
