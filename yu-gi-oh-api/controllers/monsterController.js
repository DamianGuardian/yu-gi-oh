const Monster = require('../models/Monster');

// Obtener todos los monstruos
exports.getAllMonsters = async (req, res) => {
  try {
    const monsters = await Monster.find();
    res.status(200).json(monsters);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los monstruos', error: error.message });
  }
};

// Obtener monstruo por ID
exports.getMonsterById = async (req, res) => {
  try {
    const monster = await Monster.findById(req.params.id);

    if (!monster) {
      return res.status(404).json({ message: 'Monstruo no encontrado' });
    }

    res.status(200).json(monster);
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar el monstruo', error: error.message });
  }
};

// Crear nuevo monstruo
exports.createMonster = async (req, res) => {
  try {
    const monster = new Monster(req.body);
    await monster.save();
    res.status(201).json(monster);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear el monstruo', error: error.message });
  }
};

// Actualizar monstruo por ID
exports.updateMonster = async (req, res) => {
  try {
    const updated = await Monster.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updated) {
      return res.status(404).json({ message: 'Monstruo no encontrado' });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el monstruo', error: error.message });
  }
};

// Eliminar monstruo por ID
exports.deleteMonster = async (req, res) => {
  try {
    const deleted = await Monster.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: 'Monstruo no encontrado' });
    }

    res.status(200).json({ message: 'Monstruo eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el monstruo', error: error.message });
  }
};
