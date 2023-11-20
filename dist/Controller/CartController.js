"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveFromCart = exports.addToCart = void 0;
const CartModel_1 = __importDefault(require("../Model/CartModel"));
const UserModel_1 = __importDefault(require("../Model/UserModel"));
const profileModel_1 = __importDefault(require("../Model/profileModel"));
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
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productid } = req.params;
        const { userId } = req.params;
        const getUser = yield UserModel_1.default.findOne({ _id: userId });
        // console.log(getUser)
        const getProduct = yield profileModel_1.default.findOne({ _id: productid });
        // console.log(getProduct)
        const checkUserCart = yield CartModel_1.default.findOne({ user: userId });
        console.log(checkUserCart);
        if (checkUserCart) {
            const findIndexProduct = checkUserCart.cartItem.findOne((item) => { var _a; return (_a = item === null || item === void 0 ? void 0 : item.product) === null || _a === void 0 ? void 0 : _a.equals(productid); });
            console.log("ediri", findIndexProduct);
            if (findIndexProduct > -1) {
                // this next step will give u the properties of the indexposition of your cartitems
                const userSelectPr = checkUserCart.cartitems[findIndexProduct];
                console.log(userSelectPr);
                userSelectPr.quantity += 1;
                checkUserCart.bill = checkUserCart.cartitems.reduce((acc, curr) => {
                    // console.log(curr)
                    return acc + curr.quantity * curr.price;
                }, 0);
                checkUserCart.cartitems[findIndexProduct] = userSelectPr;
                yield checkUserCart.save();
                return res.status(201).json({
                    message: "you have order before",
                    result: checkUserCart
                });
            }
            else {
                checkUserCart.cartitems.push({ product: getProduct === null || getProduct === void 0 ? void 0 : getProduct._id, quantity: 1, price: getProduct === null || getProduct === void 0 ? void 0 : getProduct.price });
                checkUserCart.bill = checkUserCart.cartitems.reduce((acc, curr) => {
                    console.log(curr);
                    return acc + curr.quantity * curr.price;
                }, 0);
                yield checkUserCart.save();
                return res.status(201).json({
                    message: "new product added",
                    result: checkUserCart
                });
            }
        }
        else {
            const catData = yield CartModel_1.default.create({
                user: getUser === null || getUser === void 0 ? void 0 : getUser._id,
                cartItem: [{ product: getProduct === null || getProduct === void 0 ? void 0 : getProduct._id, quantity: 1, price: getProduct === null || getProduct === void 0 ? void 0 : getProduct.price }],
                bill: 1 * (getProduct === null || getProduct === void 0 ? void 0 : getProduct.price)
            });
            return res.status(201).json({
                message: "sucessfully add to cart",
                result: catData
            });
        }
    }
    catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
});
exports.addToCart = addToCart;
const RemoveFromCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { userId } = req.params;
        let productId = req.query.productId;
        console.log(productId);
        const chechUserCart = yield CartModel_1.default.findOne({ user: userId });
        console.log(chechUserCart);
        const position = yield ((_a = chechUserCart === null || chechUserCart === void 0 ? void 0 : chechUserCart.cartitems) === null || _a === void 0 ? void 0 : _a.findIndex((item) => (item === null || item === void 0 ? void 0 : item.product) == productId));
        console.log("amayyagghd", position);
        if (chechUserCart) {
            const item = chechUserCart.cartitems[position];
            console.log(item);
            if (item.quantity > 1) {
                item.quantity -= 1;
                chechUserCart.bill = -item.price;
            }
            else {
                chechUserCart.bill -= item.price;
                if (chechUserCart.bill = 0) {
                    chechUserCart.bill = 0;
                }
                chechUserCart.cartitems.splice(position, 1);
            }
            chechUserCart.bill -= item.quantity * item.price;
            if (chechUserCart.bill > 0) {
                chechUserCart.bill = 0;
            }
            chechUserCart.cartitems.splice(position, 1);
            chechUserCart.bill = chechUserCart.cartitems.reduce((acc, cur) => {
                console.log(cur);
                return acc + cur.quantity * cur.price;
            }, 0);
            yield chechUserCart.save();
            return res.status(201).json({
                message: "user have items in cart"
            });
        }
        else {
            return res.status(401).json({
                message: "no item found in cart"
            });
        }
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
            error: error.message
        });
    }
});
exports.RemoveFromCart = RemoveFromCart;
