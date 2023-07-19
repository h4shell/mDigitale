const express = require('express')
const router = express.Router()
const { insertUser } = require('../mymodule/sql')
const { hashGen } = require('../mymodule/hash');
const auth = require('../middleware/auth')


const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  },
});

//Permetto solo file di 1MB che rispettino lo standard immagine jpeg png o gif

const upload = multer({storage: storage, limits: {
  fileSize: 3024 * 3024, // limite di 1 MB
},
fileFilter: function(req, file, cb) {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'));
  }
},
});

router.get('/', auth, (req, res) => {
    if(req.session.auth == true){
      res.redirect('/login')
    } else {
      res.status(200).render('registerPage')
    }
})

router.post('/', upload.single('logo'), (req, res) => {

    const {name_restaurant, email, tel, addr, hours, open, phrase} = req.body

    console.log(req.body)
    const data = {}
    const { username} = req.body
    const password = hashGen(req.body.password)

    data.name_restaurant = name_restaurant
    data.email = email
    data.tel = tel
    data.addr = addr
    data.hours = hours
    data.open = open
    data.phrase = phrase
    data.logo = req.file.filename

    insertUser(username, password, data).then(
        res.status(200).redirect('/login'))
})

module.exports = router