const fs = require('fs')
const crypto = require('crypto')

const key = crypto.randomBytes(16).toString('hex')
const algorithm = 'aes256'
const data = JSON.stringify({key, algorithm})

fs.writeFileSync('./key.json',data)
