const jsonwebtoken = require('jsonwebtoken')
const adminAccess = 'qqqqq'
const hunterAccess = 'rrrr'
const organizationAccess = 'oooo'

const generateAdminJwt = (id, phoneNumber) => {
  return jsonwebtoken.sign(
    {
      id,
      phoneNumber,
      type: 'admin'
    },
    adminAccess,
    { expiresIn: '3600000s' }
  )
}

const generateHunterJwt = (id, phoneNumber) => {
  return jsonwebtoken.sign(
    {
      id,
      phoneNumber,
      type: 'hunter'
    },
    hunterAccess,
    { expiresIn: '3600000s' }
  )
}

const generateOrganizationJwt = (id, phoneNumber) => {
  return jsonwebtoken.sign(
    {
      id,
      phoneNumber,
      type: 'organization'
    },
    organizationAccess,
    { expiresIn: '3600000s' }
  )
}

const decodeJwt = (encodedString, type) => {
  return jsonwebtoken.decode(
    encodedString,
    type === 'admin'
      ? adminAccess
      : type === 'hunter'
      ? hunterAccess
      : organizationAccess
  )
}

module.exports = {
  generateHunterJwt,
  generateAdminJwt,
  decodeJwt,
  generateOrganizationJwt
}
