const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const JWT_SECRET = 'johnsoldi07';

/* -------------- Create a User using: POST "/api/auth/createuser". No login required ----------------- */

router.post(  
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a unique email").isEmail(),
    body("password", "Password must be at least 5 characters long").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {

    /* ------------------------------ Bad Request : Return errors ----------------------------- */
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    /* ------------ Check whether the user exists with this email id ------------ */
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with same email id already exists." });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt) ;

      /* ----------------------------- Create new user ---------------------------- */
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      /* -------------------------- Authentication Token -------------------------- */
      const data = {
        user:{
          id:user.id
        }
      }
      const jwData = jwt.sign(data, JWT_SECRET);
      console.log(jwData);
      // res.send(user);
      res.send({jwData});


    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some error occurred! Please try again");
    }
  }
);

module.exports = router;
