
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { 
  LeadershipMember, 
  Facility, 
  Activity, 
  Photo, 
  Video, 
  ContactMessage 
} from '@/types/adminTypes';

// Define context types
type DataContextType = {
  leadership: LeadershipMember[];
  facilities: Facility[];
  activities: Activity[];
  photos: Photo[];
  videos: Video[];
  messages: ContactMessage[];
  addLeadershipMember: (member: Omit<LeadershipMember, 'id'>) => Promise<void>;
  updateLeadershipMember: (member: LeadershipMember) => Promise<void>;
  deleteLeadershipMember: (id: string) => Promise<void>;
  addFacility: (facility: Omit<Facility, 'id'>) => Promise<void>;
  updateFacility: (facility: Facility) => Promise<void>;
  deleteFacility: (id: string) => Promise<void>;
  addActivity: (activity: Omit<Activity, 'id'>) => Promise<void>;
  updateActivity: (activity: Activity) => Promise<void>;
  deleteActivity: (id: string) => Promise<void>;
  addPhoto: (photo: Omit<Photo, 'id'>) => Promise<void>;
  updatePhoto: (photo: Photo) => Promise<void>;
  deletePhoto: (id: string) => Promise<void>;
  addVideo: (video: Omit<Video, 'id'>) => Promise<void>;
  updateVideo: (video: Video) => Promise<void>;
  deleteVideo: (id: string) => Promise<void>;
  addMessage: (message: Omit<ContactMessage, 'id' | 'date' | 'isRead'>) => Promise<void>;
  updateMessageReadStatus: (id: string, isRead: boolean) => Promise<void>;
  deleteMessage: (id: string) => Promise<void>;
};

// Create context
const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state
  const [leadership, setLeadership] = useState<LeadershipMember[]>([]);
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  // Fetch data on initial load
  useEffect(() => {
    fetchLeadership();
    fetchFacilities();
    fetchActivities();
    fetchPhotos();
    fetchVideos();
    fetchMessages();
  }, []);

  // Fetch functions
  const fetchLeadership = async () => {
    try {
      const { data, error } = await supabase
        .from('leadership_profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const leadershipData: LeadershipMember[] = data.map(item => ({
        id: item.id,
        name: item.name,
        position: item.position,
        education: item.education || '',
        imageUrl: item.image_url || ''
      }));

      setLeadership(leadershipData);
    } catch (error) {
      console.error('Error fetching leadership data:', error);
      toast.error('Failed to load leadership data');
    }
  };

  const fetchFacilities = async () => {
    try {
      const { data, error } = await supabase
        .from('facilities')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const facilitiesData: Facility[] = data.map(item => ({
        id: item.id,
        name: item.name,
        description: item.description || '',
        imageUrl: item.image_url || ''
      }));

      setFacilities(facilitiesData);
    } catch (error) {
      console.error('Error fetching facilities data:', error);
      toast.error('Failed to load facilities data');
    }
  };

  const fetchActivities = async () => {
    try {
      const { data, error } = await supabase
        .from('activities')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;

      const activitiesData: Activity[] = data.map(item => ({
        id: item.id,
        name: item.name,
        description: item.description || '',
        date: item.date,
        imageUrl: item.image_url
      }));

      setActivities(activitiesData);
    } catch (error) {
      console.error('Error fetching activities data:', error);
      toast.error('Failed to load activities data');
    }
  };

  const fetchPhotos = async () => {
    try {
      const { data, error } = await supabase
        .from('media_photos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const photosData: Photo[] = data.map(item => ({
        id: item.id,
        name: item.name,
        description: item.description || '',
        imageUrl: item.image_url,
        category: item.category || ''
      }));

      setPhotos(photosData);
    } catch (error) {
      console.error('Error fetching photos data:', error);
      toast.error('Failed to load photos data');
    }
  };

  const fetchVideos = async () => {
    try {
      const { data, error } = await supabase
        .from('media_videos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const videosData: Video[] = data.map(item => ({
        id: item.id,
        name: item.name,
        description: item.description || '',
        videoUrl: item.video_url,
        thumbnailUrl: item.thumbnail_url
      }));

      setVideos(videosData);
    } catch (error) {
      console.error('Error fetching videos data:', error);
      toast.error('Failed to load videos data');
    }
  };

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;

      const messagesData: ContactMessage[] = data.map(item => ({
        id: item.id,
        name: item.name,
        email: item.email,
        subject: item.subject,
        message: item.message,
        date: item.date,
        isRead: item.is_read
      }));

      setMessages(messagesData);
    } catch (error) {
      console.error('Error fetching messages data:', error);
      toast.error('Failed to load messages data');
    }
  };

  // Leadership CRUD operations
  const addLeadershipMember = async (member: Omit<LeadershipMember, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('leadership_profiles')
        .insert([{
          name: member.name,
          position: member.position,
          education: member.education,
          image_url: member.imageUrl
        }])
        .select();

      if (error) throw error;

      if (data && data[0]) {
        const newMember: LeadershipMember = {
          id: data[0].id,
          name: data[0].name,
          position: data[0].position,
          education: data[0].education || '',
          imageUrl: data[0].image_url || ''
        };
        
        setLeadership([...leadership, newMember]);
        toast.success('Leadership member added successfully');
      }
    } catch (error) {
      console.error('Error adding leadership member:', error);
      toast.error('Failed to add leadership member');
    }
  };

  const updateLeadershipMember = async (member: LeadershipMember) => {
    try {
      const { error } = await supabase
        .from('leadership_profiles')
        .update({
          name: member.name,
          position: member.position,
          education: member.education,
          image_url: member.imageUrl
        })
        .eq('id', member.id);

      if (error) throw error;

      setLeadership(leadership.map(m => m.id === member.id ? member : m));
      toast.success('Leadership member updated successfully');
    } catch (error) {
      console.error('Error updating leadership member:', error);
      toast.error('Failed to update leadership member');
    }
  };

  const deleteLeadershipMember = async (id: string) => {
    try {
      const { error } = await supabase
        .from('leadership_profiles')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setLeadership(leadership.filter(member => member.id !== id));
      toast.success('Leadership member deleted successfully');
    } catch (error) {
      console.error('Error deleting leadership member:', error);
      toast.error('Failed to delete leadership member');
    }
  };

  // Facility CRUD operations
  const addFacility = async (facility: Omit<Facility, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('facilities')
        .insert([{
          name: facility.name,
          description: facility.description,
          image_url: facility.imageUrl
        }])
        .select();

      if (error) throw error;

      if (data && data[0]) {
        const newFacility: Facility = {
          id: data[0].id,
          name: data[0].name,
          description: data[0].description || '',
          imageUrl: data[0].image_url || ''
        };
        
        setFacilities([...facilities, newFacility]);
        toast.success('Facility added successfully');
      }
    } catch (error) {
      console.error('Error adding facility:', error);
      toast.error('Failed to add facility');
    }
  };

  const updateFacility = async (facility: Facility) => {
    try {
      const { error } = await supabase
        .from('facilities')
        .update({
          name: facility.name,
          description: facility.description,
          image_url: facility.imageUrl
        })
        .eq('id', facility.id);

      if (error) throw error;

      setFacilities(facilities.map(f => f.id === facility.id ? facility : f));
      toast.success('Facility updated successfully');
    } catch (error) {
      console.error('Error updating facility:', error);
      toast.error('Failed to update facility');
    }
  };

  const deleteFacility = async (id: string) => {
    try {
      const { error } = await supabase
        .from('facilities')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setFacilities(facilities.filter(facility => facility.id !== id));
      toast.success('Facility deleted successfully');
    } catch (error) {
      console.error('Error deleting facility:', error);
      toast.error('Failed to delete facility');
    }
  };

  // Activity CRUD operations
  const addActivity = async (activity: Omit<Activity, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('activities')
        .insert([{
          name: activity.name,
          description: activity.description,
          date: activity.date,
          image_url: activity.imageUrl
        }])
        .select();

      if (error) throw error;

      if (data && data[0]) {
        const newActivity: Activity = {
          id: data[0].id,
          name: data[0].name,
          description: data[0].description || '',
          date: data[0].date,
          imageUrl: data[0].image_url
        };
        
        setActivities([...activities, newActivity]);
        toast.success('Activity added successfully');
      }
    } catch (error) {
      console.error('Error adding activity:', error);
      toast.error('Failed to add activity');
    }
  };

  const updateActivity = async (activity: Activity) => {
    try {
      const { error } = await supabase
        .from('activities')
        .update({
          name: activity.name,
          description: activity.description,
          date: activity.date,
          image_url: activity.imageUrl
        })
        .eq('id', activity.id);

      if (error) throw error;

      setActivities(activities.map(a => a.id === activity.id ? activity : a));
      toast.success('Activity updated successfully');
    } catch (error) {
      console.error('Error updating activity:', error);
      toast.error('Failed to update activity');
    }
  };

  const deleteActivity = async (id: string) => {
    try {
      const { error } = await supabase
        .from('activities')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setActivities(activities.filter(activity => activity.id !== id));
      toast.success('Activity deleted successfully');
    } catch (error) {
      console.error('Error deleting activity:', error);
      toast.error('Failed to delete activity');
    }
  };

  // Photo CRUD operations
  const addPhoto = async (photo: Omit<Photo, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('media_photos')
        .insert([{
          name: photo.name,
          description: photo.description,
          category: photo.category,
          image_url: photo.imageUrl
        }])
        .select();

      if (error) throw error;

      if (data && data[0]) {
        const newPhoto: Photo = {
          id: data[0].id,
          name: data[0].name,
          description: data[0].description || '',
          category: data[0].category || '',
          imageUrl: data[0].image_url
        };
        
        setPhotos([...photos, newPhoto]);
        toast.success('Photo added successfully');
      }
    } catch (error) {
      console.error('Error adding photo:', error);
      toast.error('Failed to add photo');
    }
  };

  const updatePhoto = async (photo: Photo) => {
    try {
      const { error } = await supabase
        .from('media_photos')
        .update({
          name: photo.name,
          description: photo.description,
          category: photo.category,
          image_url: photo.imageUrl
        })
        .eq('id', photo.id);

      if (error) throw error;

      setPhotos(photos.map(p => p.id === photo.id ? photo : p));
      toast.success('Photo updated successfully');
    } catch (error) {
      console.error('Error updating photo:', error);
      toast.error('Failed to update photo');
    }
  };

  const deletePhoto = async (id: string) => {
    try {
      const { error } = await supabase
        .from('media_photos')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setPhotos(photos.filter(photo => photo.id !== id));
      toast.success('Photo deleted successfully');
    } catch (error) {
      console.error('Error deleting photo:', error);
      toast.error('Failed to delete photo');
    }
  };

  // Video CRUD operations
  const addVideo = async (video: Omit<Video, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('media_videos')
        .insert([{
          name: video.name,
          description: video.description,
          video_url: video.videoUrl,
          thumbnail_url: video.thumbnailUrl
        }])
        .select();

      if (error) throw error;

      if (data && data[0]) {
        const newVideo: Video = {
          id: data[0].id,
          name: data[0].name,
          description: data[0].description || '',
          videoUrl: data[0].video_url,
          thumbnailUrl: data[0].thumbnail_url
        };
        
        setVideos([...videos, newVideo]);
        toast.success('Video added successfully');
      }
    } catch (error) {
      console.error('Error adding video:', error);
      toast.error('Failed to add video');
    }
  };

  const updateVideo = async (video: Video) => {
    try {
      const { error } = await supabase
        .from('media_videos')
        .update({
          name: video.name,
          description: video.description,
          video_url: video.videoUrl,
          thumbnail_url: video.thumbnailUrl
        })
        .eq('id', video.id);

      if (error) throw error;

      setVideos(videos.map(v => v.id === video.id ? video : v));
      toast.success('Video updated successfully');
    } catch (error) {
      console.error('Error updating video:', error);
      toast.error('Failed to update video');
    }
  };

  const deleteVideo = async (id: string) => {
    try {
      const { error } = await supabase
        .from('media_videos')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setVideos(videos.filter(video => video.id !== id));
      toast.success('Video deleted successfully');
    } catch (error) {
      console.error('Error deleting video:', error);
      toast.error('Failed to delete video');
    }
  };

  // Message CRUD operations
  const addMessage = async (message: Omit<ContactMessage, 'id' | 'date' | 'isRead'>) => {
    try {
      const currentDate = new Date().toISOString();
      
      const { data, error } = await supabase
        .from('contact_messages')
        .insert([{
          name: message.name,
          email: message.email,
          subject: message.subject,
          message: message.message,
          date: currentDate,
          is_read: false
        }])
        .select();

      if (error) throw error;

      if (data && data[0]) {
        const newMessage: ContactMessage = {
          id: data[0].id,
          name: data[0].name,
          email: data[0].email,
          subject: data[0].subject,
          message: data[0].message,
          date: data[0].date,
          isRead: data[0].is_read
        };
        
        setMessages([...messages, newMessage]);
        toast.success('Message sent successfully');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    }
  };

  const updateMessageReadStatus = async (id: string, isRead: boolean) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({
          is_read: isRead
        })
        .eq('id', id);

      if (error) throw error;

      setMessages(messages.map(m => m.id === id ? { ...m, isRead } : m));
    } catch (error) {
      console.error('Error updating message read status:', error);
      toast.error('Failed to update message status');
    }
  };

  const deleteMessage = async (id: string) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setMessages(messages.filter(message => message.id !== id));
      toast.success('Message deleted successfully');
    } catch (error) {
      console.error('Error deleting message:', error);
      toast.error('Failed to delete message');
    }
  };

  return (
    <DataContext.Provider value={{
      leadership,
      facilities,
      activities,
      photos,
      videos,
      messages,
      addLeadershipMember,
      updateLeadershipMember,
      deleteLeadershipMember,
      addFacility,
      updateFacility,
      deleteFacility,
      addActivity,
      updateActivity,
      deleteActivity,
      addPhoto,
      updatePhoto,
      deletePhoto,
      addVideo,
      updateVideo,
      deleteVideo,
      addMessage,
      updateMessageReadStatus,
      deleteMessage
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
