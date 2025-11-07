const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    phone:{type:String,required:true,unique:true},
    pin:{type:String},
    firstName:{type:String},
    lasName:{type:String},
    email:{type:String, unique:true},
    createAt:{type:Date,default:Date.now},
});


userSchema.pre("save",async function(next){
    if(!this.isModified('pin')) return next();
    if(this.pin){
        const salt = await bcrypt.genSalt(10)
        this.pin = await bcrypt.hash(this.pin,salt)
    }
    next();
})

userSchema.methods.comparPim = async function (candidatePin) {
    return bcrypt.compare(candidatePin,this.pin);
};

module.exports = mongoose.model('User',userSchema);