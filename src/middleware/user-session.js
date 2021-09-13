const session = require('express-session')
const { createClient } = require('redis')
const RedisStore = require('connect-redis')(session)
const { REDIS_URL, REDIS_PORT, SESSION_SECRET } = require('../config')

const redisClient = createClient({
  host: REDIS_URL,
  port: REDIS_PORT,
})

redisClient.on('error', (...args) => {
  console.log(`args`, args)
})

const UserSession = session({
  store: new RedisStore({ client: redisClient }),
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 3000000,
  },
})

module.exports = UserSession
