const { Router, json } = require('express');
const PostCtrl = require('./controller/post.ctrl');
const UserCtrl = require('./controller/user.ctrl');

const router = Router();

router.use(json())

router.use('/posts', PostCtrl)

router.use('/user', UserCtrl)

module.exports = router
