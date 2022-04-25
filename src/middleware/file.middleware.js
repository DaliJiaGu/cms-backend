const Multer = require('koa-multer');
const path = require('path')

const storage = Multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/pictures')
  },
  filename:(req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const pictureUpload = Multer({
  storage
})

const pictureHandler = pictureUpload.single('picture')

module.exports = {
  pictureHandler
}