import mongoose from "mongoose";

interface Product{
    name: string,
    img: string,
    desc: string,
    qty: number,
    price: string,
    category: string,
    createdby: {}

}

interface iProduct extends Product, mongoose.Document{}

const ProSchema = new mongoose.Schema({
    name: {
        type: String
    },
    img: {
        type:String
    },
    desc: {
        type: String
    },
    qty: {
        type: Number
    },
    price: {
        type: String
    }, 
    category: {
        type: String
    },
    createdby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},
   {timestamps: true}
)

export default mongoose.model<iProduct>("Product", ProSchema)