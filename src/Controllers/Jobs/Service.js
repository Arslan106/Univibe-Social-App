import JobsModel from './Model'
import bcrypt from 'bcrypt'

class DealsService {
     async CreateJobPost(data) {
        return new Promise((resolve, reject) => {
          new JobsModel({
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
        return JobsModel.find({owner,isDeleted:false})
    }

    async DeletePost(owner,dealId){
        return JobsModel.findOneAndUpdate({_id:dealId,owner:owner},{isDeleted:true},{new:true})
    }

    async GetPartTimeJobs(university,studentType){
      return JobsModel.find({
        jobType:'Course Related / Full time',
        isDeleted:false,
        "target.universities":university,
        "target.studentType":studentType
      })
  }
  async GetCourseRelatedJobs(university,studentType,course){
    return JobsModel.find({
      jobType:'General',
      isDeleted:false,
      // "target.universities":university,
      // "target.studentType":studentType,
      // "target.course":course
    })
}
      
}
 


module.exports = DealsService

