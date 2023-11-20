import cloud,{ v2 } from "cloudinary";

const cloudinary: typeof v2 = cloud.v2
 
cloudinary.config ({
    cloud_name: "dfsjkbn0y",
    api_key: "953674876481861",
    api_secret: "CQNMoW7O9K6u_Jz8Sh8r_srBVj0"
})

export default cloudinary