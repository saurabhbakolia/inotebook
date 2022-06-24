const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

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
      user = await User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
      });

      res.send(user);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some error occurred! Please try again");
    }
  }
);

module.exports = router;
