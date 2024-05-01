const mongoose=require('mongoose')


mongoose.connect(process.env.BASE_URL).then(()=>{
    console.log("-------monoDb Atlas  connected succesfully");
}).catch((err)=>{
    console.log(`-----mongoDB not connected reason:${err}----`);
})