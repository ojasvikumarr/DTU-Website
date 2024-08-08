import mongoose from "mongoose";

const internSchema = new mongoose.Schema({
    name : {type : String , required : true},
    roll : {type :String , default : '2K--/--/---'} ,
    year : {type :Number , default : '2K--'} ,
    phone : {type : Number , required : true},
    email : {type : String , required : true},
    department : {type : String , required : true},
    password : {type : String , required : true},
    reportingofficer : {type : String },
    depdate : {type : String },
    depno : {type : String },
    period : {type : String },
    stay : {type : String },
    cgpa : {type : String },
    back : {type : String },
    acc : {type : String },
    code : {type : String }
} , {timestamps:true});
mongoose.models = {}
export default mongoose.models.Intern || new mongoose.model("Intern" , internSchema)