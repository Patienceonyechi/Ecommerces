import mongoose from "mongoose";

interface Order{
    user:string,
    cartItem: {}[]
    bill: number
}
interface iOrder extends Order, mongoose.Document{}

const OrderSchema = new mongoose.Schema({
   user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
   },
   oderItem: [{
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


export default mongoose.model("order", OrderSchema)