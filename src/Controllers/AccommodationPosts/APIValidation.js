const Joi = require('joi');
import OurJWT from '../../utils/jwt'

const ValidateAccomodationAd = (req, res, next) => {

    try {
      const Result = Joi.object({
        postedBy: Joi.string().required(),
        rentalType: Joi.string().required(),
        monthlyPrice: Joi.number().required(),
        includedBills:Joi.boolean().required(),
        contractLength:Joi.string().required(),
        includedParking:Joi.boolean().required(),
        description:Joi.string(),
        address:Joi.object({
          value:Joi.string().required(),
          latitude:Joi.number,
          longitude:Joi.number
        }).required(),
        attachments: Joi.array()
            .items(
              Joi.object({
                File: Joi.object({
                  lastModified: Joi.number().required(),
                  name: Joi.string().required(),
                  size: Joi.number().required(),
                  type: Joi.string().required()
                }).required(),
                sourceUrl: Joi.string().required(),
                attachmentType: Joi.string().required()
              })
            ).required(),
            target:Joi.object({
              universities:Joi.array().items(Joi.string()).required(),
              studentType:Joi.array().items(Joi.string()).required(),
              sex:Joi.array().items(Joi.string()).required(),
              internationalStudent:Joi.boolean().required()

          }).required()
  
      }).validate({
        postedBy: req.body.postedBy,
        rentalType: req.body.rentalType,
        monthlyPrice: req.body.monthlyPrice,
        includedBills: req.body.includedBills,
        contractLength:req.body.contractLength,
        includedParking:req.body.includedParking,
        description:req.body.description,
        address:req.body.address,
        attachments: req.body.attachments,
        target:req.body.target
      })
  
      if (Result.error) {
        console.log('error in ValidateAccomodationAd is: ', Result.error)
  
        res.status(422).json({ message: 'Validation Failed' })
  
      } else {
  
        next()
  
      }
    }
    catch (err) {
      console.log('Error in ValidateAccomodationAd is: ', err)
      res.status(422).json({ message: 'Validation Failed' })
  
    }
  }

  const ValidateDeleteAccommodationPost = (req, res, next) => {

    try {
      const Result = Joi.object({
        postId: Joi.string().required(),
        
      }).validate({
        postId: req.params.postId,
        
      })
  
      if (Result.error) {
        console.log('error in ValidateDeleteAccommodationPost is: ', Result.error)
  
        res.status(422).json({ message: 'Validation Failed' })
  
      } else {
  
        next()
  
      }
    }
    catch (err) {
      console.log('Error in ValidateDeleteAccommodationPost is: ', err)
      res.status(422).json({ message: 'Validation Failed' })
  
    }
  }


module.exports = {
    ValidateAccomodationAd,
    ValidateDeleteAccommodationPost
}