const Animal = require('./models/Animal');

const resolvers = {
  Query: {
    animals: async () => {
      try {
        const animals = await Animal.find();
        return animals;
      } catch (err) {
        console.error(err);
        throw new Error('Failed to fetch animals');
      }
    },
  },
};

module.exports = resolvers;
