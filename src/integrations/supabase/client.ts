
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';
import { toast } from "sonner";

const SUPABASE_URL = "https://mwcybswqkviwzsrkkcdc.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13Y3lic3dxa3Zpd3pzcmtrY2RjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc1MTQzNTUsImV4cCI6MjA4MzA5MDM1NX0.4QSlg3k8I3X0sIdUD3dED9n-A3aStkmzbQEf60px8kM";

// Create a single instance of the Supabase client
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

// Upload directly to existing Supabase buckets
export const uploadDirectlyToSupabase = async (file: File, filePath: string, bucketName: string = 'photos'): Promise<string | null> => {
  try {
    console.log(`Uploading file directly to Supabase storage bucket: ${bucketName}, path: ${filePath}`);
    
    // Check if the file is valid before trying to upload
    if (!file || file.size === 0) {
      console.error('Invalid file: file is empty or undefined');
      toast("Invalid file. Please select a valid file to upload.");
      return null;
    }
    
    // Log file information for debugging
    console.log(`File info: name=${file.name}, size=${(file.size / 1024 / 1024).toFixed(2)}MB, type=${file.type}`);
    
    // Try to upload directly to the bucket
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (error) {
      console.error(`Error uploading file to Supabase bucket '${bucketName}':`, error);
      
      // Show specific error messages based on the error type
      if (error.message.includes('not found') || error.message.includes('does not exist')) {
        toast(`Storage bucket '${bucketName}' doesn't exist. Please contact an administrator to create this bucket.`);
      } else if (error.message.includes('row-level security policy')) {
        toast("Permission denied: Unable to upload file. Please make sure you're logged in with the correct permissions.");
      } else if (error.message.includes('size exceeds')) {
        toast("File size exceeds the maximum allowed size for this bucket.");
      } else {
        toast(`Upload failed: ${error.message}`);
      }
      return null;
    }

    if (!data) {
      console.error('No data returned from upload');
      toast("Upload failed. Please try again.");
      return null;
    }

    // Get the public URL of the uploaded file
    const { data: { publicUrl } } = supabase.storage.from(bucketName).getPublicUrl(filePath);
    console.log('File uploaded successfully. Public URL:', publicUrl);
    return publicUrl;
  } catch (error: any) {
    console.error('Exception during direct file upload:', error);
    toast(error?.message || "An unexpected error occurred during upload.");
    return null;
  }
};

// Function to check if a bucket exists without trying to create it
export const ensureBucketExists = async (bucketName: string): Promise<boolean> => {
  try {
    console.log(`Checking if bucket ${bucketName} exists...`);
    
    // Check if we can list files in the bucket (which implies it exists)
    const { data, error } = await supabase.storage.from(bucketName).list('', { limit: 1 });
    
    if (error) {
      console.error(`Error checking if bucket ${bucketName} exists:`, error);
      if (error.message.includes('not found') || error.message.includes('does not exist')) {
        toast(`Storage bucket '${bucketName}' doesn't exist. Please contact an administrator to create this bucket.`);
        return false;
      }
      return false;
    }
    
    console.log(`Bucket ${bucketName} exists and is accessible`);
    return true;
  } catch (error) {
    console.error('Exception in ensureBucketExists:', error);
    return false;
  }
};
