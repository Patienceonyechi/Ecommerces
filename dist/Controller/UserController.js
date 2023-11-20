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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logOut = exports.verifyUser = exports.LoginUser = exports.getAllUser = exports.getSingleUser = exports.createUser = void 0;
const UserModel_1 = __importDefault(require("../Model/UserModel"));
const profileModel_1 = __importDefault(require("../Model/profileModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = require("jsonwebtoken");
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    port: 587,
    secure: true,
    auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: 'onyechiediri@gmail.com',
        pass: 'arto ilti uauo affk'
    }
});
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, email, password, role } = req.body;
        // if (!userName || !email || !password || !role)
        // {
        //     return res.status(401).json({
        //         message: "all filed required"
        //     })
        // }
        const checkEmail = yield UserModel_1.default.findOne({ email: email });
        console.log(checkEmail);
        if (checkEmail) {
            return res.status(401).json({
                success: 0,
                message: "email aready exist"
            });
        }
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashed = yield bcrypt_1.default.hash(password, salt);
        const creatData = yield UserModel_1.default.create({
            userName,
            email,
            password: hashed,
            role
        });
        const createProfile = yield profileModel_1.default.create({
            _id: creatData._id,
            firstName: "",
            lastName: "",
            gender: "",
            avatar: ""
        });
        creatData.profile = createProfile._id;
        creatData.save();
        createProfile.user = creatData._id;
        createProfile.save();
        let mailOption = {
            // send mail with defined transport object
            from: '"pepefood 👻❤🎂" <noreply@unityfood.com>',
            to: email,
            subject: "pepefood",
            html: `<b>PLEASE CLICK THE LINK <a href ="http://localhost:2017/api/v1/account-verify/${creatData._id}"\>Link</a> to verify account</b>`, // html body
        };
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
        });
        // const createAuth = await AuthModel.create({
        //     userName,
        //     email,
        //     password
        // })
    }
    catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
});
exports.createUser = createUser;
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // const getSing = await UserModel.findById(id)
    try {
        const getSing = yield UserModel_1.default.findById(req.params.id).populate({
            path: 'profile',
            select: "firstName lastName gender avatar dateOfBirth phoneNumber"
        });
        return res.status(201).json({
            message: "successfully",
            data: getSing
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "failed to get user",
            error: error.message
        });
    }
});
exports.getSingleUser = getSingleUser;
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getAll = yield UserModel_1.default.find();
        return res.status(200).json({
            message: "all data",
            result: getAll
        });
    }
    catch (error) {
        return res.status(404).json({
            message: error.message
        });
    }
});
exports.getAllUser = getAllUser;
//    const {firstName, gender, phoneNumber, dateOfBirth} =req.body
//    const createProfile = await profileModel.create({
//     firstName,
//     gender,
//     phoneNumber,
//     dateOfBirth
//    })
//    const getSing = await AuthModel.findById(req.params.id)ssage: "profile created successfully"
//    })
const LoginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield UserModel_1.default.findOne({ email: email });
        console.log(user);
        if (user) {
            const checkPassword = yield bcrypt_1.default.compare(password, user.password);
            if (checkPassword) {
                if (user.verify) {
                    const _a = user._doc, { password } = _a, info = __rest(_a, ["password"]);
                    let options = {
                        expiresIn: "1d"
                    };
                    const token = jsonwebtoken_1.jwt.sign({ id: user._id, email: user.email, userName: user.userName, role: user.role }, "konderlnskbdfvjkdbfvjkdn", { expiresIn: "3d", });
                    res.cookie("sessionId", token, options);
                    console.log("bhvjhsd", req.headers['cookie']);
                    return res.status(200).json({
                        message: "login success",
                        data: info,
                        token: token,
                        // token: token
                    });
                }
                else {
                    let mailOption = {
                        // send mail with defined transport object
                        from: '"pepefood 👻❤🎂" <noreply@unityfood.com>',
                        to: email,
                        subject: "pepefood",
                        html: `<b>PLEASE CLICK THE LINK <a href ="http://localhost:2017/api/v1/account-verify/${user._id}"\>Link</a> to verify account</b>`, // html body
                    };
                    yield transporter.sendMail(mailOption, (error, info) => {
                        if (error) {
                            console.log("error sendin mail", error);
                        }
                        else {
                            console.log("email send", info.response);
                        }
                    });
                    return res.status(200).json({
                        message: "please check your email to verify account"
                    });
                }
            }
            else {
                return res.status(404).json({
                    message: "wrong password",
                });
            }
        }
        else {
            return res.status(404).json({
                message: "account not found",
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: error.message
        });
    }
});
exports.LoginUser = LoginUser;
const verifyUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield UserModel_1.default.findById(req.params.id);
        console.log(user);
        const verifyData = yield UserModel_1.default.findByIdAndUpdate(req.params.id, {
            verify: true
        }, { new: true });
        return res.status(201).json({
            message: "account has been verify process to login"
        });
    }
    catch (error) {
        return res.status(404).json({
            message: error.message
        });
    }
});
exports.verifyUser = verifyUser;
const logOut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie("sessionId");
        res.setHeader("clear-Site-Date", '"cookies", "storage"');
        return res.status(200).json({
            message: "signout successfully"
        });
    }
    catch (error) {
        return res.status(404).json({
            message: error.message
        });
    }
});
exports.logOut = logOut;
