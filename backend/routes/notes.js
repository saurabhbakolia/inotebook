const express = require('express');
const router = express.Router();

router.get('/login', (req, res)=>{
   res.json([{}]);
});

module.exports = router;



