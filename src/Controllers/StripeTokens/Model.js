import mongoose from 'mongoose'

const StripeTokenSchema = new mongoose.Schema(
  {
    ownerId:{
        type:String,
        required:true
    },
    token:{
        type:Object,
        required:true
    },
    cardNumber:{
        type:String,
        required:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
  },
  {
    timestamps: true
  }
)

const StripeTokenModal = mongoose.model('stripe-tokens', StripeTokenSchema)

export default StripeTokenModal
