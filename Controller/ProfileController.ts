import profileModel from "../Model/profileModel"
import express, {Application, Request, Response, NextFunction, application} from "express"
import cloudinary from "../Utils/cloudinary"
import UserModel from "../Model/UserModel"

export const editProfile =async (req:Request, res:Response) => {

    try{
       const {firstName, lastName, gender, phoneNumber, dateOfBirth} = req.body
       const {proId} = req.params
       const getUpdate = await profileModel.findByIdAndUpdate
       (proId,
        {
            firstName,
            lastName,
            gender,
            phoneNumber,
            dateOfBirth
        },
         {
            new: true
         }
        )
        return res.status(201).json({
            message: "updated successfully",
            data: getUpdate
        })
    }catch(error:any)
    {
      return res.status(400).json({
        message: "failed to update profile",
        error: error.message
      })
    }
}

export const editImage =async (res:Response, req:any) => {
    try{
        const {proId} = req.params
        console.log(req.file)
        const imageurl = await cloudinary.uploader.upload(req.file.path)
        console.log("Kaugdiu", imageurl)
        const updateImag = await profileModel.findByIdAndUpdate(
            proId,
            {
                avatar:imageurl.secure_url
            },
            {new:true}
        )
        return res.status(201).json({
            message: "image updated successfully"
        })
    }catch(error: any)
    {
      return res.status(400).json({
        message: error.message,
        error: error.message
      })
    }
}