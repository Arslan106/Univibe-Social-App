const Joi = require('joi');


const ValidateRegistration = (req, res, next) => {

  try {
    const Result = Joi.object({
      society: Joi.string().required(),
      university: Joi.string().required(),
      detail: Joi.string().required().allow(""),
      cover: Joi.string().required(),
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(10).required(),

    }).validate({
      society: req.body.society,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      university: req.body.university,
      detail: req.body.detail,
      cover: req.body.cover,
    })

    if (Result.error) {
      console.log('error in ValidateRegistration is: ', Result.error)

      res.status(422).json({ message: 'Validation Failed' })

    } else {

      next()

    }
  }
  catch (err) {
    console.log('Error in ValidateRegistration is: ', err)
    res.status(422).json({ message: 'Validation Failed' })

  }
}

const ValidateProfileUpload = (req, res, next) => {

  try {
    const Result = Joi.object({
      url: Joi.string().required(),
      

    }).validate({
      url: req.body.url,
      

    })

    if (Result.error) {
      console.log('error in ValidateProfileUpload is: ', Result.error)
      res.status(422).json({ message: 'Validation Failed' })

    } else {

      next()

    }
  }
  catch (err) {
    console.log('Error in ValidateBusinessRegistration is: ', err)
    res.status(422).json({ message: 'Validation Failed' })

  }
}


const ValidateBusinessRegistration = (req, res, next) => {

  try {
    const Result = Joi.object({
      contactNumber: Joi.string().required(),
      profile: Joi.string().required(),
      name: Joi.string().required(),
      purposeOfAdvirtisement: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(10).required(),

    }).validate({
      contactNumber: req.body.contactNumber,
      purposeOfAdvirtisement: req.body.purposeOfAdvirtisement,
      name: req.body.name,
      email: req.body.email,
      profile: req.body.profile,
      password: req.body.password,

    })

    if (Result.error) {
      console.log('error in ValidateBusinessRegistration is: ', Result.error)
      res.status(422).json({ message: 'Validation Failed' })

    } else {

      next()

    }
  }
  catch (err) {
    console.log('Error in ValidateBusinessRegistration is: ', err)
    res.status(422).json({ message: 'Validation Failed' })

  }
}

const ValidateAddDeviceToken = (req, res, next) => {

  try {
    const Result = Joi.object({
      deviceToken: Joi.string().required(),
      

    }).validate({
      deviceToken: req.body.deviceToken,
    })

    if (Result.error) {
      console.log('error in ValidateAddDeviceToken is: ', Result.error)
      res.status(422).json({ message: 'Validation Failed' })

    } else {

      next()

    }
  }
  catch (err) {
    console.log('Error in ValidateAddDeviceToken is: ', err)
    res.status(422).json({ message: 'Validation Failed' })

  }
}


const ValidateLogin = (req, res, next) => {

  try {
    const Result = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(10).required(),

    }).validate({
      email: req.body.email,
      password: req.body.password
    })

    if (Result.error) {
      console.log('error in ValidateLogin is: ', Result.error)

      res.status(422).json({ message: 'Validation Failed' })

    } else {

      next()

    }
  }
  catch (err) {
    console.log('Error in ValidateLogin is: ', err)
    res.status(422).json({ message: 'Validation Failed' })

  }
}



const ValidateStudentRegistration = (req, res, next) => {

  const {firstName,lastName,email,password,gender,studentNumber,studentType,university,course,academicYear,cover,graduationYear} = req.body
  try {
    const Result = Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(10).required(),
      gender: Joi.string().required(),
      studentType: Joi.string().required(),
      university: Joi.string().required(),
      studentNumber: Joi.string().required(),
      course: Joi.string().required(),
      academicYear: Joi.string().required(),
      cover:Joi.string().required(),
      graduationYear:Joi.string().required()
    }).validate({
      firstName,lastName,email,password,gender,studentNumber,studentType,university,course,academicYear,cover,graduationYear
    })

    if (Result.error) {
      console.log('error in ValidateStudentRegistration is: ', Result.error)
      res.status(422).json({ message: 'Validation Failed' })
    } else {

      next()

    }
  }
  catch (err) {
    console.log('Error in ValidateStudentRegistration is: ', err)
    res.status(422).json({ message: 'Validation Failed' })

  }
}


const FollowValidation = (req, res, next) => {

  try {
    const Result = Joi.object({
      accountId: Joi.string().required(),
     
    }).validate({
      accountId: req.body.accountId,
     
    })

    if (Result.error) {
      console.log('error in FollowValidation is: ', Result.error)
      res.status(422).json({ message: 'Validation Failed' })
    } else {

      next()

    }
  }
  catch (err) {
    console.log('Error in FollowValidation is: ', err)
    res.status(422).json({ message: 'Validation Failed' })

  }
}

module.exports = {
  ValidateRegistration,
  ValidateBusinessRegistration,
  ValidateLogin,
  ValidateStudentRegistration,
  ValidateProfileUpload,
  FollowValidation,
  ValidateAddDeviceToken
  
}