// import { boolean } from 'joi'
import mongoose from 'mongoose'

const NotificationSchema = new mongoose.Schema(
  {
    notifier:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    detail:{
        type:String,
        required:true
    },
    payload:{
      type:Object,
    },
    navigateTo:{
        type:String,
        default:false
    },
    type:{
        type:String,
        required:true
    },
    isSeen:{
        type:Boolean,
        default:false
    },
    isRead:{
        type:Boolean,
        default:false
    },
  },
  {
    timestamps: true
  }
)

const JobsModel = mongoose.model('notifications', NotificationSchema)

export default JobsModel
