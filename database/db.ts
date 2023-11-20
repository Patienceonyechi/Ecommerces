import mongoose from "mongoose";

const onLineUrl = "mongodb+srv://onyechiediri:juvIQWw73L4pZUKj@cluster0.isudpct.mongodb.net/Ecommerces"
const url: string = "mongodb://0.0.0.0:27017/Referencing"
mongoose.connect(onLineUrl).then(()=>{
    console.log("connected to database")
}).catch((error:any)=>{
    console.log(`could not connect ${error}`)
})

export default mongoose

// juvIQWw73L4pZUKj