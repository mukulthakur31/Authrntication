const user = require('./../models/auth')

const setdata= async (req,res)=>{
   try {
    const {name,password} = req.body
    const response = await user.create({
        name,
        password
    })
    return res.status(200).json(response)
    
   } catch (error) {
       console.log(error);
       res.json(error)
   }
}

const getall = async(req,res)=>{
    try {
        const response = await user.find()
        if(!response){
            res.status(401).json({error:"no users"})
        }
        res.status(201).json({response})
    } catch (error) {
        res.status(501).json({error:"internal server error"})
    }
}

module.exports={setdata,getall}