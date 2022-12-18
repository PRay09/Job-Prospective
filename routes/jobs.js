const express= require('express')
const router = express.Router()

const {
    getAllJobs,
    getJob,
    updateJobs,
    removeJobs,
    createJob} = require('../controllers/jobs')

    router.route('/').post(createJob).get(getAllJobs)
    router.route('/:id').get(getJob).delete(removeJobs).patch(updateJobs)

module.exports = router