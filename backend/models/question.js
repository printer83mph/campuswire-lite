const mongoose = require('mongoose');

const Question = mongoose.model('Question', {
  questionText: String,
  answer: String,
  author: String,
});

module.exports = Question;
