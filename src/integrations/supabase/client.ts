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
    
    // Check if the file is valid before trying to upload
    if (!file || file.size === 0) {
      console.error('Invalid file: file is empty or undefined');
      toast("Invalid file. Please select a valid file to upload.");
      return null;
    }
    
    // Log file information for debugging
    console.log(`File info: name=${file.name}, size=${(file.size / 1024 / 1024).toFixed(2)}MB, type=${file.type}`);
    
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
        toast(`Storage bucket ${bucketName} doesn't exist. Creating bucket...`);
        // Try to create the bucket if it doesn't exist
        const bucketCreated = await createBucketIfNotExists(bucketName);
        if (bucketCreated) {
          // Retry upload after creating bucket
          return uploadDirectlyToSupabase(file, filePath, bucketName);
        } else {
          toast(`Failed to create bucket ${bucketName}. Please contact your administrator.`);
        }
      } else if (error.message.includes('row-level security policy')) {
        toast("Permission denied: Unable to upload file. Please make sure you're logged in with the correct permissions.");
      } else {
        toast(`Upload failed: ${error.message}`);
      }
      return null;
    }

    // Get the public URL of the uploaded file
    const { data: { publicUrl } } = supabase.storage.from(bucketName).getPublicUrl(filePath);
    console.log('File uploaded successfully. Public URL:', publicUrl);
    return publicUrl;
  } catch (error) {
    console.error('Exception during direct file upload:', error);
    toast("An unexpected error occurred during upload.");
    return null;
  }
};

// Create a bucket if it doesn't exist (requires RLS to allow this operation)
const createBucketIfNotExists = async (bucketName: string): Promise<boolean> => {
  try {
    // Check if bucket exists
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      console.error('Error listing buckets:', listError);
      return false;
    }
    
    const bucketExists = buckets?.some(b => b.name === bucketName);
    
    if (!bucketExists) {
      console.log(`Bucket ${bucketName} doesn't exist, attempting to create...`);
      
      // Try to create the bucket (this might not work with limited permissions)
      const { error: createError } = await supabase.storage.createBucket(bucketName, {
        public: true,
        fileSizeLimit: 50 * 1024 * 1024, // 50MB limit for videos
      });
      
      if (createError) {
        console.error('Error creating bucket:', createError);
        return false;
      }
      
      console.log(`Successfully created bucket: ${bucketName}`);
      return true;
    } else {
      console.log(`Bucket ${bucketName} already exists.`);
      return true;
    }
  } catch (error) {
    console.error('Exception in createBucketIfNotExists:', error);
    return false;
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
    if (!bucketExists) {
      // Try to create the bucket
      return await createBucketIfNotExists(bucketName);
    }
    
    console.log(`Bucket ${bucketName} exists: ${bucketExists}`);
    return bucketExists;
  } catch (error) {
    console.error('Exception in ensureBucketExists:', error);
    return false;
  }
};
