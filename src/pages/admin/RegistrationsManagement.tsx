
import React, { useState, useEffect } from 'react';
import { Calendar, Search, Download, User, ChevronDown } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format, parseISO } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';

type Registration = {
  id: string;
  full_name: string;
  phone_number: string;
  email: string;
  activity_name: string;
  activity_id: string;
  registration_date: string;
};

const RegistrationsManagement = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [filteredRegistrations, setFilteredRegistrations] = useState<Registration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterActivity, setFilterActivity] = useState('');
  const [uniqueActivities, setUniqueActivities] = useState<string[]>([]);
  const [dateFilter, setDateFilter] = useState('');

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('activity_registrations')
        .select('*')
        .order('registration_date', { ascending: false });

      if (error) {
        console.error('Error fetching registrations:', error);
      } else if (data) {
        setRegistrations(data);
        setFilteredRegistrations(data);
        
        // Extract unique activity names
        const activities = [...new Set(data.map(item => item.activity_name))];
        setUniqueActivities(activities);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Apply all filters
  useEffect(() => {
    let filtered = [...registrations];

    // Search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        reg => reg.full_name.toLowerCase().includes(term) || 
               reg.email.toLowerCase().includes(term) ||
               reg.phone_number.includes(term)
      );
    }

    // Activity filter
    if (filterActivity) {
      filtered = filtered.filter(reg => reg.activity_name === filterActivity);
    }

    // Date filter
    if (dateFilter) {
      const datePrefix = dateFilter.split('T')[0]; // Get just the date part
      filtered = filtered.filter(reg => reg.registration_date.startsWith(datePrefix));
    }

    setFilteredRegistrations(filtered);
  }, [searchTerm, filterActivity, dateFilter, registrations]);

  const exportToCSV = () => {
    const headers = ['Full Name', 'Phone Number', 'Email', 'Activity Name', 'Registration Date'];
    
    const csvData = filteredRegistrations.map(reg => [
      reg.full_name,
      reg.phone_number,
      reg.email,
      reg.activity_name,
      format(parseISO(reg.registration_date), 'yyyy-MM-dd HH:mm')
    ]);

    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `registrations-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold">Activity Registrations</h1>
          <Button
            onClick={exportToCSV}
            variant="outline"
            className="flex items-center"
          >
            <Download className="h-4 w-4 mr-2" />
            Export to CSV
          </Button>
        </div>

        <div className="bg-white rounded-lg border p-6 mb-6">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold flex items-center">
              <User className="mr-2 h-5 w-5" />
              Filter Registrations
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search by name/email/phone */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by name, email or phone"
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              {/* Filter by activity */}
              <div className="relative">
                <select 
                  className="block w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm"
                  value={filterActivity}
                  onChange={(e) => setFilterActivity(e.target.value)}
                >
                  <option value="">All Activities</option>
                  {uniqueActivities.map((activity, index) => (
                    <option key={index} value={activity}>{activity}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
              </div>
              
              {/* Filter by date */}
              <div>
                <Input 
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border overflow-hidden">
          {isLoading ? (
            <div className="flex justify-center items-center p-10">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
            </div>
          ) : filteredRegistrations.length === 0 ? (
            <div className="text-center py-10">
              <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-2" />
              <p className="text-lg font-medium">No registrations found</p>
              <p className="text-muted-foreground">Try adjusting your filters or check back later.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Activity</TableHead>
                    <TableHead>Registration Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRegistrations.map((registration) => (
                    <TableRow key={registration.id}>
                      <TableCell className="font-medium">{registration.full_name}</TableCell>
                      <TableCell>{registration.phone_number}</TableCell>
                      <TableCell>{registration.email}</TableCell>
                      <TableCell>{registration.activity_name}</TableCell>
                      <TableCell>
                        {format(parseISO(registration.registration_date), 'dd MMM yyyy, HH:mm')}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default RegistrationsManagement;
