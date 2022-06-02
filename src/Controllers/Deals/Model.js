import mongoose from 'mongoose'

const DealsSchema = new mongoose.Schema(
  {
    owner:{
        type:String,
        required:true
    },
    attachments:{
      type:Array,
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    advertType:{
        type:String,
        required:true
    },
    dealTitle:{
        type:String,
    },
    description:{
        type:String,
    },
    dealPrice:{
        type:Number
    },
    discountTitle:{
        type:String
    },
    previousPrice:{
        type:Number
    },
    newPrice:{
        type:Number
    },
    discount:{
        type:Number,
    },
    discountCode:{
        type:String
    },
    target:{
        type:Object,
        required:true
    }

  },
  {
    timestamps: true
  }
)

const DealsModel = mongoose.model('deals', DealsSchema)

export default DealsModel
