// Test API functions locally
import { addSignup, getSignups, calculateStats } from '../lib/supabase.js';

async function testAPIs() {
  try {
    console.log('Testing API functions...\n');

    // Test GET signups
    console.log('1. Testing getSignups()...');
    const signups = await getSignups();
    console.log('✅ getSignups() successful, records:', signups.length);

    // Test calculateStats
    console.log('\n2. Testing calculateStats()...');
    const stats = calculateStats(signups);
    console.log('✅ calculateStats() successful:', stats);

    // Test POST signup
    console.log('\n3. Testing addSignup()...');
    const testEmail = `test-${Date.now()}@example.com`;
    const newSignup = await addSignup({
      email: testEmail,
      timestamp: new Date().toISOString(),
      ip_address: '127.0.0.1',
      user_agent: 'Test API'
    });
    console.log('✅ addSignup() successful, new record:', newSignup);

    // Verify the new record was added
    console.log('\n4. Verifying new record was added...');
    const updatedSignups = await getSignups();
    console.log('✅ Updated signups count:', updatedSignups.length);

    // Test stats with new data
    const updatedStats = calculateStats(updatedSignups);
    console.log('✅ Updated stats:', updatedStats);

    console.log('\n🎉 All API tests passed!');

  } catch (error) {
    console.error('❌ API test failed:', error);
    console.error('Error details:', error.message);
    if (error.details) {
      console.error('Additional details:', error.details);
    }
  }
}

testAPIs();
