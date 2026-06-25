const express = require('express');
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
// multer helps in processing image , pds ,videos which express cant do and the image processed can be get by req.file which gives file name and apth whi ch can be uploaded in cloudinary

const router = express.Router();


router.get('/',getProducts);
router.post("/",protect, admin, upload.single('image'), createProduct);

router.route('/:id').get(getProductById).put(protect, admin, upload.single('image'), updateProduct).delete(protect, admin, deleteProduct);

module.exports = router;
