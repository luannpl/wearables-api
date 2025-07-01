import multer from 'multer';
import path from 'path';

// Armazena os arquivos temporariamente na pasta 'uploads'
const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: {
    fileSize: 1 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Somente imagens são permitidas'));
  },
});
