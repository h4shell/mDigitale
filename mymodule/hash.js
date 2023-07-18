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

console.log(checkHash("lorenzo","c37d6c9f47b2f729d6abfda2cedb9d3b8a0f9f8c37a9f7f4f6785c9a7e246e25"))

module.exports = {checkHash, hashGen}