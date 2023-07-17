const express = require('express')
const router = express.Router()

router.post('/', (req, res) => {
    req.session.destroy(function(err) {
      if(err) {
        console.log(err);
      } else {
        res.redirect('/login');
      }
    });
  });

  module.exports = router