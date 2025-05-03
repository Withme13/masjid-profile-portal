
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';
import { toast } from "sonner";

const SUPABASE_URL = "https://zbgluffhfvmvwxatldqa.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpiZ2x1ZmZoZnZtdnd4YXRsZHFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwODkxNzQsImV4cCI6MjA1ODY2NTE3NH0.2vBwlj9fbQ_fwYdTqXcV75WowcLNzA-KRP3ayKJo8P4";

// Create a single instance of the Supabase client
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

// Function to check if a bucket exists
export const ensureBucketExists = async (bucketName: string): Promise<boolean> => {
  try {
    console.log(`Checking if bucket ${bucketName} exists...`);
    
    // Get list of all buckets
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
    
    if (bucketsError) {
      console.error('Error checking buckets:', bucketsError);
      return false;
    }
    
    // Check if the requested bucket exists in the list
    const bucketExists = buckets.some(bucket => bucket.name === bucketName);
    
    if (!bucketExists) {
      console.error(`Bucket ${bucketName} does not exist`);
      return false;
    }
    
    console.log(`Bucket ${bucketName} exists and is accessible`);
    return true;
  } catch (error) {
    console.error('Exception in ensureBucketExists:', error);
    return false;
  }
};

// Upload directly to existing Supabase buckets
export const uploadDirectlyToSupabase = async (file: File, filePath: string, bucketName: string = 'photos'): Promise<string | null> => {
  try {
    console.log(`Uploading file directly to Supabase storage bucket: ${bucketName}, path: ${filePath}`);
    
    // Check if the file is valid before trying to upload
    if (!file || file.size === 0) {
      console.error('Invalid file: file is empty or undefined');
      toast.error("Invalid file. Please select a valid file to upload.");
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
        toast.error(`Storage bucket '${bucketName}' doesn't exist. Please contact an administrator to create this bucket.`);
      } else if (error.message.includes('row-level security policy')) {
        toast.error("Permission denied: Unable to upload file. Please make sure you're logged in with the correct permissions.");
      } else if (error.message.includes('size exceeds')) {
        toast.error("File size exceeds the maximum allowed size for this bucket.");
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
    const { data: { publicUrl } } = supabase.storage.from(bucketName).getPublicUrl(filePath);
    console.log('File uploaded successfully. Public URL:', publicUrl);
    return publicUrl;
  } catch (error: any) {
    console.error('Exception during direct file upload:', error);
    toast.error(error?.message || "An unexpected error occurred during upload.");
    return null;
  }
};
