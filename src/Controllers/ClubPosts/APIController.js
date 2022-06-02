import CubPostService from './Service'
import OurJWT from '../../utils/jwt'
import bcrypt from 'bcrypt'
import AccountService from '../Accounts/Service'
// import '@types/ua-parser-js'
class ClubPostController {


  async CreateClubPost (req, res) {
    const { clubId,detail, attachments} = req.body

    
    try {
        let data = {
            clubId,
            detail,
            attachments
        }
         const newPost = await new CubPostService().CreatePost(data)
    
     if(newPost){
         res.status(200).json({post:newPost})
     }
     else{
        res.status(400).json({ message: 'Database system is down for maintenance. Please try later.' })
     }
    } catch (err) {
      console.log('Error in creating club is: ',err)
      res.status(500).json({ message: 'Error Processing Request' })
    }
  }
  async GetPosts (req, res) {
    const { clubId} = req.body
    try {
         const posts = await new CubPostService().GetAllPosts(clubId)
    
     if(posts){
         res.status(200).json({posts:posts})
     }
     else{
        res.status(400).json({ message: 'Database system is down for maintenance. Please try later.' })
     }
    } catch (err) {
      console.log('Error in creating club is: ',err)
      res.status(500).json({ message: 'Error Processing Request' })
    }
  }


  async getClubDetail (req, res) {
    const { studentId,clubId} = req.body
    try {
         const posts = await new CubPostService().ClubPostsWithDetail(clubId)
    
     if(posts){
         res.status(200).json({posts:posts})
     }
     else{
        res.status(400).json({ message: 'Database system is down for maintenance. Please try later.' })
     }
    } catch (err) {
      console.log('Error in getting club is: ',err)
      res.status(500).json({ message: 'Error Processing Request' })
    }
  }

  async GetPostsForStudent (req, res) {
    const {studentId} = req.body
    try {
        const accounts = await new AccountService().GetFollowdClubsByStudent(studentId)
        
        if(accounts){
          if(accounts.length===0){
            res.status(200).json({posts:[]})
            return 
          }
          let ids = accounts.map(account=>{
            return account._id.toString()
          })
          const posts = await new CubPostService().GetAllPostsForStudents(ids)
          if(posts){
              res.status(200).json({posts:posts})
          }
          else{
             res.status(400).json({ message: 'Database system is down for maintenance. Please try later.' })
          }
        }
        
    } catch (err) {
      console.log('Error in creating club is: ',err)
      res.status(500).json({ message: 'Error Processing Request' })
    }
  }



 
}

module.exports = ClubPostController
