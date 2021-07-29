const jwt=require('jsonwebtoken');
const mongoose=require('mongoose');
const User=mongoose.model('User');

module.exports=(req,res,next)=>{
   //lấy authorization từ request để rút ra cái 
   //token rồi kiểm tra coi có hợp lệ không thì
   //mới cho truy cập đến db
    const {authorization}=req.headers;
    // authorization === 'Bearer vrgdggrg'

    if(!authorization){
        return res.status(401).send({error:'you must be logged in'});
    }

    const token=authorization.replace('Bearer ','');


    // đối số đầu tiên là token đối số thứ 2 là key bí mật và đối số
    // thứ 3 là callback sau khi đã thực hiện các xác thực trên token đó
    //nếu thất bại sẽ nhận đc err, còn thành công thì nhận đc payload
    jwt.verify(token, 'MY_SECRET_KEY', async(err,payload)=>{
        if(err){
            return res.status(401).send({error:'You must be logged in'});
        }

        const {userId}=payload;

        const user=await User.findById(userId);

        //đưa user này vào request để khi nào cần thì lôi ra mà sài
        req.user=user;
        next();

    });
}