const jwt_token = require("jsonwebtoken");
const Admin = require("../model/adminSchema");
const cookieParser = require("cookie-parser");
const { route } = require("../router/auth");
const express = require("express");
const app = express();
const router = express.Router();

// app.use(cookieParser());

const admin_auth_m = async (req,res,next) => {
      try{
            const token = req.cookies.jwtoken;
            console.log(token);
            const verify_token = jwt_token.verify(token, process.env.secret_key);
            console.log(verify_token);
            const root_user = await Admin.findOne({_id:verify_token.username, "tokens.token":token});
        if(!root_user)
        {
            throw new Error('admin not found')
        }
        req.token = token;
        req.root_user = root_user;
        req.user_id = root_user._id;
        next();
      }
      catch(error)
      {
        res.status(401).send('unauthorized....');
        console.log(error);
      }
}

module.exports = admin_auth_m;