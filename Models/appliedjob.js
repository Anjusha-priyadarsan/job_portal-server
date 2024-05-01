const mongoose=require('mongoose')

// schema

const appliedjobSchema={
    user_email:{
        type:String,
        required:true
    },
    job_id:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true,

    },
    description:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    vacancy:{
        type:String,
        required:true

    },
    salary:{
        type:String,
        required:true

    },
    experiance:{
        type:String,
        required:true
    },
    qualification:{
        type:String,
        required:true
    },
    skills:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    applied_date:{
        type:String,
        required:true


    },
    status:{
        type:String,

        
    }

}

// modal

const appliedjobs=mongoose.model("appliedjobs",appliedjobSchema)

// exports

module.exports=appliedjobs