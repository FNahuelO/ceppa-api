import { deleteFileCloudinary, uploadImage } from '../../config/cloudinary.js'
import { deleteFileStorage, uploadFile } from '../../config/storage.js'
import Curso from '../../models/Cursos.js'
import Magazine from '../../models/Magazine.js'
import Text from '../../models/Text.js'

const { AWS_BASE_URL } = process.env

export const addMagazine = async (req, res) => {
  const { title, archive } = req.body

  try {
    const currentImage = req.files['image']

    const image = await uploadImage(currentImage)
    if (image) {
      await Magazine.create({
        title,
        imageUrl: image,
        imageName: currentImage.name,
        archive: `${AWS_BASE_URL}${archive}`,
        name: archive,
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
        magazine.imageUrl = image
        magazine.imageName = req.files['image']?.name
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

    await deleteFileCloudinary(magazine.imageName)

    await deleteFileStorage(magazine.name)

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

export const getTexts = async (req, res) => {
  try {
    const data = await Text.findAll()
    res.status(200).json({
      data: data,
      success: true,
      message: 'Textos listados exitosamente.',
    })
  } catch (error) {
    console.error('Error al listar textos:', error)
    return res.status(500).json({ error: 'Error en el servidor.' })
  }
}

export const addText = async (req, res) => {
  const { label } = req.body

  try {
    await Text.create({
      label,
    })

    return res.status(200).json({
      data: null,
      success: true,
      message: 'Texto creado exitosamente.',
    })
  } catch (error) {
    console.error('Error al agregar el texto:', error)
    return res.status(500).json({ error: 'Error en el servidor.' })
  }
}

export const editText = async (req, res) => {
  const { id } = req.params
  const { label } = req.body

  try {
    let currentText = await Text.findByPk(id)

    if (!currentText) {
      return res.status(404).json({ error: 'Texto no encontrada' })
    }

    currentText.label = label

    await currentText.save()

    return res.status(200).json({
      data: null,
      success: true,
      message: 'Texto actualizado exitosamente.',
    })
  } catch (error) {
    console.error('Error al editar texto:', error)
    return res.status(500).json({ error: 'Error en el servidor.' })
  }
}

export const deleteText = async (req, res) => {
  const { id } = req.params
  try {
    const currentText = await Text.findByPk(id)
    if (!currentText) {
      return res.status(404).json({ error: 'Revista no encontrada' })
    }

    await currentText.destroy()

    return res.status(200).json({
      data: null,
      success: true,
      message: 'Texto eliminado exitosamente',
    })
  } catch (error) {
    console.error('Error al eliminar la texto:', error)
    res.status(500).json({ error: 'Error al eliminar la revista' })
  }
}


export const addCurso = async (req, res) => {
  const { title, startDate, endDate, schedules, certification, mode } = req.body

  try {
    const currentImage = req.files['photo']

    const image = await uploadImage(currentImage)
    if (image) {
      await Curso.create({
        title,
        startDate,
        endDate,
        schedules,
        certification,
        mode,
        class: req.body.class,
        imageUrl: image,
        imageName: currentImage.name,
      })
    }

    return res.status(200).json({
      data: null,
      success: true,
      message: 'Curso creado exitosamente.',
    })
  } catch (error) {
    console.error('Error al agregar el curso:', error)
    return res.status(500).json({ error: 'Error en el servidor.' })
  }
}

export const getCursos = async (req, res) => {
  try {
    const data = await Curso.findAll()
    res.status(200).json({
      data: data,
      success: true,
      message: 'Cursos listadas exitosamente.',
    })
  } catch (error) {
    console.error('Error al listar los cursos:', error)
    return res.status(500).json({ error: 'Error en el servidor.' })
  }
}

export const editCurso = async (req, res) => {
  const { id } = req.params
  const { title, date, schedules, certification, mode } = req.body

  try {
    let currentCurso = await Curso.findByPk(id)

    if (!currentCurso) {
      return res.status(404).json({ error: 'Curso no encontrado' })
    }

    // Si se proporciona una nueva imagen, la subimos y actualizamos el campo de imagen
    if (req.files && req.files['photo']) {
      const image = await uploadImage(req.files['photo'])
      if (image) {
        currentCurso.imageUrl = image
        currentCurso.imageName = req.files['photo']?.name
      } else {
        return res.status(500).json({ error: 'Error al cargar el curso.' })
      }
    }

    // Actualizamos los demás campos
    currentCurso.title = title
    currentCurso.date = date
    currentCurso.schedules = schedules
    currentCurso.certification = certification
    currentCurso.mode = mode
    currentCurso.class = req.body.class
    

    await currentCurso.save()

    return res.status(200).json({
      data: null,
      success: true,
      message: 'Curso actualizado exitosamente.',
    })
  } catch (error) {
    console.error('Error al editar el curso:', error)
    return res.status(500).json({ error: 'Error en el servidor.' })
  }
}

export const deleteCurso = async (req, res) => {
  const { id } = req.params
  try {
    const curso = await Curso.findByPk(id)
    if (!curso) {
      return res.status(404).json({ error: 'Curso no encontrado' })
    }

    await deleteFileCloudinary(curso.imageName)

    await curso.destroy()

    return res.status(200).json({
      data: null,
      success: true,
      message: 'Curso eliminado exitosamente',
    })
  } catch (error) {
    console.error('Error al eliminar el curso:', error)
    res.status(500).json({ error: 'Error al eliminar el curso' })
  }
}