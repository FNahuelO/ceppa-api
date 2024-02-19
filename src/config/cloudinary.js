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
    if (!image || !image.data || !image.name) {
      throw new Error('Datos de imagen inválidos')
    }

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'image',
          public_id: image.name,
        },
        (error, result) => {
          if (error) {
            console.error('Error al subir la imagen a Cloudinary:', error)
            reject(error)
          } else {
            console.log('Imagen subida a Cloudinary:', result)
            resolve(result.secure_url)
          }
        },
      )

      uploadStream.end(image.data)
    })
  } catch (error) {
    console.error('Error al cargar la imagen:', error)
    return false
  }
}

export const deleteFileCloudinary = async (name) => {
  console.log(name)
  try {
    const result = await cloudinary.uploader.destroy(name)
    console.log('Archivo eliminado correctamente', result)
  } catch (error) {
    console.error('Error al eliminar el archivo:', error)
    throw error
  }
}
