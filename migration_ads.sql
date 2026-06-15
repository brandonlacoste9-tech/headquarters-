-- 1. Create the ad_campaigns table for the Internal Ad Exchange
CREATE TABLE IF NOT EXISTS public.ad_campaigns (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  target_url TEXT NOT NULL,
  image_url TEXT NOT NULL,
  impressions INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable RLS
ALTER TABLE public.ad_campaigns ENABLE ROW LEVEL SECURITY;

-- 3. Anyone can read active ads to display on the network
CREATE POLICY "Active ads are viewable by everyone."
ON public.ad_campaigns FOR SELECT
USING (active = true);

-- 4. Create an RPC to safely increment impressions and clicks without granting raw UPDATE access
CREATE OR REPLACE FUNCTION public.track_ad_event(ad_id uuid, event_type text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF event_type = 'impression' THEN
    UPDATE public.ad_campaigns SET impressions = impressions + 1 WHERE id = ad_id;
  ELSIF event_type = 'click' THEN
    UPDATE public.ad_campaigns SET clicks = clicks + 1 WHERE id = ad_id;
  END IF;
END;
$$;
