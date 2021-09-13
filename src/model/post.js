const { Schema, model } = require('mongoose')

const PostSchema = new Schema({
  title: {
    type: String,
    required: [true, "Post must have a title"],
  },
  body: {
    type: String,
    required: [true, "Post must have a body"],
  },
})

module.exports = model('Post', PostSchema, 'posts')
