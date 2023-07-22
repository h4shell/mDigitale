const express = require('express')
const router = express.Router()
const { deleteById } = require('../mymodule/sql')




router.post('/:user', (req, res) => {
    const id = req.body.rem
    const {user} = req.params
    if(req.session.user == user){
        
        console.log(id)
        deleteById(parseInt(id))
        console.log("eliminato")    
        res.status(200).redirect('/menu/' + user)

        
    } else {
        res.status(200).redirect('/login')
    }
    
});

module.exports = router