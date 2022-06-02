import * as mongoose from 'mongoose'

const ClubPostsSchema = new mongoose.Schema(
  {
    clubId: {
      type: String,
      required: true,
    },
    detail: {
      type: String,
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
    }
    
    
  },
  {
    timestamps: true
  }
)

const ClubPostsModel = mongoose.model('club-posts', ClubPostsSchema)

export default ClubPostsModel
