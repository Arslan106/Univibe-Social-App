import mongoose from 'mongoose'

const BuySellPostsSchema = new mongoose.Schema(
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
    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
    },
    category:{
        type:String,
        required:true
    }
  },
  {
    timestamps: true
  }
)

const BuySellPostsModel = mongoose.model('buy-sell-posts', BuySellPostsSchema)

export default BuySellPostsModel
