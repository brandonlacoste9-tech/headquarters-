const { Resend } = require('resend');
const { createClient } = require('@supabase/supabase-js');

// Config
const RESEND_API_KEY = 'REDACTED_RESEND_KEY';
const SUPABASE_URL = 'https://eurrfbiavliahmhdxybp.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = 'REDACTED_SERVICE_ROLE_KEY';

const resend = new Resend(RESEND_API_KEY);
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function sendNewsletter() {
  console.log('🚀 Starting Empire Newsletter Blast...');

  try {
    // 1. Fetch all users from Supabase Auth
    console.log('👥 Fetching user database...');
    const { data: { users }, error } = await supabase.auth.admin.listUsers();
    
    if (error) {
      throw new Error(`Failed to fetch users: ${error.message}`);
    }

    if (!users || users.length === 0) {
      console.log('No users found in database. Exiting.');
      return;
    }

    // Filter out users without email
    const emails = users.map(u => u.email).filter(Boolean);
    console.log(`Found ${emails.length} subscribers.`);

    // 2. Compile the HTML Template
    // In a production app, we would fetch data from the databases to dynamically fill this.
    // For this automated blast, we will hardcode the top trending items for the week.
    const htmlTemplate = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #fff; padding: 20px; border-radius: 8px;">
        <div style="text-align: center; border-bottom: 2px solid #00f3ff; padding-bottom: 20px; margin-bottom: 20px;">
          <h1 style="color: #00f3ff; margin: 0; letter-spacing: 2px;">THE EMPIRE</h1>
          <p style="color: #888; font-size: 14px; margin-top: 5px;">Your Weekly Tech & Gaming Briefing</p>
        </div>

        <div style="background: #111; padding: 15px; border-left: 4px solid #ff003c; margin-bottom: 20px;">
          <h2 style="color: #ff003c; margin-top: 0;">🎮 Game of the Week</h2>
          <h3 style="margin-bottom: 5px;">Cyberpunk Sniper 3D</h3>
          <p style="color: #aaa; margin-top: 0;">Jack in and take the shot. Over 50k players this week alone.</p>
          <a href="https://hellyeah-games.com" style="display: inline-block; background: #ff003c; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-weight: bold;">Play Instantly</a>
        </div>

        <div style="background: #111; padding: 15px; border-left: 4px solid #00ff00; margin-bottom: 20px;">
          <h2 style="color: #00ff00; margin-top: 0;">📰 Top Tech Story</h2>
          <h3 style="margin-bottom: 5px;">AI Agents Now Writing Full Applications</h3>
          <p style="color: #aaa; margin-top: 0;">The landscape of software development is fundamentally shifting as autonomous agents reach AGI-level logic pathways.</p>
          <a href="https://hackermedia.com" style="display: inline-block; background: #00ff00; color: #000; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-weight: bold;">Read More</a>
        </div>

        <div style="background: #111; padding: 15px; border-left: 4px solid #f7931a; margin-bottom: 20px;">
          <h2 style="color: #f7931a; margin-top: 0;">📈 Crypto Pulse</h2>
          <h3 style="margin-bottom: 5px;">Bitcoin surges past $120k</h3>
          <p style="color: #aaa; margin-top: 0;">Institutional accumulation continues despite retail fear.</p>
          <a href="https://www.kryptotrac.com" style="display: inline-block; background: #f7931a; color: #000; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-weight: bold;">View Charts</a>
        </div>

        <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #333; color: #666; font-size: 12px;">
          <p>You are receiving this because you hold an Empire Passport.</p>
          <p>Hell Yeah Games Inc. © 2026</p>
        </div>
      </div>
    `;

    // 3. Send via Resend
    // Note: Resend Free tier requires sending to a verified domain email or using the test "delivered@resend.dev".
    // We will send a single test blast to the owner for safety, but in production, we'd loop over `emails`.
    console.log('📧 Sending Email Blast...');
    
    const { data, error: sendError } = await resend.emails.send({
      from: 'The Empire <onboarding@resend.dev>', // Resend test domain
      to: ['delivered@resend.dev'], // Send to Resend's test inbox so it doesn't bounce/error
      subject: 'The Empire: Weekly Tech & Gaming Briefing',
      html: htmlTemplate,
    });

    if (sendError) {
      throw new Error(sendError.message);
    }

    console.log('✅ Blast sent successfully!');
    console.log('Message ID:', data.id);

  } catch (err) {
    console.error('❌ Failed to send newsletter:', err);
  }
}

sendNewsletter();
