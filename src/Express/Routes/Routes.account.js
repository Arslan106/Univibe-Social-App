import express from 'express';
import {
ValidateLogin,
ValidateProfileUpload,
ValidateAddDeviceToken
}   from '../../Controllers/Accounts/APIValidation.js'
import {
    ValidateSendNotification
}
from '../../Controllers/Notifications/APIValidation.js'
import NotificationControllerClass from  '../../Controllers/Notifications/APIController.js'

import AccountsController from '../../Controllers/Accounts/APIController.js'
import OurJWT from '../../utils/jwt/index.js'

const router = express.Router();
const Controller = new AccountsController()
const NotificationController = new NotificationControllerClass()
router.post('/login',ValidateLogin,Controller.LoginAccount);
router.post('/info',verifyAccount,Controller.getAccountInfo);

router.post('/add-profile-image', verifyAccount,ValidateProfileUpload, Controller.AddProfileImage);
router.post('/add-cover-image', verifyAccount,ValidateProfileUpload, Controller.AddCoverImage);
router.post('/add-device-token', verifyAccount,ValidateAddDeviceToken, Controller.AddDeviceTokenToAccount);
router.post('/send-notification', verifyAccount,ValidateSendNotification, NotificationController.SendNotification);
router.get('/notifications', verifyAccount, NotificationController.GetAllNotifications);
router.post('/add-card-and-activate', verifyAccount, Controller.AddCardAndActivate);
router.get('/cards', verifyAccount, Controller.GetAllCards);
router.post('/activate-account', verifyAccount, Controller.ActivateAccount);
router.get('/check-activation', verifyAccount, Controller.CheckActivation);


async function verifyAccount(req, res, next) {
    try {
        let token = req.headers['x-access-token']
        const JWT = new OurJWT()
        const verified = await JWT.ValidateJWT(token)
        if (verified) {
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

export default  router;