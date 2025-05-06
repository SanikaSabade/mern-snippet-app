const express = require('express');
const router = express.Router();
const Snippet = require('../models/Snippet');

router.get('/', async (req, res) => {
  try {
    const snippets = await Snippet.find().sort({ createdAt: -1 });
    res.json(snippets);
  } catch (err) {
    console.error('Error fetching snippets:', err);
    res.status(500).json({ message: 'Failed to fetch snippets' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id);
    if (!snippet) {
      return res.status(404).json({ message: 'Snippet not found' });
    }
    res.json(snippet);
  } catch (err) {
    console.error('Error fetching snippet:', err);
    res.status(500).json({ message: 'Failed to fetch snippet' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, code, language, description, tags } = req.body;
    
    if (!title || !code || !language) {
      return res.status(400).json({ message: 'Title, code, and language are required' });
    }
    
    const newSnippet = new Snippet({
      title,
      code,
      language,
      description: description || '',
      tags: tags || []
    });
    
    const savedSnippet = await newSnippet.save();
    res.status(201).json(savedSnippet);
  } catch (err) {
    console.error('Error creating snippet:', err);
    res.status(500).json({ message: 'Failed to create snippet' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { title, code, language, description, tags } = req.body;
    
    if (!title || !code || !language) {
      return res.status(400).json({ message: 'Title, code, and language are required' });
    }
    
    const updatedSnippet = await Snippet.findByIdAndUpdate(
      req.params.id,
      {
        title,
        code,
        language,
        description: description || '',
        tags: tags || []
      },
      { new: true }
    );
    
    if (!updatedSnippet) {
      return res.status(404).json({ message: 'Snippet not found' });
    }
    
    res.json(updatedSnippet);
  } catch (err) {
    console.error('Error updating snippet:', err);
    res.status(500).json({ message: 'Failed to update snippet' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedSnippet = await Snippet.findByIdAndDelete(req.params.id);
    
    if (!deletedSnippet) {
      return res.status(404).json({ message: 'Snippet not found' });
    }
    
    res.json({ message: 'Snippet deleted successfully' });
  } catch (err) {
    console.error('Error deleting snippet:', err);
    res.status(500).json({ message: 'Failed to delete snippet' });
  }
});

router.get('/search/:query', async (req, res) => {
  try {
    const query = req.params.query;
    const snippets = await Snippet.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { language: { $regex: query, $options: 'i' } },
        { tags: { $in: [new RegExp(query, 'i')] } }
      ]
    }).sort({ createdAt: -1 });
    
    res.json(snippets);
  } catch (err) {
    console.error('Error searching snippets:', err);
    res.status(500).json({ message: 'Failed to search snippets' });
  }
});

module.exports = router;