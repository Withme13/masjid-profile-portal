
import React, { useState } from 'react';
import { Image, Play, X } from 'lucide-react';
import { cn } from '@/lib/utils';

// Dummy data for photos
const photoGallery = [
  {
    id: 1,
    title: 'Friday Prayer',
    image: 'https://images.unsplash.com/photo-1564939558297-fc396f18e5c7?q=80&w=2574',
    description: 'Community gathering for Friday prayer at Al-Hikma Mosque',
  },
  {
    id: 2,
    title: 'Ramadan Iftar',
    image: 'https://images.unsplash.com/photo-1532339142463-fd0a8979791a?q=80&w=2670',
    description: 'Breaking fast together during the holy month of Ramadan',
  },
  {
    id: 3,
    title: 'Islamic Studies',
    image: 'https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?q=80&w=2574',
    description: 'Weekly Islamic studies class for adults',
  },
  {
    id: 4,
    title: 'Eid Celebration',
    image: 'https://images.unsplash.com/photo-1566996533069-7e043ebeec92?q=80&w=2574',
    description: 'Eid celebrations at Al-Hikma Mosque',
  },
  {
    id: 5,
    title: 'Quran Recitation',
    image: 'https://images.unsplash.com/photo-1609599006014-315d7eb5cc55?q=80&w=2670',
    description: 'Youth Quran recitation competition',
  },
  {
    id: 6,
    title: 'Community Service',
    image: 'https://images.unsplash.com/photo-1607166452427-cf5ec965a16e?q=80&w=2670',
    description: 'Volunteers preparing food packages for the community',
  },
];

// Dummy data for videos
const videoGallery = [
  {
    id: 1,
    title: 'Mosque Tour',
    thumbnail: 'https://images.unsplash.com/photo-1528815240473-4e089882d69f?q=80&w=2642',
    videoUrl: 'https://www.youtube.com/embed/EngW7tLk6R8',
    description: 'A virtual tour of Al-Hikma Mosque facilities',
  },
  {
    id: 2,
    title: 'Eid Sermon',
    thumbnail: 'https://images.unsplash.com/photo-1588855316970-2c9b3d95e11c?q=80&w=2574',
    videoUrl: 'https://www.youtube.com/embed/j2JXGlKL2a0',
    description: 'Highlights from last year\'s Eid sermon',
  },
  {
    id: 3,
    title: 'Islamic History Lecture',
    thumbnail: 'https://images.unsplash.com/photo-1569315616076-6d63c84ab9d7?q=80&w=2670',
    videoUrl: 'https://www.youtube.com/embed/k3Mv3k0vhAM',
    description: 'A lecture on the history of Islam by Sheikh Abdullah',
  },
];

const MediaCenter = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<any>(null);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);

  return (
    <div className="section-container animate-fade-in min-h-screen">
      <h1 className="section-title text-center mb-12">Media Center</h1>
      
      {/* Photo Gallery Section */}
      <section className="mb-16">
        <div className="flex items-center space-x-3 mb-8">
          <Image className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-heading font-bold">Photo Gallery</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {photoGallery.map((photo) => (
            <div 
              key={photo.id}
              className="glass-panel overflow-hidden cursor-pointer hover-scale group"
              onClick={() => setSelectedPhoto(photo)}
            >
              <div className="relative h-60 overflow-hidden">
                <img 
                  src={photo.image} 
                  alt={photo.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-lg font-medium">View Larger</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-heading font-bold text-lg">{photo.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{photo.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Video Gallery Section */}
      <section>
        <div className="flex items-center space-x-3 mb-8">
          <Play className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-heading font-bold">Video Gallery</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videoGallery.map((video) => (
            <div 
              key={video.id}
              className="glass-panel overflow-hidden cursor-pointer hover-scale group"
              onClick={() => setSelectedVideo(video)}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={video.thumbnail} 
                  alt={video.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary/80 flex items-center justify-center">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-heading font-bold text-lg">{video.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{video.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Photo Modal */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedPhoto(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-background rounded-xl overflow-hidden animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute top-4 right-4 z-10 bg-black/50 rounded-full p-1 hover:bg-black/70 transition-colors"
              onClick={() => setSelectedPhoto(null)}
            >
              <X className="w-6 h-6 text-white" />
            </button>
            <div className="h-[70vh] overflow-hidden">
              <img 
                src={selectedPhoto.image} 
                alt={selectedPhoto.title} 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-6">
              <h3 className="font-heading font-bold text-xl">{selectedPhoto.title}</h3>
              <p className="mt-2 text-muted-foreground">{selectedPhoto.description}</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Video Modal */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedVideo(null)}
        >
          <div 
            className="relative max-w-5xl w-full bg-background rounded-xl overflow-hidden animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute top-4 right-4 z-10 bg-black/50 rounded-full p-1 hover:bg-black/70 transition-colors"
              onClick={() => setSelectedVideo(null)}
            >
              <X className="w-6 h-6 text-white" />
            </button>
            <div className="aspect-video">
              <iframe
                src={selectedVideo.videoUrl}
                className="w-full h-full"
                title={selectedVideo.title}
                allowFullScreen
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              ></iframe>
            </div>
            <div className="p-6">
              <h3 className="font-heading font-bold text-xl">{selectedVideo.title}</h3>
              <p className="mt-2 text-muted-foreground">{selectedVideo.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaCenter;
