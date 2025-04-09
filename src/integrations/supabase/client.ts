
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';
import { toast } from "sonner";

const SUPABASE_URL = "https://zbgluffhfvmvwxatldqa.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpiZ2x1ZmZoZnZtdnd4YXRsZHFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwODkxNzQsImV4cCI6MjA1ODY2NTE3NH0.2vBwlj9fbQ_fwYdTqXcV75WowcLNzA-KRP3ayKJo8P4";

// Create a single instance of the Supabase client
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

// Add a helper function to check and create buckets
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
      console.log(`Bucket ${bucketName} doesn't exist, creating it...`);
      const { error: createError } = await supabase.storage.createBucket(bucketName, {
        public: true
      });
      
      if (createError) {
        console.error(`Error creating bucket ${bucketName}:`, createError);
        // If we get an RLS error, it might be that the user doesn't have permissions
        if (createError.message.includes('row-level security policy')) {
          toast.error("Permission denied: Unable to create storage bucket. Please check your account permissions.");
        } else {
          toast.error(`Failed to create bucket: ${createError.message}`);
        }
        return false;
      }
      console.log(`Bucket ${bucketName} created successfully`);
    } else {
      console.log(`Bucket ${bucketName} already exists`);
    }
    
    return true;
  } catch (error) {
    console.error('Exception in ensureBucketExists:', error);
    return false;
  }
};
