const express = require('express');
const router = express.Router();
const monsterController = require('../controllers/monsterController');

// Verifica que estas funciones EXISTEN y se exportan correctamente
router.get('/', monsterController.getAllMonsters);
router.post('/', monsterController.createMonster);
router.get('/:id', monsterController.getMonsterById);
router.put('/:id', monsterController.updateMonster);
router.delete('/:id', monsterController.deleteMonster);

module.exports = router;
