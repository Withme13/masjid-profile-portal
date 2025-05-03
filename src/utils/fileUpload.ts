
import { supabase, uploadDirectlyToSupabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from 'uuid';
import { toast } from "sonner";

export const uploadFile = async (file: File, bucket: string = 'uploads') => {
  if (!file) {
    console.error('No file provided to uploadFile function');
    toast("No file selected for upload");
    return null;
  }

  // Validate file size based on bucket
  const maxSizeMB = bucket === 'videos' ? 500 : 5; // 500MB for videos, 5MB for others
  const fileSizeMB = file.size / 1024 / 1024;
  
  if (fileSizeMB > maxSizeMB) {
    console.error(`File size exceeds the maximum allowed size of ${maxSizeMB}MB`);
    toast(`File size (${fileSizeMB.toFixed(2)}MB) exceeds the maximum allowed size of ${maxSizeMB}MB`);
    return null;
  }

  const fileExt = file.name.split('.').pop();
  const fileName = `${uuidv4()}.${fileExt}`;
  const filePath = `${fileName}`;

  try {
    console.log(`Starting upload of file ${file.name} (${(file.size / 1024 / 1024).toFixed(2)}MB) to bucket: ${bucket}`);
    
    // Direct upload to Supabase bucket without checking if it exists first
    const publicUrl = await uploadDirectlyToSupabase(file, filePath, bucket);
    
    if (!publicUrl) {
      console.error('Failed to get URL after upload');
      return null;
    }
    
    console.log('File uploaded successfully with URL:', publicUrl);
    return publicUrl;
  } catch (error) {
    console.error('Exception uploading file:', error);
    toast("An unexpected error occurred during upload.");
    return null;
  }
};
