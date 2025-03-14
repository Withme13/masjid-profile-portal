
import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from '@/components/ui/sonner';
import { 
  LeadershipMember, 
  Facility, 
  Activity, 
  Photo, 
  Video, 
  ContactMessage 
} from '@/types/adminTypes';

// Define initial mock data
const initialLeadership: LeadershipMember[] = [
  {
    id: '1',
    name: 'Imam Ahmad Rashid',
    position: 'Head Imam',
    education: 'Graduate of Al-Azhar University with a focus on comparative religious studies',
    imageUrl: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857'
  },
  {
    id: '2',
    name: 'Dr. Fatima Hassan',
    position: 'Education Director',
    education: 'Professor of Islamic Studies and childhood education expert',
    imageUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e'
  },
  {
    id: '3',
    name: 'Mr. Omar Khan',
    position: 'Board President',
    education: 'Business administration and community leadership',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'
  }
];

const initialFacilities: Facility[] = [
  {
    id: '1',
    name: 'Prayer Hall',
    description: 'Spacious prayer hall that can accommodate up to 500 worshippers',
    imageUrl: 'https://images.unsplash.com/photo-1591760318079-8085986e40b3'
  },
  {
    id: '2',
    name: 'Library',
    description: 'Collection of Islamic literature and study materials for all ages',
    imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da'
  }
];

const initialActivities: Activity[] = [
  {
    id: '1',
    date: '2023-07-15',
    name: 'Quran Study Circle',
    description: 'Weekly gathering to study and reflect on Quranic verses',
    imageUrl: 'https://images.unsplash.com/photo-1609599006353-e629aaabbd47'
  },
  {
    id: '2',
    date: '2023-08-20',
    name: 'Community Iftar',
    description: 'Annual community iftar during Ramadan',
    imageUrl: 'https://images.unsplash.com/photo-1606972422434-b8e9606b36a3'
  }
];

const initialPhotos: Photo[] = [
  {
    id: '1',
    name: 'Eid Prayer 2023',
    description: 'Community gathering for Eid prayer',
    imageUrl: 'https://images.unsplash.com/photo-1576595886051-32fd0ce4b1d0',
    category: 'Events'
  },
  {
    id: '2',
    name: 'Mosque Interior',
    description: 'Beautiful interior of At_Tauhid Mosque',
    imageUrl: 'https://images.unsplash.com/photo-1584810359583-96fc3448bedc',
    category: 'Architecture'
  }
];

const initialVideos: Video[] = [
  {
    id: '1',
    name: 'Friday Sermon Highlights',
    description: 'Key points from last Friday\'s sermon',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnailUrl: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg'
  },
  {
    id: '2',
    name: 'Ramadan Preparations',
    description: 'Community preparing for Ramadan',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnailUrl: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg'
  }
];

const initialMessages: ContactMessage[] = [
  {
    id: '1',
    name: 'Jane Doe',
    email: 'jane@example.com',
    subject: 'Prayer Times',
    message: 'I would like to know the prayer times for this week.',
    date: '2023-06-10T14:30:00Z',
    isRead: false
  },
  {
    id: '2',
    name: 'John Smith',
    email: 'john@example.com',
    subject: 'Volunteering',
    message: 'I am interested in volunteering at the mosque.',
    date: '2023-06-12T09:15:00Z',
    isRead: true
  }
];

// Define context types
type DataContextType = {
  leadership: LeadershipMember[];
  facilities: Facility[];
  activities: Activity[];
  photos: Photo[];
  videos: Video[];
  messages: ContactMessage[];
  addLeadershipMember: (member: Omit<LeadershipMember, 'id'>) => void;
  updateLeadershipMember: (member: LeadershipMember) => void;
  deleteLeadershipMember: (id: string) => void;
  addFacility: (facility: Omit<Facility, 'id'>) => void;
  updateFacility: (facility: Facility) => void;
  deleteFacility: (id: string) => void;
  addActivity: (activity: Omit<Activity, 'id'>) => void;
  updateActivity: (activity: Activity) => void;
  deleteActivity: (id: string) => void;
  addPhoto: (photo: Omit<Photo, 'id'>) => void;
  updatePhoto: (photo: Photo) => void;
  deletePhoto: (id: string) => void;
  addVideo: (video: Omit<Video, 'id'>) => void;
  updateVideo: (video: Video) => void;
  deleteVideo: (id: string) => void;
  addMessage: (message: Omit<ContactMessage, 'id' | 'date' | 'isRead'>) => void;
  updateMessageReadStatus: (id: string, isRead: boolean) => void;
  deleteMessage: (id: string) => void;
};

// Create context
const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state with mock data or stored data
  const [leadership, setLeadership] = useState<LeadershipMember[]>(() => {
    const stored = localStorage.getItem('leadership');
    return stored ? JSON.parse(stored) : initialLeadership;
  });
  
  const [facilities, setFacilities] = useState<Facility[]>(() => {
    const stored = localStorage.getItem('facilities');
    return stored ? JSON.parse(stored) : initialFacilities;
  });
  
  const [activities, setActivities] = useState<Activity[]>(() => {
    const stored = localStorage.getItem('activities');
    return stored ? JSON.parse(stored) : initialActivities;
  });
  
  const [photos, setPhotos] = useState<Photo[]>(() => {
    const stored = localStorage.getItem('photos');
    return stored ? JSON.parse(stored) : initialPhotos;
  });
  
  const [videos, setVideos] = useState<Video[]>(() => {
    const stored = localStorage.getItem('videos');
    return stored ? JSON.parse(stored) : initialVideos;
  });
  
  const [messages, setMessages] = useState<ContactMessage[]>(() => {
    const stored = localStorage.getItem('messages');
    return stored ? JSON.parse(stored) : initialMessages;
  });

  // Save to localStorage when data changes
  useEffect(() => {
    localStorage.setItem('leadership', JSON.stringify(leadership));
  }, [leadership]);

  useEffect(() => {
    localStorage.setItem('facilities', JSON.stringify(facilities));
  }, [facilities]);

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    localStorage.setItem('photos', JSON.stringify(photos));
  }, [photos]);

  useEffect(() => {
    localStorage.setItem('videos', JSON.stringify(videos));
  }, [videos]);

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages));
  }, [messages]);

  // Leadership CRUD operations
  const addLeadershipMember = (member: Omit<LeadershipMember, 'id'>) => {
    const newMember = { ...member, id: uuidv4() };
    setLeadership([...leadership, newMember]);
    toast.success('Leadership member added successfully');
  };

  const updateLeadershipMember = (member: LeadershipMember) => {
    setLeadership(leadership.map(m => m.id === member.id ? member : m));
    toast.success('Leadership member updated successfully');
  };

  const deleteLeadershipMember = (id: string) => {
    setLeadership(leadership.filter(member => member.id !== id));
    toast.success('Leadership member deleted successfully');
  };

  // Facility CRUD operations
  const addFacility = (facility: Omit<Facility, 'id'>) => {
    const newFacility = { ...facility, id: uuidv4() };
    setFacilities([...facilities, newFacility]);
    toast.success('Facility added successfully');
  };

  const updateFacility = (facility: Facility) => {
    setFacilities(facilities.map(f => f.id === facility.id ? facility : f));
    toast.success('Facility updated successfully');
  };

  const deleteFacility = (id: string) => {
    setFacilities(facilities.filter(facility => facility.id !== id));
    toast.success('Facility deleted successfully');
  };

  // Activity CRUD operations
  const addActivity = (activity: Omit<Activity, 'id'>) => {
    const newActivity = { ...activity, id: uuidv4() };
    setActivities([...activities, newActivity]);
    toast.success('Activity added successfully');
  };

  const updateActivity = (activity: Activity) => {
    setActivities(activities.map(a => a.id === activity.id ? activity : a));
    toast.success('Activity updated successfully');
  };

  const deleteActivity = (id: string) => {
    setActivities(activities.filter(activity => activity.id !== id));
    toast.success('Activity deleted successfully');
  };

  // Photo CRUD operations
  const addPhoto = (photo: Omit<Photo, 'id'>) => {
    const newPhoto = { ...photo, id: uuidv4() };
    setPhotos([...photos, newPhoto]);
    toast.success('Photo added successfully');
  };

  const updatePhoto = (photo: Photo) => {
    setPhotos(photos.map(p => p.id === photo.id ? photo : p));
    toast.success('Photo updated successfully');
  };

  const deletePhoto = (id: string) => {
    setPhotos(photos.filter(photo => photo.id !== id));
    toast.success('Photo deleted successfully');
  };

  // Video CRUD operations
  const addVideo = (video: Omit<Video, 'id'>) => {
    const newVideo = { ...video, id: uuidv4() };
    setVideos([...videos, newVideo]);
    toast.success('Video added successfully');
  };

  const updateVideo = (video: Video) => {
    setVideos(videos.map(v => v.id === video.id ? video : v));
    toast.success('Video updated successfully');
  };

  const deleteVideo = (id: string) => {
    setVideos(videos.filter(video => video.id !== id));
    toast.success('Video deleted successfully');
  };

  // Message CRUD operations
  const addMessage = (message: Omit<ContactMessage, 'id' | 'date' | 'isRead'>) => {
    const newMessage = { 
      ...message, 
      id: uuidv4(), 
      date: new Date().toISOString(),
      isRead: false 
    };
    setMessages([...messages, newMessage]);
    toast.success('Message sent successfully');
  };

  const updateMessageReadStatus = (id: string, isRead: boolean) => {
    setMessages(messages.map(m => m.id === id ? { ...m, isRead } : m));
  };

  const deleteMessage = (id: string) => {
    setMessages(messages.filter(message => message.id !== id));
    toast.success('Message deleted successfully');
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
