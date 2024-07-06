const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js'); // Import your User model
const config = require('../config/config.js');



const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
    if(!authHeader) return res.status(403).send({auth:false,message:'No se proveyó un token'});
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).send('Access denied');
  }

  try {
    const decoded = jwt.verify(token, "secretKey");
    req.userId = decoded.id;
    console.log('Decoded JWT:', decoded);
    User.findById(decoded.id, (err, user) => {
      if (err || !user) {
        return res.status(404).send('User not found');
      }
      req.username = user.username;
      next();
    });
  } catch (error) {
    res.status(400).send('Invalid token');
  }
};

module.exports = authMiddleware;
/*
const jwt = require('jsonwebtoken');
const config = require('../config/config.js');

module.exports = (req,res,next)=>{
    const authHeader = req.headers['authorization'];
    if(!authHeader) return res.status(403).send({auth:false,message:'No se proveyó un token'});
    const token = authHeader.split(' ')[1];
    if(!token) return res.status(403).send({auth:false,message:'Malformed token'});
    jwt.verify(token,config.secretKey,(err,decoded)=>{
        if(err) return res.status(500).send({auth:false,message:'Failed to authenticate token'});
        req.userId=decoded.id;
        next();
    })
}
*/