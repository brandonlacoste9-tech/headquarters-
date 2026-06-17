-- Canonical referral RPC (supersedes migration_affiliates.sql version).
-- Awards 1000 points for PRO referrers, 500 otherwise.
-- Blocks self-referral and invalid referrer IDs.

CREATE OR REPLACE FUNCTION public.process_referral(referrer uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  referrer_plan text;
  points_to_award integer;
BEGIN
  IF referrer IS NULL OR referrer = auth.uid() THEN
    RETURN;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE id = referrer) THEN
    RETURN;
  END IF;

  IF EXISTS (SELECT 1 FROM public.referrals WHERE referred_id = auth.uid()) THEN
    RETURN;
  END IF;

  INSERT INTO public.referrals (referrer_id, referred_id)
  VALUES (referrer, auth.uid());

  SELECT plan INTO referrer_plan FROM public.profiles WHERE id = referrer;

  IF referrer_plan IN ('PRO', 'pro') THEN
    points_to_award := 1000;
  ELSE
    points_to_award := 500;
  END IF;

  UPDATE public.profiles
  SET empire_points = COALESCE(empire_points, 0) + points_to_award
  WHERE id = referrer;
END;
$$;