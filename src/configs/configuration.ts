export default () => ({
  appUrl: process.env.APP_URL || 'https://localhost:3000',
  port: parseInt(process.env.PORT, 10) || 3000,
  mode: process.env.NODE_ENV,
  database: {
    type: process.env.DB_CONNECTION || 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 1433,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
    sync: process.env.DB_SYNC,
    entities: ['**/*.entity{.ts,.js}'],
    debug: process.env.DB_DEBUG === 'true',
    dropSchema: process.env.DB_DROP_SCHEMA,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD || null,
    ssl: Boolean(process.env.REDIS_SSL) || false,
  },
});
