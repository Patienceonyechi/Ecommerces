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
exports.checkOut = void 0;
const CartModel_1 = __importDefault(require("../Model/CartModel"));
const flutterwave_1 = __importDefault(require("flutterwave"));
const OrderModel_1 = __importDefault(require("../Model/OrderModel"));
const flw = new flutterwave_1.default("FLWPUBK_TEST-0f7e7325ad77b91a09aa9ed58fdaac08-X", "FLWSECK_TEST-8d54348bed5a3b45fa16687ac1ead866-X");
const checkOut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const finduserCart = yield CartModel_1.default.findOne({ user: userId });
        console.log(finduserCart === null || finduserCart === void 0 ? void 0 : finduserCart.bill);
        const { card_number, cvv, expiry_month, expiry_year, fullName } = req.body;
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
        };
        const response = yield flw.Charge.card(payload);
        console.log(response);
        if (response.meta.authorization.node === "pin") {
            let payload2 = payload;
            payload2.authorization = {
                "node": "pin",
                // "fields": ["pin"],
                "pin": "pin"
            };
            const recallCharge = yield flw.Charge.card(payload2);
            const callValidate = yield flw.Charge.validate({
                "otp": "12345",
                "flw_ref": recallCharge.data.flw_ref
            });
            console.log(callValidate);
            if (callValidate.status === "success") {
                const createOrder = yield OrderModel_1.default.create({
                    user: finduserCart === null || finduserCart === void 0 ? void 0 : finduserCart.user,
                    orderitems: finduserCart === null || finduserCart === void 0 ? void 0 : finduserCart.cartItem,
                    bill: finduserCart === null || finduserCart === void 0 ? void 0 : finduserCart.bill
                });
                yield CartModel_1.default.findByIdAndDelete({ _id: finduserCart === null || finduserCart === void 0 ? void 0 : finduserCart._id });
                return res.status(201).json({
                    message: "payment successfully made",
                    data: "check your order"
                });
            }
            else {
                return res.status(201).json({});
            }
        }
        return res.status(201).json({
            message: "working now"
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
            error: error.message
        });
    }
});
exports.checkOut = checkOut;
