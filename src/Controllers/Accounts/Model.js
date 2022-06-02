import  mongoose from 'mongoose'

const AppAccountSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true
    },
    firstName:{
      type:String
    },
    lastName:{
      type:String
    },
    graduationYear:{
      type:String
    },
    name: {
      type: String,
      // required: true
    },
    contactNumber:{
      type:String,
    },
    purposeOfAdvirtisement:{
      type:String
    },
    password: {
      type: String,
      required: true
    },
   type:{
       type:String,
       required:true
   },
   society:{
       type:String
   },
   detail:{
    type:String
},
   gender:{
     type:String
   },
   dateOfBirth:{
     type:Date
   },
   studentType:{
     type:String
   },
   university:{
     type:String
   },
   studentNumber:{
     type:String
   },
   course:{
     type:String
   },
   courseStartYear:{
     type:String
   },
   courseEndYear:{
     type:String
   },
   academicYear:{
     type:String
   },
   studentCard:{
     type:String
   },
   followers:{
     type:Array
   },
   profile:{
     type:String,
     default:null
   },
   cover:{
     type:String,
     default:null
   },
   deviceToken:{
    type:String,
    default:null
  },
  activation:{
type:Object
  }
    
  },
  {
    timestamps: true
  }
)

const AppAccountModel = mongoose.model('app-accounts', AppAccountSchema)

export default AppAccountModel
