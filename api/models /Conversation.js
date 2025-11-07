const mongoose = require ("mongoose");
const { create } = require("./User");

const conversationSchema = new mongoose.Schema({
    participant:[
        {type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    ],
    createAt:{type:Date, default:Date.now},
});

module.exports = mongoose.model ("Conversation",conversationSchema);