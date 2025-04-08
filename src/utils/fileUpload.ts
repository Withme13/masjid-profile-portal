
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from 'uuid';
import { toast } from "sonner";

export const uploadFile = async (file: File, bucket: string = 'uploads') => {
  if (!file) return null;

  const fileExt = file.name.split('.').pop();
  const fileName = `${uuidv4()}.${fileExt}`;
  const filePath = `${fileName}`;

  try {
    console.log(`Starting upload for file: ${file.name} to bucket: ${bucket}`);
    
    // First check if the bucket exists and create it if it doesn't
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(b => b.name === bucket);
    
    if (!bucketExists) {
      console.log(`Bucket ${bucket} does not exist. Creating bucket...`);
      await supabase.storage.createBucket(bucket, {
        public: true // Make the bucket public so files are accessible
      });
      console.log(`Bucket ${bucket} created successfully`);
    }

    // Upload the file
    console.log(`Uploading file to ${bucket}/${filePath}...`);
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (error) {
      console.error('Error uploading file:', error);
      toast.error("Failed to upload file. Please try again.");
      return null;
    }

    // Get the public URL of the uploaded file
    const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(filePath);
    
    console.log('Uploaded file with public URL:', publicUrl);
    return publicUrl;
  } catch (error) {
    console.error('Exception uploading file:', error);
    toast.error("An unexpected error occurred during upload.");
    return null;
  }
};
