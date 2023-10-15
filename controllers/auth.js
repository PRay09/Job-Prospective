const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, UnauthenticatedError} = require('../errors')
const jwt = require('jsonwebtoken')
const register = async (req,res) =>{
    const user = await User.create({...req.body})
    const token = user.createToken()
    res.status(StatusCodes.CREATED).json({user:{name: user.name}, token})
}
const search = async (req,res)=>{
    const searchQuery = req.params.name.toString()
    const pipeline = [];
    pipeline.push({
        $search:{
            index:"userSearch",
            text: {
                query:searchQuery,
                path: ['name'],
                fuzzy:{},
            },
        },
    })

    const result = await User.aggregate(pipeline);
    res.json(result);
}
const login = async (req,res) => {
   const {email,password} = req.body

   if(!email||!password){
    throw new BadRequestError('Please Provide Email and Password')
   }
   const user = await User.findOne({email: email})
   //password check
   if(user==null){
    throw new UnauthenticatedError(`Email doesn't exist`)
   }
   const isPassCorr = await user.compPass(password)
   if(!isPassCorr){
    throw new UnauthenticatedError('Invalid Credentials')
   }

   if(!user){
    throw new UnauthenticatedError('Invalid Credentials')
   }
   const token = user.createToken();
   res.status(StatusCodes.OK).json({user: {name:user.name},token})
}

module.exports = {login,register,search}