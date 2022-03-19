var express = require('express');
const LoginHelpers = require('../Helpers/LoginHelpers');
var router = express.Router();

var loginHelpers = require('../Helpers/LoginHelpers')


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/signUp', (req, res) => {
  console.log("insidee")
  const userData = req.body;
  console.log(userData, "ysss");
  loginHelpers.UserSignUp(req.body).then((response) => {
    console.log(response, "response")
    if (res.status) {
      // req.session.user = 
      // req.session.user.Login = true

      let obj = {
        id: response.user._id.toString(),
        name: response.user.uname,
        email: response.user.email
      }
      res.json(obj)
    } else {
      res.json(response)
    }
  })

})

router.post('/login', (req, res) => {
  console.log("inside of login")
  LoginHelpers.UserLogin(req.body).then((resp) => {
    if (resp.status) {
      console.log(resp, "reponse tand statsu")
      res.json({ status: true, userdetails: resp.userDetail })
    } else {
      res.json({ status: false, message: 'Incorrect email or password' })
    }
  })
})

module.exports = router;
