import multer from 'multer'
import path from 'path'
import fs from 'fs'

const allowedImageTypes = /jpeg|jpg|png|gif/

const UPLOAD_DIR = path.join(process.cwd(), 'uploads', 'properties')

fs.mkdirSync(UPLOAD_DIR, { recursive: true })

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`
    cb(null, uniqueName)
  },
})

function imageFileFilter(_req, file, cb) {
  const isValidExt = allowedImageTypes.test(path.extname(file.originalname).toLowerCase())
  const isValidMime = allowedImageTypes.test(file.mimetype)
  if (isValidExt && isValidMime) cb(null, true)
  else cb(new Error('Only image files are allowed (jpeg, jpg, png, gif)'))
}

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: imageFileFilter,
})

export default upload
