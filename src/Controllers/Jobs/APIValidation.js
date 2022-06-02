const Joi = require('joi');

const ValidateJobPost = (req, res, next) => {

    try {
        const Result = Joi.object({
            title:Joi.string().required(),
            jobType:Joi.string().required(),
            jobAddress:Joi.string().required(),
            jobDescription:Joi.string().required(),
            jobEmail:Joi.string().required(),
            // attachment:Joi.object({
            //         File: Joi.object({
            //             lastModified: Joi.number().required(),
            //             name: Joi.string().required(),
            //             size: Joi.number().required(),
            //             type: Joi.string().required()
            //         }).required(),
            //         sourceUrl: Joi.string().required(),
            //         attachmentType: Joi.string().required()
            //     }).required().allow(null),
            target: Joi.object({
                universities: Joi.array().items(Joi.string()).required(),
                studentType: Joi.array().items(Joi.string()).required(),
                course: Joi.array().items(Joi.string()).required(),
                graduationYear: Joi.string().required(),

            }).allow(null)

        }).validate({
            title:req.body.title,
            jobDescription:req.body.jobDescription,
            jobAddress:req.body.jobAddress,
            jobEmail:req.body.jobEmail,
            jobType:req.body.jobType,
            target: req.body.target,
            // attachment: req.body.attachment
        })

        if (Result.error) {
            console.log('error in ValidateJobPost is: ', Result.error)

            res.status(422).json({ message: 'Validation Failed' })

        } else {

            next()

        }



    }
    catch (err) {
        console.log('Error in ValidateDealPost is: ', err)
        res.status(422).json({ message: 'Validation Failed' })

    }
}

const ValidateDeleteJobPost = (req, res, next) => {

    try {
      const Result = Joi.object({
        postId: Joi.string().required(),
        
      }).validate({
        postId: req.params.postId,
        
      })
  
      if (Result.error) {
        console.log('error in ValidateDeleteJobPost is: ', Result.error)
  
        res.status(422).json({ message: 'Validation Failed' })
  
      } else {
  
        next()
  
      }
    }
    catch (err) {
      console.log('Error in ValidateDeleteJobPost is: ', err)
      res.status(422).json({ message: 'Validation Failed' })
  
    }
  }



module.exports = {
    ValidateJobPost,
    ValidateDeleteJobPost

}