import AppAccountModel from './Model.js'
import bcrypt from 'bcrypt'

class AppAccountService {
     async CreateAccount(data) {
        return new Promise((resolve, reject) => {
          new AppAccountModel({
           ...data
          })
            .save()
            .then((doc) => {
              resolve(doc)
            })
            .catch((err) => {
              console.log('error in creating account is :',err)
              reject('Error Happened')
            })
        })
      }

   async IfAccountExists_ByEmail(email) {
    return AppAccountModel.findOne({ email: email.toLowerCase() }, (err, doc) => {
      if (err || !doc) {
        return null
      }
      return doc.toJSON()
    })
  }
  async GetAccountById(id){
    return AppAccountModel.findOne({_id:id})
  }

  async AddProfile(id,url){
    return AppAccountModel.findOneAndUpdate({_id:id},{profile:url},{new:true})
  }
  async AddCover(id,url){
    return AppAccountModel.findOneAndUpdate({_id:id},{cover:url},{new:true})
  }
  async ActivateAccount(id,activation){
    return AppAccountModel.findOneAndUpdate({_id:id},{activation:activation},{new:true})
  }

   async Login(email, password) {
    return new Promise((resolve) => {
      AppAccountModel.findOne({ email: email.toLowerCase() }, (err, account) => {
        if (err || !account) {
          resolve({account:null,message:'This email is not registered yet. Make sure its correct or register now.'})
          return
        }
        const passwordComparison = bcrypt.compareSync(password, account.password)
        if (passwordComparison) {
          const _account = account.toJSON()
          resolve({account:_account,message:null})
        } else {
          resolve({account:null,message:'Invalid Password'})
        }
      })
    })
  }


  async GetUnfollowdClubsByStudent(studentId){
    return AppAccountModel.find({cover:{$ne:null},type:'CLUB'}).select('_id name  cover profile followers')
  }

  async GetFollowdClubsByStudent(studentId){
    console.log('id type is: ',typeof studentId)
    return AppAccountModel.find({type:'CLUB',"followers.id":studentId}).select('_id')
  }

  async AddFollower(id,payload){
    return AppAccountModel.findOneAndUpdate({_id:id},{$push:{followers:payload}},{new:true})
  }

  async removeFollower(id,studentId){
    console.log('student is: ',studentId,typeof studentId)
    return AppAccountModel.findOneAndUpdate({_id:id},{$pull:{followers: { id: studentId } }},{new:true})
  }

  async AddDeviceToken(id,deviceToken){
    return AppAccountModel.findOneAndUpdate({_id:id},{deviceToken},{new:true})
  }
}
 


export default  AppAccountService

