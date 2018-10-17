const express = require('express');
const router = express.Router();
const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

// Create New Cohort
router.post('/', (req, res) => {
  const name = req.body;

  db.insert(name)
    .into('cohorts')
    .then(id => {
      res.status(201).json(id);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// Get All Cohorts
router.get('/', (req, res) => {
  db('cohorts')
    .then(cohorts => {
      res.status(200).json(cohorts);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// Get Cohort By ID
router.get('/:id', (req, res) => {
  const { id } = req.params;

  db('cohorts')
    .where({ id })
    .first()
    .then(cohort => {
      if (cohort) {
        res.status(200).json(cohort);
      } else {
        res.status(404).json({ message: 'Cohort not found' });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// Get All Students By Cohort

router.get('/:id/students', (req, res) => {
  const { id } = req.params;

  db('students')
    .where({ cohort_id: id })
    .then(students => {
      res.status(200).json(students);
    })
    .catch(err => res.status(500).json(err.message));
});

// Update Cohort
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  console.log(req.body);

  db('cohorts')
    .where({ id })
    .update(changes)
    .then(count => {
      if (!count || count < 1) {
        res.statusMessage(404).json({ message: 'No records found to update' });
      }
      res.status(200).json(count);
    })
    .catch(err => res.status(500).json(err.message));
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db('cohorts')
    .where({ id })
    .del(changes)
    .then(count => {
      if (!count || count < 1) {
        res.statusMessage(404).json({ message: 'No records found to delete' });
      }
      res.status(200).json(count);
    })
    .catch(err => res.status(500).json(err.message));
});

module.exports = router;
