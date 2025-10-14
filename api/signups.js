// Signups collection API for Vercel with Supabase PostgreSQL
import { addSignup as supabaseAddSignup, getSignups as supabaseGetSignups, clearAllSignups } from '../lib/supabase.js';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'POST') {
      // Submit new signup
      const { email } = req.body;
      
      // Validate email
      if (!email || !email.includes('@')) {
        return res.status(400).json({ 
          error: 'Valid email address is required',
          success: false 
        });
      }

      const signupData = {
        email: email.toLowerCase().trim(),
        timestamp: new Date().toISOString(),
        ip_address: req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown',
        user_agent: req.headers['user-agent'] || 'unknown'
      };

      // Save signup to Supabase PostgreSQL
      const savedSignup = await supabaseAddSignup(signupData);
      
      console.log(`New signup saved to Supabase: ${signupData.email} at ${signupData.timestamp}`);
      
      return res.status(201).json({ 
        success: true, 
        message: 'Signup saved to database successfully',
        id: savedSignup.id,
        email: savedSignup.email,
        timestamp: savedSignup.timestamp
      });
    }

    if (req.method === 'GET') {
      // Get all signups from Supabase PostgreSQL
      const signups = await supabaseGetSignups();
      
      return res.json({ 
        success: true, 
        signups: signups,
        total: signups.length,
        message: signups.length > 0 
          ? `${signups.length} signup submissions retrieved from database`
          : 'No signup submissions yet. Database is ready to collect signups!'
      });
    }

    if (req.method === 'DELETE') {
      // Clear all signups from Supabase PostgreSQL
      const deletedCount = await clearAllSignups();
      
      return res.json({ 
        success: true, 
        message: `Successfully deleted ${deletedCount} signup records from database`,
        deletedCount
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });
    
  } catch (error) {
    console.error('Signups API Error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      success: false,
      details: error.message
    });
  }
}
