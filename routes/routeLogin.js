const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const { checkUserPass, getUserByUsername, insertItem } = require('../mymodule/sql')
const { hashGen } = require('../mymodule/hash')

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  },
});
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


    console.log(req.session.auth)
    if(req.session.auth == false){
      res.status(200).render('loginPage')
    } else {
      getUserByUsername(req.session.user).then((user) => {
        const data = {}
        data.dataEnc = btoa(JSON.stringify(user))
        res.status(200).render("dashboardPage", data)
      })


    }

    

    
})

router.post('/', (req, res) => {

    const username = req.body.username
    const password = hashGen(req.body.password)

    checkUserPass(username, password).then((ris) => {
        if(ris == true){
            
            req.session.user = username
            req.session.token = password

            

            res.redirect('/login')
        } else {
            res.status(200).redirect('/login')
            
        }
    })
})

router.post('/:username',upload.single('image') , (req, res) =>
{
    const {username} = req.params


    
    const data = req.body;
    if(data.type == ''){
      data.type = data.other
    }
    console.log(data)
    data.image = req.file.filename;
    insertItem(username, data)

    

    res.redirect('/login')
})

module.exports = router