const Monster = require('../models/Monster');

exports.createMonster = (data) => {
  return Monster.create(data);
};

exports.getMonsterById = (id) => {
  return Monster.findById(id);
};

exports.updateMonster = (id, data) => {
  return Monster.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteMonster = (id) => {
  return Monster.findByIdAndDelete(id);
};

exports.getMonsters = (page, size) => {
  const skip = (page - 1) * size;
  return Monster.find().skip(skip).limit(size);
};
