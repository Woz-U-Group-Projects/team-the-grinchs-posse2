var express = require("express");
var router = express.Router();

var models = require("../models"); //<--- Add models
var authService = require("../services/auth"); //<--- Add authentication service

router.get("/profile", function(req, res, next) {
  let token = req.cookies.jwt;
  // if we have a cookie we can proceed
  if (token) {
    // validate the cookie
    authService.verifyUser(token).then(user => {
      if (user) {
        // empty the password field, do not send this property to the front-end
        user.password = "";
        // return the user object
        res.send(JSON.stringify(user));
      } else {
        res.status(401);
        res.json("Invalid authentication token");
      }
    });
  } else {
    // no jwt cookie, assume user is not logged in
    res.status(401);
    res.json("Must be logged in");
  }
});

router.post("/signup", function(req, res, next) {
  const hashedPassword = authService.hashPassword(req.body.password);
  models.users
    .findOne({
      where: {
        username: req.body.userName
      }
    })
    .then(user => {
      if (user) {
        res.send("this user already exists");
      } else {
        models.users
          .create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            userName: req.body.userName,
            password: hashedPassword
          })
          .then(createdUser => {
            const userId = createdUser.userId;
            console.log(userId);
            const token = authService.signUser(createdUser);
            res.cookie("jwt", token);
            //res.redirect("profile/" + userId);
            res.json("registered");
          });
      }
    });
});

router.post("/login", function(req, res, next) {
  models.users
    .findOne({
      where: {
        userName: req.body.userName
      }
    })
    .then(user => {
      if (!user) {
        console.log("User not found");
        return res.status(401).json("Login Failed");
      } else {
        // check to see if the passwords match
        let passwordMatch = authService.comparePasswords(
          req.body.password,
          user.password
        );
        if (passwordMatch) {
          // passwords match, create a jwt token as a cookie and attach to the response
          let token = authService.signUser(user);
          res.cookie("jwt", token);
          res.json("Login successful");
        } else {
          // wrong password, negative response
          console.log("Wrong password");
          res.json("Wrong password");
        }
      }
    });
});

router.get("/logout", function(req, res) {
  res.cookie("jwt", null);
  res.json("logged out");
});

// validate a token
router.get("/validateToken", function(req, res, next) {
  // check to see if there is a token
  let token = req.cookies.jwt;
  if (token) {
    // validate the user from the token (same as finding profile)
    authService.verifyUser(token).then(user => {
      if (user) {
        // token valid, return true
        res.json(true);
      } else {
        // token invalid, return false
        res.json(false);
      }
    });
  } else {
    // no token, return false
    res.json(false);
  }
});

module.exports = router;
