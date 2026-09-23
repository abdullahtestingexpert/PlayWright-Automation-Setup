export const ENV = {
  baseUrl: process.env.BASE_URL || 'https://your-staging-app.com',
  user: {
    username: process.env.USERNAME || 'admin',
    password: process.env.PASSWORD || 'password123'
  },
  MAILOSAUR_API_KEY: process.env.MAILOSAUR_API_KEY || 'default-api-key',
  MAILOSAUR_SERVER_ID: process.env.MAILOSAUR_SERVER_ID || 'default-server-id',
};
