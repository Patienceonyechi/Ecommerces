import mongoose from "mongoose";

interface user {
    firstName: string,
    lastName: string,
    gender: string
    avatar:string
}

interface iUser extends user, mongoose.Document{ }

const profileSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName:{
      type: String
    },
    gender:{
        type:String
    },
    phoneNumber: {
        type: Number
    },
    dateOfBirth: {
        type: String
    }, 
    avatar: {
        type: String
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
  
})

export default mongoose.model("profile", profileSchema)