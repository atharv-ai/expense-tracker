const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
    {
        name : {
            type: String,
            require: true
        },
        email:{
            type: String,
            require: true,
            unique: true
        },
        password:{
            type: String,
            require: true
        }
    },
    {timestamps: true}
)

userSchema.pre("save", async function (){
    if(!this.isModified("password")) return ;

    const Salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,Salt);
})

module.exports = mongoose.model("User",userSchema);