const { Router, json } = require('express');
const PostCtrl = require('./controller/post.ctrl');

const router = Router();

router.use(json())

router.use('/posts', PostCtrl)

module.exports = router
