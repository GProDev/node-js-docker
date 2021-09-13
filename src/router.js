const { Router, json } = require('express');
const PostCtrl = require('./controller/post.ctrl');
const UserCtrl = require('./controller/user.ctrl');

const router = Router();

router.use(json())

router.use((req, res, next) => {
  console.log(req.url)
  next()
})

router.use('/ws/posts', PostCtrl)

router.use('/ws/user', UserCtrl)

module.exports = router
