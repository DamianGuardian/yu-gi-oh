const Monster = require('../models/Monster');

exports.getAllMonsters = async (req, res) => {
  const monsters = await Monster.find();
  res.json(monsters);
};

exports.getMonsterById = async (req, res) => {
  const monster = await Monster.findById(req.params.id);
  res.json(monster);
};

exports.createMonster = async (req, res) => {
  const monster = new Monster(req.body);
  await monster.save();
  res.status(201).json(monster);
};

exports.updateMonster = async (req, res) => {
  const updated = await Monster.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteMonster = async (req, res) => {
  await Monster.findByIdAndDelete(req.params.id);
  res.json({ message: 'Monster deleted' });
};
