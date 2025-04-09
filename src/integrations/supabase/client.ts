import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';
import { toast } from "sonner";

const SUPABASE_URL = "https://zbgluffhfvmvwxatldqa.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpiZ2x1ZmZoZnZtdnd4YXRsZHFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwODkxNzQsImV4cCI6MjA1ODY2NTE3NH0.2vBwlj9fbQ_fwYdTqXcV75WowcLNzA-KRP3ayKJo8P4";

// Create a single instance of the Supabase client
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

// Instead of creating buckets which requires admin permissions, 
// we'll use this function to upload directly to existing buckets
export const uploadDirectlyToSupabase = async (file: File, filePath: string, bucketName: string = 'photos'): Promise<string | null> => {
  try {
    console.log(`Uploading file directly to Supabase storage bucket: ${bucketName}, path: ${filePath}`);
    
    // Try to upload directly to the bucket without checking if it exists first
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (error) {
      console.error('Error uploading file to Supabase:', error);
      
      if (error.message.includes('The resource was not found')) {
        toast.error(`Bucket ${bucketName} doesn't exist. Please contact your administrator.`);
      } else if (error.message.includes('row-level security policy')) {
        toast.error("Permission denied: Unable to upload file. Please make sure you're logged in with the correct permissions.");
      } else {
        toast.error(`Upload failed: ${error.message}`);
      }
      return null;
    }

    // Get the public URL of the uploaded file
    const { data: { publicUrl } } = supabase.storage.from(bucketName).getPublicUrl(filePath);
    console.log('File uploaded successfully. Public URL:', publicUrl);
    return publicUrl;
  } catch (error) {
    console.error('Exception during direct file upload:', error);
    toast.error("An unexpected error occurred during upload.");
    return null;
  }
};

// Keep the original function for compatibility but simplify it
export const ensureBucketExists = async (bucketName: string): Promise<boolean> => {
  try {
    console.log(`Checking if bucket ${bucketName} exists...`);
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      console.error('Error listing buckets:', listError);
      return false;
    }
    
    const bucketExists = buckets?.some(b => b.name === bucketName);
    console.log(`Bucket ${bucketName} exists: ${bucketExists}`);
    return bucketExists;
  } catch (error) {
    console.error('Exception in ensureBucketExists:', error);
    return false;
  }
};
