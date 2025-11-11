// Inspect actual data in tables
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rndiktnoopmxcwdulspf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJuZGlrdG5vb3BteGN3ZHVsc3BmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk4MTc5NjMsImV4cCI6MjA3NTM5Mzk2M30.khywq7SrgW3YFlnEvk-nI4jeXAEJDm6u79-9fNLPNxQ';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function inspectData() {
  try {
    console.log('Inspecting table data...\n');

    // Try to get one record from signups to see the structure
    console.log('Checking signups table...');
    const { data: signupsData, error: signupsError } = await supabase
      .from('signups')
      .select('*')
      .limit(1);

    if (signupsError) {
      console.error('❌ Signups query error:', signupsError);
    } else {
      console.log('✅ Signups sample record:');
      console.log(JSON.stringify(signupsData, null, 2));
    }

    // Try to get one record from emails to see the structure
    console.log('\nChecking emails table...');
    const { data: emailsData, error: emailsError } = await supabase
      .from('emails')
      .select('*')
      .limit(1);

    if (emailsError) {
      console.error('❌ Emails query error:', emailsError);
    } else {
      console.log('✅ Emails sample record:');
      console.log(JSON.stringify(emailsData, null, 2));
    }

    // Try the specific query that's failing
    console.log('\nTesting the failing query (signups with timestamp)...');
    try {
      const { data: timestampData, error: timestampError } = await supabase
        .from('signups')
        .select('id, email, timestamp, ip_address, user_agent')
        .limit(1);

      if (timestampError) {
        console.error('❌ Timestamp query error:', timestampError);
      } else {
        console.log('✅ Timestamp query successful:');
        console.log(JSON.stringify(timestampData, null, 2));
      }
    } catch (error) {
      console.error('❌ Timestamp query exception:', error);
    }

  } catch (error) {
    console.error('❌ Data inspection failed:', error);
  }
}

inspectData();
