import { Router } from 'express'
import {
  addMagazine,
  deleteMagazine,
  editMagazine,
  getFile,
  getMagazines,
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

router.get('/get-staff', getStaff)

router.post('/add-staff', addStaff)

router.put('/staff/:id', editStaff)

router.delete('/staff/:id', deleteStaff)

router.post('/add-magazine', addMagazine)

router.get('/get-magazines', getMagazines)

router.put('/magazine/:id', editMagazine)

router.delete('/magazine/:id', deleteMagazine)

router.post('/login', login)

router.post('/register', register)

router.get('/get-file', getFile)

router.post('/send-email', sendEmail)
