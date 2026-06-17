import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const EmpireAdBanner = () => {
  const [ad, setAd] = useState(null);
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    const checkProAndFetchAd = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('plan')
            .eq('id', session.user.id)
            .single();

          if (profile?.plan === 'PRO') {
            setIsPro(true);
            return;
          }
        }

        const { data: ads, error } = await supabase
          .from('ad_campaigns')
          .select('*')
          .eq('active', true);

        if (error) throw error;

        if (ads && ads.length > 0) {
          const selectedAd = ads[Math.floor(Math.random() * ads.length)];
          setAd(selectedAd);

          supabase.rpc('track_ad_event', {
            ad_id: selectedAd.id,
            event_type: 'impression',
          }).then(({ error: trackError }) => {
            if (trackError) console.error('Failed to track impression:', trackError);
          });
        }
      } catch (err) {
        console.error('Failed to load Empire Ad:', err);
      }
    };

    checkProAndFetchAd();
  }, []);

  if (isPro || !ad) return null;

  const handleClick = () => {
    supabase.rpc('track_ad_event', {
      ad_id: ad.id,
      event_type: 'click',
    }).then(({ error }) => {
      if (error) console.error('Failed to track click:', error);
    });
  };

  return (
    <div style={{
      width: '100%',
      maxWidth: '728px',
      margin: '2rem auto',
      background: '#111',
      border: '1px solid #333',
      borderRadius: '8px',
      overflow: 'hidden',
      position: 'relative',
      fontFamily: 'sans-serif'
    }}>
      <div style={{
        position: 'absolute',
        top: 0, right: 0,
        background: 'rgba(0,0,0,0.7)',
        color: '#888',
        fontSize: '10px',
        padding: '2px 6px',
        borderBottomLeftRadius: '4px',
        textTransform: 'uppercase',
        zIndex: 10
      }}>
        Sponsored by The Empire
      </div>

      <a
        href={ad.target_url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        style={{ display: 'flex', textDecoration: 'none', color: 'inherit', alignItems: 'center' }}
      >
        <img
          src={ad.image_url}
          alt={ad.title}
          style={{ width: '120px', height: '90px', objectFit: 'cover' }}
        />
        <div style={{ padding: '0 20px', flex: 1 }}>
          <h3 style={{ margin: '0 0 5px 0', color: '#fff', fontSize: '1.2rem' }}>{ad.title}</h3>
          <p style={{ margin: 0, color: '#aaa', fontSize: '0.9rem' }}>Click here to experience the next evolution in digital entertainment.</p>
        </div>
        <div style={{ padding: '0 20px' }}>
          <button style={{
            background: '#ff003c',
            color: '#fff',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
            PLAY NOW
          </button>
        </div>
      </a>
    </div>
  );
};

export default EmpireAdBanner;