import Joi from 'joi'
// import OurJWT from '../../utils/jwt/index.js'

const ValidateCreatePost  = (req,res,next)=>{

    try{
        const Result = Joi.object({
            detail: Joi.string().required(),
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
            detail: req.body.detail,
            attachments: req.body.attachments
          })
      
          if (Result.error) {
          console.log('error in ValidateCreatePost is: ',Result.error)
             res.status(422).json({message:'Validation Failed'})

          } else {
              next()
              
          }
    }
    catch(err){
        console.log('Error in ValidateCreatePost is: ',err)
         res.status(422).json({message:'Validation Failed'})

    }
}


export default  
    ValidateCreatePost
