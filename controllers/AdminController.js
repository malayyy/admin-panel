const registermodel = require('../models/RegisterModel');
const nodemailer = require('nodemailer')
const fs = require('fs')


const login = (req, res) => {
    if (res.locals.finduser) {
        return res.redirect('/dash');
    }
    return res.render('sign-in.ejs');
}            
const dash = (req, res) => {
    return res.render('dash.ejs');
}
const register = (req, res) => {
    return res.render('sign-up.ejs')
}
const add = (req, res) => {
    return res.render('add.ejs');
}
const list = (req, res) => {
    return res.render('list.ejs')
}
const confirmmail = (req, res) => {
    return res.render('confirm-mail.ejs');
}
const lockscreen = (req, res) => {
    return res.render('lock-screen.ejs');
}
const google = (req, res) => {
    return res.render('google.ejs');
}
const outline = (req, res) => {
    return res.render('outline.ejs');
}
const error404 = (req, res) => {
    return res.render('error404.ejs');
}
const components = (req, res) => {
    return res.render('components.ejs');
}     


const registerData = async (req, res) => {
    try {
        const addUser = await registermodel.create(req.body)
        if (addUser) {
            res.redirect('/')
        }
        console.log(addUser);
    } catch (error) {
        console.log(error);
    }
}
  
const Login = async (req, res) => {
    try {
        res.redirect('/dash');
    } catch (error) {
        console.log(error);
    }
}

const logout =   async(req,res) =>{
    req.logout((error)=>{
        if(error){
            console.log(error);
            return false;
        }
        return res.redirect('/');
    })
}

const profile = (req,res) =>{
    console.log(res.locals.finduser);
    return res.render('profile.ejs');
} 

const recoverpw = async(req, res) => {
    await res.render('recoverpw.ejs');
 }
  
const otp = async(req,res)=>{
    if(req.cokkies.check_otp){
            return res.render('otp')
    }
}

const resetpw = async(req,res)=>{
    if(req.cokkies.check_otp){
        return res.render('resetpw')
    }
}

const forgotpw = async(req,res)=>{
    try {
        let email = req.body.email;
        const forgotdata = await registermodel.findOne({email})
        const id = forgotdata.id;
        if(!forgotdata){
            console.log('email not found');
            return false;
        }else{
            let otp = Math.floor(Math.random() * 90000 + 100000)
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    login,
    register,
    dash,
    add,
    list,
    confirmmail,
    lockscreen,
    recoverpw,
    google,
    outline,
    error404,
    components,
    registerData,
    Login,
    logout,
    profile,
    otp,
    resetpw,
    forgotpw
}