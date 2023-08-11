const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController');
const blogController = require('../Controllers/blogController');
const authMiddleware = require('../Middleware/authMiddleware');




/**===================================== Authentication Routes ===================================== **/
router.post('/register', authController.register);
router.post('/login', authController.login);


/**===================================== Blog Routes ===================================== **/
router.get('/blogs', blogController.getAllBlogs);
router.get('/blogs/:id', blogController.getBlogById);
router.post('/blogs', authMiddleware.authenticate, blogController.createBlog);
router.put('/blogs/:id', authMiddleware.authenticate, blogController.updateBlog);
router.delete('/blogs/:id', authMiddleware.authenticate, blogController.deleteBlog);

module.exports = router;
