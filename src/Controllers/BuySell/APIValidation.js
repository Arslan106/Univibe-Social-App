const Joi = require('joi');
import OurJWT from '../../utils/jwt'

const ValidateBuySellPost = (req, res, next) => {

    try {
      const Result = Joi.object({
        
        title: Joi.string().required(),
        price: Joi.number().required(),
        description: Joi.string(),
        category: Joi.string().required(),
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
  
      }).validate({
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        attachments: req.body.attachments
      })
  
      if (Result.error) {
        console.log('error in ValidateBuySellPost is: ', Result.error)
  
        res.status(422).json({ message: 'Validation Failed' })
  
      } else {
  
        next()
  
      }
    }
    catch (err) {
      console.log('Error in ValidateBuySellPost is: ', err)
      res.status(422).json({ message: 'Validation Failed' })
  
    }
  }
const ValidateGetBuySetByCategory = (req, res, next) => {

    try {
      const Result = Joi.object({
        
        category: Joi.string().required(),
       
  
      }).validate({
       
        category: req.params.category,
       
      })
  
      if (Result.error) {
        console.log('error in ValidateGetBuySetByCategory is: ', Result.error)
  
        res.status(422).json({ message: 'Validation Failed' })
  
      } else {
  
        next()
  
      }
    }
    catch (err) {
      console.log('Error in ValidateGetBuySetByCategory is: ', err)
      res.status(422).json({ message: 'Validation Failed' })
  
    }
  }
  const ValidateDeleteBuySellPost = (req, res, next) => {

    try {
      const Result = Joi.object({
        postId: Joi.string().required(),
        
      }).validate({
        postId: req.params.postId,
        
      })
  
      if (Result.error) {
        console.log('error in ValidateDeleteBuySellPost is: ', Result.error)
  
        res.status(422).json({ message: 'Validation Failed' })
  
      } else {
  
        next()
  
      }
    }
    catch (err) {
      console.log('Error in ValidateDeleteBuySellPost is: ', err)
      res.status(422).json({ message: 'Validation Failed' })
  
    }
  }

module.exports = {
    ValidateBuySellPost,
    ValidateGetBuySetByCategory,
    ValidateDeleteBuySellPost
}