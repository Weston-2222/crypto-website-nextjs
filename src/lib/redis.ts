import Redis from 'ioredis';

const redis = new Redis({
  host: process.env.REDIS_HOST || '127.0.0.1', // Redis 伺服器地址
  port: Number(process.env.REDIS_PORT) || 6379, // Redis 伺服器端口
  password: process.env.REDIS_PASSWORD || '', // 如果需要認證
});

export default redis;
