import express from 'express';
import {
    ValidateRegistration,
    ValidateProfileUpload
} from '../../Controllers/Accounts/APIValidation'
import {
    ValidateCreatePost
}
    from '../../Controllers/ClubPosts/APIValidation'
import AccountsController from '../../Controllers/Accounts/APIController'
import OurJWT from '../../utils/jwt'
import ClubPostController from '../../Controllers/ClubPosts/APIController'

const router = express.Router();
const Controller = new AccountsController()
router.post('/register', ValidateRegistration, Controller.CreateClubAccount);


router.post('/post', verifyClub,ValidateCreatePost,new ClubPostController().CreateClubPost);
router.get('/posts', verifyClub,new ClubPostController().GetPosts);



async function verifyClub(req, res, next) {
    try {
        let token = req.headers['x-access-token']
        const JWT = new OurJWT()
        const verified = await JWT.ValidateJWT(token)
        if (verified) {
            req.body.clubId = verified.data.id
            req.body.id = verified.data.id
            next()
        }
        else {
            res.status(422).json({ message: 'Authentication failed' })
        }
    }
    catch (err) {
        console.log('Error in authentication is: ', err)
        res.status(422).json({ message: 'Authentication failed' })

    }
}
module.exports = router;