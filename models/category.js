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
  description: {
    type: String,
    required: true
  },
  uniqueId: {
    type: String,
    required: true
  },
  date: {
    type: Date,
  }
});

const Post = mongoose.model('category', postSchema);

// Fungsi Create
const createCategory = async (data) => {
  try {
    const post = new Post(data);
    await post.save();
    return post;
  } catch (error) {
    throw error;
  }
}

module.exports = {
    createCategory
}