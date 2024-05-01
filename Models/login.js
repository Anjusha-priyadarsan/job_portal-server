const mongoose=require('mongoose')

// schema

const loginSchema={
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,

    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true


    }

}

// modal

const logins=mongoose.model("logins",loginSchema)

// exports

module.exports=logins