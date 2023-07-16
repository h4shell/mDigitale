const express = require('express')
const router = express.Router()
const { getUserByUsername } = require('../mymodule/sql')





router.get('/:user', (req, res) => {
    const {user} = req.params

    getUserByUsername(user).then((ris) => {
        if(ris != false){
            const data = {}
            data.encData = btoa(JSON.stringify(ris))
            res.status(200).render('menuPage', data)
        } else {
            res.status(400).json({user: 'not found'})
        }      
    }) 
})

module.exports = router

