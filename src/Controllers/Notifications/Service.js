import NotificationModel from './Model'
class NotificationService {
     async CreateNotification(data) {
        return new Promise((resolve, reject) => {
          new NotificationModel({
           ...data
          })
            .save()
            .then((doc) => {
              resolve(doc)
            })
            .catch((err) => {
                console.log('error in CreateNotification in NotificationService is:',err)
              reject('Error Happened ')
            })
        })
      }
      async AllNotifications(id){
        return NotificationModel.find({notifier:id}).sort({'createdAt': -1})
      }
      
}

 


module.exports = NotificationService

