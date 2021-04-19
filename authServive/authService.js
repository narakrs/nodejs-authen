
let db= require('./../Model/userModel');
let dbtb=require('./../Model/tableModel');
let checkEmail= async (email)=>{
    let Data = await db.User.findOne({where: {email: email}});
    if(Data){
        return true;
    }
    else return false;
}
let checkUsername= async (username)=>{
    let Data = await db.User.findOne({where: {username: username}});
    if(Data){
        return Data;
    }
    else return false;
}
let existedNameTable= async (name)=>{
    let Data = await dbtb.Table.findOne({where: {name: name}});
    if(Data){
        return Data;
    }
    else return false;
}
module.exports={
    checkEmail,
    checkUsername,
    existedNameTable
}