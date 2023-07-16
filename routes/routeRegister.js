const express = require('express')
const router = express.Router()
const { insertUser } = require('../mymodule/sql')
const { hashGen } = require('../mymodule/hash');

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({storage: storage});

router.get('/', (req, res) => {
    res.status(200).render('registerPage')
})

router.post('/', upload.single('image'), (req, res) => {

    const campi = "name_restaurant, email, tel, addr, hours, open, phrase"

    console.log(req.body)
    const data = {}
    const { username} = req.body

    const password = hashGen(req.body.password)
    data.prova = "ciao"

    insertUser(username, password, data).then(
        res.status(200).send("UTENTE CREATO"
        ))
    

    

})

module.exports = router