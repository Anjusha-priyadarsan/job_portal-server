const express=require('express')

const {registerUser, login, updateUserProfile, getSingleUser}=require('../Controller/jobseekerController')
const {registerEmployer,  updateProfile,getSingleEmp}=require('../Controller/employerController')
const { middlewareFunction } = require('../middlewares/jwtMiddlewares')
const {addJobPost, getPostedJob, removeJob, updateJob,searchJobs,getJobDetails, addToSaved, applyjob,getAppliedJob, getSavedJobs, getSingleJob, getAppliedJobsByEmployer, updateStatus}=require('../Controller/jobController')
const{getusers, getemps, getjobs, removeEmp, getAdmin, updateadProfile}=require('../Controller/adminController')



const router= new express.Router()


router.post('/addd-new-jobseeker',registerUser)
router.post('/addd-new-employer',registerEmployer)
router.post('/login',login)


router.post('/emp/add-job',middlewareFunction,addJobPost)
router.get('/emp/get-jobpost/:email', middlewareFunction, getPostedJob);

router.delete('/emp/delete-job/:_id',middlewareFunction,removeJob)
router.put('/emp/update-job/:_id',middlewareFunction,updateJob)
router.put('/emp/update-profile/:email',middlewareFunction,updateProfile)
router.get('/single-emp/:email',getSingleEmp)
router.get('/single-user/:email',getSingleUser)

// Route to get job details by ID
router.get('/jobs/:_id', getJobDetails);

// Route to fetch all jobs


// Route to search for jobs
router.post('/jobs/search', searchJobs);


router.put('/user/update-profile/:email',middlewareFunction,updateUserProfile)
router.post('/user/add-to-savedjobs',middlewareFunction,addToSaved)
router.post('/user/add-to-applyjobs',middlewareFunction,applyjob)
router.get('/user/get-appliedjob/:user_email',middlewareFunction,getAppliedJob)
router.get('/user/get-savedjobs/:user_email',middlewareFunction, getSavedJobs);

router.get('/single-job/:_id', getSingleJob);

router.get('/emp/get-applied-jobs/:email', middlewareFunction, getAppliedJobsByEmployer); // Route to get details of jobs applied by users to the employer's jobs

router.put('/updateStatus/:_id', middlewareFunction, updateStatus);
router.get('/admin/all-users',middlewareFunction,getusers)
router.get('/admin/all-emps',middlewareFunction,getemps)
router.get('/admin/all-jobs',middlewareFunction,getjobs)
router.delete('/admin/delete-emp/:_id',middlewareFunction,removeEmp)
router.get('/admin/:email',getAdmin)
router.put('/admin/update-profile/:email',middlewareFunction,updateadProfile)























module.exports=router