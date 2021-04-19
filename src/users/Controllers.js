db =  require('./../../Model/userModel');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
let {Key}= require('./../../key/keyJWT');
let signUp = async (req, res, next) => {
  console.log(req.body);
  const {email, username, password}= req.body;
  let salt= bcrypt.genSaltSync(saltRounds);
  let passwordHash= bcrypt.hashSync(password,salt);
  try {
  let data= await db.User.create({email, username,password:passwordHash});
  var token = jwt.sign({ _id: data.id }, Key,{ expiresIn: '5h' });
  res.cookie('token',token,{maxAge: 24*60*60*1000});
    return res.status(200).send({
      token,
      status:200,
      message:'Đăng nhập thành công',
      error: false
    });
  } catch (error) {
    return res.status(500).send({
      status:500,
      message:'lỗi server',
      error: true
    });
  }
  
};
let logIn = async (req, res, next) => {
  const {username, password}= req.body;
  const passwordHash= req.user.password;
  let data= bcrypt.compareSync(password,passwordHash);
  if(data){
    var token = jwt.sign({ _id: req.user.id }, Key,{ expiresIn: '5h' });
    console.log('token',token);
    res.cookie('token',token,{maxAge: 24*60*60*1000});
  return res.status(200).send({
    status:200,
    message:'Đăng nhập thành công',
    error: false
  });
  }
  else return res.status(400).send({
    status:400,
    message:'Không tồn tại tài khoản',
    error: true
  })
  
};

module.exports = {signUp, logIn};