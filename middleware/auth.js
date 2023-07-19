const {checkUserPass} = require('../mymodule/sql')

function auth(req, res, next) {
    
    if(req.session.user != undefined){
        const username = req.session.user
        const password = req.session.token
        checkUserPass(username, password).then((ris) => {
            if(ris == true){
                req.session.auth = true
                next()
            } else {
                req.session.auth = false
                next()
            }
        })
    } else {
        const username = req.body.username
        const password = req.body.password
        checkUserPass(username, password).then((ris) => {
            if(ris == true){
                req.session.auth = true
                req.session.username = username
                req.session.password = password
                next()
            } else {
                req.session.auth = false
                next()
            }
        })
        req.session.auth = false
        next()
    }

}
  
  module.exports = auth