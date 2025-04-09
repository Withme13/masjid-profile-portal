
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from 'uuid';
import { toast } from "sonner";

export const uploadFile = async (file: File, bucket: string = 'uploads') => {
  if (!file) return null;

  const fileExt = file.name.split('.').pop();
  const fileName = `${uuidv4()}.${fileExt}`;
  const filePath = `${fileName}`;

  try {
    console.log(`Starting upload of file to bucket: ${bucket}`);
    
    // First check if the bucket exists and create it if it doesn't
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
    
    if (bucketsError) {
      console.error('Error listing buckets:', bucketsError);
      toast.error("Failed to access storage. Please try again.");
      return null;
    }
    
    const bucketExists = buckets?.some(b => b.name === bucket);
    console.log(`Bucket ${bucket} exists: ${bucketExists}`);
    
    if (!bucketExists) {
      // Create the bucket if it doesn't exist
      console.log(`Creating bucket: ${bucket}`);
      const { error: createBucketError } = await supabase.storage.createBucket(bucket, {
        public: true, // Make the bucket public so files are accessible
        fileSizeLimit: 10485760 // 10MB
      });
      
      if (createBucketError) {
        console.error('Error creating bucket:', createBucketError);
        toast.error("Failed to create storage bucket. Please try again.");
        return null;
      }
      console.log(`Successfully created bucket: ${bucket}`);
    }

    // Upload the file
    console.log(`Uploading file ${fileName} to bucket ${bucket}`);
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
