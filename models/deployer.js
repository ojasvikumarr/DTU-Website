import mongoose from "mongoose";

const deployerSchema = new mongoose.Schema({
    name : {type : String , required : true},
    phone : {type : Number , required : true},
    email : {type : String , required : true},
    department : {type : String , required : true},
    password : {type : String , required : true}
} , {timestamps:true});
// mongoose.models = {}
export default mongoose.models.Deployer || new mongoose.model("Deployer" , deployerSchema)