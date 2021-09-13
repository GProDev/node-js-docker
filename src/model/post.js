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

const Post = model('Post', PostSchema, 'posts')

module.exports = Post
