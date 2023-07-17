const crypto = require('crypto');

function hashGen(string){
    const hash = crypto.createHash('sha256').update(string).digest('hex')
    return hash
}

function checkHash(string, hash){
    const hash1 = crypto.createHash('sha256').update(string).digest('hex')
    if(hash == hash1){
        return true
    } else {
        return false
    }   
}

module.exports = {checkHash, hashGen}

console.log(hashGen("tintoria1"))

//YWZkMGUyNmNhMzdkZDM2NGVmMDMwODViZjgxNDdmYzExMWUzM2M2YWI0OGI0ZjgzMWY1NzI4Yjg2ZjllYjE2OA==