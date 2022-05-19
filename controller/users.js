const express = require('express');
const router = express.Router();
const db = require('../model/db.js');
const sq = db.sequelize;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');
const env = process.env.NODE_ENV || 'dev';
const config = require('../config/conf.json')[env];

const user = {};

user.new_user = async function(req, res){
  let {name, email, password, picture} = req.body;
  let new_user;
  let user;
  let hashPassword;

  console.log({name, email, password, picture})

  if (name.trim().length == 0 || name == null){
    return res.status(422).send({errMsg: 'Please check name input.'});
  } 

  if (email.trim().length == 0 || email == null){
    return res.status(422).send({errMsg: 'Please check email input.'});
  } 

  if (password == null || password.trim().length == 0){
    return res.status(422).send({errMsg: 'Please renter and check your password.'});
  } 

  if (picture == null || picture.trim().length == 0){
    picture = null;
  }

  try{
    user = await db.user.findOne({
      attributes: ['name'],
      where: {name: {[Op.eq]: name}},
      raw: true
    });

    if(user){return res.status(422).send({errMsg:`User ${name} already exists.`});}

    hashPassword = await bcrypt.hash(password, config.saltRounds);
    
    new_user = await db.user.create({
      name: name,
      email: email,
      password: hashPassword,
      picture: picture
    });
  }catch(e){
    console.error(e);
    return res.status(500).send({errMsg: 'Failed to register user.'})
  }

  return res.send({new_user});
}

module.exports = user;