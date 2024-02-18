import { uploadImage } from '../../config/cloudinary.js'
import Staff from '../../models/Staff.js'

export const addStaff = async (req, res) => {
  const { name, description, speciality, type } = req.body

  try {
    const image = await uploadImage(req.files['image'])

    if (image) {
      await Staff.create({
        name,
        speciality,
        description,
        image,
        type,
      })
    }

    return res.status(200).json({
      data: null,
      success: true,
      message: 'Miembro del staff creado exitosamente.',
    })
  } catch (error) {
    console.error('Error al agregar el miembro del staff:', error)
    return res.status(500).json({ error: 'Error en el servidor.' })
  }
}

export const editStaff = async (req, res) => {
  const { id } = req.params
  const { name, description, speciality, type } = req.body

  try {
    let staff = await Staff.findByPk(id)

    if (!staff) {
      return res.status(404).json({ error: 'Miembro del staff no encontrado.' })
    }

    // Si se proporciona una nueva imagen, la subimos y actualizamos el campo de imagen
    if (req.files && req.files['image']) {
      const image = await uploadImage(req.files['image'])
      if (image) {
        staff.image = image
      } else {
        return res.status(500).json({ error: 'Error al cargar la imagen.' })
      }
    }

    // Actualizamos los demás campos
    staff.name = name
    staff.speciality = speciality
    staff.description = description
    staff.type = type

    await staff.save()

    return res.status(200).json({
      data: null,
      success: true,
      message: 'Miembro del staff actualizado exitosamente.',
    })
  } catch (error) {
    console.error('Error al editar el miembro del staff:', error)
    return res.status(500).json({ error: 'Error en el servidor.' })
  }
}

export const deleteStaff = async (req, res) => {
  const { id } = req.params
  try {
    const usuario = await Staff.findByPk(id)
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }

    await usuario.destroy()

    return res.status(200).json({
      data: null,
      success: true,
      message: 'Perfil eliminado exitosamente',
    })
  } catch (error) {
    console.error('Error al eliminar el usuario:', error)
    res.status(500).json({ error: 'Error al eliminar el usuario' })
  }
}

export const getStaff = async (req, res) => {
  try {
    const staff = await Staff.findAll()
    res.status(200).json({
      data: staff,
      success: true,
      message: 'Miembro del staff listado exitosamente.',
    })
  } catch (error) {
    console.error('Error al agregar el miembro del staff:', error)
    return res.status(500).json({ error: 'Error en el servidor.' })
  }
}
