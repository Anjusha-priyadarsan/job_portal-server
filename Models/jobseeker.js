const mongoose=require('mongoose')

// schema

const jobseekerSchema={
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,

    },
    phone:{
        type:Number,
        required:true
    },
    introduction:{
        type:String,
        required:true
    },
    dob:{
        type:Date,
        required:true

    },
    qualification:{
        type:String,
        required:true

    },
    stream:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    designation:{
        type:String,
        required:true
    },
    resume:{
        type:String,
        required:true
    },
    profile:{
        type:String,
    }


}

// modal

const jobseekers=mongoose.model("jobseekers",jobseekerSchema)

// exports

module.exports=jobseekers