
import { supabase, checkIfBucketExists, createBucket } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from 'uuid';
import { toast } from "sonner";

export const uploadFile = async (file: File, bucket: string = 'photos') => {
  if (!file) {
    console.error('No file provided for upload');
    toast.error("No file selected for upload");
    return null;
  }

  const fileExt = file.name.split('.').pop();
  const fileName = `${uuidv4()}.${fileExt}`;
  const filePath = `${fileName}`;

  try {
    console.log(`Starting upload for file: ${file.name} to bucket: ${bucket}`);
    
    // First check if the bucket exists
    const bucketExists = await checkIfBucketExists(bucket);
    
    console.log(`Bucket ${bucket} exists: ${bucketExists}`);
    
    // Upload the file
    console.log(`Uploading file to ${bucket}/${filePath}...`);
    const { data, error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (uploadError) {
      console.error('Error uploading file:', uploadError);
      toast.error(`Failed to upload file: ${uploadError.message}`);
      return null;
    }

    console.log('File uploaded successfully, data:', data);

    // Get the public URL of the uploaded file
    const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(filePath);
    
    console.log('File public URL:', publicUrl);
    toast.success("File uploaded successfully!");
    return publicUrl;
  } catch (error) {
    console.error('Exception uploading file:', error);
    toast.error("An unexpected error occurred during upload.");
    return null;
  }
};
