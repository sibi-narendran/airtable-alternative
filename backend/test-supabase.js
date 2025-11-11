// Test Supabase connection
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rndiktnoopmxcwdulspf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJuZGlrdG5vb3BteGN3ZHVsc3BmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk4MTc5NjMsImV4cCI6MjA3NTM5Mzk2M30.khywq7SrgW3YFlnEvk-nI4jeXAEJDm6u79-9fNLPNxQ';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  try {
    console.log('Testing Supabase connection...');

    // Test basic connection
    const { data, error } = await supabase.from('signups').select('*', { count: 'exact', head: true });

    if (error) {
      console.error('Connection failed:', error);
      return;
    }

    console.log('✅ Supabase connection successful!');
    console.log('Signups table exists with', data?.length || 0, 'records');

    // Check if signups table exists
    const { count, error: countError } = await supabase
      .from('signups')
      .select('*', { count: 'exact', head: true });

    if (countError) {
      console.error('❌ Signups table error:', countError);
    } else {
      console.log('✅ Signups table accessible, records:', count || 0);
    }

    // Check if emails table exists
    const { count: emailsCount, error: emailsError } = await supabase
      .from('emails')
      .select('*', { count: 'exact', head: true });

    if (emailsError) {
      console.error('❌ Emails table error:', emailsError);
    } else {
      console.log('✅ Emails table accessible, records:', emailsCount || 0);
    }

  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testConnection();
