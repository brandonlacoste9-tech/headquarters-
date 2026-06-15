-- 1. Add empire_points column to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS empire_points INTEGER DEFAULT 0;

-- 2. Create the referrals table to track who invited who
CREATE TABLE IF NOT EXISTS public.referrals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  referrer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  referred_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Enable RLS on referrals
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view referrals they are involved in" 
ON public.referrals FOR SELECT 
USING (auth.uid() = referrer_id OR auth.uid() = referred_id);

-- 4. Create an RPC function to safely process a new referral
-- This runs with SECURITY DEFINER so it bypasses RLS to grant the referrer their points
CREATE OR REPLACE FUNCTION public.process_referral(referrer uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Check if this user was already referred by someone else
  IF EXISTS (SELECT 1 FROM public.referrals WHERE referred_id = auth.uid()) THEN
    RETURN;
  END IF;

  -- Insert the referral record
  INSERT INTO public.referrals (referrer_id, referred_id)
  VALUES (referrer, auth.uid());

  -- Reward the referrer with 500 Empire Points!
  UPDATE public.profiles 
  SET empire_points = COALESCE(empire_points, 0) + 500 
  WHERE id = referrer;
END;
$$;
