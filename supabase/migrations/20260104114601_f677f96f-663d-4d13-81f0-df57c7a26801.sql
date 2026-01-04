-- Drop existing restrictive policies and create permissive ones

-- Activities table
DROP POLICY IF EXISTS "Enable read access for all users" ON public.activities;
CREATE POLICY "Enable read access for all users" 
ON public.activities 
FOR SELECT 
TO public
USING (true);

-- Facilities table  
DROP POLICY IF EXISTS "Enable read access for all users" ON public.facilities;
CREATE POLICY "Enable read access for all users"
ON public.facilities
FOR SELECT
TO public
USING (true);

-- Media Photos table
DROP POLICY IF EXISTS "Enable read access for all users" ON public.media_photos;
CREATE POLICY "Enable read access for all users"
ON public.media_photos
FOR SELECT
TO public
USING (true);

-- Media Videos table
DROP POLICY IF EXISTS "Enable read access for all users" ON public.media_videos;
CREATE POLICY "Enable read access for all users"
ON public.media_videos
FOR SELECT
TO public
USING (true);

-- Leadership Profiles table
DROP POLICY IF EXISTS "Enable read access for all users" ON public.leadership_profiles;
CREATE POLICY "Enable read access for all users"
ON public.leadership_profiles
FOR SELECT
TO public
USING (true);

-- Activity Registrations table
DROP POLICY IF EXISTS "Allow reading registrations" ON public.activity_registrations;
CREATE POLICY "Allow reading registrations"
ON public.activity_registrations
FOR SELECT
TO public
USING (true);