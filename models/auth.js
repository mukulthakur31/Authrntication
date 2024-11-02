const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

Schema.pre('save',async function(next){
    const user = this
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedpass= await bcrypt.hash(user.password,salt)
        user.password=hashedpass
        next()
    } catch (error) {
        return next(error)
    }
})
Schema.methods.comparepassword=async function(candidatepassword){
    try {
        const ismatch = await bcrypt.compare(candidatepassword,this.password)
        return ismatch
    } catch (error) {
        throw error
    }
}

const user = mongoose.model('user',Schema)

module.exports=user