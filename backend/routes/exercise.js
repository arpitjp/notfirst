const express = require('express');
const router = express.Router();
const exercises = require('../models/exercises.models');

router.get('/', (req, res) => {
    exercises.find()
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('CUSTOM MESSAGE: following error occured ' + err));
});

router.get('/:id', (req, res) => {
    exercises.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('CUSTOM MESSAGE: following error occured ' + err));
})

router.delete('/:id', (req, res) => {
    exercises.findByIdAndDelete(req.params.id)
        .then(() => res.json('CUSTOM MESSAGE: exercise deleted'))
        .catch(err => res.status(400).json('CUSTOM MESSAGE: following error occured ' + err));
})

router.post('/add', (req, res) => {
    const username = req.body.username;
    const date = req.body.date;
    const description = req.body.description;
    const duration = req.body.duration;

    const newExercise = new exercises({ username, duration, date, description });
    newExercise.save()
        .then(() => res.json('CUSTOM MESSAGE: new exercise added'))
        .catch(err => res.status(400).json('CUSTOM MESSAGE: following error occured ' + err));
});

router.post('/update/:id', (req, res) => {
    exercises.findById(req.params.id)
        .then(exercise => {
            exercise.username = req.body.username || exercise.username;
            exercise.description = req.body.description || exercise.description;
            exercise.duration = Number(req.body.duration) || exercise.duration;
            exercise.date = Date.parse(req.body.date) || exercise.date;

            exercise.save()
                .then(() => res.json('CUSTOM MESSAGE: given id updated'))
                .catch(err => res.status(400).json('CUSTOM MESSAGE: following error occured ' + err));
        })
        .catch(err => res.status(400).json('CUSTOM MESSAGE: following error occured ' + err));
});

module.exports = router;
