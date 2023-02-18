const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const Post = require('../models/Post');

const router = express.Router();

// Create post route
router.post('/', authMiddleware, async (req, res) => {
  const { title, body } = req.body;

  const post = new Post({
    title,
    body,
    author: req.user._id
  });

  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete post route
router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    if (post.author.toString() !== req.user._id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await post.remove();
    res.json({ message: 'Post deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
