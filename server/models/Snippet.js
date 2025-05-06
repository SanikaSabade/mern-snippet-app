const mongoose = require('mongoose');

const SnippetSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  code: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  tags: {
    type: [String],
    default: []
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Snippet', SnippetSchema);