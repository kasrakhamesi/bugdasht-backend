const { httpError, errorTypes, messageTypes } = require('../../configs')
const { restful, filters } = require('../../libs')
const { sequelize } = require('../../models')
const fs = require('fs')
const path = require('path')
const reports = new restful(sequelize.models.projects_reports)
require('dotenv').config()

const create = async (req, res) => {
  try {
    const hunterId = req?.user[0]?.id
    const { id } = req.params

    const {
      bugTitle,
      domainOrIp,
      cvss,
      cve,
      bugDescription,
      solutionDescription,
      vector
    } = req.body

    const { video, picOne, picTwo } = req.files

    if (!req.files || Object.keys(req.files).length === 0 || !video)
      return httpError(errorTypes.FILE_NOT_SELECTED, res)

    const project = await sequelize.models.organizations_projects.findOne({
      where: { id }
    })

    if (!project) return httpError(errorTypes.PROJECT_NOT_FOUND, res)

    const data = {
      hunterId,
      organizationId: project?.organizationId,
      organizationsProjectId: id,
      bugTitle,
      domainOrIp,
      cvss,
      cve,
      bugDescription,
      vector,
      solutionDescription
    }

    video.name =
      video.name === '.mkv'
        ? '1.mkv'
        : video.name === '.mp4'
        ? '1.mp4'
        : video.name

    if (picOne)
      picOne.name =
        String(path.extname(picOne.name)).toLowerCase() === '.peg'
          ? `1${String(picOne.name).replace('j.peg', '')}.jpeg`
          : picOne.name === '.png'
          ? '1.png'
          : picOne.name === '.jpg'
          ? '1.jpg'
          : picOne.name

    if (picTwo)
      picTwo.name =
        String(path.extname(picTwo.name)).toLowerCase() === '.peg'
          ? `1${String(picTwo.name).replace('j.peg', '')}.jpeg`
          : picTwo.name === '.png'
          ? '1.png'
          : picTwo.name === '.jpg'
          ? '1.jpg'
          : picTwo.name

    const extensionName = path.extname(video.name)

    const allowedExtension = ['.mp4', '.mkv']

    if (!allowedExtension.includes(extensionName.toLowerCase()))
      return httpError(errorTypes.INVALID_PDF_DOCX_FORMAT, res)

    let newFileName = `f${hunterId}_0_( ${video.name} )${extensionName}`

    let filePath = `./src/v1/storages/files/${hunterId}/${newFileName}`
    if (fs.existsSync(filePath)) {
      for (let k = 0; k < Number.MAX_VALUE; k++) {
        newFileName = `f${hunterId}_${k}_( ${video.name} )${extensionName}`

        const endPath = `./src/v1/storages/files/${hunterId}/${newFileName}`

        if (fs.existsSync(endPath)) continue
        filePath = endPath
        break
      }
    }

    await video.mv(filePath)

    data.video = `${process.env.BACKEND_BASE_URL}/${newFileName}`

    if (picOne) {
      const extensionName = path.extname(picOne.name)

      const allowedExtension = ['.png', '.jpeg', '.jpg']

      if (!allowedExtension.includes(extensionName.toLowerCase()))
        return httpError(errorTypes.INVALID_PDF_DOCX_FORMAT, res)

      let newFileName = `f${hunterId}_0_( ${picOne.name} )${extensionName}`

      let filePath = `./src/v1/storages/files/${hunterId}/${newFileName}`
      if (fs.existsSync(filePath)) {
        for (let k = 0; k < Number.MAX_VALUE; k++) {
          newFileName = `f${hunterId}_${k}_( ${picOne.name} )${extensionName}`

          const endPath = `./src/v1/storages/files/${hunterId}/${newFileName}`

          if (fs.existsSync(endPath)) continue
          filePath = endPath
          break
        }
      }
      await picOne.mv(filePath)

      data.picOne = `${process.env.BACKEND_BASE_URL}/${newFileName}`
    }

    if (picTwo) {
      const extensionName = path.extname(picTwo.name)

      const allowedExtension = ['.png', '.jpeg', '.jpg']

      if (!allowedExtension.includes(extensionName.toLowerCase()))
        return httpError(errorTypes.INVALID_PDF_DOCX_FORMAT, res)

      let newFileName = `f${hunterId}_0_( ${picTwo.name} )${extensionName}`

      let filePath = `./src/v1/storages/files/${hunterId}/${newFileName}`
      if (fs.existsSync(filePath)) {
        for (let k = 0; k < Number.MAX_VALUE; k++) {
          newFileName = `f${hunterId}_${k}_( ${picTwo.name} )${extensionName}`

          const endPath = `./src/v1/storages/files/${hunterId}/${newFileName}`

          if (fs.existsSync(endPath)) continue
          filePath = endPath
          break
        }
      }

      await picTwo.mv(filePath)

      data.picTwo = `${process.env.BACKEND_BASE_URL}/${newFileName}`
    }

    await sequelize.models.projects_reports.create(data)

    return res
      .status(messageTypes.SUCCESSFUL_CREATED.statusCode)
      .send(messageTypes.SUCCESSFUL_CREATED)
  } catch (e) {
    return httpError(e, res)
  }
}

const findOne = async (req, res) => {
  const { id } = req.params
  const hunterId = req?.user[0]?.id

  return sequelize.models.projects_reports
    .findOne({
      where: {
        id,
        hunterId
      },
      include: [
        {
          model: sequelize.models.organizations_projects,
          as: 'project'
        }
      ]
    })
    .then((r) => {
      return res.status(200).send({
        statusCode: 200,
        data: r,
        error: null
      })
    })
    .catch((e) => {
      return httpError(e, res)
    })
}

const findAllByProjectId = async (req, res) => {
  try {
    const hunterId = req?.user[0]?.id

    const { id } = req.params
    const { page, pageSize } = req.query
    const [order, where] = await filters.filter(
      req.query,
      sequelize.models.projects_reports
    )

    const newWhere = { ...where, organizationsProjectId: id, hunterId }

    const r = await reports.Get({
      where: newWhere,
      attributes: {
        exclude: ['hunterId']
      },
      include: [
        {
          model: sequelize.models.organizations_projects,
          as: 'project'
        }
      ],
      order: [['id', 'desc']],
      pagination: {
        active: true,
        page,
        pageSize
      }
    })
    return res.status(r?.statusCode).send(r)
  } catch (e) {
    return httpError(e, res)
  }
}

const findAll = async (req, res) => {
  try {
    const hunterId = req?.user[0]?.id

    const { page, pageSize } = req.query
    const [order, where] = await filters.filter(
      req.query,
      sequelize.models.projects_reports
    )
    const newWhere = { ...where, hunterId }

    const r = await reports.Get({
      where: newWhere,
      attributes: {
        exclude: ['hunterId']
      },
      include: [
        {
          model: sequelize.models.organizations_projects,
          as: 'project'
        }
      ],
      order: [['id', 'desc']],
      pagination: {
        active: true,
        page,
        pageSize
      }
    })
    return res.status(r?.statusCode).send(r)
  } catch (e) {
    return httpError(e, res)
  }
}

const update = async (req, res) => {
  try {
    const hunterId = req?.user[0]?.id
    const { id } = req.params

    const {
      bugTitle,
      domainOrIp,
      cvss,
      cve,
      bugDescription,
      solutionDescription,
      vector
    } = req.body

    const { video, picOne, picTwo } = req.files

    if (!req.files || Object.keys(req.files).length === 0 || !video)
      return httpError(errorTypes.FILE_NOT_SELECTED, res)

    const project = await sequelize.models.organizations_projects.findOne({
      where: { id, adminId: null }
    })

    if (!project) return httpError(errorTypes.PROJECT_NOT_FOUND, res)

    const data = {
      hunterId,
      organizationsProjectId: id,
      bugTitle,
      domainOrIp,
      cvss,
      cve,
      bugDescription,
      vector,
      solutionDescription
    }

    video.name =
      video.name === '.mkv'
        ? '1.mkv'
        : video.name === '.mp4'
        ? '1.mp4'
        : video.name

    if (picOne)
      picOne.name =
        String(path.extname(picOne.name)).toLowerCase() === '.peg'
          ? `1${String(picOne.name).replace('j.peg', '')}.jpeg`
          : picOne.name === '.png'
          ? '1.png'
          : picOne.name === '.jpg'
          ? '1.jpg'
          : picOne.name

    if (picTwo)
      picTwo.name =
        String(path.extname(picTwo.name)).toLowerCase() === '.peg'
          ? `1${String(picTwo.name).replace('j.peg', '')}.jpeg`
          : picTwo.name === '.png'
          ? '1.png'
          : picTwo.name === '.jpg'
          ? '1.jpg'
          : picTwo.name

    const extensionName = path.extname(video.name)

    const allowedExtension = ['.mp4', '.mkv']

    if (!allowedExtension.includes(extensionName.toLowerCase()))
      return httpError(errorTypes.INVALID_PDF_DOCX_FORMAT, res)

    let newFileName = `f${hunterId}_0_( ${video.name} )${extensionName}`

    let filePath = `./src/v1/storages/files/${hunterId}/${newFileName}`
    if (fs.existsSync(filePath)) {
      for (let k = 0; k < Number.MAX_VALUE; k++) {
        newFileName = `f${hunterId}_${k}_( ${video.name} )${extensionName}`

        const endPath = `./src/v1/storages/files/${hunterId}/${newFileName}`

        if (fs.existsSync(endPath)) continue
        filePath = endPath
        break
      }
    }

    await video.mv(filePath)

    data.video = `${process.env.BACKEND_BASE_URL}/${newFileName}`

    if (picOne) {
      const extensionName = path.extname(picOne.name)

      const allowedExtension = ['.png', '.jpeg', '.jpg']

      if (!allowedExtension.includes(extensionName.toLowerCase()))
        return httpError(errorTypes.INVALID_PDF_DOCX_FORMAT, res)

      let newFileName = `f${hunterId}_0_( ${picOne.name} )${extensionName}`

      let filePath = `./src/v1/storages/files/${hunterId}/${newFileName}`
      if (fs.existsSync(filePath)) {
        for (let k = 0; k < Number.MAX_VALUE; k++) {
          newFileName = `f${hunterId}_${k}_( ${picOne.name} )${extensionName}`

          const endPath = `./src/v1/storages/files/${hunterId}/${newFileName}`

          if (fs.existsSync(endPath)) continue
          filePath = endPath
          break
        }
      }
      await picOne.mv(filePath)

      data.picOne = `${process.env.BACKEND_BASE_URL}/${newFileName}`
    }

    if (picTwo) {
      const extensionName = path.extname(picTwo.name)

      const allowedExtension = ['.png', '.jpeg', '.jpg']

      if (!allowedExtension.includes(extensionName.toLowerCase()))
        return httpError(errorTypes.INVALID_PDF_DOCX_FORMAT, res)

      let newFileName = `f${hunterId}_0_( ${picTwo.name} )${extensionName}`

      let filePath = `./src/v1/storages/files/${hunterId}/${newFileName}`
      if (fs.existsSync(filePath)) {
        for (let k = 0; k < Number.MAX_VALUE; k++) {
          newFileName = `f${hunterId}_${k}_( ${picTwo.name} )${extensionName}`

          const endPath = `./src/v1/storages/files/${hunterId}/${newFileName}`

          if (fs.existsSync(endPath)) continue
          filePath = endPath
          break
        }
      }

      await picTwo.mv(filePath)

      data.picTwo = `${process.env.BACKEND_BASE_URL}/${newFileName}`
    }

    await sequelize.models.projects_reports.create(data)

    return res
      .status(messageTypes.SUCCESSFUL_UPDATE.statusCode)
      .send(messageTypes.SUCCESSFUL_UPDATE)
  } catch (e) {
    return httpError(e, res)
  }
}

module.exports = { create, findOne, findAll, update, findAllByProjectId }
