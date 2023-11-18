import multer from 'multer';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename); 

// multer handling
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, join(__dirname, '../public/images')); 
  },
  filename: function (req, file, cb) {
    const name = Date.now() + '-' + file.originalname;
    cb(null, name);
  },
});
const upload = multer({ storage: storage });

export default upload;