const jsonwebtoken = require('jsonwebtoken')
const adminAccess = 'qqqqq'
const hunterAccess = 'rrrr'

const generateAdminJwt = (id, phoneNumber) => {
  return jsonwebtoken.sign(
    {
      id,
      phoneNumber,
      isAdmin: true
    },
    adminAccess,
    { expiresIn: '3600000s' }
  )
}

const generateUserJwt = (id, phoneNumber) => {
  return jsonwebtoken.sign(
    {
      id,
      phoneNumber,
      isAdmin: false
    },
    hunterAccess,
    { expiresIn: '3600000s' }
  )
}

const decodeJwt = (encodedString, isAdmin = true) => {
  return jsonwebtoken.decode(
    encodedString,
    isAdmin ? adminAccess : hunterAccess
  )
}

module.exports = { generateUserJwt, generateAdminJwt, decodeJwt }
