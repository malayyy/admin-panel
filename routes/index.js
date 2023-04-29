const express = require('express');

const routes = express.Router();

const admincontroller = require('../controllers/AdminController');
const passport = require('passport'); 

routes.get('/',admincontroller.login);
routes.get('/dash', passport.checkAuthentication, admincontroller.dash)
routes.get('/register',admincontroller.register);
routes.get('/profile',passport.checkAuthentication, admincontroller.profile);
routes.get('/add',admincontroller.add);
routes.get('/list',admincontroller.list);
routes.get('/confirmmail',admincontroller.confirmmail);
routes.get('/lockscreen',admincontroller.lockscreen);
routes.get('/google',admincontroller.google);
routes.get('/outline',admincontroller.outline);
routes.get('/error404',admincontroller.error404);
routes.get('/components',admincontroller.components);

//*********login Routes*************** */
routes.post('/registerData',admincontroller.registerData);
routes.post('/Login', passport.authenticate('local', { failureRedirect: '/' }), admincontroller.Login);
routes.get('/logout',admincontroller.logout)

///**********Recover Password*************** */
routes.get('/recoverpw',admincontroller.recoverpw);
routes.get('/otp',admincontroller.otp);
routes.get('/resetpw',admincontroller.resetpw);


module.exports = routes;

