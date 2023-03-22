const mongoose = require('../controllers/config')

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  slugs: {
    type: String,
    required: true,
    unique: true
  },
  file_image: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  tags: {
    type: [String]
  },
  date: {
    type: Date,
  }
});

const Post = mongoose.model('articles', postSchema);

// Fungsi Create
const createPost = async (data) => {
  try {
    const post = new Post(data);
    await post.save();
    return post;
  } catch (error) {
    throw error;
  }
}

// Fungsi Read
const readPost = async (filter) => {
  try {
    const post = await Post.find(filter);
    return post;
  } catch (error) {
    throw error;
  }
}

// Fungsi Update
const updatePost = async (filter, data) => {
  try {
    const post = await Post.findOneAndUpdate(filter, data, { new: true });
    return post;
  } catch (error) {
    throw error;
  }
}

// Fungsi Delete
const deletePost = async (filter) => {
  try {
    const post = await Post.findOneAndDelete(filter);
    return post;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createPost,
  readPost,
  updatePost,
  deletePost,
};
