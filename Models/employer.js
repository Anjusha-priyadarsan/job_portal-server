const mongoose=require('mongoose')

// schema

const employerSchema={
    username:{
        type:String,
        required:true
    },
    companyname:{
        type:String,
        required:true
    },
    website:{
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
    location:{
        type:String,
        required:true
    },
    logo:{
        type:String,
        required:true
    }

}

// modal

const employers=mongoose.model("employers",employerSchema)

// exports

module.exports=employers