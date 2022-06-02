import express from 'express';
import {
    ValidateStudentRegistration,
    FollowValidation
} from '../../Controllers/Accounts/APIValidation.js'
import AccountsController from '../../Controllers/Accounts/APIController.js'
import { ValidateBuySellPost, ValidateGetBuySetByCategory, ValidateDeleteBuySellPost } from '../../Controllers/BuySell/APIValidation.js'
import {
    ValidateGetDealsForStudent
} from '../../Controllers/Deals/APIValidation.js'
import OurJWT from '../../utils/jwt/index.js'
import BuySellPostController from '../../Controllers/BuySell/APIController.js'
import ClubPostController from '../../Controllers/ClubPosts/APIController.js'
import AccountService from '../../Controllers/Accounts/Service.js'
import DealsPostController from '../../Controllers/Deals/APIController.js'
import AccommodationPostController from '../../Controllers/AccommodationPosts/APIController.js'
import JobPostController from '../../Controllers/Jobs/APIController.js'

const router = express.Router();
const Controller = new AccountsController()
const BuySellController = new BuySellPostController()
const ClubController = new ClubPostController()
const DealsController = new DealsPostController()
const AccommodationController = new AccommodationPostController()
const JobController  = new JobPostController()

router.post('/register', ValidateStudentRegistration, Controller.CreateStudentAccount);

//Buy and Sell post
router.post('/buy-sell-post', verifyStudent, ValidateBuySellPost, BuySellController.CreateBuySellPost);
router.get('/buy-sell-post/:category', verifyStudent, ValidateGetBuySetByCategory, BuySellController.GetPostByCategory);
router.get('/buy-sell-posts', verifyStudent, BuySellController.GetPosts);
router.delete('/buy-sell-post/:postId', verifyStudent, ValidateDeleteBuySellPost, BuySellController.DeleteBuySellPost);

//Get club and societies to follow
router.get('/club-societies', verifyStudent, Controller.GetClubSocitiesNotFollowd)

router.post('/club-society-detail', verifyStudent, ClubController.getClubDetail)

//Get Club and Societies post
router.get('/club-societies-posts', verifyStudent, ClubController.GetPostsForStudent)

router.post('/follow', verifyStudent,FollowValidation, Controller.FollowAccount)
router.post('/un-follow', verifyStudent,FollowValidation, Controller.UnFollowAccount)

//Get deals with advert type deals
router.get('/deals-posts/:advertType', verifyStudent,ValidateGetDealsForStudent, DealsController.GetDealsForStudent)

//get accommodatino for students
router.get('/accommodation-posts', verifyStudent, AccommodationController.GetPostsForStudents)

//get PartTime Jobs
router.get('/part-time-jobs', verifyStudent, JobController.GetPartTimeJobs)

//get course related Jobs
router.get('/course-related-jobs', verifyStudent, JobController.GetCourseRelatedJobs)

async function verifyStudent(req, res, next) {
    try {
        let token = req.headers['x-access-token']
        const JWT = new OurJWT()
        const verified = await JWT.ValidateJWT(token)
        if (verified) {
            const account = await new AccountService().GetAccountById(verified.data.id)
            if (account) {
                if (account.type != 'STUDENT') {
                    res.status(422).json({ message: 'Authentication failed' })
                    return
                }
                req.body.account = account

            } else {
                res.status(422).json({ message: 'Authentication failed' })
                return
            }
            req.body.studentId = verified.data.id
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

export default  router;