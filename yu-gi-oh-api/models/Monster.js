const mongoose = require('mongoose');

const MonsterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String },
  level: { type: Number },
  attack: { type: Number },
  defense: { type: Number },
  attribute: { type: String },
  description: { type: String }
}, {
  timestamps: true
});

module.exports = mongoose.model('Monster', MonsterSchema);
