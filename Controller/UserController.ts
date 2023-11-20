import UserModel from "../Model/UserModel";
import {Response, Request} from "express"
import mongoose from "mongoose";
import profileModel from "../Model/profileModel";
import bcrypt from "bcrypt"
import {jwt} from "jsonwebtoken"
import nodemailer from "nodemailer"


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    port: 587,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: 'onyechiediri@gmail.com',
      pass: 'arto ilti uauo affk'
    }
  
})





export const createUser = async(req:Request, res:Response):Promise<Response> =>{
    try{
        const {userName, email, password, role} = req.body
        // if (!userName || !email || !password || !role)
        // {
        //     return res.status(401).json({
        //         message: "all filed required"
        //     })
        // }
        const checkEmail = await UserModel.findOne({ email: email})
        console.log(checkEmail)
        if (checkEmail)
        {
            return res.status(401).json({
                success: 0,
                message: "email aready exist"
            })
        }
        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(password, salt)

        const creatData = await UserModel.create({
            userName, 
            email,
            password: hashed,
            role
        })

        const createProfile: any = await profileModel.create({
            _id:creatData._id,
            firstName: "",
            lastName: "",
            gender: "",
            avatar: ""
        })
        creatData.profile = createProfile._id
        creatData.save()

        createProfile.user = creatData._id
        createProfile.save()

        let mailOption = {
             // send mail with defined transport object
            from: '"pepefood 👻❤🎂" <noreply@unityfood.com>', // sender address
            to: email, // list of receivers
            subject: "pepefood", // Subject line
            html: `<b>PLEASE CLICK THE LINK <a href ="http://localhost:2017/api/v1/account-verify/${creatData._id}"\>Link</a> to verify account</b>`, // html body
        }
        
        // await transporter.sendMail(mailOption, (error:any, info:any)=>{
        //     if(error)
        //     {
        //         console.log("error sendin mail", error)
        //     }else
        //     {
        //         console.log("email send", info.response)
        //     }
        // })


        return res.status(201).json({
            message: "registeration successfully",
            data: creatData
        })
        // const createAuth = await AuthModel.create({
        //     userName,
        //     email,
        //     password
        // })
        
    }catch(error:any)
    {
        return res.status(400).json({
            message: error.message
        })
    }
}

export const getSingleUser = async(req: Request, res: Response):Promise<Response>=>{
    const {id} = req.params
    // const getSing = await UserModel.findById(id)
    try{
        const getSing = await UserModel.findById(req.params.id).populate(
            {
                path: 'profile',
                select: "firstName lastName gender avatar dateOfBirth phoneNumber"
            }
        )
        return res.status (201).json({
            message: "successfully",
            data: getSing
        })
        
    }catch(error:any)
    {
      return res.status(400).json({
        message: "failed to get user",
        error: error.message
      })
     }
 }

 export const getAllUser = async(req:Request, res:Response):Promise<Response>=>{
    try{
       const getAll = await UserModel.find()
       return res.status(200).json({
        message: "all data",
        result: getAll
       })
    }catch(error:any)
    {
       return res.status(404).json({
        message: error.message
       })
    }
 }


    //    const {firstName, gender, phoneNumber, dateOfBirth} =req.body
    //    const createProfile = await profileModel.create({
    //     firstName,
    //     gender,
    //     phoneNumber,
    //     dateOfBirth
    //    })
    //    const getSing = await AuthModel.findById(req.params.id)ssage: "profile created successfully"
    //    })
export const LoginUser =async (req:Request, res:Response) => {
    try{
         const {email, password} = req.body
         const user:any = await UserModel.findOne({email:email})
         console.log(user)
         if(user)
         {
            const checkPassword = await  bcrypt.compare(password, user.password)
            if (checkPassword)
            {
                if(user.verify)
                {
                    const {password, ...info} = user._doc
                let options: any = {
                    expiresIn: "1d"
                }
                const token = jwt.sign({ id: user._id, email: user.email, userName: user.userName, role:user.role }, "konderlnskbdfvjkdbfvjkdn", { expiresIn: "3d", })
                res.cookie("sessionId", token, options)
                console.log("bhvjhsd",req.headers['cookie'])
                 return res.status(200).json({
                        message: "login success",
                        data: info,
                        token:token
,
                        // token: token
                    })
                }else
                {
                    let mailOption = {
                        // send mail with defined transport object
                       from: '"pepefood 👻❤🎂" <noreply@unityfood.com>', // sender address
                       to: email, // list of receivers
                       subject: "pepefood", // Subject line
                       html: `<b>PLEASE CLICK THE LINK <a href ="http://localhost:2017/api/v1/account-verify/${user._id}"\>Link</a> to verify account</b>`, // html body
                   }
                   
                await transporter.sendMail(mailOption, (error:any, info:any)=>{
                if(error)
                {
                    console.log("error sendin mail", error)
                }else
                {
                    console.log("email send", info.response)
                }
            })
                 return res.status(200).json({
                    message: "please check your email to verify account"
                 })
                }
            }else{
                return res.status(404).json({
                    message :"wrong password",
                }) 
            }
           

        }else
         {
            return res.status(404).json({
                message :"account not found",
            })
         }
         
       
    }catch(error:any)
    {
      return res.status(404).json({
        message : error.message
      })
    }
}

export const verifyUser =async (req:Request, res:Response) => {
    try{
        const user = await UserModel.findById(req.params.id)
        console.log(user)
        const verifyData = await UserModel.findByIdAndUpdate(
            req.params.id,
            {
                verify:true
            },
            {new: true}
        )
        return res.status(201).json({
            message: "account has been verify process to login"
        })
    }catch(error:any)
    {
        return res.status(404).json({
            message: error.message
        })
    }
}


export const logOut =async (req:Request, res:Response) => {
    try{
        res.clearCookie("sessionId")
        res.setHeader("clear-Site-Date", '"cookies", "storage"')
        return res.status(200).json({
            message: "signout successfully"
        })
    }catch(error:any)
    {
        return res.status(404).json({
            message: error.message
        })
    }
}


