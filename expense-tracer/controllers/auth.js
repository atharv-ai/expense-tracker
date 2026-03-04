const User = require("../model/User");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

const generateToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET ,
         {expiresIn : "7d"});
};

try {
    exports.registerUser = async function(req,res){
    const {name,email, password} = req.body;

    const userExist = await User.findOne({email});
    if(userExist){
        return res.status(400).json({message : "user already exist"});
    }
    const user = await User.create({
        name,
        email,
        password
    })
     res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });
}}
catch(error){
    res.status(500).json({message : error.message});
}

try{
    exports.loginUser = async function(req,res){
        const {email,password} = req.body;

        const validUser = await User.findOne({email});
        if(!validUser){
            res.status(400).json({message:"Invalid email or password"})
        }
        const isMatch = await bcrypt.compare(password,validUser.password);
        if(!isMatch){
            res.send(400).json({message: "Invalid email or password"});
        }

        res.status(200).json({
            _id: validUser._id,
            name : validUser.user,
            email:validUser.email,
            token : generateToken(validUser._id)
        })
    }
}
catch(err){
    res.status(500).json({message:err.message});
}
