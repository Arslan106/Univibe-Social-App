import * as mongoose from 'mongoose'

const JobsSchema = new mongoose.Schema(
  {
    owner:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    jobType:{
        type:String,
        required:true
    },
    jobDescription:{
      type:String,
      required:true
  },
  jobEmail:{
    type:String,
    required:true
},
jobAddress:{
  type:String,
  required:true
},
    // attachment:{
    //   type:Object,
    // },
    isDeleted:{
        type:Boolean,
        default:false
    },
    target:{
        type:Object,
        // required:true
    }

  },
  {
    timestamps: true
  }
)

const JobsModel = mongoose.model('jobs', JobsSchema)

export default JobsModel
