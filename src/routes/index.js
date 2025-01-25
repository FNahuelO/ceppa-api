import { Router } from 'express'
import {
  addCurso,
  addMagazine,
  addText,
  deleteCurso,
  deleteMagazine,
  deleteText,
  editCurso,
  editMagazine,
  editText,
  getCursos,
  getMagazines,
  getTexts,
} from '../controllers/admin/admin.controllers.js'
import {
  login,
  register,
  sendEmail,
} from '../controllers/users/users.controllers.js'
import {
  addStaff,
  deleteStaff,
  editStaff,
  getStaff,
} from '../controllers/admin/staff.controllers.js'

export const router = Router()

router.get('/', (req, res) => {
  res.json('<h1> SERVER UP¨</h1>')
})

/* STAFF */

router.get('/get-staff', getStaff)

router.post('/add-staff', addStaff)

router.put('/staff/:id', editStaff)

router.delete('/staff/:id', deleteStaff)

/* MAGAZINE */

router.post('/add-magazine', addMagazine)

router.get('/get-magazines', getMagazines)

router.put('/magazine/:id', editMagazine)

router.delete('/magazine/:id', deleteMagazine)

/* TEXT */

router.get('/get-texts', getTexts)

router.post('/add-text', addText)

router.put('/text/:id', editText)

router.delete('/text/:id', deleteText)

/* AUTH */

router.post('/login', login)

router.post('/register', register)

router.post('/send-email', sendEmail)

/* CURSOS */

router.post('/add-curso', addCurso)

router.get('/get-cursos', getCursos)

router.put('/cursos/:id', editCurso)

router.delete('/cursos/:id', deleteCurso)
