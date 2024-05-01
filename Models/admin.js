const mongoose=require('mongoose')

// schema

const adminSchema={
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,

    },
    profile:{
        type:String,
    }

}

// modal

const admins=mongoose.model("admins",adminSchema)

// exports

module.exports=admins