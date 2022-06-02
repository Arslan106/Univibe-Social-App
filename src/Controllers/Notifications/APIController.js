import NotificationService from './Service.js'
import AccountService from '../Accounts/Service.js'


// var admin = require("firebase-admin");
import admin from "firebase-admin"
import serviceAccount from "../../firebase-config.json"
// import * as M from '../../firebase-config.json';

// const serviceAccount = require('../../firebase-config.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://guide-to-firebase-40743.firebaseio.com/"
});

class NotificationController {
    async SendNotification(req, res) {
        const { notifier, title, detail, payload, navigateTo, type } = req.body
        try {
            let detailText = detail

            if (detailText.includes('\n')) {
                let temp = detailText.split("\n");
                detailText = temp[0].length > 25 ? `${temp[0].substr(0, 25)}...` : temp[0]
            }
            else
                detailText = detailText.length > 25 ? `${detailText.substr(0, 25)}...` : detailText

            let data = { notifier, title, detail: detailText, payload, navigateTo, type }
            const newNotification = await new NotificationService().CreateNotification(data)
            if (newNotification) {
                res.status(200).json({ status: true })

                const account = await new AccountService().GetAccountById(notifier)
                if (account && account.deviceToken) {
                    let _payload = {
                        notification: {
                            title: title,
                            body: detailText
                        },
                        data: { "payload": JSON.stringify(payload), "navigateTo": navigateTo, "type": type }

                    }
                    admin.messaging().sendToDevice(account.deviceToken, _payload)
                        .then((response) => {
                            console.log('Notification sent successfully with response', response);

                        })
                        .catch((error) => {
                            console.log('Notification failed with error : ', error);

                        });
                }
            }
            else {
                res.status(400).json({ message: 'Database system is down for maintenance. Please try later.' })
            }
        } catch (err) {
            console.log('Error in SendNotification is: ', err)
            res.status(500).json({ message: 'Error Processing Request' })
        }
    }

    async GetAllNotifications(req, res) {
        const { id } = req.body
        try {

            const notifications = await new NotificationService().AllNotifications(id)

            if (notifications) {
                res.status(200).json({ notifications })
            }
            else {
                res.status(400).json({ message: 'Database system is down for maintenance. Please try later.' })
            }
        } catch (err) {
            console.log('Error in GetAllNotifications is: ', err)
            res.status(500).json({ message: 'Error Processing Request' })
        }
    }

}

export default NotificationController
