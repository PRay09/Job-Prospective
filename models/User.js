const mongoose =require('mongoose')
const bcrypt= require('bcryptjs')
const { JsonWebTokenError } = require('jsonwebtoken')
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required : [true, 'Please Provide Name'],
        minLength:3,
        maxLength:50
    },
    email:{
        type: String,
        required : [true, 'Please Provide Email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, `Please Provid valid Email`
        ],
        unique:true,       
    },
    password:{
        type: String,
        required : [true, 'Please Provide Password'],   
        minlength: 6,
           
    }
})
userSchema.pre('save',async function(next){
     const salt = await bcrypt.genSalt(10)
     this.password = await bcrypt.hash(this.password,salt)
     next()
})
userSchema.methods.createToken = function(){
    return jwt.sign({userId: this._id,name: this.name},process.env.JWT_SECRET,{
        expiresIn: '30d'
    })
}
userSchema.methods.compPass = async function(candPass){
    const isMatch = await bcrypt.compare(candPass,this.password)
    return isMatch
}
module.exports = mongoose.model('User',userSchema)