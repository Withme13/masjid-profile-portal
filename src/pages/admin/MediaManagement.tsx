
import React, { useState, useRef } from 'react';
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
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const MediaManagement = () => {
  const { photos, videos, addPhoto, updatePhoto, deletePhoto, addVideo, updateVideo, deleteVideo } = useData();
  
  // Photo state
  const [isAddPhotoDialogOpen, setIsAddPhotoDialogOpen] = useState(false);
  const [isEditPhotoDialogOpen, setIsEditPhotoDialogOpen] = useState(false);
  const [isDeletePhotoDialogOpen, setIsDeletePhotoDialogOpen] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState<Photo | null>(null);
  const [photoFormData, setPhotoFormData] = useState({
    name: '',
    description: '',
    imageUrl: '',
    category: 'Events',
  });
  const [uploadMethod, setUploadMethod] = useState<'url' | 'upload'>('url');
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Video state
  const [isAddVideoDialogOpen, setIsAddVideoDialogOpen] = useState(false);
  const [isEditVideoDialogOpen, setIsEditVideoDialogOpen] = useState(false);
  const [isDeleteVideoDialogOpen, setIsDeleteVideoDialogOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  const [videoFormData, setVideoFormData] = useState({
    name: '',
    description: '',
    videoUrl: '',
    thumbnailUrl: '',
  });
  const [thumbnailUploadMethod, setThumbnailUploadMethod] = useState<'url' | 'upload'>('url');
  const [isThumbnailUploading, setIsThumbnailUploading] = useState(false);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const thumbnailFileInputRef = useRef<HTMLInputElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Photo handlers
  const handlePhotoInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPhotoFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Update preview if URL is updated
    if (name === 'imageUrl' && value) {
      setImagePreview(value);
    }
  };

  const handlePhotoSelectChange = (value: string) => {
    setPhotoFormData(prev => ({
      ...prev,
      category: value
    }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create a preview
    const objectUrl = URL.createObjectURL(file);
    setImagePreview(objectUrl);

    // We'll upload the file on form submit
  };

  const uploadFile = async (file: File, path: string): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `${path}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage.from('media').getPublicUrl(filePath);
      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Failed to upload file');
      return null;
    }
  };

  const openAddPhotoDialog = () => {
    setPhotoFormData({
      name: '',
      description: '',
      imageUrl: '',
      category: 'Events',
    });
    setUploadMethod('url');
    setImagePreview(null);
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
    setUploadMethod('url');
    setImagePreview(photo.imageUrl);
    setIsEditPhotoDialogOpen(true);
  };

  const openDeletePhotoDialog = (photo: Photo) => {
    setCurrentPhoto(photo);
    setIsDeletePhotoDialogOpen(true);
  };

  const handleAddPhotoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsUploading(uploadMethod === 'upload');
    
    try {
      let imageUrl = photoFormData.imageUrl;
      
      // If using file upload and file exists, upload it
      if (uploadMethod === 'upload' && fileInputRef.current?.files?.[0]) {
        const file = fileInputRef.current.files[0];
        const uploadedUrl = await uploadFile(file, 'photos');
        
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        } else {
          throw new Error("Failed to upload image");
        }
      }
      
      // Proceed with adding the photo
      await addPhoto({
        ...photoFormData,
        imageUrl
      });
      
      toast.success('Photo added successfully');
      setIsAddPhotoDialogOpen(false);
    } catch (error) {
      console.error('Error adding photo:', error);
      toast.error('Failed to add photo');
    } finally {
      setIsSubmitting(false);
      setIsUploading(false);
    }
  };

  const handleEditPhotoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPhoto) return;
    
    setIsSubmitting(true);
    setIsUploading(uploadMethod === 'upload');
    
    try {
      let imageUrl = photoFormData.imageUrl;
      
      // If using file upload and file exists, upload it
      if (uploadMethod === 'upload' && fileInputRef.current?.files?.[0]) {
        const file = fileInputRef.current.files[0];
        const uploadedUrl = await uploadFile(file, 'photos');
        
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        } else {
          throw new Error("Failed to upload image");
        }
      }
      
      // Proceed with updating the photo
      await updatePhoto({
        ...photoFormData,
        id: currentPhoto.id,
        imageUrl
      });
      
      toast.success('Photo updated successfully');
      setIsEditPhotoDialogOpen(false);
    } catch (error) {
      console.error('Error updating photo:', error);
      toast.error('Failed to update photo');
    } finally {
      setIsSubmitting(false);
      setIsUploading(false);
    }
  };

  const handleDeletePhoto = async () => {
    if (!currentPhoto) return;
    
    setIsSubmitting(true);
    
    try {
      await deletePhoto(currentPhoto.id);
      toast.success('Photo deleted successfully');
    } catch (error) {
      console.error('Error deleting photo:', error);
      toast.error('Failed to delete photo');
    } finally {
      setIsSubmitting(false);
      setIsDeletePhotoDialogOpen(false);
    }
  };

  // Video handlers
  const handleVideoInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setVideoFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Update preview if thumbnail URL is updated
    if (name === 'thumbnailUrl' && value) {
      setThumbnailPreview(value);
    }
  };

  const handleThumbnailFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create a preview
    const objectUrl = URL.createObjectURL(file);
    setThumbnailPreview(objectUrl);

    // We'll upload the file on form submit
  };

  const openAddVideoDialog = () => {
    setVideoFormData({
      name: '',
      description: '',
      videoUrl: '',
      thumbnailUrl: '',
    });
    setThumbnailUploadMethod('url');
    setThumbnailPreview(null);
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
    setThumbnailUploadMethod('url');
    setThumbnailPreview(video.thumbnailUrl || null);
    setIsEditVideoDialogOpen(true);
  };

  const openDeleteVideoDialog = (video: Video) => {
    setCurrentVideo(video);
    setIsDeleteVideoDialogOpen(true);
  };

  const handleAddVideoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsThumbnailUploading(thumbnailUploadMethod === 'upload');
    
    try {
      let thumbnailUrl = videoFormData.thumbnailUrl;
      
      // If using file upload for thumbnail and file exists, upload it
      if (thumbnailUploadMethod === 'upload' && thumbnailFileInputRef.current?.files?.[0]) {
        const file = thumbnailFileInputRef.current.files[0];
        const uploadedUrl = await uploadFile(file, 'thumbnails');
        
        if (uploadedUrl) {
          thumbnailUrl = uploadedUrl;
        } else {
          // Continue even if thumbnail upload fails
          console.warn("Failed to upload thumbnail, continuing with empty thumbnail");
        }
      }
      
      // Proceed with adding the video
      await addVideo({
        ...videoFormData,
        thumbnailUrl
      });
      
      toast.success('Video added successfully');
      setIsAddVideoDialogOpen(false);
    } catch (error) {
      console.error('Error adding video:', error);
      toast.error('Failed to add video');
    } finally {
      setIsSubmitting(false);
      setIsThumbnailUploading(false);
    }
  };

  const handleEditVideoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentVideo) return;
    
    setIsSubmitting(true);
    setIsThumbnailUploading(thumbnailUploadMethod === 'upload');
    
    try {
      let thumbnailUrl = videoFormData.thumbnailUrl;
      
      // If using file upload for thumbnail and file exists, upload it
      if (thumbnailUploadMethod === 'upload' && thumbnailFileInputRef.current?.files?.[0]) {
        const file = thumbnailFileInputRef.current.files[0];
        const uploadedUrl = await uploadFile(file, 'thumbnails');
        
        if (uploadedUrl) {
          thumbnailUrl = uploadedUrl;
        } else {
          // Continue with previous thumbnail if upload fails
          console.warn("Failed to upload thumbnail, continuing with previous thumbnail");
        }
      }
      
      // Proceed with updating the video
      await updateVideo({
        ...videoFormData,
        id: currentVideo.id,
        thumbnailUrl
      });
      
      toast.success('Video updated successfully');
      setIsEditVideoDialogOpen(false);
    } catch (error) {
      console.error('Error updating video:', error);
      toast.error('Failed to update video');
    } finally {
      setIsSubmitting(false);
      setIsThumbnailUploading(false);
    }
  };

  const handleDeleteVideo = async () => {
    if (!currentVideo) return;
    
    setIsSubmitting(true);
    
    try {
      await deleteVideo(currentVideo.id);
      toast.success('Video deleted successfully');
    } catch (error) {
      console.error('Error deleting video:', error);
      toast.error('Failed to delete video');
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
          isSubmitting={isSubmitting || isUploading}
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
              <div className="flex items-center space-x-4">
                <div 
                  className={`rounded-full px-3 py-1 text-sm cursor-pointer transition-colors ${uploadMethod === 'url' ? 'bg-primary text-white' : 'bg-muted'}`}
                  onClick={() => setUploadMethod('url')}
                >
                  URL
                </div>
                <div 
                  className={`rounded-full px-3 py-1 text-sm cursor-pointer transition-colors ${uploadMethod === 'upload' ? 'bg-primary text-white' : 'bg-muted'}`}
                  onClick={() => setUploadMethod('upload')}
                >
                  Upload Image
                </div>
              </div>
            </div>
            
            {uploadMethod === 'url' ? (
              <div className="space-y-2">
                <Label htmlFor="photo-imageUrl">Image URL</Label>
                <Input
                  id="photo-imageUrl"
                  name="imageUrl"
                  value={photoFormData.imageUrl}
                  onChange={handlePhotoInputChange}
                  placeholder="https://example.com/image.jpg"
                  required={uploadMethod === 'url'}
                />
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="photo-file">Upload Image</Label>
                <Input
                  id="photo-file"
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  required={uploadMethod === 'upload'}
                  className="cursor-pointer"
                />
                <p className="text-xs text-muted-foreground">
                  Supported formats: JPG, PNG, GIF. Max file size: 5MB.
                </p>
              </div>
            )}
            
            {imagePreview && (
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">Preview:</p>
                <div className="h-32 w-56 rounded overflow-hidden border">
                  <img 
                    src={imagePreview} 
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
          isSubmitting={isSubmitting || isUploading}
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
              <div className="flex items-center space-x-4">
                <div 
                  className={`rounded-full px-3 py-1 text-sm cursor-pointer transition-colors ${uploadMethod === 'url' ? 'bg-primary text-white' : 'bg-muted'}`}
                  onClick={() => setUploadMethod('url')}
                >
                  URL
                </div>
                <div 
                  className={`rounded-full px-3 py-1 text-sm cursor-pointer transition-colors ${uploadMethod === 'upload' ? 'bg-primary text-white' : 'bg-muted'}`}
                  onClick={() => setUploadMethod('upload')}
                >
                  Upload Image
                </div>
              </div>
            </div>
            
            {uploadMethod === 'url' ? (
              <div className="space-y-2">
                <Label htmlFor="edit-photo-imageUrl">Image URL</Label>
                <Input
                  id="edit-photo-imageUrl"
                  name="imageUrl"
                  value={photoFormData.imageUrl}
                  onChange={handlePhotoInputChange}
                  required={uploadMethod === 'url'}
                />
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="edit-photo-file">Upload New Image</Label>
                <Input
                  id="edit-photo-file"
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="cursor-pointer"
                />
                <p className="text-xs text-muted-foreground">
                  Supported formats: JPG, PNG, GIF. Max file size: 5MB. Leave empty to keep the current image.
                </p>
              </div>
            )}
            
            {imagePreview && (
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">Preview:</p>
                <div className="h-32 w-56 rounded overflow-hidden border">
                  <img 
                    src={imagePreview} 
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
          isSubmitting={isSubmitting || isThumbnailUploading}
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
                Enter the YouTube video URL (e.g., https://www.youtube.com/watch?v=VIDEO_ID) 
                or embed URL (e.g., https://www.youtube.com/embed/VIDEO_ID).
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-4">
                <div 
                  className={`rounded-full px-3 py-1 text-sm cursor-pointer transition-colors ${thumbnailUploadMethod === 'url' ? 'bg-primary text-white' : 'bg-muted'}`}
                  onClick={() => setThumbnailUploadMethod('url')}
                >
                  URL
                </div>
                <div 
                  className={`rounded-full px-3 py-1 text-sm cursor-pointer transition-colors ${thumbnailUploadMethod === 'upload' ? 'bg-primary text-white' : 'bg-muted'}`}
                  onClick={() => setThumbnailUploadMethod('upload')}
                >
                  Upload Thumbnail
                </div>
              </div>
            </div>
            
            {thumbnailUploadMethod === 'url' ? (
              <div className="space-y-2">
                <Label htmlFor="video-thumbnailUrl">Thumbnail URL (Optional)</Label>
                <Input
                  id="video-thumbnailUrl"
                  name="thumbnailUrl"
                  value={videoFormData.thumbnailUrl}
                  onChange={handleVideoInputChange}
                  placeholder="https://img.youtube.com/vi/VIDEO_ID/hqdefault.jpg"
                />
                <p className="text-xs text-muted-foreground">
                  For YouTube videos, you can use: https://img.youtube.com/vi/VIDEO_ID/hqdefault.jpg
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="video-thumbnail-file">Upload Thumbnail (Optional)</Label>
                <Input
                  id="video-thumbnail-file"
                  type="file"
                  ref={thumbnailFileInputRef}
                  onChange={handleThumbnailFileChange}
                  accept="image/*"
                  className="cursor-pointer"
                />
                <p className="text-xs text-muted-foreground">
                  Supported formats: JPG, PNG. Max file size: 5MB.
                </p>
              </div>
            )}
            
            {thumbnailPreview && (
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">Thumbnail Preview:</p>
                <div className="h-24 w-40 rounded overflow-hidden border">
                  <img 
                    src={thumbnailPreview} 
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
          isSubmitting={isSubmitting || isThumbnailUploading}
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
              <p className="text-xs text-muted-foreground">
                Enter the YouTube video URL or embed URL.
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-4">
                <div 
                  className={`rounded-full px-3 py-1 text-sm cursor-pointer transition-colors ${thumbnailUploadMethod === 'url' ? 'bg-primary text-white' : 'bg-muted'}`}
                  onClick={() => setThumbnailUploadMethod('url')}
                >
                  URL
                </div>
                <div 
                  className={`rounded-full px-3 py-1 text-sm cursor-pointer transition-colors ${thumbnailUploadMethod === 'upload' ? 'bg-primary text-white' : 'bg-muted'}`}
                  onClick={() => setThumbnailUploadMethod('upload')}
                >
                  Upload Thumbnail
                </div>
              </div>
            </div>
            
            {thumbnailUploadMethod === 'url' ? (
              <div className="space-y-2">
                <Label htmlFor="edit-video-thumbnailUrl">Thumbnail URL (Optional)</Label>
                <Input
                  id="edit-video-thumbnailUrl"
                  name="thumbnailUrl"
                  value={videoFormData.thumbnailUrl}
                  onChange={handleVideoInputChange}
                />
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="edit-video-thumbnail-file">Upload New Thumbnail</Label>
                <Input
                  id="edit-video-thumbnail-file"
                  type="file"
                  ref={thumbnailFileInputRef}
                  onChange={handleThumbnailFileChange}
                  accept="image/*"
                  className="cursor-pointer"
                />
                <p className="text-xs text-muted-foreground">
                  Leave empty to keep the current thumbnail.
                </p>
              </div>
            )}
            
            {thumbnailPreview && (
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">Thumbnail Preview:</p>
                <div className="h-24 w-40 rounded overflow-hidden border">
                  <img 
                    src={thumbnailPreview} 
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
