module.exports = {
  async up(db) {
    await db.collection('monsters').insertMany([
      {
        name: "Summoned Skull",
        type: "Fiend",
        level: 6,
        attack: 2500,
        defense: 1200,
        attribute: "DARK",
        description: "A fiend with dark powers for confusing the enemy."
      },
      {
        name: "Red-Eyes Black Dragon",
        type: "Dragon",
        level: 7,
        attack: 2400,
        defense: 2000,
        attribute: "DARK",
        description: "A ferocious dragon with a deadly attack."
      },
      {
        name: "Celtic Guardian",
        type: "Warrior",
        level: 4,
        attack: 1400,
        defense: 1200,
        attribute: "EARTH",
        description: "An elf who learned to wield a sword."
      }
    ]);
  },

  async down(db) {
    await db.collection('monsters').deleteMany({
      name: { $in: ["Summoned Skull", "Red-Eyes Black Dragon", "Celtic Guardian"] }
    });
  }
};
