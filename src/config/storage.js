import {
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import { config } from 'dotenv'
import fs from 'fs'
import path from 'path'

config()

const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION } = process.env

const s3 = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
})

export const uploadFile = async (file) => {
  const params = {
    Bucket: 'ceppa-storage',
    Key: file.name,
    Body: file.data, // Pasar el stream directamente como el cuerpo del objeto
    ContentType: 'application/pdf',
    ACL: 'public-read',
  }

  const command = new PutObjectCommand(params)

  try {
    const data = await s3.send(command)
    return data
  } catch (error) {
    console.error('Error al subir el archivo:', error)
    throw error
  }
}
export const deleteFileStorage = async (name) => {
  console.log(name)
  const params = {
    Bucket: 'ceppa-storage',
    Key: name,
  }

  try {
    // Ejecuta el comando para eliminar el objeto de S3
    await s3.send(new DeleteObjectCommand(params))
    console.log('Archivo eliminado correctamente')
  } catch (error) {
    console.error('Error al eliminar el archivo:', error)
    throw error
  }
}
export const readFile = async (file) => {
  const params = {
    Bucket: 'ceppa-storage',
    Key: file,
  }
  const command = new GetObjectCommand(params)

  try {
    const result = await s3.send(command)

    console.log('LINES 47', result)

    const __dirname = path.dirname(new URL(import.meta.url).pathname)
    const scriptDirectory = path.resolve(__dirname, '../assets')
    let filePath

    filePath = path.join(scriptDirectory, 'docs', file)

    result.Body.pipe(fs.createWriteStream(filePath))
    return filePath // Devuelve la ruta del archivo local
  } catch (error) {
    console.error('Error al descargar el archivo desde S3:', error)
    throw error // Lanza una excepción para manejar errores en el nivel superior
  }
}
