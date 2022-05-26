import multer from "multer";
import path from 'path';
import fs from 'fs';
import { promisify } from "util";


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads/images')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, `${uniqueSuffix}-${file.originalname}`)
    }
  })

// this code goes inside the object passed to multer()
const imageFilter = (req, file, cb) => {    
    // Allowed ext
     const filetypes = /jpeg|jpg|png|gif/;
  
   // Check ext
    const extname =  filetypes.test(path.extname(file.originalname).toLowerCase());
   // Check mime
   const mimetype = filetypes.test(file.mimetype);
  
   if(mimetype && extname){
       return cb(null,true);
   } else {
       cb('Error: Images of type(jpeg, jpg, png, gif) Only!');
   }
  }
  
const upload = multer({ storage, limits: { fileSize: 2000000 }, fileFilter: imageFilter  })


export const unlinkAsync = promisify(fs.unlink)


export default upload;