
import { supabase, uploadDirectlyToSupabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from 'uuid';
import { toast } from "sonner";

export const uploadFile = async (file: File, bucket: string = 'uploads') => {
  if (!file) return null;

  const fileExt = file.name.split('.').pop();
  const fileName = `${uuidv4()}.${fileExt}`;
  const filePath = `${fileName}`;

  try {
    console.log(`Starting upload of file to bucket: ${bucket}`);
    
    // Use the new direct upload function
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
