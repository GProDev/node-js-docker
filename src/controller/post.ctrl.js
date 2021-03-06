const { Router } = require('express')
const UserAuth = require('../middleware/user-auth')
const Post = require('../model/post')

const PostCtrl = Router()

PostCtrl.post('/', UserAuth, async (req, res) => {
  try {
    const post = await Post.create(req.body)
    res.json(post)
  } catch (err) {
    console.log(`err`, err)
    res.status(400).json({ wsMessage: "Post creation failed" })
  }
})

PostCtrl.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
    res.json(posts)
  } catch (err) {
    console.log(`err`, err)
    res.status(400).json({ wsMessage: "Failed retrieving posts" })
  }
})

PostCtrl.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const post = await Post.findById(id)
    res.json(post)
  } catch (err) {
    console.log(`err`, err)
    res.status(400).json({ wsMessage: "Failed retrieving post " + id })
  }
})

PostCtrl.delete('/', async (req, res) => {
  const { id } = req.params
  try {
    await Post.findByIdAndDelete(id)
    res.json({ wsMessage: "Post deleted" })
  } catch (err) {
    console.log(`err`, err)
    res.status(400).json({ wsMessage: "Failed retrieving post " + id })
  }
})

module.exports = PostCtrl
