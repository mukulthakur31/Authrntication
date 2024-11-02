const express = require('express')
const {mongoose } = require('mongoose')
const {setdata,getall} = require('./controller/auth')
const user = require('./models/auth')
const bodyParser = require('body-parser')

const passport = require('passport')
const localStrategy = require('passport-local').Strategy

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })); 


mongoose.connect("mongodb://127.0.0.1:27017/auth")
.then(()=>{
    console.log("database connected");
})

passport.use(new localStrategy(async (username,password,done)=>{
    try {
        const User =await user.findOne({name:username})
        if(!User){
            return done(null,false,{message:"name is incorrect"})
        }
        const ismatch = User.comparepassword(password)
        if(ismatch){
            return done(null ,User)
        }
        else{
            return done(null,false,{message:'incorrect password'})
        }
    } catch (error) {
        return done(error)
    }
}))
app.use(passport.initialize());
const auth =passport.authenticate('local',{session:false})

app.post('/add',setdata)

app.get('/getall',auth,getall)

app.listen(3000,()=>{
    console.log('server connected');
})