const { BadRequestError, NotFoundError } = require('../errors')
const Comment = require('../models/Comment')
const {StatusCodes}= require('http-status-codes')

const publish= async (req,res) => {
    req.body.author=req.user.name
   const comm = await Comment.create(req.body)
   res.status(StatusCodes.CREATED).json({comm})
}

const getAllComm= async(req,res) => {
    const comments =await Comment.find({host: req.params.id}).sort('createdAt')
    res.status(StatusCodes.OK).json({comments,count: comments.length})
}

const getComm = async(req,res)=>{
    const comment = await Comment.findOne({
        _id:req.body.id
    })
    if(!comment){
        throw new NotFoundError(`No job with id ${req.body.id}`)
    }
    res.status(StatusCodes.OK).json({comment})
}

const editComm = async(req,res)=>{
    if(req.body.newComm==''){
        throw new BadRequestError('Please provide the new comment')
    }

    const comment = await Comment.findOneAndUpdate({
        _id:req.body.id
    },req.body.newComm,{new:true,runValidators:true})
}

module.exports= {publish,getAllComm,getComm,editComm}
