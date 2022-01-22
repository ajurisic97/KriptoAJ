const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    username: {type:String,required: true, 
        min: [4, 'Username mora imati minimalno 4 znakova, Vi imate: {VALUE}',], 
        max: [255, 'Username mora imati maksimalno 30 znakova, Vi imate:{VALUE}'],
    },
    email: { type: String, required: true, min: 5, max: 255,},
    //lozinke ne spremamo direktno već spremamo hash vrijednosti od lozinke takoder u obliku stringa:
    password: {type: String, required: true, min: 5, max:255},
    stanje: {type: Number},
    uloga: {type: String, required: true,},
    favoriti: [
        {type: String,}
    ],
    portfolio : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Portfolio',
        }
    ],
})
userSchema.set('toJSON',{
    transform: (doc,ret) => {
        ret.id = ret._id.toString()
        delete ret._id
        delete ret.__v
        return ret
    }
})

module.exports=mongoose.model('User',userSchema)