import path from "path"
import { Product } from "../models/product"
import { IPRODUCT, ProductProps } from "../typescript/props"
import fs from 'fs'

class productService{
    async find({id,name}:ProductProps):Promise<IPRODUCT | IPRODUCT[] | null>{
        try{
            let data
            if(id){
                data=await Product.findOne({_id:id})
                return data
            }
            if(name){
                data=await Product.findOne({name})
                return data
            }
            data=await Product.find()
            if(!data){
                return null
            }
                
            return data
        }catch{
            return null
        }
    
    }
    async upload(file:Express.Multer.File,folder='uploads',fileNamePrefix='image'):Promise<string  >{
        if(!file) return ""
        const ext = path.extname(file.originalname).toLowerCase()
        const safePrefix = fileNamePrefix.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        const fileName=`${safePrefix}-${ Date.now()}${ext}`;
        const uploadPath=path.join(__dirname,'..',folder)
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        const filePath=path.join(uploadPath,fileName)
        fs.writeFileSync(filePath,file.buffer)
        return fileName

    }
}
export default new productService()