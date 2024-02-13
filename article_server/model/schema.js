const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },

    user_password: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    favourites : [
        {
             title : {
                type:String, 
                required : true           
             },
             topic : {
                type:String, 
                required : true           
             },
             language : {
                type:String, 
                required : true           
             }
        }
    ],
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.methods.generateAuthToken = async function () {
    try {
        const token_final = jwt.sign({ username: this._id.toString() },
        process.env.secret_key);
            this.tokens = this.tokens.concat({token:token_final}) 
        console.log(token_final);
        await this.save();
        return token_final;
    }
    catch (error) {
        console.log(error);
    }
}

userSchema.pre('save', async function (next) {
    if (this.isModified('user_password')) {
        this.user_password = await bcrypt.hash(this.user_password, 12);
    }
    next();
})


const User = new mongoose.model('news_portal_user', userSchema);

module.exports = User;
