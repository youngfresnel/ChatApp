const mongoose = require("mongoose");
const User = require("./User");

const messagesSchema = new mongoose.Schema({
    conversation:{type:mongoose.Schema.Types.ObjectId,ref:"Conversation",required:true},
    sender:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    content:{type:String, require:true},
    status:{
        type:String, 
        enum:["sending","sent","delivered","read","failled"],
        default:'sent',
    },
    createdAt:{type:Date,default:Date.now},
    readBy:[{
        user:{type: mongoose.Schema.Types.ObjectId,ref:"User"},
        timestamps:{type:Date}
    }]
});



module.exports = mongoose.model('Message',messagesSchema);