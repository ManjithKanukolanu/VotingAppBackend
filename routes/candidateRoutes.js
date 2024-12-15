const express = require('express')
const router = express.Router()
const Candidate = require('./../models/candidate')
const User = require('./../models/user')
const {jwtAuthMiddleware,generateToken} = require('./../jwt')
const checkAdminRole = async (userId)=>{
    try{
        const user = await User.findById(userId)
        return user.role === 'admin'
    }
    catch(err)
    {
        return false
    }
}
router.post('/',jwtAuthMiddleware,async (req,res)=>{
    try{
        if(! await checkAdminRole(req.user.id))
        {
            console.log('admin role not found')
            return res.status(404).json({message : "user not has admin role"})
        }
        const data = req.body
        const newcandidate = new Candidate(data)
        const response = await newcandidate.save()
        console.log('data saved')
        res.status(200).json({response})
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({error: 'Internal Error'})
    }
})

router.put('/:candidateid',jwtAuthMiddleware,async (req,res)=>{
    try{
        if(!checkAdminRole(req.user.id))
            return res.status(403).json({message : "user does not have admin role"})
        const Candidateid = req.params.candidateid // extract data from url
        const Updatecandidatedata = req.body // updated data
        const response = await Candidate.findByIdAndUpdate(Candidateid,Updatecandidatedata,
        {
             new: true, //return updated data
             runValidators : true //run mongoose validation
        })
        if(!response)
        {
             return res.status(404).json({error: 'Candidate not found'})
        }
        console.log('Candidate data updated')
        res.status(200).json({response})
    }
    catch(err)
    {
         console.log(err)
         res.status(500).json({error: 'Internal server error'})
    }
})
router.delete('/:candidateid',jwtAuthMiddleware,async (req,res)=>{
    try{
        if(!await checkAdminRole(req.user.id))
        {
            return res.status(403).json({message : "user does not have admin role"})
        }
        const Candidateid = req.params.candidateid // extract data from url
        const response = await Candidate.findByIdAndDelete(Candidateid)
        if(!response)
        {
             return res.status(404).json({error: 'Candidate not found'})
        }
        console.log('Candidate deleted')
        res.status(200).json({response})
    }
    catch(err)
    {
         console.log(err)
         res.status(500).json({error: 'Internal server error'})
    }
})

router.post('/vote/:candidateid',jwtAuthMiddleware,async (req,res)=>
{
    try{
         const Candidateid = req.params.candidateid
         const userId = req.user.id
         const candidate = await Candidate.findById(Candidateid)
         if(!candidate)
         {
             return res.status(404).json({message : 'candidate not found'})
         }
         const user = await User.findById(userId)
         if(!user)
         {
             return res.status(404).json({message : 'user not found'})
         }
         if(user.isVoted)
         {
             return res.status(400).json({message : 'you have already voted'})
         }
         if(user.role === 'admin')
         {
             return res.status(403).json({message : 'admin is not allowed vote'})
         }
         candidate.votes.push({user:user})
         candidate.votecount++
         await candidate.save()

         user.isVoted = true
         await user.save()

         res.status(200).json({message:'saved record successfully'})
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({error: 'Internal server error'})
    }
})

router.get('/vote/count',async (req, res) => {
    try{
        const candidate = await Candidate.find().sort({votecount: 'desc'}) 
        //i need to get only data of party and votecount of all candidates
        //.map() is used to loop through each candidate in the candidate array
        //For each candidate (data), a new object is created with only two properties
        const voteRecord = candidate.map((data)=>{
            return {
                party: data.party,
                count: data.votecount
            }
        })
        return res.status(200).json(voteRecord)
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({error: 'Internal Server Error'})
    }
})

router.get('/',async (req,res)=>{
    try{
         const candidate = await Candidate.find({ },'name party -_id') 
         // object should contain only name,party but defaultly it includes _id so we need to remove with help of -
         return res.status(200).json(candidate)
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({error: 'Internal Server Error'})
    }
})
module.exports = router