let {checkEmail,checkUsername,existedNameTable}= require('./../authServive/authService');
let isEmail = async (req ,res,next)=>{
    let {email}= req.body;
    try {
        let user = await checkEmail(email);
        if(!user){
           next();
        }
        else{
            return res.status(400).send({
                error:true,
                status: 400,
                message:'account existed'
            })
        }
        
    } catch (error) {
        return res.status(500).send({
            error:true,
            status: 500,
            message:'server error'
        })
    }
}
let CheckAccount = async (req ,res,next)=>{
    let {username}= req.body;
    try {
        let user = await checkUsername(username);
        if(user){
           req.user=user;
           next();
        }
        else{
            return res.status(400).send({
                error:true,
                status: 400,
                message:'Không tồn tại tài khoản'
            })
        }
        
    } catch (error) {
        return res.status(500).send({
            error:true,
            status: 500,
            message:'server error'
        })
    }
}
let CheckNameTable = async (req ,res,next)=>{
    let {name}= req.body;
    try {
        let user = await existedNameTable(name);
        if(!user){
            console.log('Tạo bảng');
           next();
        }
        else{
            return res.status(400).send({
                error:true,
                status: 400,
                message:`Đã tồn tại bảng ${name}`
            })
        }
        
    } catch (error) {
        return res.status(500).send({
            error:true,
            status: 500,
            message:'server error'
        })
    }
}
module.exports={
    isEmail,CheckAccount,CheckNameTable
}