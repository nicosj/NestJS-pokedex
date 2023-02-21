export const ENVCONFIG = () => ({
  environment: process.env.NODE_ENV || 'dev',
  mongodb:process.env.MONGODB_URI,
  port:process.env.PORT || 3002,
  defaultLimit:+process.env.DEFAULT_LIMIT || 7
})