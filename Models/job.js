const mongoose=require('mongoose')

// schema

const jobSchema={
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
    status:{
        type:String,
        default:1

    }

}

// modal

const jobs=mongoose.model("jobs",jobSchema)

// exports

module.exports=jobs