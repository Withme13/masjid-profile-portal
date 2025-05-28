
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: 'en' | 'id';
  setLanguage: (lang: 'en' | 'id') => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    'nav.home': 'Home',
    'nav.profile': 'Profile',
    'nav.facilities': 'Facilities',
    'nav.activities': 'Activities',
    'nav.media-center': 'Media Center',
    'nav.contact': 'Contact',
  },
  id: {
    'nav.home': 'Beranda',
    'nav.profile': 'Profil',
    'nav.facilities': 'Fasilitas',
    'nav.activities': 'Kegiatan',
    'nav.media-center': 'Pusat Media',
    'nav.contact': 'Kontak',
  }
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<'en' | 'id'>('en');

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
