import StripeTokenModel from './Model.js'
import bcrypt from 'bcrypt'

class StripeTokenService {
     async CreateToken(data) {
        return new Promise((resolve, reject) => {
          new StripeTokenModel({
           ...data
          })
            .save()
            .then((doc) => {
              resolve(doc)
            })
            .catch((err) => {
                console.log('error in creating stripe token is',err)
              reject('Error Happened ')
            })
        })
      }

      async GetAllCards(ownerId){
        return StripeTokenModel.find({ownerId:ownerId,isDeleted:false}).select('ownerId cardNumber')
    }

    
  
      
}
 


export default  StripeTokenService

