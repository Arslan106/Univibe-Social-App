import DealsModel from './Model'
import bcrypt from 'bcrypt'

class DealsService {
     async CreatePost(data) {
        return new Promise((resolve, reject) => {
          new DealsModel({
           ...data
          })
            .save()
            .then((doc) => {
              resolve(doc)
            })
            .catch((err) => {
                console.log('error in CreatePost in DealsService is:',err)
              reject('Error Happened ')
            })
        })
      }

      async GetAllPosts(owner){
        return DealsModel.find({owner,isDeleted:false})
    }

    async DeletePost(owner,dealId){
        return DealsModel.findOneAndUpdate({_id:dealId,owner:owner},{isDeleted:true},{new:true})
    }

    async GetDealsForStudent(advertType,university,studentType,sex,age){
      // console.log('age is: ')
      return DealsModel.find({
        advertType,
        isDeleted:false,
        "target.universities":university,
        "target.studentType":studentType,
        "target.sex":sex,
        // "target.age":{$lt:parseFloat(age)}
      })
  }
      
}
 


module.exports = DealsService

