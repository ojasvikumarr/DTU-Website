import mongoose from "mongoose";

const internSchema = new mongoose.Schema({
    name : {type : String , required : true},
    roll : {type :String , default : '2K--/--/---'} ,
    year : {type :Number , default : '2K--'} ,
    phone : {type : Number , required : true},
    email : {type : String , required : true},
    department : {type : String , required : true},
    password : {type : String , required : true}
} , {timestamps:true});
mongoose.models = {}
export default mongoose.models.Intern || new mongoose.model("Intern" , internSchema)