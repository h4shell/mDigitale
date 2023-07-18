const crypto = require('crypto');

function hashGen(string){
    const hash = crypto.createHash('sha256').update(string).digest('hex')
    return hash
}

function checkHash(string, hash){
    const hash1 = hashGen(string)
    if(hash == hash1){
        return true
    } else {
        return false
    }   
}


module.exports = {checkHash, hashGen}