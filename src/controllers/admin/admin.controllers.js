import Staff from '../../models/Staff.js'
import path from 'path'
import { uploadImage } from '../../config/cloudinary.js'
import { readFile, uploadFile } from '../../config/storage.js'
import { downloadFile, verifyFile } from '../../helpers/index.js'
import Magazine from '../../models/Magazine.js'

export const addMagazine = async (req, res) => {
  const { title } = req.body

  try {
    const archive = req.files['archive']
    const response = await uploadFile(archive)
    const image = await uploadImage(req.files['image'])
    if (image && response) {
      await Magazine.create({
        title,
        image,
        archive: archive.name,
      })
    }

    return res.status(200).json({
      data: null,
      success: true,
      message: 'Revista creada exitosamente.',
    })
  } catch (error) {
    console.error('Error al agregar la revista:', error)
    return res.status(500).json({ error: 'Error en el servidor.' })
  }
}

export const getFile = async (req, res) => {
  const { name } = req.query

  const __dirname = path.dirname(new URL(import.meta.url).pathname)
  const rootDir = path.join(__dirname, '../..')
  const scriptDirectory = path.join(rootDir, '/assets')
  const filePath = path.join(scriptDirectory, 'docs', name)

  try {
    const verify = await verifyFile(name)
    console.log(verify)
    if (!verify) {
      await readFile(name)
      setTimeout(async () => {
        const arrayBuffer = await downloadFile(filePath)
        console.log(arrayBuffer)
        res.send(Buffer.from(arrayBuffer))
      }, 1000)
    } else {
      const arrayBuffer = await downloadFile(filePath)

      res.send(Buffer.from(arrayBuffer))
    }
  } catch (error) {
    console.error('Error al traer el archivo:', error)
    return res.status(500).json({ error: 'Error en el servidor.' })
  }
}

export const getMagazines = async (req, res) => {
  try {
    const data = await Magazine.findAll()
    res.status(200).json({
      data: data,
      success: true,
      message: 'Revistas listadas exitosamente.',
    })
  } catch (error) {
    console.error('Error al listar revistas:', error)
    return res.status(500).json({ error: 'Error en el servidor.' })
  }
}

export const editMagazine = async (req, res) => {
  const { id } = req.params
  const { title } = req.body

  try {
    let magazine = await Magazine.findByPk(id)

    if (!magazine) {
      return res.status(404).json({ error: 'Revista no encontrada' })
    }

    // Si se proporciona una nueva imagen, la subimos y actualizamos el campo de imagen
    if (req.files && req.files['image']) {
      const archive = req.files['archive']
      const response = await uploadFile(archive)
      const image = await uploadImage(req.files['image'])
      if (image) {
        magazine.image = image
        magazine.archive = archive.name
      } else {
        return res.status(500).json({ error: 'Error al cargar la imagen.' })
      }
    }

    // Actualizamos los demás campos
    magazine.title = title

    await magazine.save()

    return res.status(200).json({
      data: null,
      success: true,
      message: 'Revista actualizada exitosamente.',
    })
  } catch (error) {
    console.error('Error al editar revista:', error)
    return res.status(500).json({ error: 'Error en el servidor.' })
  }
}

export const deleteMagazine = async (req, res) => {
  const { id } = req.params
  try {
    const magazine = await Magazine.findByPk(id)
    if (!magazine) {
      return res.status(404).json({ error: 'Revista no encontrada' })
    }

    await magazine.destroy()

    return res.status(200).json({
      data: null,
      success: true,
      message: 'Revista eliminada exitosamente',
    })
  } catch (error) {
    console.error('Error al eliminar la revista:', error)
    res.status(500).json({ error: 'Error al eliminar la revista' })
  }
}
