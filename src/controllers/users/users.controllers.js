import AWS from 'aws-sdk'
import nodemailer from 'nodemailer'
import User from '../../models/Users.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
import { verifyPassword } from '../../helpers/index.js'

config()

const {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_REGION,
  EMAIL_PASSWORD,
  SECRET_KEY,
} = process.env

AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: AWS_REGION,
})

export const register = async (req, res) => {
  const { email, password, role } = req.body

  try {
    // Verificar si el usuario ya está registrado
    let user = await User.findOne({ email })
    if (user) {
      return res
        .status(400)
        .json({ data: null, success: false, message: 'El usuario ya existe' })
    }

    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Crear un nuevo usuario
    user = new User({
      email,
      password: hashedPassword,
      role,
    })

    // Guardar el usuario en la base de datos
    await user.save()

    res.json({
      data: null,
      success: true,
      message: 'Usuario registrado correctamente',
    })
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Error en el servidor')
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({
    where: {
      email: email,
    },
  })

  if (!user) {
    return res
      .status(404)
      .json({ data: false, success: false, message: 'No existe el usuario' })
  }

  const matchPassword = await verifyPassword(password, user.password)

  if (email === user.email && matchPassword) {
    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' })
    res.json({
      data: { email: email, role: user.role, token: token },
      success: true,
      message: 'Usuario registrado correctamente',
    })
  } else {
    res
      .status(401)
      .json({ data: false, success: false, message: 'Credenciales inválidas' })
  }
}

const s3 = new AWS.S3()

export const getAllFilesFromS3 = async (req, res) => {
  const params = {
    Bucket: 'ceppa-storage',
  }

  try {
    // Utiliza el método listObjects para obtener la lista de objetos en el bucket
    const data = await s3.listObjects(params).promise()
    console.log(data)

    // Extrae los nombres de los archivos de la respuesta
    const fileNames = data.Contents.map((object) => object.Key)

    return res.status(200).json({
      data: fileNames,
      success: true,
      message: 'Lista de archivos recuperada exitosamente.',
    })
  } catch (error) {
    console.error('Error al recuperar la lista de archivos:', error)
    return res.status(500).json({ error: 'Error en el servidor.' })
  }
}

export const sendEmail = (req, res) => {
  const { nombre, apellido, correo, mensaje } = req.body

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'franconawel@gmail.com',
      pass: EMAIL_PASSWORD,
    },
  })

  const mailOptions = {
    from: correo,
    to: 'frannahuelosorio@gmail.com',
    subject: 'Nuevo mensaje desde el formulario de contacto',
    text: `
    Nombre: ${nombre}
    Apellido: ${apellido}
    Correo: ${correo}
    Mensaje: ${mensaje}
  `,
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error)
      res.status(500).send('Error al enviar el correo')
    } else {
      return res.status(200).json({
        data: null,
        success: true,
        message: 'Correo enviado con éxito.',
      })
    }
  })
}
