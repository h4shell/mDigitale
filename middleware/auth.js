const {checkUserPass} = require('../mymodule/sql')

function auth(req, res, next) {
    
    if(req.session.user != undefined){
        const username = req.session.user
        const password = req.session.token
        checkUserPass(username, password).then((ris) => {
            if(ris == true){
                next()
            } else {
                res.redirect('/login')
            }
        })
    } else {
        res.render('loginPage')
    }

}
  
  module.exports = auth