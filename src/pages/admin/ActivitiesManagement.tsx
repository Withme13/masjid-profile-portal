
import React, { useState } from 'react';
import { Pencil, Trash2, PlusCircle, Calendar, Upload } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useData } from '@/contexts/DataContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import FormDialog from '@/components/admin/FormDialog';
import ConfirmationDialog from '@/components/admin/ConfirmationDialog';
import { Activity } from '@/types/adminTypes';
import { uploadFile } from '@/utils/fileUpload';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { format, parseISO } from 'date-fns';

const ActivitiesManagement = () => {
  const { activities, addActivity, updateActivity, deleteActivity } = useData();
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentActivity, setCurrentActivity] = useState<Activity | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    name: '',
    description: '',
    imageUrl: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) return;
    
    setUploadProgress(true);
    try {
      const imageUrl = await uploadFile(selectedFile);
      if (imageUrl) {
        setFormData(prev => ({
          ...prev,
          imageUrl
        }));
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setUploadProgress(false);
    }
  };

  const openAddDialog = () => {
    setFormData({
      date: new Date().toISOString().split('T')[0],
      name: '',
      description: '',
      imageUrl: '',
    });
    setSelectedFile(null);
    setIsAddDialogOpen(true);
  };

  const openEditDialog = (activity: Activity) => {
    setCurrentActivity(activity);
    setFormData({
      date: activity.date.split('T')[0],
      name: activity.name,
      description: activity.description,
      imageUrl: activity.imageUrl || '',
    });
    setSelectedFile(null);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (activity: Activity) => {
    setCurrentActivity(activity);
    setIsDeleteDialogOpen(true);
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (selectedFile) {
      await handleFileUpload();
    }
    
    addActivity(formData);
    setIsSubmitting(false);
    setIsAddDialogOpen(false);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentActivity) return;
    
    setIsSubmitting(true);
    
    if (selectedFile) {
      await handleFileUpload();
    }
    
    updateActivity({
      ...formData,
      id: currentActivity.id
    });
    
    setIsSubmitting(false);
    setIsEditDialogOpen(false);
  };

  const handleDelete = async () => {
    if (!currentActivity) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    deleteActivity(currentActivity.id);
    
    setIsSubmitting(false);
    setIsDeleteDialogOpen(false);
  };

  // Sort activities by date (most recent first)
  const sortedActivities = [...activities].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Activities Management</h1>
            <p className="text-muted-foreground">
              Manage mosque activities and events that appear on the website.
            </p>
          </div>
          <Button onClick={openAddDialog}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Activity
          </Button>
        </div>
        
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Activity Name</TableHead>
                <TableHead className="hidden md:table-cell">Description</TableHead>
                <TableHead className="w-[100px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedActivities.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                    No activities found. Add your first activity!
                  </TableCell>
                </TableRow>
              ) : (
                sortedActivities.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>
                          {format(parseISO(activity.date), 'MMM d, yyyy')}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{activity.name}</TableCell>
                    <TableCell className="hidden md:table-cell max-w-[300px] truncate">
                      {activity.description}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => openEditDialog(activity)}
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="text-destructive hover:text-destructive"
                          onClick={() => openDeleteDialog(activity)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Add Dialog */}
        <FormDialog
          title="Add New Activity"
          isOpen={isAddDialogOpen}
          onClose={() => setIsAddDialogOpen(false)}
          onSubmit={handleAddSubmit}
          isSubmitting={isSubmitting}
          submitLabel="Add Activity"
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="name">Activity Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="image">Activity Image</Label>
              <div className="flex flex-col space-y-2">
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="cursor-pointer"
                />
                <p className="text-xs text-muted-foreground">
                  Upload an image for this activity (optional).
                </p>
              </div>
            </div>
            
            {selectedFile && (
              <div className="mt-2">
                <p className="text-sm font-medium mb-2">Selected file: {selectedFile.name}</p>
              </div>
            )}
            
            {formData.imageUrl && (
              <div className="mt-2">
                <p className="text-sm font-medium mb-2">Image Preview:</p>
                <div className="h-32 w-full rounded overflow-hidden border">
                  <img 
                    src={formData.imageUrl} 
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </FormDialog>

        {/* Edit Dialog */}
        <FormDialog
          title="Edit Activity"
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          onSubmit={handleEditSubmit}
          isSubmitting={isSubmitting}
          submitLabel="Update Activity"
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-date">Date</Label>
              <Input
                id="edit-date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-name">Activity Name</Label>
              <Input
                id="edit-name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-image">Activity Image</Label>
              <div className="flex flex-col space-y-2">
                <Input
                  id="edit-image"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="cursor-pointer"
                />
                <p className="text-xs text-muted-foreground">
                  Upload a new image or keep the existing one.
                </p>
              </div>
            </div>
            
            {selectedFile && (
              <div className="mt-2">
                <p className="text-sm font-medium mb-2">Selected file: {selectedFile.name}</p>
              </div>
            )}
            
            {formData.imageUrl && (
              <div className="mt-2">
                <p className="text-sm font-medium mb-2">Current Image:</p>
                <div className="h-32 w-full rounded overflow-hidden border">
                  <img 
                    src={formData.imageUrl} 
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </FormDialog>

        {/* Delete Confirmation Dialog */}
        <ConfirmationDialog
          title="Delete Activity"
          description={`Are you sure you want to delete the "${currentActivity?.name}" activity? This action cannot be undone.`}
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onConfirm={handleDelete}
          isConfirming={isSubmitting}
        />
      </div>
    </AdminLayout>
  );
};

export default ActivitiesManagement;
