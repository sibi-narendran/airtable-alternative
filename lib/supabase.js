import { createClient } from '@supabase/supabase-js';

// Supabase configuration - production database credentials
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://rndiktnoopmxcwdulspf.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJuZGlrdG5vb3BteGN3ZHVsc3BmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk4MTc5NjMsImV4cCI6MjA3NTM5Mzk2M30.khywq7SrgW3YFlnEvk-nI4jeXAEJDm6u79-9fNLPNxQ';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database operations for email collection
export async function addEmail(emailData) {
  try {
    const { data, error } = await supabase
      .from('emails')
      .insert([
        {
          email: emailData.email,
          timestamp: emailData.timestamp,
          ip_address: emailData.ip_address,
          user_agent: emailData.user_agent
        }
      ])
      .select('id, email, timestamp, ip_address, user_agent')
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      throw error;
    }

    console.log('Email saved to Supabase PostgreSQL:', data.email);
    return data;
  } catch (error) {
    console.error('Error saving email to Supabase:', error);
    throw error;
  }
}

export async function getEmails() {
  try {
    const { data, error } = await supabase
      .from('emails')
      .select('*')
      .order('timestamp', { ascending: false });

    if (error) {
      console.error('Supabase select error:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching emails from Supabase:', error);
    throw error;
  }
}

export async function clearAllEmails() {
  try {
    // Get count before deleting
    const { count, error: countError } = await supabase
      .from('emails')
      .select('*', { count: 'exact', head: true });

    if (countError) {
      console.error('Error counting emails:', countError);
      throw countError;
    }

    // Delete all records (bigint ID field, so we use greater than or equal to 0)
    const { error } = await supabase
      .from('emails')
      .delete()
      .gte('id', 0); // Delete all records where id >= 0 (covers all records)

    if (error) {
      console.error('Supabase delete error:', error);
      throw error;
    }

    console.log(`Deleted ${count || 0} email records from Supabase PostgreSQL`);
    return count || 0;
  } catch (error) {
    console.error('Error clearing emails from Supabase:', error);
    throw error;
  }
}

// Database operations for signup collection (dooza tables)
export async function addSignup(signupData) {
  try {
    const { data, error } = await supabase
      .from('signups')
      .insert([
        {
          email: signupData.email,
          timestamp: signupData.timestamp,
          ip_address: signupData.ip_address,
          user_agent: signupData.user_agent
        }
      ])
      .select('id, email, timestamp, ip_address, user_agent')
      .single();

    if (error) {
      console.error('Supabase signup insert error:', error);
      throw error;
    }

    console.log('Signup saved to Supabase PostgreSQL:', data.email);
    return data;
  } catch (error) {
    console.error('Error saving signup to Supabase:', error);
    throw error;
  }
}

export async function getSignups() {
  try {
    const { data, error } = await supabase
      .from('signups')
      .select('*')
      .order('timestamp', { ascending: false });

    if (error) {
      console.error('Supabase signups select error:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching signups from Supabase:', error);
    throw error;
  }
}

export async function clearAllSignups() {
  try {
    console.log('Starting clearAllSignups function...');
    
    // Get count before deleting
    console.log('Getting count of existing signups...');
    const { count, error: countError } = await supabase
      .from('signups')
      .select('*', { count: 'exact', head: true });

    if (countError) {
      console.error('Error counting signups:', countError);
      console.error('Count error details:', JSON.stringify(countError, null, 2));
      throw new Error(`Failed to count signups: ${countError.message || countError.hint || JSON.stringify(countError)}`);
    }

    console.log(`Found ${count || 0} signups to delete`);

    // Delete all records (bigint ID field, so we use greater than or equal to 0)
    console.log('Attempting to delete all signups...');
    const { error } = await supabase
      .from('signups')
      .delete()
      .gte('id', 0); // Delete all records where id >= 0 (covers all records)

    if (error) {
      console.error('Supabase signups delete error:', error);
      console.error('Delete error details:', JSON.stringify(error, null, 2));
      throw new Error(`Failed to delete signups: ${error.message || error.hint || JSON.stringify(error)}`);
    }

    console.log(`Successfully deleted ${count || 0} signup records from Supabase PostgreSQL`);
    return count || 0;
  } catch (error) {
    console.error('Error clearing signups from Supabase:', error);
    console.error('Full error details:', JSON.stringify(error, null, 2));
    throw error;
  }
}

export function calculateStats(emails) {
  const now = new Date();
  const today = now.toISOString().split('T')[0];
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  return {
    total: emails.length,
    today: emails.filter(email => 
      email.timestamp.split('T')[0] === today
    ).length,
    week: emails.filter(email => 
      new Date(email.timestamp) > oneWeekAgo
    ).length
  };
}
