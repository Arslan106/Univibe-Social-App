import { number } from 'joi'
import * as mongoose from 'mongoose'

const AccommodationPostsSchema = new mongoose.Schema(
  {
    postedBy: {
      type: String,
      required: true,
    },
    owner:{
        type:String,
        required:true
    },
    attachments:{
      type:Array,
    },
    likes:{
        type:Array,
        default:[]
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    rentalType: {
            type:String,
            required:true
        },
        address:{
          type:Object,
          required:true
        },
        monthlyPrice:{
          type:Number,
          required:true
        },
        includedBills:{
          type:Boolean,
          required:true
        },
        contractLength:{
          type:String,
          required:true
        },
        includedParking:{
          type:Boolean,
          required:true
        },
        description: {
            type:String,
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

const AccommodationPostsModel = mongoose.model('accommodation-posts', AccommodationPostsSchema)

export default AccommodationPostsModel
