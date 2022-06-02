import ClubPostModel from './Model'
import bcrypt from 'bcrypt'

class ClubPostService {
     async CreatePost(data) {
        return new Promise((resolve, reject) => {
          new ClubPostModel({
           ...data
          })
            .save()
            .then((doc) => {
              resolve(doc)
            })
            .catch(() => {
              reject('Error Happened')
            })
        })
      }

      async GetAllPosts(clubId) {
        return ClubPostModel.find({clubId}).sort({'updatedAt': -1})
      }
      
      async GetAllPostsForStudents(ids) {
        // return ClubPostModel.find({isDeleted:false,clubId:{$in:ids}}).sort({'updatedAt': -1})
        return  ClubPostModel.aggregate([
          { $match: { isDeleted:false,clubId:{'$in':ids}} },

          { $sort: { updatedAt: -1 } },
          {
            $addFields: {
              clubId: { $toObjectId: '$clubId' }
            }
          },
          {
            $lookup: {
              from: 'app-accounts', // collection name in db
              let: { clubId: { $toObjectId: '$clubId' } },
              pipeline: [
                {
                  $match: {
                    $expr: { $eq: ['$_id', '$$clubId'] }
                  }
                },
                { $project: { name:1,profile:1,cover:1 } }
              ],
              as: 'account'
            }
          }
        ])
}



async ClubPostsWithDetail(id) {
  // return ClubPostModel.find({isDeleted:false,clubId:{$in:ids}}).sort({'updatedAt': -1})
  return  ClubPostModel.aggregate([
    { $match: { isDeleted:false,clubId:id} },

    { $sort: { updatedAt: -1 } },
    {
      $addFields: {
        clubId: { $toObjectId: '$clubId' }
      }
    },
    {
      $lookup: {
        from: 'app-accounts', // collection name in db
        let: { clubId: { $toObjectId: '$clubId' } },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ['$_id', '$$clubId'] }
            }
          },
          { $project: { name:1,profile:1,cover:1,followers:1,detail:1 } }
        ],
        as: 'account'
      }
    }
  ])
}

}
 


module.exports = ClubPostService

