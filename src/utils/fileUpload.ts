
import { supabase, uploadDirectlyToSupabase } from "@/integrations/supabase/client";
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
    const publicUrl = await uploadDirectlyToSupabase(file, filePath, bucket);
    
    if (!publicUrl) {
      console.error('Failed to get URL after upload');
      return null;
    }
    
    console.log('File uploaded successfully with URL:', publicUrl);
    return publicUrl;
  } catch (error) {
    console.error('Exception uploading file:', error);
    toast.error("An unexpected error occurred during upload. Please try again.");
    return null;
  }
};
