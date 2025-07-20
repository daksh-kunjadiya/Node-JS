import express from 'express'
import { uploadBook, getAllBook, getBookById, updateBook, deleteBook } from '../controller/book.controller.js'
import multer from 'multer'
import path from 'path'

const router = express.Router()
const storage = multer.diskStorage({
    destination: (req, file, cd) => cd(null, 'upload'),
    filename: (req, file, cd) => cd(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
})
const upload = multer({ storage })

router.post('/upload', uploadBook)
router.get('/', getAllBook)
router.get('/:id', getBookById)
router.put('/:id', upload.single('cover'), updateBook)
router.delete('/:id', deleteBook)

export const bookRoutes = router;