import Joi from "joi"
// import OurJWT from '../../utils/jwt'

export const ValidateDealPost = (req, res, next) => {

    try {
        if(req.body.advertType){
            if(req.body.advertType==='DEALS'){
                const Result = Joi.object({
                dealTitle: Joi.string().required(),
                    description: Joi.string().allow('').required(),
                    dealPrice: Joi.number().required(),
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
                            graduationYear:Joi.string().required()

                        }).required()
              
                  }).validate({
                    dealTitle: req.body.dealTitle,
                    description: req.body.description,
                    dealPrice: req.body.dealPrice,
                    attachments: req.body.attachments,
                    target: req.body.target
                  })
              
                  if (Result.error) {
                    console.log('error in ValidateDealPost is: ', Result.error)
              
                    res.status(422).json({ message: 'Validation Failed' })
              
                  } else {
              
                    next()
              
                  }  
            }
            else if(req.body.advertType==='DISCOUNT'){
                const Result = Joi.object({
        
                    discountTitle: Joi.string().required(),
                    description: Joi.string().allow('').required(),
                    previousPrice: Joi.number().required(),
                    newPrice: Joi.number().required(),
                    discountCode:Joi.string().allow(''),
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
                            graduationYear:Joi.string().required()

                        }).required()
              
                  }).validate({
                    discountTitle: req.body.discountTitle,
                    description: req.body.description,
                    previousPrice: req.body.previousPrice,
                    newPrice: req.body.newPrice,
                    discountCode: req.body.discountCode,
                    attachments: req.body.attachments,
                    target: req.body.target

                  })
              
                  if (Result.error) {
                    console.log('error in ValidateDealPost is: ', Result.error)
              
                    res.status(422).json({ message: 'Validation Failed' })
              
                  } else {
              
                    next()
              
                  }  
            }
            else if(req.body.advertType==='FREEBIES'){
                const Result = Joi.object({
        
                  
                    description: Joi.string().allow('').required(),
                  
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
                            graduationYear:Joi.number().required()

                        }).required()
              
                  }).validate({
                   
                    description: req.body.description,
                    target: req.body.target,
                    attachments: req.body.attachments
                  })
              
                  if (Result.error) {
                    console.log('error in ValidateDealPost is: ', Result.error)
              
                    res.status(422).json({ message: 'Validation Failed' })
              
                  } else {
              
                    next()
              
                  }  
            }
            else{
        res.status(422).json({ message: 'Invalid advert type' })

            }
        }
        else{
          console.log('advert type is invalid')
        res.status(422).json({ message: 'Validation Failed' })
        }
      
    }
    catch (err) {
      console.log('Error in ValidateDealPost is: ', err)
      res.status(422).json({ message: 'Validation Failed' })
  
    }
  }

 export  const ValidateDeleteDealsPost = (req, res, next) => {

    try {
      const Result = Joi.object({
        postId: Joi.string().required(),
        
      }).validate({
        postId: req.params.postId,
        
      })
  
      if (Result.error) {
        console.log('error in ValidateDeleteDealsPost is: ', Result.error)
  
        res.status(422).json({ message: 'Validation Failed' })
  
      } else {
  
        next()
  
      }
    }
    catch (err) {
      console.log('Error in ValidateDeleteDealsPost is: ', err)
      res.status(422).json({ message: 'Validation Failed' })
  
    }
  }

  export const ValidateGetDealsForStudent = (req, res, next) => {

    try {
      const Result = Joi.object({
        advertType: Joi.string().valid('deals','discount','freebies').required(),
        
      }).validate({
        advertType: req.params.advertType,
        
      })
  
      if (Result.error) {
        console.log('error in ValidateDeleteDealsPost is: ', Result.error)
  
        res.status(422).json({ message: 'Validation Failed' })
  
      } else {
        req.body.advertType = req.params.advertType.toUpperCase()
        next()
  
      }
    }
    catch (err) {
      console.log('Error in ValidateDeleteDealsPost is: ', err)
      res.status(422).json({ message: 'Validation Failed' })
  
    }
  }
