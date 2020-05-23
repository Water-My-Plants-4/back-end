const express = require('express');
const Plants = require('./plants-model');

const router = express.Router();

router.get('/plants', (req, res) => {
    Plants.findPlants()
        .then((plants) => {
            res.json(plants);
        })
        .catch((err) => {
            res.status(500).json({ message: 'Failed to get plants' });
        });
});

router.get('/species', (req, res) => {
    Plants.findSpecies()
        .then((species) => {
            res.json(species);
        })
        .catch((err) => {
            res.status(500).json({ message: 'Failed to get species' });
        });
});

router.get('/plants/:id', (req, res) => {
    const { id } = req.params;

    Plants.findPlantById(id)
        .then((plant) => {
            if (plant) {
                res.json(plant);
            } else {
                res.status(404).json({
                    message: 'Could not find plant with given id',
                });
            }
        })
        .catch((err) => {
            res.status(500).json({ message: 'Failed to get plant' });
        });
});

router.get('/species/:id', (req, res) => {
    const { id } = req.params;

    Plants.findSpeciesById(id)
        .then((species) => {
            if (species) {
                res.json(species);
            } else {
                res.status(404).json({
                    message: 'Could not find species with given id',
                });
            }
        })
        .catch((err) => {
            res.status(500).json({ message: 'Failed to get species' });
        });
});

router.post('/plants', (req, res) => {
    const plantData = req.body;

    Plants.addPlant(plantData)
        .then((plant) => {
            res.status(201).json(plant);
        })
        .catch((err) => {
            res.status(500).json({ message: 'Failed to add plant' });
        });
});
