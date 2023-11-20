import express, {Application,Request,Response,NextFunction,application} from "express"
import CartModel from "../Model/CartModel"
import UserModel from "../Model/UserModel"
import profileModel from "../Model/profileModel"
import cloudinary from "../Utils/cloudinary"
import CategoryModel from "../Model/CategoryModel"
import slugify from "slugify"
import ProductModel from "../Model/ProductModel"
import flutterwave from "flutterwave"
import OrderModel from "../Model/OrderModel"



const flw = new flutterwave("FLWPUBK_TEST-0f7e7325ad77b91a09aa9ed58fdaac08-X", "FLWSECK_TEST-8d54348bed5a3b45fa16687ac1ead866-X")
export const checkOut = async (req:Request, res:Response) =>{
    try
    {
      const {userId} = req.params

      const finduserCart = await CartModel.findOne({user:userId})
      console.log(finduserCart?.bill)
      const {card_number, cvv, expiry_month, expiry_year,fullName} = req.body
      const payload = {
        "card_number": card_number,
        "cvv": cvv,
        "expiry_month": expiry_month,
        "expiry_year": expiry_year,
        "amount": finduserCart,
        "fullName": fullName,
        "currency": "NGN",
        "redirect_url": "https://www.google.com",
        "email": "developers@flutterwavego.com",
        "phone_number": "09000000000",
        "enckey": "FLWSECK_TESTbef794dafc84",
        "tx_ref": "example01"
      }
      const response = await flw.Charge.card(payload)
      console.log(response)
      
      if(response.meta.authorization.node === "pin")
      {
        let payload2:any = payload
        payload2.authorization ={
          "node": "pin",
          // "fields": ["pin"],
          "pin": "pin"
        }
        const recallCharge = await flw.Charge.card(payload2)
        const callValidate = await flw.Charge.validate({
          "otp": "12345",
          "flw_ref": recallCharge.data.flw_ref
        })
        console.log(callValidate)
        if(callValidate.status === "success")
        {
          const createOrder = await OrderModel.create({
            user: finduserCart?.user,
            orderitems: finduserCart?.cartItem,
            bill:finduserCart?.bill
          })

          await CartModel.findByIdAndDelete({_id:finduserCart?._id})
          return res.status(201).json({
            message: "payment successfully made",
            data: "check your order"
          })
        }else
        {
          return res.status(201).json({

          })
        }
      }
      return res.status(201).json({
        message: "working now"
      })
    }catch(error:any)
    {
      return res.status(400).json({
        message: error.message,
        error: error.message
      })
    }
}