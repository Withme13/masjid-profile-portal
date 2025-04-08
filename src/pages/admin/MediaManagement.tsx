import React, { useState, useEffect } from 'react';
import { Pencil, Trash2, PlusCircle, Image, Film, Upload } from 'lucide-react';
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
  const [thumbnailUploadProgress, setThumbnailUploadProgress] = useState(false);
  const [videoFormData, setVideoFormData] = useState({
    name: '',
    description: '',
    videoUrl: '',
    thumbnailUrl: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

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
      setSelectedPhotoFile(e.target.files[0]);
      
      // Preview the selected image
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          // Create a temporary preview
          setPhotoFormData(prev => ({
            ...prev,
            tempPreview: event.target?.result as string
          }));
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handlePhotoFileUpload = async () => {
    if (!selectedPhotoFile) return null;
    
    setPhotoUploadProgress(true);
    try {
      console.log("Uploading photo file:", selectedPhotoFile.name);
      const imageUrl = await uploadFile(selectedPhotoFile);
      setPhotoUploadProgress(false);
      
      if (!imageUrl) {
        console.error("Failed to upload photo file - no URL returned");
        toast.error("Failed to upload photo. Please try again.");
        return null;
      }
      
      console.log("Photo uploaded successfully with URL:", imageUrl);
      return imageUrl;
    } catch (error) {
      console.error('Error uploading photo:', error);
      toast.error("An unexpected error occurred during upload.");
      setPhotoUploadProgress(false);
      return null;
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
    
    let imageUrl = photoFormData.imageUrl;
    
    if (selectedPhotoFile) {
      console.log("Starting photo upload process...");
      const uploadedUrl = await handlePhotoFileUpload();
      if (uploadedUrl) {
        imageUrl = uploadedUrl;
        console.log("Using uploaded photo URL:", imageUrl);
      } else {
        console.error("Photo upload failed or was cancelled");
        setIsSubmitting(false);
        return;
      }
    }
    
    if (!imageUrl) {
      toast.error("Please provide an image URL or upload an image");
      setIsSubmitting(false);
      return;
    }
    
    console.log("Adding new photo with image URL:", imageUrl);
    await addPhoto({
      ...photoFormData,
      imageUrl
    });
    
    setIsSubmitting(false);
    setIsAddPhotoDialogOpen(false);
    toast.success("Photo added successfully");
  };

  const handleEditPhotoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPhoto) return;
    
    setIsSubmitting(true);
    
    let imageUrl = photoFormData.imageUrl;
    
    if (selectedPhotoFile) {
      console.log("Starting photo upload for edit...");
      const uploadedUrl = await handlePhotoFileUpload();
      if (uploadedUrl) {
        imageUrl = uploadedUrl;
        console.log("Using new uploaded photo URL:", imageUrl);
      } else {
        console.log("Keeping existing photo URL:", imageUrl);
      }
    }
    
    console.log("Updating photo with image URL:", imageUrl);
    await updatePhoto({
      ...photoFormData,
      id: currentPhoto.id,
      imageUrl
    });
    
    setIsSubmitting(false);
    setIsEditPhotoDialogOpen(false);
    toast.success("Photo updated successfully");
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

  // Video handlers
  const handleVideoInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setVideoFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
      const thumbnailUrl = await uploadFile(selectedThumbnailFile);
      setThumbnailUploadProgress(false);
      
      if (!thumbnailUrl) {
        toast.error("Failed to upload thumbnail. Please try again.");
        return null;
      }
      
      return thumbnailUrl;
    } catch (error) {
      console.error('Error uploading thumbnail:', error);
      toast.error("An error occurred while uploading the thumbnail.");
      setThumbnailUploadProgress(false);
      return null;
    }
  };

  const openAddVideoDialog = () => {
    setVideoFormData({
      name: '',
      description: '',
      videoUrl: '',
      thumbnailUrl: '',
    });
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
    
    let thumbnailUrl = videoFormData.thumbnailUrl;
    
    if (selectedThumbnailFile) {
      const uploadedUrl = await handleThumbnailFileUpload();
      if (uploadedUrl) {
        thumbnailUrl = uploadedUrl;
      }
    }
    
    addVideo({
      ...videoFormData,
      thumbnailUrl
    });
    
    setIsSubmitting(false);
    setIsAddVideoDialogOpen(false);
    
    toast.success("Video added successfully");
  };

  const handleEditVideoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentVideo) return;
    
    setIsSubmitting(true);
    
    let thumbnailUrl = videoFormData.thumbnailUrl;
    
    if (selectedThumbnailFile) {
      const uploadedUrl = await handleThumbnailFileUpload();
      if (uploadedUrl) {
        thumbnailUrl = uploadedUrl;
      }
    }
    
    updateVideo({
      ...videoFormData,
      id: currentVideo.id,
      thumbnailUrl
    });
    
    setIsSubmitting(false);
    setIsEditVideoDialogOpen(false);
    
    toast.success("Video updated successfully");
  };

  const handleDeleteVideo = async () => {
    if (!currentVideo) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    deleteVideo(currentVideo.id);
    
    setIsSubmitting(false);
    setIsDeleteVideoDialogOpen(false);
    
    toast.success("Video deleted successfully");
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
                  <SelectItem value="Events">Events</SelectItem>
                  <SelectItem value="Architecture">Architecture</SelectItem>
                  <SelectItem value="Community">Community</SelectItem>
                  <SelectItem value="Activities">Activities</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
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
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="video-name">Video Name</Label>
              <Input
                id="video-name"
                name="name"
                value={videoFormData.name}
                onChange={handleVideoInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="video-description">Description</Label>
              <Textarea
                id="video-description"
                name="description"
                value={videoFormData.description}
                onChange={handleVideoInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="video-url">Video URL (YouTube embed link)</Label>
              <Input
                id="video-url"
                name="videoUrl"
                value={videoFormData.videoUrl}
                onChange={handleVideoInputChange}
                placeholder="https://www.youtube.com/embed/VIDEO_ID"
                required
              />
              <p className="text-xs text-muted-foreground">
                Enter the embed URL of the YouTube video (e.g., https://www.youtube.com/embed/VIDEO_ID).
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="video-thumbnail">Video Thumbnail</Label>
              <div className="flex flex-col space-y-2">
                <Input
                  id="video-thumbnail"
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailFileChange}
                  className="cursor-pointer"
                />
                <p className="text-xs text-muted-foreground">
                  Upload a thumbnail image for the video (optional).
                </p>
              </div>
            </div>
            
            {selectedThumbnailFile && (
              <div className="mt-2">
                <p className="text-sm font-medium mb-2">Selected thumbnail: {selectedThumbnailFile.name}</p>
              </div>
            )}
            
            {videoFormData.thumbnailUrl && (
              <div className="mt-2">
                <p className="text-sm font-medium mb-2">Thumbnail Preview:</p>
                <div className="h-24 w-40 rounded overflow-hidden border">
                  <img 
                    src={videoFormData.thumbnailUrl} 
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            )}
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
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-video-name">Video Name</Label>
              <Input
                id="edit-video-name"
                name="name"
                value={videoFormData.name}
                onChange={handleVideoInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-video-description">Description</Label>
              <Textarea
                id="edit-video-description"
                name="description"
                value={videoFormData.description}
                onChange={handleVideoInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-video-url">Video URL (YouTube embed link)</Label>
              <Input
                id="edit-video-url"
                name="videoUrl"
                value={videoFormData.videoUrl}
                onChange={handleVideoInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-video-thumbnail">Video Thumbnail</Label>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center gap-2">
                  <Input
                    id="edit-video-thumbnail"
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailFileChange}
                    className="cursor-pointer"
                  />
                  {thumbnailUploadProgress && <Upload className="h-4 w-4 animate-pulse" />}
                </div>
                <p className="text-xs text-muted-foreground">
                  Upload a new thumbnail or keep the existing one.
                </p>
              </div>
            </div>
            
            {selectedThumbnailFile && (
              <div className="mt-2">
                <p className="text-sm font-medium mb-2">Selected thumbnail: {selectedThumbnailFile.name}</p>
              </div>
            )}
            
            {videoFormData.thumbnailUrl && (
              <div className="mt-2">
                <p className="text-sm font-medium mb-2">Current Thumbnail:</p>
                <div className="h-24 w-40 rounded overflow-hidden border">
                  <img 
                    src={videoFormData.thumbnailUrl} 
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            )}
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
