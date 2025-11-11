// Check database schema
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rndiktnoopmxcwdulspf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJuZGlrdG5vb3BteGN3ZHVsc3BmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk4MTc5NjMsImV4cCI6MjA3NTM5Mzk2M30.khywq7SrgW3YFlnEvk-nI4jeXAEJDm6u79-9fNLPNxQ';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkSchema() {
  try {
    console.log('Checking database schema...\n');

    // Get all tables
    const { data: tables, error: tablesError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public');

    if (tablesError) {
      console.error('Error getting tables:', tablesError);
    } else {
      console.log('Available tables:', tables?.map(t => t.table_name).filter(name => !name.startsWith('pg_')));
    }

    // Check signups table schema
    console.log('\nChecking signups table schema...');
    const { data: signupsSchema, error: signupsError } = await supabase
      .from('information_schema.columns')
      .select('column_name, data_type, is_nullable')
      .eq('table_name', 'signups')
      .eq('table_schema', 'public');

    if (signupsError) {
      console.error('❌ Signups table error:', signupsError);
    } else if (signupsSchema && signupsSchema.length > 0) {
      console.log('✅ Signups table columns:');
      signupsSchema.forEach(col => {
        console.log(`  - ${col.column_name} (${col.data_type}, nullable: ${col.is_nullable})`);
      });
    } else {
      console.log('❌ Signups table does not exist or has no columns');
    }

    // Check emails table schema
    console.log('\nChecking emails table schema...');
    const { data: emailsSchema, error: emailsError } = await supabase
      .from('information_schema.columns')
      .select('column_name, data_type, is_nullable')
      .eq('table_name', 'emails')
      .eq('table_schema', 'public');

    if (emailsError) {
      console.error('❌ Emails table error:', emailsError);
    } else if (emailsSchema && emailsSchema.length > 0) {
      console.log('✅ Emails table columns:');
      emailsSchema.forEach(col => {
        console.log(`  - ${col.column_name} (${col.data_type}, nullable: ${col.is_nullable})`);
      });
    } else {
      console.log('❌ Emails table does not exist or has no columns');
    }

  } catch (error) {
    console.error('❌ Schema check failed:', error);
  }
}

checkSchema();
