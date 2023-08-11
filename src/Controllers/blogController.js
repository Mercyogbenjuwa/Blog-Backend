const Blog = require('../Models/Blog');


/**===================================== Get All Blogs ===================================== **/
exports.getAllBlogs = async (req, res) => {
    try {
      const blogs = await Blog.find();
      res.json(blogs);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching blog posts.' });
    }
  };


/**===================================== Get Blog By Id  ===================================== **/
  exports.getBlogById = async (req, res) => {
    try {
      const { id } = req.params;
      const blog = await Blog.findOne({ _id: id });
      if (!blog) {
        return res.status(404).json({ error: 'Blog post not found.' });
      }
      res.json(blog);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching the blog post.' });
    }
  };
  

/**===================================== Create Blog ===================================== **/
exports.createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.id; // User ID obtained from the JWT token
    const blog = await Blog.create({ title, content, user_id: userId });
    res.json({ message: 'Blog post created successfully!', blog });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the blog post.' });
  }
};


/**===================================== Update Blog ===================================== **/
exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const blog = await Blog.findOne({ _id: id });
    if (!blog) {
      return res.status(404).json({ error: 'Blog post not found.' });
    }
    blog.title = title;
    blog.content = content;
    await blog.save();
    res.json({ message: 'Blog post updated successfully!', blog });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the blog post.' });
  }
};


/**===================================== Delete Blog ===================================== **/
exports.deleteBlog = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Blog.deleteOne({ _id: id });
      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'Blog post not found.' });
      }
      res.json({ message: 'Blog post deleted successfully!' });
    } catch (error) {
      console.error(error); 
      res.status(500).json({ error: 'An error occurred while deleting the blog post.' });
    }
  };
  
  
  
  
  