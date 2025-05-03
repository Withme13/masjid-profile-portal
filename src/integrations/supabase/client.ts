
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
