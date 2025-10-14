// Health check API for signups/Supabase connection
import { supabase } from '../lib/supabase.js';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('Testing Supabase connection...');
    
    // Test basic connection and count
    const { count, error: connectionError } = await supabase
      .from('signups')
      .select('*', { count: 'exact', head: true });

    if (connectionError) {
      console.error('Supabase connection error:', connectionError);
      return res.status(500).json({
        success: false,
        error: 'Supabase connection failed',
        details: connectionError.message || connectionError.hint || JSON.stringify(connectionError)
      });
    }

    return res.json({
      success: true,
      message: 'Supabase connection and signups table are working correctly',
      connection: 'OK',
      tableAccess: 'OK',
      currentRecordCount: count || 0
    });

  } catch (error) {
    console.error('Health check error:', error);
    return res.status(500).json({
      success: false,
      error: 'Health check failed',
      details: error.message || error.toString()
    });
  }
}
