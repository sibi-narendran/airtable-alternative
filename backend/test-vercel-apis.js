// Test Vercel API handlers locally
import signupsHandler from '../api/signups.js';
import statsHandler from '../api/stats.js';

// Mock request/response objects
function createMockRequest(method, body = null) {
  return {
    method,
    body,
    headers: {
      'x-forwarded-for': '127.0.0.1',
      'user-agent': 'Test Browser'
    }
  };
}

function createMockResponse() {
  const res = {
    statusCode: 200,
    headers: {},
    body: null,
    status: function(code) {
      this.statusCode = code;
      return this;
    },
    json: function(data) {
      this.body = JSON.stringify(data);
      return this;
    },
    setHeader: function(name, value) {
      this.headers[name] = value;
      return this;
    },
    end: function() {
      return this;
    }
  };
  return res;
}

async function testAPIHandlers() {
  try {
    console.log('Testing Vercel API handlers...\n');

    // Test signups GET
    console.log('1. Testing signups GET...');
    const getReq = createMockRequest('GET');
    const getRes = createMockResponse();

    await signupsHandler(getReq, getRes);

    if (getRes.statusCode === 200) {
      const getData = JSON.parse(getRes.body);
      console.log('✅ Signups GET successful, records:', getData.total);
    } else {
      console.error('❌ Signups GET failed with status:', getRes.statusCode);
    }

    // Test signups POST
    console.log('\n2. Testing signups POST...');
    const testEmail = `test-vercel-${Date.now()}@example.com`;
    const postReq = createMockRequest('POST', { email: testEmail });
    const postRes = createMockResponse();

    await signupsHandler(postReq, postRes);

    if (postRes.statusCode === 201) {
      const postData = JSON.parse(postRes.body);
      console.log('✅ Signups POST successful, email:', postData.email);
    } else {
      console.error('❌ Signups POST failed with status:', postRes.statusCode, 'Body:', postRes.body);
    }

    // Test stats GET
    console.log('\n3. Testing stats GET...');
    const statsReq = createMockRequest('GET');
    const statsRes = createMockResponse();

    await statsHandler(statsReq, statsRes);

    if (statsRes.statusCode === 200) {
      const statsData = JSON.parse(statsRes.body);
      console.log('✅ Stats GET successful, stats:', statsData.stats);
    } else {
      console.error('❌ Stats GET failed with status:', statsRes.statusCode, 'Body:', statsRes.body);
    }

    console.log('\n🎉 All Vercel API handler tests completed!');

  } catch (error) {
    console.error('❌ API handler test failed:', error);
  }
}

testAPIHandlers();
