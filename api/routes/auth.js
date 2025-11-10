const express = require("express");
const axios = require ("axios");
const jwt = require ("jsonwebtoken");
const User = require("../models /User");
const router = express.Router();


router.post("/sent-otp",async(req,res) =>{
    const {phone}  = req.body;
    if (!phone) return res.status(400).json({error:'Phoen number require'});

    try {
      const reponse = await axios.get(
        `https://2factor.in/API/V1/${process.env.TWOFACTOR_API_KEY}/SMS/${phone}/AUTOGEN`
      );
      if (reponse.data.Status !== 'Success'){
        return res.status(500).json ({error:'Failed to send OTP'})
      };
      res.json({session:reponse.data.Detail})
    }catch (err){
        res.status(500).json({error:"server Error"})
    }
});


router.post("/verify-otp", async(req,res) =>{
    const {sessionId,otp,phone} = req.body;
    

    if (!session || !otp || !phone) return res.status(400).json({error:'Missing fields'});

    try{
         const reponse = await axios.get(
        `https://2factor.in/API/V1/${process.env.TWOFACTOR_API_KEY}/SMS/VERIFY/${sessionId}/${otp}`,
      ); 
      if (reponse.data.Status !== 'Sussces'){
         return res.status(500).json ({error:'Invalid OTP'}) 
      }
      let user = await User.findOne({phone});
      if (!user){
        user = new User({phone})
        await user.save();
      }

      const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET)
      res.json({
        token,
        user:{phone:user.phone,firstName:user?.firstName,email:user?.email}
      })
    }catch (err) {
          res.status(500).json({error:'Server Error'});
    }
})


module.exports = router;