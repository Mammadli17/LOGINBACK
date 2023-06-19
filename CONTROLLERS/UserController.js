const { User } = require("../MODELS/User");
const { confirmCodeEmail } = require("../UTILS/emailService");
var jwt = require('jsonwebtoken');

let privateKey = "lambofgod";
const userController = {
  register: (req, res) => {
    User.findOne({ email: req.body.email })
      .then(data => {
        if (!data) {
          var randomCode = Math.floor(Math.random() * 10000);
          confirmCodeEmail(req.body.email, randomCode);
          var user = new User({
            email: req.body.email,
            password: req.body.password,
            code: randomCode
          });
          user.save()
          res.json({ "msg": "OK!" });
        } else {
          res.json({ "msg": "Bu email sisteme kayıtlı!" });
        }
      });
  },
  confirmCode: (req, res) => {
    User.findOne({ email: req.body.email, code: req.body.code })
      .then(data => {
        if (data) {
                    let token = jwt.sign(req.body.email,privateKey);
                    console.log('TOKEN', token);
                    res.json({token: token })
        } else {
          res.status(404).json({ "msg": "Confirm Code error" });
        }
      })
      .catch(err => {
        res.status(500).send("Mongo error!");
      });
  },
  login: (req, res) => {
    User.findOne({ email: req.body.email, password: req.body.password })
      .then(data => {
        if (data) {
          var randomCode = Math.floor(Math.random() * 10000);
          data.code = randomCode;
          data.save();
          confirmCodeEmail(req.body.email, randomCode);
          res.json({ email: req.body.email });
        } else {
          res.status(404).json({ "msg": "Email or password error" });
        }
      });
  },
  forgotPassword: (req, res) => {
    User.findOne({ email: req.body.email })
      .then(data => {
        if (data) {
          var randomCode = Math.floor(Math.random() * 10000);
          data.code = randomCode;
          data.save();
          confirmCodeEmail(req.body.email, randomCode);
          res.json({ email: req.body.email });
        } else {
          res.status(404).json({ "msg": "Email error" });
        }
      });
  },
  newPassword: (req, res) => {
    User.findOne({ email: req.body.email })
      .then(data => {
        if (data) {
          data.password = req.body.password;
          data.save();
          res.json({ email: req.body.email });
        } else {
          res.status(404).json({ "msg": "Not found!" });
        }
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }
};

module.exports = {
  userController
};
