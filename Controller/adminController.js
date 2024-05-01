const employers=require('../Models/employer')
const jobseekers=require('../Models/jobseeker')
const jobs=require('../Models/job')
const admins = require('../Models/admin')
const login=require('../Models/login')






exports.getAdmin=async(req,res)=>{

    const  {email}=req.params

    try{
        const admin=await admins.findOne({email:email})
        const log=await login.findOne({email:email})
        res.status(200).json({admin,log})

        
    }
    catch{
        res.status(400).json(" get admin api failed")
        

    }
}


exports.getusers=async(req,res)=>{
    try{
    
        const users=await jobseekers.find({})
        res.status(200).json(users);


    }
    catch{
        res.status(500).json({ error: 'Internal server error' });

    }


}

exports.getemps=async(req,res)=>{
    try{
    
        const emps=await employers.find({})
        res.status(200).json(emps);


    }
    catch{
        res.status(500).json({ error: 'Internal server error' });

    }


}

exports.getjobs=async(req,res)=>{
    try{
    
        const jobss=await jobs.find({})
        res.status(200).json(jobss);


    }
    catch{
        res.status(500).json({ error: 'Internal server error' });

    }


}
exports.removeEmp=async(req,res)=>{

    const {_id}=req.params
    try{
        await employers.deleteOne({_id})
        res.status(200).json("removed")

    }
    catch{
        res.status(400).json("delete employer api failed")


    }

}

exports.updateadProfile = async (req, res) => {
    const { a_email } = req.params;
    const { username,email,  profile ,password} = req.body;

    try {
        // Check if the admin exists
        const existingAdmin = await admins.findOne({ a_email });
        const adlog = await login.findOne({ a_email });
        
        if (!existingAdmin || !adlog) {
            return res.status(404).json("Employer not found");
        }

        // Update the employer details
        existingAdmin.username = username;
        existingAdmin.email = email;
      
        existingAdmin.profile = profile;

        // Update login info
        adlog.username = username;
        adlog.password = password;
        adlog.email = email;




        // Save the updated employer and login info
        await existingAdmin.save();
        await adlog.save();

        // Respond with success message
        res.status(200).json(`${username} updated successfully`);
    } catch (error) {
        // Handle errors
        console.error("Error updating admin:", error);
        res.status(500).json("Failed to update admin");
    }
}