import Joi from "joi"

export const ValidateSendNotification = (req, res, next) => {

    try {
        const Result = Joi.object({
            notifier:Joi.string().required(),
            title:Joi.string().required(),
            detail:Joi.string().required(),
            payload:Joi.object().required(),
            navigateTo:Joi.string().required(),
            type:Joi.string().required(),

        }).validate({
            notifier:req.body.notifier,
            title:req.body.title,
            detail: req.body.detail,
            payload: req.body.payload,
            navigateTo: req.body.navigateTo,
            type: req.body.type,
        })

        if (Result.error) {
            console.log('error in ValidateSendNotification is: ', Result.error)

            res.status(422).json({ message: 'Validation Failed' })

        } else {

            next()

        }
    }
    catch (err) {
        console.log('Error in ValidateSendNotification is: ', err)
        res.status(422).json({ message: 'Validation Failed' })

    }
}
