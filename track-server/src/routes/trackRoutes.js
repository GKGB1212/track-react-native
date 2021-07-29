const express=require('express');
const mongoose=require('mongoose');
const requireAuth=require('../middlewares/requireAuth');

const Track=mongoose.model('Track');

const router=express.Router();

//Đảm bảo tất cả các trình xử lí yêu cầu khác nhau đính kèm bên trong router này cần đăng nhập
router.use(requireAuth);

router.get('/tracks',async(req,res)=>{
    const tracks=await Track.find({userId: req.user._id});

    res.send(tracks);
});

router.post('/tracks',async(req,res)=>{
    const {name, locations}=req.body;

    if(!name||!locations){
        return res.status(422).send({error: 'You must provide a name and locations'});
    }
try{
    const track=new Track ({name, locations, userId: req.user._id});
    await track.save();
    res.send(track);
}catch(err){
    res.status(422).send({error:'Khong on'});
}
})
module.exports=router;