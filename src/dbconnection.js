const mongoose= require("mongoose")

const { MONGO_IP, MONGO_PORT, MONGO_USER, MONGO_PASSWORD } = require('./config')

exports.connectDb = () => {
  mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`)
    .then(() => {
      console.log("Successfully connected to database")
    })
    .catch(err => {
      console.log(`err`, err)
      setTimeout(this.connectDb, 5000);
    })
}
