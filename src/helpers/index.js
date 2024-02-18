import bcrypt from 'bcrypt'
import fs from 'fs'
import fsPromise from 'fs/promises'
import path from 'path'

export const encodePassword = async (contrasena) => {
  try {
    const saltRounds = 10
    const hash = await bcrypt.hash(contrasena, saltRounds)
    return hash
  } catch (error) {
    throw new Error('Error al codificar la contraseña')
  }
}

export const verifyPassword = async (password, hashAlmacenado) => {
  console.log(password, hashAlmacenado)
  try {
    const match = await bcrypt.compare(password, hashAlmacenado)
    return match
  } catch (error) {
    console.error('Error al verificar la contraseña')
    console.log(false)
  }
}

export const verifyFile = async (name) => {
  const __dirname = path.dirname(new URL(import.meta.url).pathname)
  const rootDir = path.join(__dirname, '..')
  const scriptDirectory = path.join(rootDir, '/assets')

  // Escapar espacios y caracteres especiales en el nombre del archivo

  const filePath = path.join(scriptDirectory, 'docs', name)

  try {
    await fsPromise.access(filePath, fs.constants.F_OK)
    console.log('El archivo existe:', filePath)
    return true
  } catch (error) {
    console.log('El archivo no existe:', filePath)
    return false
  }
}

export const downloadFile = async (filePath) => {
  try {
    const data = fs.readFileSync(filePath)

    if (!data || data.length === 0) {
      throw new Error('El archivo está vacío')
    }

    return data.buffer
  } catch (error) {
    throw new Error(`Error al leer el archivo: ${error.message}`)
  }
}
