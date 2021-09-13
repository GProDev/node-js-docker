const { Router } = require('express')
const Post = require('../model/post')

const router = Router()

router.post('/', async (req, res) => {
  try {
    const post = await Post.create(req.body)
    res.json(post)
  } catch (err) {
    console.log(`err`, err)
    res.status(400).json({ wsMessage: "Post creation failed" })
  }
})

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
    res.json(posts)
  } catch (err) {
    console.log(`err`, err)
    res.status(400).json({ wsMessage: "Failed retrieving posts" })
  }
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const post = await Post.findById(id)
    res.json(post)
  } catch (err) {
    console.log(`err`, err)
    res.status(400).json({ wsMessage: "Failed retrieving post " + id })
  }
})

router.delete('/', async (req, res) => {
  const { id } = req.params
  try {
    await Post.findByIdAndDelete(id)
    res.json({ wsMessage: "Post deleted" })
  } catch (err) {
    console.log(`err`, err)
    res.status(400).json({ wsMessage: "Failed retrieving post " + id })
  }
})

module.exports = router
