const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js'); // Import your User model
const dotenv = require('dotenv');
dotenv.config();

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send('Authorization header missing');
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).send('Token missing');
  }

  try {
    const decoded = jwt.verify(token, process.env.CLAVE);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).send('Invalid token');
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