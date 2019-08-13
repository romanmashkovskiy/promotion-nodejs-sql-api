import multer from 'multer';
import path from 'path';

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|bmp/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
        return cb(null, true);
    }
    const error = new Error('Invalid file Type');
    error.name= 'MulterError';
    cb(error);
};

const upload = multer({
    storage: storageConfig,
    limits: {
        fileSize: 15 * 1024 * 1024
    },
    fileFilter: fileFilter
});

export default upload;