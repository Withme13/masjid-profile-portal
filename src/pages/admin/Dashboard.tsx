import React from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Building,
  Calendar,
  Image,
  MessageSquare,
  ArrowRight
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useData } from '@/contexts/DataContext';

const Dashboard = () => {
  const { leadership, facilities, activities, photos, videos, messages } = useData();
  
  const totalPhotos = photos.length;
  const totalVideos = videos.length;
  const unreadMessages = messages.filter(m => !m.isRead).length;
  
  const dashboardItems = [
    {
      title: 'Leadership Team',
      description: `${leadership.length} members`,
      icon: <Users className="h-6 w-6 text-primary" />,
      link: '/admin/profiles',
      linkText: 'Manage profiles',
    },
    {
      title: 'Facilities',
      description: `${facilities.length} facilities`,
      icon: <Building className="h-6 w-6 text-primary" />,
      link: '/admin/facilities',
      linkText: 'Manage facilities',
    },
    {
      title: 'Activities',
      description: `${activities.length} activities`,
      icon: <Calendar className="h-6 w-6 text-primary" />,
      link: '/admin/activities',
      linkText: 'Manage activities',
    },
    {
      title: 'Media Center',
      description: `${totalPhotos} photos, ${totalVideos} videos`,
      icon: <Image className="h-6 w-6 text-primary" />,
      link: '/admin/media',
      linkText: 'Manage media',
    },
    {
      title: 'Contact Messages',
      description: `${unreadMessages} unread of ${messages.length} total`,
      icon: <MessageSquare className="h-6 w-6 text-primary" />,
      link: '/admin/messages',
      linkText: 'View messages',
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to the At_Tauhid Mosque admin dashboard.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {dashboardItems.map((item, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {item.title}
                </CardTitle>
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  {item.icon}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{item.description}</div>
                <Link 
                  to={item.link}
                  className="text-sm text-primary mt-2 inline-flex items-center"
                >
                  {item.linkText}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
