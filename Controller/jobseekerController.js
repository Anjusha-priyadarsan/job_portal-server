const jobseekers=require('../Models/jobseeker')
const login=require('../Models/login')
const jwt=require('jsonwebtoken')
const employers=require('../Models/employer')



exports.registerUser=async(req,res)=>{

    const  {username,email,phone,introduction,dob,qualification,stream,password,location,designation,resume,profile}=req.body

    try{
        const user=await login.findOne({email:email})
        if(user){
            res.status(400).json("user already exist please login")
        }
        else
        {
            const newUser=new login({username:username,email:email,password:password,role:"jobseeker"})
            const newJobseeker=new jobseekers({username,email,phone,introduction,dob,qualification,stream,location,designation,resume,profile})

            await newUser.save()
            await newJobseeker.save()
            res.status(201).json(newUser)

        }
    }
    catch{
        res.status(400).json("register api failed")
        

    }
}


exports.login=async(req,res)=>{

    const  {email,password}=req.body

    try{
        const user=await login.findOne({email:email,password:password})
        if(user){

            const emp=await employers.findOne({email:email})


            
            // token generation

            const token=jwt.sign({uid:user._id},process.env.JWT_SECRET_KEY)

            res.status(200).json({user,emp,token})
        }
        else
        {
            
            res.status(401).json("incorrect email or password")

        }
    }
    catch{
        res.status(400).json("login api failed")
        

    }
}

exports.updateUserProfile = async (req, res) => {
    const { email } = req.params;
    // const { username, companyname, website, phone, introduction, location, logo ,password} = req.body;
    const  {username,phone,introduction,dob,qualification,stream,password,location,designation,resume,profile}=req.body


    try {
        // Check if the employer exists
        const existingUser = await jobseekers.findOne({ email });
        const userlog = await login.findOne({ email });
        
        if (!existingUser || !userlog) {
            return res.status(404).json("user not found");
        }

        // Update the employer details
        existingUser.username = username;
        existingUser.phone = phone;
        existingUser.introduction = introduction;
        existingUser.dob = dob;
        existingUser.qualification = qualification;
        existingUser.stream = stream;
      

        existingUser.location = location;
        existingUser.designation = designation;
        existingUser.resume = resume;


        existingUser.profile = profile;

        // Update login info
        userlog.username = username;
        userlog.password = password;


        // Save the updated employer and login info
        await existingUser.save();
        await userlog.save();

        // Respond with success message
        res.status(200).json(`${username} updated successfully`);
    } catch (error) {
        // Handle errors
        console.error("Error updating user:", error);
        res.status(500).json("Failed to update user");
    }
}

exports.getSingleUser=async(req,res)=>{

    const  {email}=req.params

    try{
        const user=await jobseekers.findOne({email:email})
        const log=await login.findOne({email:email})
        res.status(200).json({user,log})

        
    }
    catch{
        res.status(400).json(" get single user api failed")
        

    }
}



