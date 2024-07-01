import connectDb from "../../middleware/mongoose";

import intern from "../../models/intern";

import CryptoJS from "crypto-js";

const handler = async (req, res) => {
    if (req.method == 'POST') {
        console.log(req.body)
        const {name ,roll , year,phone,email , department} = req.body ;

        let i = new intern({name ,roll , year,phone , email ,department , password: CryptoJS.AES.encrypt(req.body.password, process.env.AES_SECRET).toString() }) ;
        await i.save()
    
        res.status(200).json({ success: "Hello there you r successfull" })

    } else {
        res.status(400).json({ error: "This method is not allowed" })
        
    }
}
export default connectDb(handler);



