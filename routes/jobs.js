const express= require('express')
const router = express.Router()

const {
    getAllJobs,
    getJob,
    updateJobs,
    removeJobs,
    createJob,getAllJobsOther} = require('../controllers/jobs')

    router.route('/').post(createJob).get(getAllJobs)
    router.route('/:id').get(getJob).delete(removeJobs).patch(updateJobs)
    router.route('/visit/:id').get(getAllJobsOther)

module.exports = router