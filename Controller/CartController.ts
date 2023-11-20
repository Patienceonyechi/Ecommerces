import express, {Application,Request,Response,NextFunction,application} from "express"
import CartModel from "../Model/CartModel"
import UserModel from "../Model/UserModel"
import profileModel from "../Model/profileModel"
import cloudinary from "../Utils/cloudinary"
import CategoryModel from "../Model/CategoryModel"
import slugify from "slugify"
import ProductModel from "../Model/ProductModel"

// export const addToCart = async(req:Request, res:Response) => {
//     try{
//           const {quantityvalue} = req.body
//           const userId = req.params.userId

//           // console.log(userId)
//           // const checkUser = await UserModel.findOne({_id:userId})
//           // if(!checkUser){
//           //   return res.status(404).json({
//           //       message: "user not found"
//           //   })
//           // }
//           // const productId = req.params.productId
//           // console.log(productId)
//           // const checkProduct:any = await ProductModel.findOne({_id:productId})
//           // console.log(checkProduct)
//        

//           // const quantity = quantityvalue || 1
//           // const price = checkProduct?.price * quantity

//           // if (!checkProduct){
//           //   return res.status(404).json({
//           //       messsage:"product not found"
//           //   })
//           // }
//           const catData = await CartModel.create({
//             // user: userId,
//             // cartItem:[{product:productId, quantity, price}],
//              // bill: price * quantity
//           })
//           return res.status(201).json({
//             success:1,
//             result: catData
//           })
//     }catch(error:any)
//     {
//        return res.status(400).json({
//         message: error.message
//        })
//     }
// }

export const addToCart = async(req:Request, res:Response) =>{
  try{
    const {productid} = req.params
    const {userId} = req.params

    const getUser = await UserModel.findOne({_id:userId})
    // console.log(getUser)
    const getProduct:any = await profileModel.findOne({_id: productid})
    // console.log(getProduct)

    const checkUserCart:any = await CartModel.findOne({user: userId})
    console.log(checkUserCart)
    if(checkUserCart)
    {
      const findIndexProduct = checkUserCart.cartItem.findOne((item:any)=> item?.product?.equals(productid))
      console.log("ediri", findIndexProduct)
      if (findIndexProduct > -1)
      {
         // this next step will give u the properties of the indexposition of your cartitems
      const userSelectPr = checkUserCart.cartitems[findIndexProduct]
      console.log(userSelectPr)
      userSelectPr.quantity += 1

      checkUserCart.bill = checkUserCart.cartitems.reduce((acc:any, curr:any)=>{
        // console.log(curr)
        return acc + curr.quantity * curr.price
      }, 0)
      checkUserCart.cartitems[findIndexProduct] = userSelectPr 
      await checkUserCart.save()

      return res.status(201).json({
        message: "you have order before",
        result: checkUserCart
      })
    }else
    {
      checkUserCart.cartitems.push({product: getProduct?._id, quantity: 1, price: getProduct?.price})
      

      checkUserCart.bill = checkUserCart.cartitems.reduce((acc:any, curr:any)=>{
        console.log(curr)
        return acc + curr.quantity * curr.price
      }, 0)
      await checkUserCart.save()

      return res.status(201).json({
        message: "new product added",
        result: checkUserCart
      })
    }
  
  }else
  {
    const catData = await CartModel.create({
      user: getUser?._id,
      cartItem:[{product: getProduct?._id, quantity: 1, price: getProduct?.price}],
      bill:1 *getProduct?.price
    })
    return res.status(201).json({
      message: "sucessfully add to cart",
      result: catData
    })
  }
     
  }catch(error:any)
  {
    return res.status(400).json({
      message: error.message
    })
  }
}

export const RemoveFromCart = async (req:any, res:any) => {
  try{
     const {userId} = req.params
     let productId = req.query.productId
     console.log(productId)

     const chechUserCart:any = await CartModel.findOne({user:userId})
     console.log(chechUserCart)
     const position = await chechUserCart?.cartitems?.findIndex((item:any)=> item?.product == productId)
     console.log("amayyagghd", position)
     if(chechUserCart)
     {
     
      const item = chechUserCart.cartitems[position]
      console.log(item) 
      if(item.quantity > 1)
      {
        item.quantity -=1
        chechUserCart.bill = -item.price
      }else
      {
        chechUserCart.bill -= item.price
        if(chechUserCart.bill =0)
        {
          chechUserCart.bill = 0
        }
        chechUserCart.cartitems.splice(position, 1)
      }
      chechUserCart.bill -= item.quantity * item.price
      if(chechUserCart.bill > 0)
      {
        chechUserCart.bill = 0
      }
      chechUserCart.cartitems.splice(position, 1)
      
      chechUserCart.bill = chechUserCart.cartitems.reduce((acc:any, cur:any)=>{
        console.log(cur)
        return acc + cur.quantity * cur.price
      }, 0)
      await chechUserCart.save()
      return res.status(201).json({
        message: "user have items in cart"
      })
     }else
     {
      return res.status(401).json({
        message: "no item found in cart"
      })
     }
  }catch(error:any)
  {
    return res.status(400).json({
      message: error.message,
      error: error.message
    })
  }
}