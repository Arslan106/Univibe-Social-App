import BuySellPostModel from './Model'
import bcrypt from 'bcrypt'

class BuySellPostService {
     async CreatePost(data) {
        return new Promise((resolve, reject) => {
          new BuySellPostModel({
           ...data
          })
            .save()
            .then((doc) => {
              resolve(doc)
            })
            .catch((err) => {
                console.log('error in CreatePost in BuySellPostService is:',err)
              reject('Error Happened ')
            })
        })
      }
      async GetByCategory(category,ownerId){
          // return BuySellPostModel.find({category,isDeleted:false})
          return  BuySellPostModel.aggregate([
            { $match: { isDeleted:false,category,owner:{$ne:ownerId}} },
  
            { $sort: { updatedAt: -1 } },
            {
              $addFields: {
                owner: { $toObjectId: '$owner' }
              }
            },
            {
              $lookup: {
                from: 'app-accounts', // collection name in db
                let: { owner: { $toObjectId: '$owner' } },
                pipeline: [
                  {
                    $match: {
                      $expr: { $eq: ['$_id', '$$owner'] }
                    }
                  },
                  { $project: { name:1,profile:1,cover:1 } }
                ],
                as: 'account'
              }
            }
          ])
          
      }
      async GetAllPosts(owner){
        return BuySellPostModel.find({owner,isDeleted:false})
    }
    async DeletePost(owner,postId) {
        return BuySellPostModel.findOneAndUpdate({owner,_id:postId},{isDeleted:true},{new:true})
      } 
}
 


module.exports = BuySellPostService

