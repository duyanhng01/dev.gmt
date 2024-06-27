const axios = require('axios');
const crypto = require('crypto');

const secret = '28a1c2a4429b00cf2497b8b68019c37c89bc1548';

async function listGames() {
  try {
    const response = await axios.get('https://nap.gamota.com/games/support/listGame');
    return response.data;
  } catch (error) {
    throw new Error('Error calling list games API:', error);
  }
}

async function listServers() {
  const gameId = '180419';
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = crypto.createHash('sha1').update(`${timestamp}|${secret}`).digest('hex');

  const params = {
    time: timestamp,
    signature: signature
  };

  try {
    const response = await axios.get(`https://nap.gamota.com/games/support/listServer/${gameId}`, { params });
    return response.data;
  } catch (error) {
    throw new Error('Error calling list servers API:', error);
  }
}

async function listRoles() {
  const serverId = '23001';
  const userId = '2618078';
  const apiKey = 'A180419-KRZ2QY-3FF02515D1088333';
  const signature = crypto.createHash('sha1').update(`${serverId}|${userId}|${secret}`).digest('hex');

  const params = {
    server_id: serverId,
    user_id: userId,
    signature: signature
  };

  try {
    const response = await axios.get(`https://nap.gamota.com/games/support/getRole/${apiKey}`, { params });
    return response.data;
  } catch (error) {
    throw new Error('Error calling list roles API:', error);
  }
}

async function main() {
  try {
    const [gamesResponse, serversResponse, rolesResponse] = await Promise.all([
      listGames(),
      listServers(),
      listRoles()
    ]);

    console.log('List Games Response:', gamesResponse);
    console.log('List Servers Response:', serversResponse);
    console.log('List Roles Response:', rolesResponse);
  } catch (error) {
    console.error(error.message);
  }
}

main();
