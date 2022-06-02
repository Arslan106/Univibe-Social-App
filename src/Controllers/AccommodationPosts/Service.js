import AccommodationPostModel from './Model.js'
import bcrypt from 'bcrypt'
// var mongoose = require('mongoose');

class AccommodationPostService {
     async CreatePost(data) {
        return new Promise((resolve, reject) => {
          new AccommodationPostModel({
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

      async GetAllPosts(owner) {
        return AccommodationPostModel.find({owner,isDeleted:false})
      } 
      async DeletePost(owner,postId) {
        return AccommodationPostModel.findOneAndUpdate({_id:postId,owner:owner},{isDeleted:true},{new:true})
      } 
      async GetPostsForStudents(university,studentType,sex,internationalStudent) {
        return AccommodationPostModel.find(
          {
            isDeleted:false,
            "target.universities":university,
            "target.studentType":studentType,
            "target.sex":sex,
          }
        )
      } 
}
 


export default  AccommodationPostService

