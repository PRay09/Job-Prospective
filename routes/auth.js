const express= require('express')
const router = express.Router()
const {login,register,search} = require('../controllers/auth')
router.post('/register',register)
router.post('/login',login)
router.get('/search/:name',search)
module.exports = router