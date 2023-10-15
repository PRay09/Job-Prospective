const mongoose = require('mongoose')

const comSchema = new mongoose.Schema({
    content:{
        type:String,
        required:[true,'Please provide comment'],
        maxlength:300
    },
    author:{
        type:String,
        required:[true,'Please provide author']
    },
    host:{
        type:mongoose.Types.ObjectId,
        ref:'Job',
        required:[true,'Please provice the host']
    }
},{timestamps:true})

module.exports = mongoose.model('Comment',comSchema)