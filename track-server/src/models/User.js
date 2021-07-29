const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

const userSchema=new mongoose.Schema({
    email:{
        type: String,
        unique: true,
        require:true
    },
    password:{
        type:String,
        require: true
    }
});

//trước khi xử lí lưu thì sẽ cho băm,
//function sẽ được chạy trước khi user đc lưu
userSchema.pre('save',function(next){
    const user=this;

    //???????????????????????????????
    if(!user.isModified('password')){
        return next();
    }
    //??????????????????????????????????

    //10 là độ phức tạp của salt nha
    bcrypt.genSalt(10,(err,salt)=>{
        if(err){
            return next(err);
        }

        bcrypt.hash(user.password,salt,(err, hash)=>{
            if(err){
                return next(err);
            }
            user.password=hash;
            next();
        })
    })
});

userSchema.methods.comparePassword=function comparePassword(candidatePassword){
    return new Promise((resolve,reject)=>{
        bcrypt.compare(candidatePassword,this.password,(err,isMatch)=>{
            if(err){
                return reject(err);
            }
            if(!isMatch){
                return reject(false);
            }

            resolve(true)
        })
    })
}

mongoose.model('User',userSchema);