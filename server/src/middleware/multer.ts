import multer from "multer"
import path from 'path'
import fs from 'fs'


 const uploadPath=path.join(__dirname,'..','uploads')
if(!fs.existsSync(uploadPath)){
    fs.mkdirSync(uploadPath)
}

const storage=multer.memoryStorage()




export const upload = multer({
    storage,
    limits:{fileSize:4*1024*1024},
    fileFilter:(req,file,cb)=>{
        const allowedMimeTypes= ['image/jpeg', 'image/png', 'image/webp'];
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Yalnızca resim dosyası yükleyebilirsiniz!'));
        }
    }
})

