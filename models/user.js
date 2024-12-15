const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const UserSchema = new mongoose.Schema({
    name :
    {
        type: String,
        required: true
    },
    age :
    {
        type: Number,
        required: true
    },
    email:
    {
        type: String,
        required: true
    },
    mobile :
    {
        type: String,
        required: true
    },
    address :
    {
        type: String
    },
    aadharCardNumber:
    {
        type : Number,
        required: true,
        unique : true
    },
    password :
    {
        type : String,
        required: true
    },
    role : {
        type: String,
        enum: ['voter','admin'],
        default: 'voter'
    },
    isVoted: {
        type: Boolean,
        default: false
    }
})
UserSchema.methods.comparePassword = async function (pass) {
    try{
        const ismatch = await bcrypt.compare(pass,this.password)
        return ismatch
    }
    catch(err)
    {
        throw err
    }
}
UserSchema.pre('save',async function (next) {
    const person = this
    try{
          if(person.isModified('password'))
          {
              const salt = await bcrypt.genSalt(10)
              const hashedpassword = await bcrypt.hash(person.password,salt)
              person.password = hashedpassword
          }
          next()
    }
    catch(err)
    {
        return next(err)
    }
})
const User = mongoose.model('User',UserSchema)
module.exports = User