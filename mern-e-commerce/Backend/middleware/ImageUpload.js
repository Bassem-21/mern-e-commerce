import multer from 'multer'


const imageStorage = multer.diskStorage({
    destination: 'images/',
    filename: function (req, file, callback) {
        const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        callback(null, uniquePrefix + '-' + file.originalname)
    }
})


export const ImageUpload = multer({ storage: imageStorage })