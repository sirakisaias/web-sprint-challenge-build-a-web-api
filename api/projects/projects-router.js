// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model');

const router = express.Router();

//GET api/projects
router.get('/', (req, res, next) => {
    Projects.get()
    .then(projects => {
        res.json(projects)
    })
    .catch(next)
})

module.exports = router