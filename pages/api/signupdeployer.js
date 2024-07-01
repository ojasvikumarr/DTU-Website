import connectDb from "../../middleware/mongoose";
import deployer from "../../models/deployer";
import CryptoJS from "crypto-js";

const handler = async(req , res) => {
    if(req.method == 'POST'){
        console.log(req.body);
        const {dname , dphone , demail, ddepartment , dpassword} = req.body ;
        const d = await new deployer({name :dname , phone : dphone , email : demail , department : ddepartment ,password : CryptoJS.AES.encrypt(dpassword, process.env.AES_SECRET).toString() });
        await d.save();
        res.status(200).json({success:"Deployer was successfuly established" })
    }else{
        res.status(400).json({error:"This method not allowed"})
    }
}

export default connectDb(handler)