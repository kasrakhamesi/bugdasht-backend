const { Passport } = require('passport')
const passportJwt = require('passport-jwt')
const { sequelize } = require('../models')
const adminsPassport = new Passport()
const huntersPassport = new Passport()
const organizationPassport = new Passport()
const ExtractJwt = passportJwt.ExtractJwt
const StrategyJwt = passportJwt.Strategy
const _ = require('lodash')
const adminAccess = 'qqqqq'
const hunterAccess = 'rrrr'
const organizationAccess = 'oooo'
/*
const jwtExtractor = (req) => {
  let token = null
  if (req && req.headers) {
    let tokenParts = req.headers.authorization.split(' ')

    if (/^Bearer$/i.test(tokenParts[0])) {
      token = tokenParts[1]
    }
  }
  return token
  return sequelize.models.jwts
    .findOne({
      where: {
        accessToken: token
      }
    })
    .then((jwt) => {
      if (jwt) return token
      else return null
    })
    .catch(() => {
      return null
    })
}
*/

adminsPassport.use(
  new StrategyJwt(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: adminAccess
    },
    (jwtPayLoad, done) => {
      return sequelize.models.admins
        .findAll({
          where: {
            id: jwtPayLoad.id
          },
          attributes: {
            exclude: ['password']
          }
        })
        .then((r) => {
          if (_.isEmpty(r)) return done({ statusCode: 401 })

          return done(null, r)
        })
        .catch((err) => {
          return done(err)
        })
    }
  )
)

huntersPassport.use(
  new StrategyJwt(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: hunterAccess
    },
    (jwtPayLoad, done) => {
      return sequelize.models.hunters
        .findAll({
          where: {
            id: jwtPayLoad.id
          },
          attributes: {
            exclude: ['password']
          }
        })
        .then((r) => {
          if (_.isEmpty(r)) return done({ statusCode: 401 })

          return done(null, r)
        })
        .catch(() => {
          return done({ statusCode: 401 })
        })
    }
  )
)

organizationsPassport.use(
  new StrategyJwt(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: organizationAccess
    },
    (jwtPayLoad, done) => {
      return sequelize.models.organizations
        .findAll({
          where: {
            id: jwtPayLoad.id
          },
          attributes: {
            exclude: ['password']
          }
        })
        .then((r) => {
          if (_.isEmpty(r)) return done({ statusCode: 401 })

          return done(null, r)
        })
        .catch(() => {
          return done({ statusCode: 401 })
        })
    }
  )
)

module.exports = { adminsPassport, huntersPassport, organizationPassport }
