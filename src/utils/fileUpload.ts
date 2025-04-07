
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from 'uuid';

export const uploadFile = async (file: File, bucket: string = 'uploads') => {
  if (!file) return null;

  const fileExt = file.name.split('.').pop();
  const fileName = `${uuidv4()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file);

  if (error) {
    console.error('Error uploading file:', error);
    return null;
  }

  const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(filePath);

  return publicUrl;
};
