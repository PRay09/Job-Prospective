const Job = require('../models/Job')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')

const getAllJobs = async (req,res) =>{
    const jobs = await Job.find({ createdBy: req.user.userId}).sort('createdAt') 
    res.status(StatusCodes.OK).json({ jobs, count: jobs.length })

}
const getAllJobsOther = async (req,res) =>{
    const jobs = await Job.find({ createdBy: req.params.id}).sort('createdAt') 
    res.status(StatusCodes.OK).json({ jobs, count: jobs.length })

}
const getJob = async (req,res) =>{
    const {user:{userId},params:{id:jobId}} = req
    const job = await Job.findOne({
        _id:jobId,createdBy:userId
    })
    if(!job){
        throw new NotFoundError(`No job with id ${jobId}`)
    }
    res.status(StatusCodes.OK).json({job})
}
const updateJobs = async (req,res) =>{
    const {
        user:{userId},
        params:{id:jobId},
        body:{company,position},
    } = req
    if(company=== '' || position === '') {
        throw new BadRequestError('Company and position field can not be empty')        
    }

    const job = await Job.findByIdAndUpdate({
        _id:jobId,createdBy:userId
    },req.body,{new:true,runValidators:true})

    if(!job){
        throw new NotFoundError(`No job with id ${jobId}`)
    }
    res.status(StatusCodes.OK).json({job})
}
const removeJobs = async (req,res) =>{
    const {
        user:{userId},
        params:{id:jobId},
    } = req

    const job = await Job.findOneAndRemove({
        _id:jobId,createdBy:userId
    })

    if(!job){
        throw new NotFoundError(`No job with id ${jobId}`)
    }
    res.status(StatusCodes.OK).send()

}
const createJob = async (req,res) =>{
    req.body.createdBy = req.user.userId 
    const job = await Job.create(req.body) 
    res.status(StatusCodes.CREATED).json({ job })

}
module.exports = {
    getAllJobs,
    getJob,
    updateJobs,
    removeJobs,
    createJob,
    getAllJobsOther
}