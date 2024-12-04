import multer from "multer"
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Resolve the directory path for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the path to the uploads directory
const uploadDir = path.resolve(__dirname, '../uploads');

// Debugging: Print the resolved path

// Ensure the uploads directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
} 

const storage=multer.diskStorage({
    
    destination: function (req,file,cb){

        cb(null,uploadDir)
    },
    filename:function (req,file, cb){
        cb(null,Date.now()+file.originalname)

    }


})
export const upload =multer({storage})