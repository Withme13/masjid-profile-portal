import React, { useState, useEffect } from 'react';
import { Image, Play, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useData } from '@/contexts/DataContext';
import { Photo, Video } from '@/types/adminTypes';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';

const MediaCenter = () => {
  const { photos, videos } = useData();
  const { t } = useLanguage();
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [localPhotos, setLocalPhotos] = useState<Photo[]>([]);
  const [localVideos, setLocalVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch photos directly from Supabase to ensure we have the latest data
  useEffect(() => {
    const fetchPhotosDirectly = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('media_photos')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        if (data) {
          const formattedPhotos: Photo[] = data.map(item => ({
            id: item.id,
            name: item.name,
            description: item.description || '',
            imageUrl: item.image_url,
            category: item.category || ''
          }));
          
          console.log('Photos fetched directly from Supabase:', formattedPhotos);
          setLocalPhotos(formattedPhotos);
        }
      } catch (error) {
        console.error('Exception fetching photos:', error);
        // Fall back to context data
        if (photos.length > 0) {
          setLocalPhotos(photos);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchPhotosDirectly();
  }, [photos]);

  // Fetch videos directly from Supabase
  useEffect(() => {
    const fetchVideosDirectly = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('media_videos')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        if (data) {
          const formattedVideos: Video[] = data.map(item => ({
            id: item.id,
            name: item.name,
            description: item.description || '',
            videoUrl: item.video_url,
            thumbnailUrl: item.thumbnail_url
          }));
          
          console.log('Videos fetched directly from Supabase:', formattedVideos);
          setLocalVideos(formattedVideos);
        }
      } catch (error) {
        console.error('Exception fetching videos:', error);
        // Fall back to context data
        if (videos.length > 0) {
          setLocalVideos(videos);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideosDirectly();
  }, [videos]);

  // Helper function to check if URL is a video file (not a YouTube embed)
  const isVideoFile = (url: string): boolean => {
    return /\.(mp4|webm|ogg|mov)($|\?)/i.test(url) || 
           url.includes('storage.googleapis.com') || 
           url.includes('supabase.co');
  };
  
  // Function to ensure YouTube embed URLs are in the correct format
  const formatYouTubeUrl = (url: string) => {
    // If it's already an embed URL, return it
    if (url.includes('youtube.com/embed/')) {
      return url;
    }
    
    // If it appears to be a video file URL rather than YouTube, return null
    if (isVideoFile(url)) {
      return null;
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

  // Helper function to handle image loading errors
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.error(`Failed to load image: ${(e.target as HTMLImageElement).src}`);
    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/640x360?text=Image+Not+Found';
  };
  
  return (
    <div className="section-container animate-fade-in min-h-screen">
      <h1 className="section-title text-center mb-12">{t('media.title')}</h1>
      
      {/* Photo Gallery Section */}
      <section className="mb-16">
        <div className="flex items-center space-x-3 mb-8">
          <Image className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-heading font-bold">{t('media.photos.title')}</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <div className="col-span-3 text-center py-10">
              <p className="text-muted-foreground">{t('media.loading.photos')}</p>
            </div>
          ) : localPhotos.length > 0 ? (
            localPhotos.map((photo) => (
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
                    onError={handleImageError}
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-lg font-medium">{t('media.view.larger')}</span>
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
              <p className="text-muted-foreground">{t('media.no.photos')}</p>
            </div>
          )}
        </div>
      </section>
      
      {/* Video Gallery Section */}
      <section>
        <div className="flex items-center space-x-3 mb-8">
          <Play className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-heading font-bold">{t('media.videos.title')}</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <div className="col-span-3 text-center py-10">
              <p className="text-muted-foreground">{t('media.loading.videos')}</p>
            </div>
          ) : localVideos.length > 0 ? (
            localVideos.map((video) => (
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
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/640x360?text=Video+Thumbnail';
                    }}
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
              <p className="text-muted-foreground">{t('media.no.videos')}</p>
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
                onError={handleImageError}
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
              {isVideoFile(selectedVideo.videoUrl) ? (
                <video 
                  src={selectedVideo.videoUrl}
                  className="w-full h-full"
                  controls
                  autoPlay
                  controlsList="nodownload"
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <iframe
                  src={formatYouTubeUrl(selectedVideo.videoUrl)}
                  className="w-full h-full"
                  title={selectedVideo.name}
                  allowFullScreen
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  frameBorder="0"
                ></iframe>
              )}
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
