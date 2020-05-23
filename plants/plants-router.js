const express = require('express');
const Plants = require('./plants-model');
const restricted = require('../auth/auth-router')


const router = express.Router();

router.get('/plants', restricted, (req, res) => {
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

router.get('/plants/:id', restricted, (req, res) => {
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

router.post('/plants', restricted, (req, res) => {
    const plantData = req.body;

    Plants.addPlant(plantData)
        .then((plant) => {
            res.status(201).json(plant);
        })
        .catch((err) => {
            res.status(500).json({ message: 'Failed to add plant' });
        });
});

router.post('/species', restricted, (req, res) => {
    const speciesData = req.body

    Plants.addSpecies(speciesData).then((species) => {
        res.status(201).json(species)
    }).catch(err => {
        res.status(500).json({ message: 'Failed to add species' })
    })
})

router.put('/plants/:id', restricted, (req, res) => {
    const { id } = req.params
    const changes = req.body
    
    Plants.findPlantById(id).then(plant => {
        if (plant) {
            Plants.updatePlant(changes, id).then(updatedPlant => {
                res.json(updatedPlant)
            })
        } else {
            res.status(404).json({ message: 'Could not find plant with given id'})
        }
    }).catch(err => {
        res.status(500).json({ message: 'Failed to update plant'})
    })
})

router.put('/species/:id', restricted, (req, res) => {
    const { id } = req.params
    const changes = req.body
    
    Plants.findSpeciesById(id).then(species => {
        if (species) {
            Plants.updateSpecies(changes, id).then(updatedSpecies => {
                res.json(updatedSpecies)
            })
        } else {
            res.status(404).json({ message: 'Could not find species with given id'})
        }
    }).catch(err => {
        res.status(500).json({ message: 'Failed to update species' })
    })
})

router.delete('/plants/:id', restricted, (req, res) => {
    const { id } = req.params

    Plants.removePlant(id).then(deleted => {
        if (deleted) {
            res.json({ removed: deleted })
        } else {
            res.status(404).json({ message: 'Could not find plant with given id' })
        }
    }).catch(err => {
        res.status(500).json({ message: 'Failed to delete plant' })
    })
})

router.delete('/species/;id',restricted,  (req, res) => {
    Plants.removeSpecies(id).then(deleted => {
        if (delted) {
            res.json({ removed: deleted })
        } else {
            res.status(404).json({ message: 'Could not find species with given id' })
        }
    }).catch(err => {
        res.status(500).json({ message: 'Failed to delete species' })
    })
})