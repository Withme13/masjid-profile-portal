
import React, { useState, useEffect } from 'react';
import { Image, Play, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useData } from '@/contexts/DataContext';
import { Photo, Video } from '@/types/adminTypes';

const MediaCenter = () => {
  const { photos, videos } = useData();
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  
  // Function to ensure YouTube embed URLs are in the correct format
  const formatYouTubeUrl = (url: string) => {
    // If it's already an embed URL, return it
    if (url.includes('youtube.com/embed/')) {
      return url;
    }
    
    // Extract video ID from various YouTube URL formats
    let videoId = '';
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(youtubeRegex);
    
    if (match && match[1]) {
      videoId = match[1];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    
    // Return original URL if we couldn't parse it
    return url;
  };
  
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
          {photos.length > 0 ? (
            photos.map((photo) => (
              <div 
                key={photo.id}
                className="glass-panel overflow-hidden cursor-pointer hover-scale group"
                onClick={() => setSelectedPhoto(photo)}
              >
                <div className="relative h-60 overflow-hidden">
                  <img 
                    src={photo.imageUrl} 
                    alt={photo.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-lg font-medium">View Larger</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-heading font-bold text-lg">{photo.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{photo.description}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-10">
              <p className="text-muted-foreground">No photos available at the moment.</p>
            </div>
          )}
        </div>
      </section>
      
      {/* Video Gallery Section */}
      <section>
        <div className="flex items-center space-x-3 mb-8">
          <Play className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-heading font-bold">Video Gallery</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.length > 0 ? (
            videos.map((video) => (
              <div 
                key={video.id}
                className="glass-panel overflow-hidden cursor-pointer hover-scale group"
                onClick={() => setSelectedVideo(video)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={video.thumbnailUrl || 'https://via.placeholder.com/640x360?text=Video+Thumbnail'} 
                    alt={video.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary/80 flex items-center justify-center">
                      <Play className="w-8 h-8 text-white ml-1" />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-heading font-bold text-lg">{video.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{video.description}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-10">
              <p className="text-muted-foreground">No videos available at the moment.</p>
            </div>
          )}
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
                src={selectedPhoto.imageUrl} 
                alt={selectedPhoto.name} 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-6">
              <h3 className="font-heading font-bold text-xl">{selectedPhoto.name}</h3>
              <p className="mt-2 text-muted-foreground">{selectedPhoto.description}</p>
              {selectedPhoto.category && (
                <div className="mt-2">
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    {selectedPhoto.category}
                  </span>
                </div>
              )}
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
                src={formatYouTubeUrl(selectedVideo.videoUrl)}
                className="w-full h-full"
                title={selectedVideo.name}
                allowFullScreen
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                frameBorder="0"
              ></iframe>
            </div>
            <div className="p-6">
              <h3 className="font-heading font-bold text-xl">{selectedVideo.name}</h3>
              <p className="mt-2 text-muted-foreground">{selectedVideo.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaCenter;
