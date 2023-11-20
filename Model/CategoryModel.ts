import mongoose from "mongoose";

interface Category{
    name: string,
    slug: string,
    parent: string,
    user: {},
    products: {}[]
}
interface icategory extends Category, mongoose.Document{ }

const CategorySchema = new mongoose.Schema({
    name:{
        type: String
    },
    parent:{
        type: String
    },
    slug:{
        type: String
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"
    }]
},
    {timestamps:true}
)

export default mongoose.model("Category",CategorySchema)