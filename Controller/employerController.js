const employers=require('../Models/employer')
const logins = require('../Models/login')
const login=require('../Models/login')
const jobs=require('../Models/job')


exports.registerEmployer=async(req,res)=>{

    const  {username,companyname,website,email,phone,introduction,password,location,logo}=req.body

    try{
        const user=await login.findOne({email:email})
        if(user){
            res.status(400).json("user already exist please login")
        }
        else
        {
            const newUser=new login({username:companyname,email:email,password:password,role:"employer"})
            const newEmployer=new employers({username,companyname,website,email,phone,introduction,location,logo})

            await newUser.save()
            await newEmployer.save()
            res.status(201).json(newUser)

        }
    }
    catch{
        res.status(400).json("register api failed")
        

    }
}

exports.getSingleEmp=async(req,res)=>{

    const  {email}=req.params

    try{
        const emp=await employers.findOne({email:email})
        const log=await logins.findOne({email:email})
        res.status(200).json({emp,log})

        
    }
    catch{
        res.status(400).json(" get single emp api failed")
        

    }
}

exports.updateProfile = async (req, res) => {
    const { email } = req.params;
    const { username, companyname, website, phone, introduction, location, logo ,password} = req.body;

    try {
        // Check if the employer exists
        const existingEmployer = await employers.findOne({ email });
        const emplog = await logins.findOne({ email });
        
        if (!existingEmployer || !emplog) {
            return res.status(404).json("Employer not found");
        }

        // Update the employer details
        existingEmployer.username = username;
        existingEmployer.companyname = companyname;
        existingEmployer.website = website;
        existingEmployer.phone = phone;
        existingEmployer.introduction = introduction;
        existingEmployer.location = location;
        existingEmployer.logo = logo;

        // Update login info
        emplog.username = username;
        emplog.password = password;


        // Save the updated employer and login info
        await existingEmployer.save();
        await emplog.save();

        // Respond with success message
        res.status(200).json(`${companyname} updated successfully`);
    } catch (error) {
        // Handle errors
        console.error("Error updating employer:", error);
        res.status(500).json("Failed to update employer");
    }
}
