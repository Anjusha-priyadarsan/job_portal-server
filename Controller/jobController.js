const jobs=require('../Models/job')
const employers=require('../Models/employer')
const savedjobs=require('../Models/savedjobs')
const appliedjobs=require('../Models/appliedjob')
const jobseekers=require('../Models/jobseeker')




exports.addJobPost=async(req,res)=>{

    const {email,title,description,type,vacancy,salary,experiance,qualification,skills,date}=req.body



    try{
        const job=await jobs.findOne({email,title})
        if(job){
            res.status(406).json("job already added")
        }
        else
        {
            const newJob=new jobs({email,title,description,type,vacancy,salary,experiance,qualification,skills,date})
            await newJob.save()
            res.status(200).json(`${title} posted`)

        }
    }
    catch{
        res.status(400).json("add  job api failed")
        
        

    }
}

exports.getPostedJob = async (req, res) => {
    const { email } = req.params;

    try {
        const postedJobs = await jobs.find({ email });

        // Assuming you only want jobs with status 1, filter the jobs here
        const filteredJobs = postedJobs.filter(job => job.status === '1');

        if (filteredJobs.length > 0) {
            res.status(200).json(filteredJobs);
        } else {
            res.status(404).json({ message: "No jobs found for the provided email." });
        }
    } catch (error) {
        console.error("Error fetching job posts:", error);
        res.status(500).json({ message: "Failed to fetch job posts" });
    }
}


exports.removeJob = async (req, res) => {
    const { _id } = req.params;

    try {
        // Update the status of the job to 0
        await jobs.updateOne({ _id }, { $set: { status: 0 } });
        res.status(200).json("deleted");
    } catch (error) {
        console.error("Error updating job status:", error);
        res.status(500).json("Failed to update job status");
    }
};



exports.getSingleJob=async(req,res)=>{

    const {_id}=req.params

    try{

        const singleJob=await jobs.findOne({_id})
        res.status(200).json(singleJob)
    }
    catch{

        res.status(400).json(" product api failed")


    }

}


exports.updateJob = async (req, res) => {
    const {_id} = req.params;
    const {email, title, description, type, vacancy, salary, experience, qualification, skills, date} = req.body;

    try {
        // Check if the job exists
        const existingJob = await jobs.findOne({_id});
        if (!existingJob) {
            return res.status(404).json("Job not found");
        }

        // Update the job details
        existingJob.email = email;
        existingJob.title = title;
        existingJob.description = description;
        existingJob.type = type;
        existingJob.vacancy = vacancy;
        existingJob.salary = salary;
        existingJob.experience = experience;
        existingJob.qualification = qualification;
        existingJob.skills = skills;
        existingJob.date = date;

        // Save the updated job
        await existingJob.save();

        // Respond with success message
        res.status(200).json(`${title} updated successfully`);
    } catch (error) {
        // Handle errors
        console.error("Error updating job:", error);
        res.status(500).json("Failed to update job");
    }
}


// / Function to search jobs based on criteria or fetch all jobs
// Function to search jobs based on criteria or fetch all jobs
exports.searchJobs = async (req, res) => {
    const { keywords, location, jobType, experience } = req.body;

    try {
        let query = { status: '1' }; // Include status condition to fetch jobs with status=1

        // If job type is not 'All', include it in the query
        if (jobType && jobType !== 'All') {
            query.type = jobType;
        }
        
        // Include additional search criteria if provided
        if (keywords) {
            query.title = { $regex: new RegExp(keywords, 'i') };
        }
        if (experience) {
            let minExperience, maxExperience;
            // Check if experience contains a hyphen and is not empty
            if (experience.includes('-')) {
                const [minExp, maxExp] = experience.split('-');
                // Parse the minimum and maximum experience values
                minExperience = parseInt(minExp.trim());
                maxExperience = parseInt(maxExp.trim());
                // Construct a query to find jobs with experience within the provided range
                query.experiance = { $gte: minExperience, $lte: maxExperience };
            } else {
                // If no hyphen found, treat the experience as a single value
                const exp = parseInt(experience.trim());
                query.experiance = exp;
            }
        }

        // Execute the query to search or fetch all jobs
        const matchingJobs = await jobs.find(query);

        // Array to store combined job and employer details
        let jobsWithEmployerDetails = [];

        // Iterate over matching jobs and fetch employer details for each job
        for (const job of matchingJobs) {
            // Get the email of the employer associated with the job
            const { email } = job;

            // Query the employers collection using the email
            const employerDetails = await employers.findOne({ email });

            // If employer details are found and the location matches, combine job and employer details
            if (employerDetails && (!location || employerDetails.location.toLowerCase().includes(location.toLowerCase()))) {
                const combinedDetails = {
                    job,
                    employer: employerDetails
                };
                jobsWithEmployerDetails.push(combinedDetails);
            }
        }

        if (jobsWithEmployerDetails.length > 0) {
            res.status(200).json(jobsWithEmployerDetails);
        } else {
            res.status(404).json("No matching jobs found");
        }
    } catch (error) {
        console.error("Search jobs API failed:", error);
        res.status(500).json("Failed to search jobs");
    }
};



exports.getJobDetails = async (req, res) => {
    const { _id } = req.params;

    try {
        const singleJob = await jobs.findOne({ _id });

        // Check if singleJob exists
        if (!singleJob) {
            return res.status(404).json({ message: "Job not found" });
        }

        // Get the email from singleJob
        const { email } = singleJob;

        // Query the employers collection using the email
        const companyDetails = await employers.findOne({ email });

        if (!companyDetails) {
            return res.status(404).json({ message: "Company details not found" });
        }

        // Combine job and company details
        const combinedDetails = {
            job: singleJob,
            company: companyDetails
        };

        res.status(200).json(combinedDetails);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Server error" });
    }
}


exports.addToSaved = async (req, res) => {
    const { user_email, job_id, email, title, description, type, vacancy, salary, experiance, qualification, skills, date } = req.body;

    try {
        const item = await savedjobs.findOne({ user_email, job_id });
        if (item) {
            return res.status(406).json("Job already saved");
        } else {
            const newItem = new savedjobs({ user_email, job_id, email, title, description, type, vacancy, salary, experiance, qualification, skills, date });
            await newItem.save();
            return res.status(200).json(`${title}  saved`);
        }
    } catch (error) {
        console.error("Error adding job to saved:", error);
        return res.status(500).json("Failed to add job to saved");
    }
};

exports.applyjob = async (req, res) => {
    const { user_email, job_id, email, title, description, type, vacancy, salary, experiance, qualification, skills, date,applied_date,status } = req.body;

    try {
        const item = await appliedjobs.findOne({ user_email, job_id });
        if (item) {
            return res.status(406).json(" already applied");
        } else {
            const newItem = new appliedjobs({ user_email, job_id, email, title, description, type, vacancy, salary, experiance, qualification, skills, date ,applied_date,status});
            await newItem.save();
            return res.status(200).json(`${title} applied successfully`);
        }
    } catch (error) {
        console.error("Error adding job to applied:", error);
        return res.status(500).json("Failed to add job to applied");
    }
};

exports.getAppliedJob = async (req, res) => {
    const { user_email } = req.params;

    try {
        // Find all applied jobs by the user
        const applied_jobs = await appliedjobs.find({ user_email });

        // Array to store combined job and company details
        let appliedJobsWithCompanyDetails = [];

        for (const job of applied_jobs) {
            // Get the email of the employer associated with the job
            const { email } = job;

            // Query the employers collection using the email
            const companyDetails = await employers.findOne({ email });

            // If company details are found, combine job and company details
            if (companyDetails) {
                const combinedDetails = {
                    appliedjob: job,
                    company: companyDetails
                };
                appliedJobsWithCompanyDetails.push(combinedDetails);
            }
        }

        // Check if any applied jobs with corresponding company details were found
        if (appliedJobsWithCompanyDetails.length > 0) {
            res.status(200).json(appliedJobsWithCompanyDetails);
        } else {
            res.status(404).json("No applied jobs found");
        }
    } catch (error) {
        console.error("Error fetching applied jobs:", error);
        res.status(500).json("Failed to fetch applied jobs");
    }
};

exports.getSavedJobs = async (req, res) => {
    const { user_email } = req.params;

    try {
        const saved_jobs = await savedjobs.find({ user_email });
           // Array to store combined job and company details
           let savedJobsWithCompanyDetails = [];


           for (const job of saved_jobs) {
            // Get the email from each job
            const { email } = job;

            // Query the employers collection using the email
            const companyDetails = await employers.findOne({ email });

            // Combine job and company details
            const combinedDetails = {
                savedjob: job,
                company: companyDetails
            };

            savedJobsWithCompanyDetails.push(combinedDetails);
        }

        if (savedJobsWithCompanyDetails.length > 0) {
            res.status(200).json(savedJobsWithCompanyDetails);
        } else {
            res.status(404).json("No saved jobs found");
        }
    } catch (error) {
        console.error("Error fetching saved jobs:", error);
        res.status(500).json("Failed to fetch saved jobs");
    }
};


exports.getSingleJob = async (req, res) => {
    const { _id } = req.params;

    try {
        const singleJob = await jobs.findOne({ _id });
        if (!singleJob) {
            return res.status(404).json({ message: "Job not found" });
        }
        res.status(200).json(singleJob);
    } catch (error) {
        console.error("Error fetching single job:", error);
        res.status(500).json({ message: "Server error" });
    }
};


exports.getAppliedJobsByEmployer = async (req, res) => {
    const { email } = req.params;

    try {
        // Find jobs posted by this employer
        const postedJobs = await jobs.find({ email });

        // Extract IDs of posted jobs
        const jobIds = postedJobs.map(job => job._id);

        // Find applied jobs corresponding to these job IDs
        const appliedJobs = await appliedjobs.find({ job_id: { $in: jobIds } });

        if (!appliedJobs || appliedJobs.length === 0) {
            return res.status(404).json({ message: "No applied jobs found for this employer" });
        }

        // Array to store applied jobs with user details
        let appliedJobsWithUserDetails = [];

        // Iterate over applied jobs and fetch user details from jobseekers collection
        for (const appliedJob of appliedJobs) {
            const userDetails = await jobseekers.findOne({ email: appliedJob.user_email });
            appliedJobsWithUserDetails.push({
                appliedJob,
                userDetails
            });
        }

        res.status(200).json(appliedJobsWithUserDetails);
    } catch (error) {
        console.error("Error fetching applied jobs:", error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.updateStatus = async (req, res) => {
    try {
      const _id = req.params._id;
      const newStatus = req.body.status;
  
      // Find the job application by id and update the status
      const updatedJobApplication = await appliedjobs.findByIdAndUpdate(_id, { status: newStatus }, { new: true });
  
      if (!updatedJobApplication) {
        return res.status(404).json({ message: 'Job application not found' });
      }
  
      return res.json(updatedJobApplication);
    } catch (error) {
      console.error('Error updating job application status:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  
