import { v2 as cloudinary } from 'cloudinary'
import { config } from 'dotenv'

config()

const { API_KEY_CLOUDINARY } = process.env

cloudinary.config({
  cloud_name: 'dxhmxcgzn',
  api_key: '956642411563256',
  api_secret: API_KEY_CLOUDINARY,
})

export async function uploadImage(image) {
  try {
    // Verificar que el objeto de imagen tenga los datos necesarios
    if (!image || !image.data) {
      return false
    }

    // Subir la imagen a Cloudinary
    const result = await cloudinary.uploader.upload(image.tempFilePath, {
      public_id: image.name,
    })

    // Devolver la URL de la imagen cargada
    return result.secure_url
  } catch (error) {
    console.error('Error al cargar la imagen:', error)
    return false
  }
}
