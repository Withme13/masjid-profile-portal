
import React, { useState } from 'react';
import { Pencil, Trash2, PlusCircle, Image, Film, Upload, FileVideo, FileImage, Info } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useData } from '@/contexts/DataContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FormDialog from '@/components/admin/FormDialog';
import ConfirmationDialog from '@/components/admin/ConfirmationDialog';
import { Photo, Video } from '@/types/adminTypes';
import { uploadFile } from '@/utils/fileUpload';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase, ensureBucketExists } from '@/integrations/supabase/client';

const MediaManagement = () => {
  const { photos, videos, addPhoto, updatePhoto, deletePhoto, addVideo, updateVideo, deleteVideo } = useData();
  
  // Photo state
  const [isAddPhotoDialogOpen, setIsAddPhotoDialogOpen] = useState(false);
  const [isEditPhotoDialogOpen, setIsEditPhotoDialogOpen] = useState(false);
  const [isDeletePhotoDialogOpen, setIsDeletePhotoDialogOpen] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState<Photo | null>(null);
  const [selectedPhotoFile, setSelectedPhotoFile] = useState<File | null>(null);
  const [photoUploadProgress, setPhotoUploadProgress] = useState(false);
  const [photoFormData, setPhotoFormData] = useState({
    name: '',
    description: '',
    imageUrl: '',
    category: 'Events',
  });

  // Video state
  const [isAddVideoDialogOpen, setIsAddVideoDialogOpen] = useState(false);
  const [isEditVideoDialogOpen, setIsEditVideoDialogOpen] = useState(false);
  const [isDeleteVideoDialogOpen, setIsDeleteVideoDialogOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  const [selectedThumbnailFile, setSelectedThumbnailFile] = useState<File | null>(null);
  const [selectedVideoFile, setSelectedVideoFile] = useState<File | null>(null);
  const [thumbnailUploadProgress, setThumbnailUploadProgress] = useState(false);
  const [videoUploadProgress, setVideoUploadProgress] = useState(false);
  const [videoFormData, setVideoFormData] = useState({
    name: '',
    description: '',
    videoUrl: '',
    thumbnailUrl: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Ensure video bucket exists
  React.useEffect(() => {
    const setupBuckets = async () => {
      await ensureBucketExists('videos');
    };
    
    setupBuckets();
  }, []);

  // Photo handlers
  const handlePhotoInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPhotoFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedPhotoFile(file);
      
      // Preview the selected image
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          // Create a temporary preview
          setPhotoFormData(prev => ({
            ...prev,
            imageUrl: event.target?.result as string
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoFileUpload = async () => {
    if (!selectedPhotoFile) return null;
    
    setPhotoUploadProgress(true);
    try {
      console.log('Starting photo upload...');
      
      // Use the updated upload utility with 'photos' bucket
      const imageUrl = await uploadFile(selectedPhotoFile, 'photos');
      
      if (imageUrl) {
        console.log('Photo uploaded successfully, URL:', imageUrl);
        setPhotoFormData(prev => ({
          ...prev,
          imageUrl
        }));
        return imageUrl;
      } else {
        console.error('Failed to get image URL after upload');
        toast("Upload failed. Please try again or contact support.");
        return null;
      }
    } catch (error) {
      console.error('Error uploading photo:', error);
      toast("Upload failed due to an unexpected error.");
      return null;
    } finally {
      setPhotoUploadProgress(false);
    }
  };

  const handlePhotoSelectChange = (value: string) => {
    setPhotoFormData(prev => ({
      ...prev,
      category: value
    }));
  };

  const openAddPhotoDialog = () => {
    setPhotoFormData({
      name: '',
      description: '',
      imageUrl: '',
      category: 'Events',
    });
    setSelectedPhotoFile(null);
    setIsAddPhotoDialogOpen(true);
  };

  const openEditPhotoDialog = (photo: Photo) => {
    setCurrentPhoto(photo);
    setPhotoFormData({
      name: photo.name,
      description: photo.description,
      imageUrl: photo.imageUrl,
      category: photo.category,
    });
    setSelectedPhotoFile(null);
    setIsEditPhotoDialogOpen(true);
  };

  const openDeletePhotoDialog = (photo: Photo) => {
    setCurrentPhoto(photo);
    setIsDeletePhotoDialogOpen(true);
  };

  const handleAddPhotoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      let finalImageUrl = photoFormData.imageUrl;
      
      if (selectedPhotoFile) {
        const uploadedUrl = await handlePhotoFileUpload();
        if (uploadedUrl) {
          finalImageUrl = uploadedUrl;
        } else {
          // If upload failed but we have a data URL preview, we can use that temporarily
          // This allows users to continue even if storage permissions are limited
          if (photoFormData.imageUrl && photoFormData.imageUrl.startsWith('data:')) {
            console.log('Using data URL as fallback');
            finalImageUrl = photoFormData.imageUrl;
          } else {
            toast("Failed to upload image. Please try again or use an external image URL.");
            setIsSubmitting(false);
            return;
          }
        }
      }
      
      if (!finalImageUrl) {
        toast("Please select an image to upload or provide an image URL.");
        setIsSubmitting(false);
        return;
      }
      
      // Use the context function to add the photo - NO DIRECT SUPABASE CALL HERE
      await addPhoto({
        name: photoFormData.name,
        description: photoFormData.description,
        category: photoFormData.category,
        imageUrl: finalImageUrl
      });
      
      toast("Photo added successfully.");
      
      // Close the dialog
      setIsAddPhotoDialogOpen(false);
    } catch (error) {
      console.error('Exception adding photo:', error);
      toast("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditPhotoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPhoto) return;
    
    setIsSubmitting(true);
    
    if (selectedPhotoFile) {
      await handlePhotoFileUpload();
    }
    
    updatePhoto({
      ...photoFormData,
      id: currentPhoto.id
    });
    
    setIsSubmitting(false);
    setIsEditPhotoDialogOpen(false);
  };

  const handleDeletePhoto = async () => {
    if (!currentPhoto) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    deletePhoto(currentPhoto.id);
    
    setIsSubmitting(false);
    setIsDeletePhotoDialogOpen(false);
  };

  const handleVideoInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setVideoFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedVideoFile(file);
      console.log('Video file selected:', file.name, 'Size:', (file.size / 1024 / 1024).toFixed(2), 'MB');
    }
  };

  const handleVideoFileUpload = async () => {
    if (!selectedVideoFile) return null;
  
    setVideoUploadProgress(true);
    try {
      console.log('Starting video upload...', selectedVideoFile.name, selectedVideoFile.size);
      
      // First check if the videos bucket exists
      const bucketExists = await ensureBucketExists('videos');
      if (!bucketExists) {
        console.error('Videos bucket does not exist or is not accessible');
        toast("The videos storage bucket is not available. Please contact an administrator.");
        return null;
      }
      
      // Check file size before uploading
      const fileSizeMB = selectedVideoFile.size / 1024 / 1024;
      const maxSizeMB = 500; // 500MB limit
      
      if (fileSizeMB > maxSizeMB) {
        console.error(`File size (${fileSizeMB.toFixed(2)}MB) exceeds the maximum allowed size of ${maxSizeMB}MB`);
        toast(`File is too large (${fileSizeMB.toFixed(2)}MB). Maximum file size is ${maxSizeMB}MB.`);
        return null;
      }
      
      // Upload to videos bucket
      const videoUrl = await uploadFile(selectedVideoFile, 'videos');
      
      if (!videoUrl) {
        console.error('Failed to get video URL after upload');
        return null;
      }
      
      console.log('Video uploaded successfully, URL:', videoUrl);
      setVideoFormData(prev => ({
        ...prev,
        videoUrl
      }));
      
      return videoUrl;
    } catch (error) {
      console.error('Error uploading video:', error);
      toast("Video upload failed due to an unexpected error.");
      return null;
    } finally {
      setVideoUploadProgress(false);
    }
  };

  const handleThumbnailFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedThumbnailFile(e.target.files[0]);
      
      // Preview the selected image
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          // Create a temporary preview
          setVideoFormData(prev => ({
            ...prev,
            thumbnailUrl: event.target?.result as string
          }));
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleThumbnailFileUpload = async () => {
    if (!selectedThumbnailFile) return null;
    
    setThumbnailUploadProgress(true);
    try {
      const thumbnailUrl = await uploadFile(selectedThumbnailFile, 'videos');
      
      if (!thumbnailUrl) {
        toast("Failed to upload thumbnail. Please try again.");
        return null;
      }
      
      return thumbnailUrl;
    } catch (error) {
      console.error('Error uploading thumbnail:', error);
      toast("An error occurred while uploading the thumbnail.");
      return null;
    } finally {
      setThumbnailUploadProgress(false);
    }
  };

  const openAddVideoDialog = () => {
    setVideoFormData({
      name: '',
      description: '',
      videoUrl: '',
      thumbnailUrl: '',
    });
    setSelectedVideoFile(null);
    setSelectedThumbnailFile(null);
    setIsAddVideoDialogOpen(true);
  };

  const openEditVideoDialog = (video: Video) => {
    setCurrentVideo(video);
    setVideoFormData({
      name: video.name,
      description: video.description,
      videoUrl: video.videoUrl,
      thumbnailUrl: video.thumbnailUrl || '',
    });
    setSelectedVideoFile(null);
    setSelectedThumbnailFile(null);
    setIsEditVideoDialogOpen(true);
  };

  const openDeleteVideoDialog = (video: Video) => {
    setCurrentVideo(video);
    setIsDeleteVideoDialogOpen(true);
  };

  const handleAddVideoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      let videoUrl = videoFormData.videoUrl;
      let thumbnailUrl = videoFormData.thumbnailUrl;
      
      // Handle video file upload
      if (selectedVideoFile) {
        const uploadedVideoUrl = await handleVideoFileUpload();
        if (uploadedVideoUrl) {
          videoUrl = uploadedVideoUrl;
        } else {
          toast("Failed to upload video. Please try again.");
          setIsSubmitting(false);
          return;
        }
      }
      
      if (!videoUrl) {
        toast("Please upload a video file.");
        setIsSubmitting(false);
        return;
      }
      
      // Handle thumbnail upload if present
      if (selectedThumbnailFile) {
        const uploadedThumbnailUrl = await handleThumbnailFileUpload();
        if (uploadedThumbnailUrl) {
          thumbnailUrl = uploadedThumbnailUrl;
        }
      }
      
      // Add the video through the context function
      await addVideo({
        name: videoFormData.name,
        description: videoFormData.description,
        videoUrl,
        thumbnailUrl
      });
      
      toast("Video added successfully.");
      setIsAddVideoDialogOpen(false);
    } catch (error) {
      console.error('Error adding video:', error);
      toast("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditVideoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentVideo) return;
    
    setIsSubmitting(true);
    
    try {
      let videoUrl = videoFormData.videoUrl;
      let thumbnailUrl = videoFormData.thumbnailUrl;
      
      // Handle video file upload if a new file was selected
      if (selectedVideoFile) {
        const uploadedVideoUrl = await handleVideoFileUpload();
        if (uploadedVideoUrl) {
          videoUrl = uploadedVideoUrl;
        } else {
          toast("Failed to upload new video. Using existing video.");
        }
      }
      
      // Handle thumbnail upload if a new thumbnail was selected
      if (selectedThumbnailFile) {
        const uploadedThumbnailUrl = await handleThumbnailFileUpload();
        if (uploadedThumbnailUrl) {
          thumbnailUrl = uploadedThumbnailUrl;
        }
      }
      
      // Update the video through the context function
      await updateVideo({
        id: currentVideo.id,
        name: videoFormData.name,
        description: videoFormData.description,
        videoUrl,
        thumbnailUrl
      });
      
      toast("Video updated successfully.");
      setIsEditVideoDialogOpen(false);
    } catch (error) {
      console.error('Error updating video:', error);
      toast("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteVideo = async () => {
    if (!currentVideo) return;
    
    setIsSubmitting(true);
    
    try {
      await deleteVideo(currentVideo.id);
      toast("The video has been deleted successfully.");
    } catch (error) {
      console.error('Error deleting video:', error);
      toast("An error occurred while deleting the video.");
    } finally {
      setIsSubmitting(false);
      setIsDeleteVideoDialogOpen(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Media Center Management</h1>
            <p className="text-muted-foreground">
              Manage photos and videos in the media center.
            </p>
          </div>
        </div>
        
        <Tabs defaultValue="photos">
          <TabsList>
            <TabsTrigger value="photos" className="flex items-center">
              <Image className="mr-2 h-4 w-4" />
              Photos
            </TabsTrigger>
            <TabsTrigger value="videos" className="flex items-center">
              <Film className="mr-2 h-4 w-4" />
              Videos
            </TabsTrigger>
          </TabsList>
          
          {/* Photos Tab */}
          <TabsContent value="photos" className="space-y-4">
            <div className="flex justify-end">
              <Button onClick={openAddPhotoDialog}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Photo
              </Button>
            </div>
            
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Thumbnail</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="hidden md:table-cell">Description</TableHead>
                    <TableHead className="w-[100px] text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {photos.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                        No photos found. Add your first photo!
                      </TableCell>
                    </TableRow>
                  ) : (
                    photos.map((photo) => (
                      <TableRow key={photo.id}>
                        <TableCell>
                          <div className="h-10 w-16 rounded overflow-hidden">
                            <img 
                              src={photo.imageUrl} 
                              alt={photo.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{photo.name}</TableCell>
                        <TableCell>{photo.category}</TableCell>
                        <TableCell className="hidden md:table-cell max-w-[300px] truncate">
                          {photo.description}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => openEditPhotoDialog(photo)}
                            >
                              <Pencil className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="text-destructive hover:text-destructive"
                              onClick={() => openDeletePhotoDialog(photo)}
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
          </TabsContent>
          
          {/* Videos Tab */}
          <TabsContent value="videos" className="space-y-4">
            <div className="flex justify-end">
              <Button onClick={openAddVideoDialog}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Video
              </Button>
            </div>
            
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Thumbnail</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden md:table-cell">Description</TableHead>
                    <TableHead className="w-[100px] text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {videos.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                        No videos found. Add your first video!
                      </TableCell>
                    </TableRow>
                  ) : (
                    videos.map((video) => (
                      <TableRow key={video.id}>
                        <TableCell>
                          <div className="h-10 w-16 rounded overflow-hidden">
                            <img 
                              src={video.thumbnailUrl || 'https://via.placeholder.com/160x90'} 
                              alt={video.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{video.name}</TableCell>
                        <TableCell className="hidden md:table-cell max-w-[300px] truncate">
                          {video.description}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => openEditVideoDialog(video)}
                            >
                              <Pencil className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="text-destructive hover:text-destructive"
                              onClick={() => openDeleteVideoDialog(video)}
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
          </TabsContent>
        </Tabs>

        {/* Photo Add Dialog */}
        <FormDialog
          title="Add New Photo"
          isOpen={isAddPhotoDialogOpen}
          onClose={() => setIsAddPhotoDialogOpen(false)}
          onSubmit={handleAddPhotoSubmit}
          isSubmitting={isSubmitting}
          submitLabel="Add Photo"
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="photo-name">Photo Name</Label>
              <Input
                id="photo-name"
                name="name"
                value={photoFormData.name}
                onChange={handlePhotoInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="photo-category">Category</Label>
              <Select
                value={photoFormData.category}
                onValueChange={handlePhotoSelectChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Events">Acara</SelectItem>
                  <SelectItem value="Architecture">Arsitektur</SelectItem>
                  <SelectItem value="Community">Komunitas</SelectItem>
                  <SelectItem value="Activities">Aktivitas</SelectItem>
                  <SelectItem value="Other">Lainnya</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="photo-description">Description</Label>
              <Textarea
                id="photo-description"
                name="description"
                value={photoFormData.description}
                onChange={handlePhotoInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="photo-image">Photo Image</Label>
              <div className="flex flex-col space-y-2">
                <Input
                  id="photo-image"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoFileChange}
                  className="cursor-pointer"
                  required={!photoFormData.imageUrl}
                />
                <p className="text-xs text-muted-foreground">
                  Upload the photo image file.
                </p>
              </div>
            </div>
            
            {selectedPhotoFile && (
              <div className="mt-2">
                <p className="text-sm font-medium mb-2">Selected file: {selectedPhotoFile.name}</p>
              </div>
            )}
            
            {photoFormData.imageUrl && (
              <div className="mt-2">
                <p className="text-sm font-medium mb-2">Image Preview:</p>
                <div className="h-32 w-full rounded overflow-hidden border">
                  <img 
                    src={photoFormData.imageUrl} 
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </FormDialog>

        {/* Photo Edit Dialog */}
        <FormDialog
          title="Edit Photo"
          isOpen={isEditPhotoDialogOpen}
          onClose={() => setIsEditPhotoDialogOpen(false)}
          onSubmit={handleEditPhotoSubmit}
          isSubmitting={isSubmitting}
          submitLabel="Update Photo"
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-photo-name">Photo Name</Label>
              <Input
                id="edit-photo-name"
                name="name"
                value={photoFormData.name}
                onChange={handlePhotoInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-photo-category">Category</Label>
              <Select
                value={photoFormData.category}
                onValueChange={handlePhotoSelectChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Events">Events</SelectItem>
                  <SelectItem value="Architecture">Architecture</SelectItem>
                  <SelectItem value="Community">Community</SelectItem>
                  <SelectItem value="Activities">Activities</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-photo-description">Description</Label>
              <Textarea
                id="edit-photo-description"
                name="description"
                value={photoFormData.description}
                onChange={handlePhotoInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-photo-image">Photo Image</Label>
              <div className="flex flex-col space-y-2">
                <Input
                  id="edit-photo-image"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoFileChange}
                  className="cursor-pointer"
                />
                <p className="text-xs text-muted-foreground">
                  Upload a new image or keep the existing one.
                </p>
              </div>
            </div>
            
            {selectedPhotoFile && (
              <div className="mt-2">
                <p className="text-sm font-medium mb-2">Selected file: {selectedPhotoFile.name}</p>
              </div>
            )}
            
            {photoFormData.imageUrl && (
              <div className="mt-2">
                <p className="text-sm font-medium mb-2">Current Image:</p>
                <div className="h-32 w-full rounded overflow-hidden border">
                  <img 
                    src={photoFormData.imageUrl} 
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </FormDialog>

        {/* Photo Delete Confirmation Dialog */}
        <ConfirmationDialog
          title="Delete Photo"
          description={`Are you sure you want to delete the photo "${currentPhoto?.name}"? This action cannot be undone.`}
          isOpen={isDeletePhotoDialogOpen}
          onClose={() => setIsDeletePhotoDialogOpen(false)}
          onConfirm={handleDeletePhoto}
          isConfirming={isSubmitting}
        />

        {/* Video Add Dialog */}
        <FormDialog
          title="Add New Video"
          isOpen={isAddVideoDialogOpen}
          onClose={() => setIsAddVideoDialogOpen(false)}
          onSubmit={handleAddVideoSubmit}
          isSubmitting={isSubmitting}
          submitLabel="Add Video"
          maxWidth="lg"
        >
          <div className="grid gap-6">
            {/* Basic Info Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary">
                <Info size={18} />
                <h3 className="text-lg font-medium">Basic Information</h3>
              </div>
              
              <div className="grid gap-4 sm:grid-cols-1">
                <div className="space-y-2">
                  <Label htmlFor="video-name" className="text-base">Video Name</Label>
                  <Input
                    id="video-name"
                    name="name"
                    value={videoFormData.name}
                    onChange={handleVideoInputChange}
                    placeholder="Enter a descriptive title for the video"
                    className="h-10"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="video-description" className="text-base">Description</Label>
                <Textarea
                  id="video-description"
                  name="description"
                  value={videoFormData.description}
                  onChange={handleVideoInputChange}
                  placeholder="Add details about this video"
                  className="min-h-[100px] resize-y"
                  required
                />
              </div>
            </div>
            
            {/* Video File Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary">
                <FileVideo size={18} />
                <h3 className="text-lg font-medium">Video File</h3>
              </div>
              
              <div className="space-y-3">
                <div className="border rounded-lg p-4 bg-muted/30">
                  <Label 
                    htmlFor="video-file" 
                    className="block mb-2 text-base"
                  >
                    Upload Video
                  </Label>
                  <div className="flex flex-col space-y-3">
                    <Input
                      id="video-file"
                      type="file"
                      accept="video/*"
                      onChange={handleVideoFileChange}
                      className="cursor-pointer h-10"
                      required={!videoFormData.videoUrl}
                    />
                    <p className="text-xs text-muted-foreground">
                      Supported formats: MP4, WebM, OGG (max 500MB)
                    </p>
                  </div>
                </div>
              
                {selectedVideoFile && (
                  <div className="mt-2 p-3 border rounded-md bg-primary/5">
                    <div className="flex items-start gap-3">
                      <FileVideo className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">
                          {selectedVideoFile.name} 
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {(selectedVideoFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    
                    {videoUploadProgress && (
                      <div className="flex items-center gap-2 mt-2">
                        <Upload className="h-4 w-4 animate-pulse text-primary" />
                        <span className="text-sm text-muted-foreground">Uploading video...</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            {/* Thumbnail Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary">
                <FileImage size={18} />
                <h3 className="text-lg font-medium">Video Thumbnail</h3>
              </div>
              
              <div className="space-y-3">
                <div className="border rounded-lg p-4 bg-muted/30">
                  <Label 
                    htmlFor="video-thumbnail" 
                    className="block mb-2 text-base"
                  >
                    Upload Thumbnail
                  </Label>
                  <div className="flex flex-col space-y-3">
                    <Input
                      id="video-thumbnail"
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnailFileChange}
                      className="cursor-pointer h-10"
                    />
                    <p className="text-xs text-muted-foreground">
                      Recommended: 16:9 ratio image (1280x720px)
                    </p>
                  </div>
                </div>
                
                {selectedThumbnailFile && (
                  <div className="mt-2 p-3 border rounded-md bg-primary/5">
                    <div className="flex items-start gap-3">
                      <FileImage className="h-5 w-5 text-primary mt-0.5" />
                      <p className="text-sm font-medium">{selectedThumbnailFile.name}</p>
                    </div>
                  </div>
                )}
              </div>
              
              {videoFormData.thumbnailUrl && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm font-medium">Thumbnail Preview:</p>
                  <div className="w-full max-w-[280px] rounded overflow-hidden border">
                    <img 
                      src={videoFormData.thumbnailUrl} 
                      alt="Thumbnail preview"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </FormDialog>

        {/* Video Edit Dialog */}
        <FormDialog
          title="Edit Video"
          isOpen={isEditVideoDialogOpen}
          onClose={() => setIsEditVideoDialogOpen(false)}
          onSubmit={handleEditVideoSubmit}
          isSubmitting={isSubmitting}
          submitLabel="Update Video"
          maxWidth="lg"
        >
          <div className="grid gap-6">
            {/* Basic Info Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary">
                <Info size={18} />
                <h3 className="text-lg font-medium">Basic Information</h3>
              </div>
              
              <div className="grid gap-4 sm:grid-cols-1">
                <div className="space-y-2">
                  <Label htmlFor="edit-video-name" className="text-base">Video Name</Label>
                  <Input
                    id="edit-video-name"
                    name="name"
                    value={videoFormData.name}
                    onChange={handleVideoInputChange}
                    placeholder="Enter a descriptive title for the video"
                    className="h-10"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-video-description" className="text-base">Description</Label>
                <Textarea
                  id="edit-video-description"
                  name="description"
                  value={videoFormData.description}
                  onChange={handleVideoInputChange}
                  placeholder="Add details about this video"
                  className="min-h-[100px] resize-y"
                  required
                />
              </div>
            </div>
            
            {/* Video File Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary">
                <FileVideo size={18} />
                <h3 className="text-lg font-medium">Video File</h3>
              </div>
              
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">Current video: {currentVideo?.videoUrl ? 
                  <a href={currentVideo.videoUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">View</a> : "None"}</p>
                
                <div className="border rounded-lg p-4 bg-muted/30">
                  <Label 
                    htmlFor="edit-video-file" 
                    className="block mb-2 text-base"
                  >
                    Upload New Video (Optional)
                  </Label>
                  <div className="flex flex-col space-y-3">
                    <Input
                      id="edit-video-file"
                      type="file"
                      accept="video/*"
                      onChange={handleVideoFileChange}
                      className="cursor-pointer h-10"
                    />
                    <p className="text-xs text-muted-foreground">
                      Leave empty to keep the current video
                    </p>
                  </div>
                </div>
                
                {selectedVideoFile && (
                  <div className="mt-2 p-3 border rounded-md bg-primary/5">
                    <div className="flex items-start gap-3">
                      <FileVideo className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">
                          {selectedVideoFile.name} 
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {(selectedVideoFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Thumbnail Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary">
                <FileImage size={18} />
                <h3 className="text-lg font-medium">Video Thumbnail</h3>
              </div>
              
              <div className="space-y-3">
                <div className="border rounded-lg p-4 bg-muted/30">
                  <Label 
                    htmlFor="edit-video-thumbnail" 
                    className="block mb-2 text-base"
                  >
                    Upload New Thumbnail (Optional)
                  </Label>
                  <div className="flex flex-col space-y-3">
                    <Input
                      id="edit-video-thumbnail"
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnailFileChange}
                      className="cursor-pointer h-10"
                    />
                    <p className="text-xs text-muted-foreground">
                      Leave empty to keep the current thumbnail
                    </p>
                  </div>
                </div>
                
                {selectedThumbnailFile && (
                  <div className="mt-2 p-3 border rounded-md bg-primary/5">
                    <div className="flex items-start gap-3">
                      <FileImage className="h-5 w-5 text-primary mt-0.5" />
                      <p className="text-sm font-medium">{selectedThumbnailFile.name}</p>
                    </div>
                  </div>
                )}
              </div>
              
              {videoFormData.thumbnailUrl && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm font-medium">Current Thumbnail:</p>
                  <div className="w-full max-w-[280px] rounded overflow-hidden border">
                    <img 
                      src={videoFormData.thumbnailUrl} 
                      alt="Thumbnail"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </FormDialog>

        {/* Video Delete Confirmation Dialog */}
        <ConfirmationDialog
          title="Delete Video"
          description={`Are you sure you want to delete the video "${currentVideo?.name}"? This action cannot be undone.`}
          isOpen={isDeleteVideoDialogOpen}
          onClose={() => setIsDeleteVideoDialogOpen(false)}
          onConfirm={handleDeleteVideo}
          isConfirming={isSubmitting}
        />
      </div>
    </AdminLayout>
  );
};

export default MediaManagement;
