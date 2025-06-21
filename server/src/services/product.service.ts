import path from "path"
import { Product } from "../models/product"
import { IPRODUCT, ProductProps } from "../typescript/props"
import fs from 'fs'
import { log } from "../log/log"
import mongoose from "mongoose"

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
    async delete(fileName:string,folder='uploads'):Promise<boolean>{
        try {
            if (!fileName) {
                return false
            }
            const filePath = path.join(__dirname, '..', folder, fileName);

            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
                return true;
            }

            return false; // Dosya yoksa zaten silinmiş
        } catch (error) {
            log.error('Dosya silinirken hata oluştu:');
            return false;
        }
    }
     async create(productData: Partial<IPRODUCT>): Promise<boolean> {
        try {
            const { name, description, images, stock, price, is_active } = productData;
            const created = await Product.create({
                name,
                description,
                images,
                stock,
                price,
                is_active,
            });
            if (!created) {
                log.warning("Ürün oluşturulamadı.");
                return false;
            }
            return true;
        } catch (err) {
            log.error("Ürün oluşturulurken hata:");
            return false;
        }
  }
  async update(id:string,productData: ProductProps):Promise<boolean>{
     try {
            const data = await Product.updateOne({_id:id},productData);
            if (!data) {
                log.warning("Ürün oluşturulamadı.");
                return false;
            }
            return true;
        } catch (err) {
            log.error("Ürün oluşturulurken hata:");
            return false;
        }
  }
  async deleteId(id:string):Promise<boolean>{
    try{
        if(!mongoose.Types.ObjectId.isValid(id)){
            return false
        }
        const data=await Product.deleteOne({_id:id})
        if(data.deletedCount>0){
            return true
        }
        return false
    }catch(err){
        return false
    }
  }
}
export default new productService()