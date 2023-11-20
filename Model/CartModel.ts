import mongoose from "mongoose";

interface Cart{
    user:string,
    cartItem: {}[]
    bill: number
}
interface iCart extends Cart, mongoose.Document{}

const CartSchema = new mongoose.Schema({
   user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
   },
   cartItem: [{
     product: {type: mongoose.Schema.Types.ObjectId, ref: "product", required: true },
     quantity:{type: Number, default:1, min:1},
     price:{type:Number}
   }],
   bill:{
    type: Number,
    required: true,
    default:0
   }
})


export default mongoose.model("Cart", CartSchema)