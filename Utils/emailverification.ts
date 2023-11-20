import {google} from "googleapis"
import path from "path"
import nodemailer from "nodemailer"
import ejs from "ejs"

// const oAuth = new google.auth.OAuth2()

const GOOGLE_SECRET = "351615788718-hl84h472gmv0tGOCSPX-HNQA89wTa_vg0KQpUYt5drvz_w0pqpk8r0o8dgptqisrdbr.apps.googleusercontent.com";
const GOOGLE_ID = "351615788718-hl84h472gmv0tqpk8r0o8dgptqisrdbr.apps.googleusercontent.com";

const GOOGLE_REDIRECT = "https://developers.google.com/authplayground";

const GOOGLE_REFRESHTOKEN = "1//04GcXth3s2XklCgYIARAAGAQSNwF-L9IrXvL_MzFmX0r3004by_kZM-NiK1N8BtSseHGcDtTKcVTPSczfpR1-q0V51KqFsUCob1Y";

const oAuth = new google.auth.OAuth2(GOOGLE_ID, GOOGLE_SECRET, GOOGLE_REDIRECT)
oAuth.setCredentials({refresh_token: GOOGLE_REFRESHTOKEN})

export const verifyUser =async () => {
    try{

    }catch(error)
    {
        const accessToken = await oAuth.getAccessToken()
        const transporter = nodemailer.createTransport({
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
          
        })

    //     const buildfile = path.join(__dirname, "../views/verifyaccount")
    //     let mailOption = {
    //          // send mail with defined transport object
    //        from: '"pepefood 👻❤🎂" <noreply@unityfood.com>',  // sender address
    //        to: email, // list of receivers
    //        subject: "pepefood", // Subject line
    //        html: data // html body
    //    }
    }
}