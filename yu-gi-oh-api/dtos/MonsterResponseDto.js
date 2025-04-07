class MonsterResponseDto {
    constructor(monster) {
      this.id = monster._id;
      this.name = monster.name;
      this.attack = monster.attack;
      this.defense = monster.defense;
      this.level = monster.level;
      this.attribute = monster.attribute;
      this.description = monster.description;
    }
  }
  
  module.exports = MonsterResponseDto;
  