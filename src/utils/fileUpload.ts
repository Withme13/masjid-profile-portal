
import { supabase, uploadDirectlyToSupabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from 'uuid';
import { toast } from "sonner";

export const uploadFile = async (file: File, bucket: string = 'uploads') => {
  if (!file) {
    console.error('No file provided to uploadFile function');
    return null;
  }

  const fileExt = file.name.split('.').pop();
  const fileName = `${uuidv4()}.${fileExt}`;
  const filePath = `${fileName}`;

  try {
    console.log(`Starting upload of file ${file.name} (${(file.size / 1024 / 1024).toFixed(2)}MB) to bucket: ${bucket}`);
    
    // Make sure the bucket exists before uploading
    const bucketExists = await supabase.storage.from(bucket).list();
    if (!bucketExists.data || bucketExists.error) {
      console.log(`Bucket ${bucket} might not exist, attempting to ensure it exists...`);
      await supabase.storage.createBucket(bucket, {
        public: true,
        fileSizeLimit: bucket === 'videos' ? 50 * 1024 * 1024 : 5 * 1024 * 1024,
      });
    }
    
    // Use the direct upload function
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
