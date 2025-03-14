
// Organization structure types
export interface LeadershipMember {
  id: string;
  name: string;
  position: string;
  education: string;
  imageUrl: string;
}

// Facility types
export interface Facility {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

// Activity types
export interface Activity {
  id: string;
  date: string;
  name: string;
  description: string;
  imageUrl?: string;
}

// Media types
export interface Photo {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
}

export interface Video {
  id: string;
  name: string;
  description: string;
  videoUrl: string;
  thumbnailUrl?: string;
}

// Contact Message types
export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  isRead: boolean;
}
