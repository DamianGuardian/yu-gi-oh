class CreateMonsterDto {
    constructor({ name, type, level, attack, defense, attribute, description }) {
      this.name = name;
      this.type = type;
      this.level = level;
      this.attack = attack;
      this.defense = defense;
      this.attribute = attribute;
      this.description = description;
    }
  }
  
  module.exports = CreateMonsterDto;
  