import multer from "multer"
import path from "path";

const storage = multer.diskStorage({
  destination: (req,file,cb)=>{
    const uploadDir= path.join(__dirname,"../uploads");
    cb(null, uploadDir)
},
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".png" && ext !== ".jpeg") {
      return cb(null, false);
    }
    cb(null, true);
  },
});
