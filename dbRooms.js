import mongoose from "mongoose";


const roomSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    roomname: String,
    messages: [{
        _id : mongoose.Types.ObjectId,
        message : String,
        name: String,
        timestamp : {type : Date,required: true, default: Date.now },
        recieved: Boolean,
    }]
});

export default mongoose.model("Rooms", roomSchema);