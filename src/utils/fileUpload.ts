
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from 'uuid';
import { toast } from "sonner";

export const uploadFile = async (file: File, bucket: string = 'uploads') => {
  if (!file) {
    console.error('No file provided to uploadFile function');
    toast.error("No file selected for upload");
    return null;
  }

  // Validate file size based on bucket
  const maxSizeMB = bucket === 'videos' ? 500 : 5; // 500MB for videos, 5MB for others
  const fileSizeMB = file.size / 1024 / 1024;
  
  if (fileSizeMB > maxSizeMB) {
    const errorMsg = `File size (${fileSizeMB.toFixed(2)}MB) exceeds the maximum allowed size of ${maxSizeMB}MB`;
    console.error(errorMsg);
    toast.error(errorMsg);
    return null;
  }

  // Validate file type based on bucket
  if (bucket === 'videos') {
    const validVideoTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'];
    if (!validVideoTypes.includes(file.type)) {
      const errorMsg = `Unsupported file type: ${file.type}. Supported types: MP4, WebM, OGG, MOV`;
      console.error(errorMsg);
      toast.error(errorMsg);
      return null;
    }
  }

  const fileExt = file.name.split('.').pop();
  const fileName = `${uuidv4()}.${fileExt}`;
  const filePath = `${fileName}`;

  try {
    console.log(`Starting upload of file ${file.name} (${(file.size / 1024 / 1024).toFixed(2)}MB) to bucket: ${bucket}`);
    
    // Check if bucket exists before trying to upload
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
    
    if (bucketsError) {
      console.error('Error checking buckets:', bucketsError);
      toast.error("Failed to access storage. Please check your connection and permissions.");
      return null;
    }
    
    const bucketExists = buckets.some(b => b.name === bucket);
    
    if (!bucketExists) {
      const errorMsg = `Storage bucket '${bucket}' doesn't exist. Please contact an administrator to create this bucket.`;
      console.error(errorMsg);
      toast.error(errorMsg);
      return null;
    }
    
    // Direct upload to Supabase bucket
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true
      });
    
    if (error) {
      console.error(`Error uploading to '${bucket}' bucket:`, error);
      
      if (error.message.includes('size exceeds')) {
        toast.error(`File size exceeds the maximum allowed for the ${bucket} bucket.`);
      } else if (error.message.includes('auth/insufficient_permissions')) {
        toast.error("You don't have permission to upload to this bucket.");
      } else {
        toast.error(`Upload failed: ${error.message}`);
      }
      
      return null;
    }
    
    if (!data) {
      console.error('No data returned from upload');
      toast.error("Upload failed. Please try again.");
      return null;
    }
    
    // Get the public URL of the uploaded file
    const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(data.path);
    console.log('File uploaded successfully. Public URL:', publicUrl);
    return publicUrl;
  } catch (error: any) {
    console.error('Exception uploading file:', error);
    toast.error("An unexpected error occurred during upload. Please try again.");
    return null;
  }
};
