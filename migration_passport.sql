-- Upgrade the referral RPC to award 2x points to Passport holders (PRO plan)

CREATE OR REPLACE FUNCTION public.process_referral(referrer uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  referrer_plan text;
  points_to_award integer;
BEGIN
  -- Check if this user was already referred by someone else
  IF EXISTS (SELECT 1 FROM public.referrals WHERE referred_id = auth.uid()) THEN
    RETURN;
  END IF;

  -- Insert the referral record
  INSERT INTO public.referrals (referrer_id, referred_id)
  VALUES (referrer, auth.uid());

  -- Check the referrer's plan
  SELECT plan INTO referrer_plan FROM public.profiles WHERE id = referrer;

  -- Award 1000 points if PRO, otherwise 500
  IF referrer_plan = 'PRO' THEN
    points_to_award := 1000;
  ELSE
    points_to_award := 500;
  END IF;

  -- Grant the points
  UPDATE public.profiles 
  SET empire_points = COALESCE(empire_points, 0) + points_to_award 
  WHERE id = referrer;
END;
$$;
