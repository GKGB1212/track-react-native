//thực hiện duy nhất 1 lần
require('./models/User');
require('./models/Track');
const express=require('express');
const mongoose=require('mongoose');
const authRoutes=require('./routes/authRoutes');
const trackRoutes=require('./routes/trackRoutes');
const requireAuth = require('./middlewares/requireAuth')

const app=express();

app.use(express.json());
app.use(authRoutes);
app.use(trackRoutes);

const mongoUri='mongodb+srv://admin:1212@cluster0.qfyod.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(mongoUri,{
    useNewUrlParser:true,
    useCreateIndex:true
});
mongoose.connection.on('connected',()=>{
    console.log('Connected to mongo instance')
});
mongoose.connection.on('error',(err)=>{
    console.error('Error connecting to mongo',err);
});

app.get('/',requireAuth,(req,res)=>{
    res.send(`Your email: ${req.user.email}`);
});

app.listen(3000,()=>{
    console.log('Run run');
})