const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require("express-validator");



/* ------------ ROUTE 1: Get All the Notes using: GET "/api/auth/getuser" Login required ------------ */
router.get('/fetchallnotes', fetchuser, async (req, res) => {
   try {
      const notes = await Notes.find({ user: req.user.id });
      res.json(notes);
   } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error!");
   }
});

/* ------------ ROUTE 2: Add New Note using: POST "/api/auth/addnote" Login required ------------ */
router.post('/addnote', fetchuser, [
   body("title", "Enter a valid title").isLength({ min: 3 }),
   body("description", "Enter a valid description.").isLength({ min: 5 }),
], async (req, res) => {

   try {
      /* ------------------------------ Bad Request : Return errors ----------------------------- */
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }

      const { title, description, tag } = req.body;

      const note = new Notes({
         title, description, tag, user: req.user.id
      });

      const saveNote = await note.save();
      res.json(saveNote);
   } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error!");
   }
});

module.exports = router;



