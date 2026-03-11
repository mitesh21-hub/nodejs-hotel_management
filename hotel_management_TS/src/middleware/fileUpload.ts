const express = require('express')
const multer = require('multer')
const path = require("path")

const storage = multer({
    limits: {
        fileSize: 1000000 // 1000000 Bytes = 1 MB
    },
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, './public/files/' );
        },
        filename(req, file, cb) {
            cb(null, new Date().getTime() + path.extname(file.originalname))
            
        },
    })
});

const upload = multer({
    storage: storage
})

// const upload = multer({
//     storage: storage,
//     fileFilter: (req, file, cb) => {
//         if (file.mimetype === 'image/png' || file.mimetype === 'application/pdf') {
//             cb(null, true)
//         } else {
//             cb(null, false)
//             return cb(new Error('Only .png, .jpg, .mp4 and .jpeg format allowed!'))
//         }
//     }
// })

export default upload;
