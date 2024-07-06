const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const users = require('../models/userModel.js');
const config = require('../config/config.js');

exports.register = (req,res) => {
    const {username,password}=req.body;
    const hashedPassword = bcrypt.hashSync(password,8);
    const newUser = {id:users.length+1,username,password:hashedPassword};
    users.push(newUser);
    const token = jwt.sign({id:newUser.id},config.secretKey,{expiresIn:config.tokenExpiresIn});
    res.status(201).send({auth:true,token});
};
exports.login=(req,res)=>{
    const {username,password}=req.body;
    const user = users.find(u=>u.username===username);
    if(!user) return res.status(404).send('User not found.');
    const passwordIsValid = bcrypt.compareSync(password,user.password);
    if(!passwordIsValid) return res.status(401).send({auth:false,token:null});
    const token = jwt.sign({id:user.id},config.secretKey,{expiresIn:config.tokenExpiresIn});
    res.status(200).send({auth:true,token});
}