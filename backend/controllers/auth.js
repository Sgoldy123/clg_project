import User from '../models/userModel.js'
import generateToken from '../middleware/generateToken.js'
import OTP from '../models/otp.js'
import rn from 'random-number'
import nodemailer from 'nodemailer'
import nodemailerSendgrid from 'nodemailer-sendgrid'

export const otpController = async (req, res) => {
  const api_key = process.env.SENDGRID_API
  const transport = nodemailer.createTransport(
    nodemailerSendgrid({
      apiKey: api_key,
    })
  )

  const { email } = req.body
  try {
    const user = await User.findOne({ email })
    if (user) {
      return res.status(401).json({ error: 'already exist' })
    }
    var options = {
      min: 100000,
      max: 999999,
      integer: true,
    }
    var otpNumber = rn(options)
    console.log('sending OTP: ' + otpNumber + ' to ' + req.body.email)

    transport
      .sendMail({
        from: 'ssoumyaprakash05@gmail.com',
        to: `<${req.body.email}>`,
        subject: 'OTP from college-project for registration ',
        html: `<h1>${otpNumber}</h1>`,
      })
      .then(() => console.log('email sent'))
      .catch((err) => console.log('email not sent'))

    const otp = new OTP({ otp: otpNumber })
    await otp.save()
    res.json({ otp })
  } catch (err) {
    return res.json({ error: err })
  }
}

export const signup = async (req, res) => {
  try {
    const { name, email, password, otp, branch, admission } = req.body
    // console.log(name,email);
    var user = await User.findOne({ email })
    if (user) {
      return res.status(401).json({ error: 'already exist' })
    }
    var otpExist = await OTP.findOne({ otp })
    if (!otpExist) {
      return res.status(401).json({ error: 'incorrect otp' })
    }

    user = new User({ name, email, password, branch, admission })

    const newUser = await user.save()
    user.password = undefined
    res.json({ user: newUser, token: generateToken(newUser._id) })
  } catch (err) {
    return res.json({ error: err })
  }
}

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    // console.log(user);

    if (user && (await user.matchPassword(password))) {
      user.password = undefined
      res.json({
        user,
        token: generateToken(user._id),
      })
    } else {
      res.status(422).json({ error: 'invalid email or password' })
    }
  } catch (err) {
    res.status(422).json({ error: err })
  }
}

export const forgotOtp = async (req, res) => {
  const api_key = process.env.SENDGRID_API
  const transport = nodemailer.createTransport(
    nodemailerSendgrid({
      apiKey: api_key,
    })
  )

  try {
    const { email } = req.body
    const user = await User.findOne({ email })
    if (user) {
      var options = {
        min: 100000,
        max: 999999,
        integer: true,
      }
      var otpNumber = rn(options)
      console.log('sending OTP: ' + otpNumber + ' to ' + req.body.email)

      transport
        .sendMail({
          from: 'ssoumyaprakash05@gmail.com',
          to: `<${req.body.email}>`,
          subject: 'OTP from college-project for registration ',
          html: `<h1>${otpNumber}</h1>`,
        })
        .then(() => console.log('email sent'))
        .catch((err) => console.log(err))

      const otp = new OTP({ otp: otpNumber })
      await otp.save()
      res.json({ otp })
    } else {
      res.status(422).json({ error: 'email not exist' })
    }
  } catch (err) {
    res.status(422).json({ error: err })
  }
}

export const forgotPassword = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    const otp = await OTP.findOne({ otp: req.body.otp })

    if (!user || !otp) {
      return res.status(402).json({ error: 'incorrect OTP' })
    }

    user.password = password
    await user.save()
    user.password = undefined
    res.json({
      user,
      token: generateToken(user._id),
    })
  } catch (err) {
    res.status(422).json({ error: err })
  }
}

export const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.branch = req.body.branch || user.branch
    user.admission = req.body.admission || user.admission
    if (req.body.password) {
      user.password = req.body.password
    }
    await user.save()
    user.password = undefined
    res.json({
      user,
      token: generateToken(user._id),
    })
  } else {
    return res.status(422).json({ error: 'user not found for edit profile ' })
  }
}
