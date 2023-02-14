const multer = require('multer');
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

module.exports = multer({
  storage: multer.diskStorage({
    destination: (_, __, cb) => cb(null, 'images'),
    filename: (_, file, cb) => cb(null, file.originalname.split(' ').join('_') + Date.now() + '.' + MIME_TYPES[file.mimetype])
  })
}).single('image');