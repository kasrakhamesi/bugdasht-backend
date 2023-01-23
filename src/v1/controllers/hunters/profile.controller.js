const { httpError, errorTypes, messageTypes } = require('../../configs')
const { sequelize } = require('../../models')
const bcrypt = require('bcrypt')
const { utils } = require('../../libs')
const fs = require('fs')
const path = require('path')

const update = async (req, res) => {
  try {
    const hunterId = req?.user[0]?.id

    const {
      nickName,
      nationalCode,
      firstName,
      lastName,
      birthDate,
      phoneNumber,
      email,
      description
    } = req.body

    const data = {
      nickName,
      nationalCode,
      firstName,
      lastName,
      birthDate,
      phoneNumber,
      email,
      description
    }
    const hunter = await sequelize.models.hunters.findOne({
      where: {
        id: hunterId
      }
    })

    if (!hunter) return httpError(errorTypes.USER_NOT_FOUND, res)

    if (req.files) {
      const { profileImage } = req.files

      if (!req.files || Object.keys(req.files).length === 0 || !profileImage)
        return httpError(errorTypes.INVALID_INPUTS, res)

      profileImage.name =
        String(path.extname(profileImage.name)).toLowerCase() === '.peg'
          ? `1${String(profileImage.name).replace('j.peg', '')}.jpeg`
          : profileImage.name === '.png'
          ? '1.png'
          : profileImage.name === '.jpg'
          ? '1.jpg'
          : profileImage.name

      const extensionName = path.extname(profileImage.name)

      const allowedExtension = ['.jpg', '.jpeg', '.png']

      if (!allowedExtension.includes(extensionName.toLowerCase()))
        return httpError(errorTypes.INVALID_PDF_DOCX_FORMAT, res)

      let newFileName = `f${hunterId}_0_( ${profileImage.name} )${extensionName}`

      let filePath = `./src/v1/storages/files/${hunterId}/${newFileName}`
      if (fs.existsSync(filePath)) {
        for (let k = 0; k < Number.MAX_VALUE; k++) {
          newFileName = `f${hunterId}_${k}_( ${profileImage.name} )${extensionName}`

          const endPath = `./src/v1/storages/files/${hunterId}/${newFileName}`

          if (fs.existsSync(endPath)) continue
          filePath = endPath
          break
        }
      }

      await profileImage.mv(filePath)

      data.profileImage = `${process.env.BACKEND_BASE_URL}/files/${newFileName}`
    }

    await hunter.update(data)

    return res
      .status(messageTypes.SUCCESSFUL_UPDATE.statusCode)
      .send(messageTypes.SUCCESSFUL_UPDATE)
  } catch (e) {
    return httpError(e, res)
  }
}

const updateIban = (req, res) => {
  const { shebaNumber } = req.body
  if (!shebaNumber) return httpError(errorTypes.INVALID_INPUTS, res)
  const hunterId = req?.user[0]?.id
  return sequelize.models.hunters
    .findOne({
      where: { id: hunterId }
    })
    .then((r) => {
      r?.update({
        shebaNumber
      }).then(() => {
        return res
          .status(messageTypes.SUCCESSFUL_UPDATE.statusCode)
          .send(messageTypes.SUCCESSFUL_UPDATE)
      })
    })
    .catch((e) => {
      return httpError(e, res)
    })
}

const updateSocialNetworkData = (req, res) => {
  const { twitter, linkedin, bugCrowd, hackerOne } = req.body
  const data = { twitter, linkedin, bugCrowd, hackerOne }
  const hunterId = req?.user[0]?.id
  return sequelize.models.hunters
    .findOne({
      where: { id: hunterId }
    })
    .then((r) => {
      r?.update(data).then(() => {
        return res
          .status(messageTypes.SUCCESSFUL_UPDATE.statusCode)
          .send(messageTypes.SUCCESSFUL_UPDATE)
      })
    })
    .catch((e) => {
      return httpError(e, res)
    })
}

const changePassword = async (req, res) => {
  const hunterId = req?.user[0]?.id

  const { previousPassword, newPassword } = req.body
  if (!previousPassword || !newPassword)
    return httpError(errorTypes.INVALID_INPUTS, res)

  const r = await sequelize.models.hunters
    .findOne({
      where: {
        id: hunterId
      }
    })
    .catch((e) => {
      return httpError(e, res)
    })

  if (!r) return httpError(errorTypes.USER_NOT_FOUND, res)

  if (!bcrypt.compareSync(previousPassword, r?.password))
    return httpError(errorTypes.INVALID_PASSWORD, res)

  await r.update({ password: newPassword })

  const accessToken = authorize.generateHunterJwt(r?.id, r?.phoneNumber)

  delete r?.dataValues?.password

  return res.status(200).send({
    statusCode: 200,
    data: {
      ...r?.dataValues,
      token: {
        access: accessToken,
        expireAt: utils.timestampToIso(
          authorize.decodeJwt(accessToken, 'hunter').exp
        )
      }
    },
    error: null
  })
}

const findOne = async (req, res) => {
  try {
    const hunterId = req?.user[0]?.id
    const hunter = await sequelize.models.hunters.findOne({
      where: {
        id: hunterId
      },
      attributes: {
        exclude: ['password']
      }
    })

    return res.status(200).send({
      statusCode: 200,
      data: hunter,
      error: null
    })
  } catch (e) {
    return httpError(e, res)
  }
}

module.exports = {
  updateIban,
  updateSocialNetworkData,
  findOne,
  changePassword,
  update
}
