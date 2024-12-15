const express = require('express')
const {jwtAuthMiddleware,generateToken} = require('./../jwt')
const router = express.Router()
const User = require('./../models/user')

router.post('/signup',async (req,res)=>{
    try{
        const data = req.body
        // ^ asserts the start of the string  
        // \d{12} matches exactly 12 digits (\d is shorthand for any digit from 0-9)
        // $ asserts the end of the string
        if(!/^\d{12}$/.test(data.aadharCardNumber))  
        {
            res.status(200).json({error: 'Aadhar card must contain 12 digits'})
        }
        const adminUser = await User.findOne({role:'admin'})
        if(data.role === 'admin' && adminUser)
        {
            return res.status(400).json({error: 'Admin user already exists'})
        }
        const newUser = new User(data)
        const response = await newUser.save()
        console.log('data saved')
        const payload = {
            id: response.id
        }
        console.log(JSON.stringify(payload))
        const token = generateToken(payload)
        res.status(200).json({response: response,token: token})
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({error: 'Internal Error'})
    }
})
router.post('/login',async (req,res)=>{
    try{
          const {aadharCardNumber,password} = req.body
          const user = await User.findOne({aadharCardNumber: aadharCardNumber})
          if(!user || !(await user.comparePassword(password)))
          {
                  return res.status(401).json({error: 'invalid username or password'})
          }
          const payload = {
            id: user.id
           }
           const token = generateToken(payload)
           res.status(200).json({token: token})
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({error: 'Internal Error'})
    }
})

router.get('/profile',async (req,res)=>{
    try
    {
       const userData = req.user
       console.log('user data is ' + userData)
       const userId = userData.id
       const user = await person.findById(userId)
       res.status(200).json({user})
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({error: 'Internal Error'})
    }
})

router.put('/profile/password',async (req,res)=>{
    try{
          const userData = req.user   // payload data extract from token
          const userid = userData.id  // extract id from token
          const {Currentpassword,Newpassword} = req.body
          const user = await User.findById(userid)
          if(!(await user.comparePassword(Currentpassword)))
          { 
             return res.status(401).json({error: 'invalid username or password'})
          }
          user.password = Newpassword
          await user.save()
          console.log('password updated')
          res.status(200).json({message : "Password Updated"})
    }
    catch(err)
    {
         console.log(err)
         res.status(500).json({error: 'Internal server error'})
    }
})
module.exports = router