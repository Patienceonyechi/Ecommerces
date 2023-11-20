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
exports.verifyUser = void 0;
const googleapis_1 = require("googleapis");
const path_1 = __importDefault(require("path"));
const nodemailer_1 = __importDefault(require("nodemailer"));
// const oAuth = new google.auth.OAuth2()
const GOOGLE_SECRET = "351615788718-hl84h472gmv0tGOCSPX-HNQA89wTa_vg0KQpUYt5drvz_w0pqpk8r0o8dgptqisrdbr.apps.googleusercontent.com";
const GOOGLE_ID = "351615788718-hl84h472gmv0tqpk8r0o8dgptqisrdbr.apps.googleusercontent.com";
const GOOGLE_REDIRECT = "https://developers.google.com/authplayground";
const GOOGLE_REFRESHTOKEN = "1//04GcXth3s2XklCgYIARAAGAQSNwF-L9IrXvL_MzFmX0r3004by_kZM-NiK1N8BtSseHGcDtTKcVTPSczfpR1-q0V51KqFsUCob1Y";
const oAuth = new googleapis_1.google.auth.OAuth2(GOOGLE_ID, GOOGLE_SECRET, GOOGLE_REDIRECT);
oAuth.setCredentials({ refresh_token: GOOGLE_REFRESHTOKEN });
const verifyUser = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        const accessToken = yield oAuth.getAccessToken();
        const transporter = nodemailer_1.default.createTransport({
            host: "smtp.gmail.com",
            service: "gmail",
            port: 587,
            secure: true,
            auth: {
                // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                type: "oAuth2",
                user: 'onyechiediri@gmail.com',
                refreshToken: GOOGLE_REFRESHTOKEN,
                clientId: GOOGLE_ID,
                clientSecret: GOOGLE_SECRET,
                accessToken: accessToken
            }
        });
        const buildfile = path_1.default.join(__dirname, "../views/verifyaccount");
        const data = ();
        let mailOption = {
            // send mail with defined transport object
            from: '"pepefood 👻❤🎂" <noreply@unityfood.com>',
            to: email,
            subject: "pepefood",
            html: data // html body
        };
    }
});
exports.verifyUser = verifyUser;
