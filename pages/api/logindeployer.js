import deployer from "../../models/deployer";
import connectDb from "../../middleware/mongoose";
import CryptoJS from "crypto-js";
var jwt = require('jsonwebtoken');

const handler = async (req, res) => {
    if (req.method == 'POST') {
        console.log(req.body)
        let u = await deployer.findOne({email : req.body.demail})
        // console.log(u)
        const bytes  = CryptoJS.AES.decrypt(u.password, process.env.AES_SECRET);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        if((u) &&(req.body.dpassword == originalText)){     
            var token = jwt.sign({name: u.name , email: u.email }, process.env.JWT_SECRET, {expiresIn:"2d"});
            res.status(200).json({ success: true , token})
        }else{
            res.status(400).json({error: "Invalid credentials"})
        }

    } else {
        res.status(400).json({ error: "This method is not allowed" })
        
    }
}
export default connectDb(handler);



