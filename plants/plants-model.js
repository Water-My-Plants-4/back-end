const db = require('../data/dbConfig');

module.exports = {
    findPlants,
    findSpecies,
    findPlantById,
    findSpeciesById,
    addPlant,
    addSpecies,
    updatePlant,
    updateSpecies,
    removePlant,
    removeSpecies
};

const findPlants = () => {
    return db('plants');
};

const findSpecies = () => {
    return db('species');
};

const findPlantById = (id) => {
    return db('plants').where({ id }).first();
};

const findSpeciesById = (id) => {
    return db('species').where({ id }).first();
};

const addPlant = (plant) => {
    return db('plants').insert(plant).where();
};

const addSpecies = (species) => {
    return db('species').insert(species).where();
};

const updatePlant = (changes, id) => {
    return db('plants')
        .where({ id })
        .update(changes)
        .then(() => {
            return findPlantById(id);
        });
};

const updateSpecies = (changes, id) => {
    return db('species')
        .where({ id })
        .update(changes)
        .then(() => {
            return findSpeciesById(id);
        });
};

const removePlant = (id) => {
    return db('plants').where({ id }).delete();
};

const removeSpecies = (id) => {
    return db('species').where({ id }).delete();
};
