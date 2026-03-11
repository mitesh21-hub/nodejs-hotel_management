"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var multer = require('multer');
var path = require("path");
var storage = multer({
    limits: {
        fileSize: 1000000 // 1000000 Bytes = 1 MB
    },
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './public/files/');
        },
        filename: function (req, file, cb) {
            cb(null, new Date().getTime() + path.extname(file.originalname));
        },
    })
});
var upload = multer({
    storage: storage
});
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
exports.default = upload;
//# sourceMappingURL=fileUpload.js.map