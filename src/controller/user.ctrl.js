const { hashSync, compareSync } = require('bcryptjs')
const { Router } = require('express')
const User = require('../model/user')

const UserCtrl = Router()

UserCtrl.post('/signup', async (req, res) => {
  let { username, password } = req.body
  password = hashSync(password)
  try {
    const user = await User.create({ username, password })
    req.session.user = user
    res.json(user)
  } catch (err) {
    console.log(`err`, err)
    res.status(400).json({ wsMessage: "User creation failed" })
  }
})

UserCtrl.post('/login', async (req, res) => {
  let { username, password } = req.body
  try {
    const user = await User.findOne({ username })
    if (!user) res.status(401).json({ wsMessage: "Unknown user" })
    else if (compareSync(password, user.password)) {
      req.session.user = user
      res.json(user)
    } else res.status(401).json({ wsMessage: "Incorrect password" })
  } catch (err) {
    console.log(`err`, err)
    res.status(400).json({ wsMessage: "User creation failed" })
  }
})

UserCtrl.get('/', async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (err) {
    console.log(`err`, err)
    res.status(400).json({ wsMessage: "Failed retrieving users" })
  }
})

UserCtrl.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const user = await User.findById(id)
    res.json(user)
  } catch (err) {
    console.log(`err`, err)
    res.status(400).json({ wsMessage: "Failed retrieving user " + id })
  }
})

UserCtrl.delete('/', async (req, res) => {
  const { id } = req.params
  try {
    await User.findByIdAndDelete(id)
    res.json({ wsMessage: "User deleted" })
  } catch (err) {
    console.log(`err`, err)
    res.status(400).json({ wsMessage: "Failed retrieving user " + id })
  }
})

module.exports = UserCtrl
