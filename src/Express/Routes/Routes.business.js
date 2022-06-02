import express from 'express';
import {
ValidateRegistration,
ValidateBusinessRegistration,
}   from '../../Controllers/Accounts/APIValidation.js'
import {
    ValidateAccomodationAd,
    ValidateDeleteAccommodationPost
} from '../../Controllers/AccommodationPosts/APIValidation.js'
import AccountsController from '../../Controllers/Accounts/APIController.js'
import OurJWT from '../../utils/jwt/index.js'
import AccommodationPostController from '../../Controllers/AccommodationPosts/APIController.js'
import {ValidateDealPost,ValidateDeleteDealsPost} from '../../Controllers/Deals/APIValidation.js'
import {ValidateJobPost,
    ValidateDeleteJobPost} from '../../Controllers/Jobs/APIValidation.js'
import DealsPostController from '../../Controllers/Deals/APIController.js'
import JobPostController from '../../Controllers/Jobs/APIController.js'

const router = express.Router();
const Controller = new AccountsController()
const AccommodationController = new AccommodationPostController()
const DealsController = new DealsPostController()
const JobsController = new JobPostController()
router.post('/register',ValidateBusinessRegistration,Controller.CreateBusinessAccount);

//Accommodation post Routes
router.post('/accommodation-post',verifyCBusiness,ValidateAccomodationAd,AccommodationController.CreateAccommodationPost);
router.get('/accommodation-posts',verifyCBusiness,AccommodationController.GetPosts);
router.delete('/accommodation-post/:postId',ValidateDeleteAccommodationPost,verifyCBusiness,AccommodationController.DeleteAccommodationPost);

//Deals Post Routes
router.post('/deals-post',verifyCBusiness,ValidateDealPost,DealsController.CreateDealsPost);
router.get('/deals-posts',verifyCBusiness,DealsController.GetDeals);
router.delete('/deals-post/:postId',verifyCBusiness,ValidateDeleteDealsPost,DealsController.DeleteDealsPost);

//Deals Post Routes
router.post('/job-post',ValidateJobPost,verifyCBusiness,JobsController.CreatJobPost);
router.get('/job-posts',verifyCBusiness,JobsController.GetJobs);
router.delete('/job-post/:postId',verifyCBusiness,ValidateDeleteJobPost,JobsController.DeleteJobPost);



async function verifyCBusiness(req, res, next) {
    try {
        let token = req.headers['x-access-token']
        const JWT = new OurJWT()
        const verified = await JWT.ValidateJWT(token)
        if (verified) {
            req.body.BusinessId = verified.data.id
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