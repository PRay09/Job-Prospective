const express = require('express')
const router = express.Router()
const {publish,getAllComm,getComm,editComm} = require('../controllers/comments')

router.route('/').post(publish)
router.route('/:id').get(getAllComm)
router.route('/spec').get(getComm).patch(editComm)

module.exports= router