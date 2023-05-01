const redis = require('redis');

const client = redis.createClient({
  socket: {
    // host: '127.0.0.1',
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
  password: process.env.REDIS_PASS,
});
client
  .connect()
  .then((res) => {
    console.log('Connection to redis success!');
  })
  .catch((err) => {
    console.log(err);
  });

const expirationTime = 60000;

exports.setUserAuth = (userId, userData) => {
  client.setEx(
    JSON.stringify(userId),
    expirationTime,
    JSON.stringify(userData)
  );
};

exports.getUserAuth = async (userId) => {
  const user = await client.get(JSON.stringify(userId));
  return JSON.parse(user);
};
