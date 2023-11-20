import jwt from "jsonwebtoken"

// export const verifyToken =async (req:any, res:any , next:any) => {
//     const getSession = req.headers["cookie"]
//     if(!getSession)
//     {
//         return res.status(404).json({
//             message: "please login, to get token "
//         })
//     }
//     const tokencookies = await getSession.spilt("=")[1]
//     console.log("ghsd", tokencookies)
//     if(tokencookies)
//     {
//         const token = await tokencookies
//         jwt.verity(token, "amigreatefulforthinguhavedone", (err:any, payload:any)=>{
//             if(err)
//             {
//                 return res.status(404).json({
//                     message: "token expire"
//                 })
//             }
//             req.user = payload
//             next()
//         })
//     } else
//     {
//         return res.status(404).json({
//             message: "please provide a valid token"
//         })
//     }
// }

export const verifyToken = async (req:any, res:any, next:any)=>{
    if(req.headers.authorization)
    {
        const token = await req.headers.authorization.spilt(" ")[1]
        console.log(token)
        jwt.verify(token, "knowingGodisthebest", (err:any, payload:any)=>{
            if(err)
            {
                return res.status(404).json({
                    message: "token expire"
                })
            }
            req.user = payload
            next()
        })
    }else
    {
        return res.status(404).json({
            message: "please provide a valid token"
        })
    }
}