const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination: "./uploads/",
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}-${file.originalname}`)
    }
})

const fileFilter = (req,file,cb)=>{
    const ext = path.extname(file.originalname).toLowerCase();
    if(ext!==".jpg" && ext!==".jpeg" && ext!==".png"){
        return cb(new Error("only .jpg, .jpeg and .png files are allowed"),false)
 
    }
    cb(null,true);

}
const upload = multer({storage,fileFilter});
module.exports = upload;