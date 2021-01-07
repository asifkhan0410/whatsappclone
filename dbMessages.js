import mongoose from "mongoose";

const whatsappSchema = mongoose.Schema({
    _id : mongoose.Types.ObjectId,
    message : String,
    name: String,
    timestamp : String,
    recieved: Boolean,
});

export default mongoose.model("Messages",whatsappSchema);