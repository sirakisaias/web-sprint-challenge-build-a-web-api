// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model');
const { validateProjectsId, validatePoject } = require('./projects-middleware')

const router = express.Router();

//GET api/projects
router.get('/', (req, res, next) => {
    Projects.get()
    .then(projects => {
        res.json(projects)
    })
    .catch(next)
})

//GET api/projects by id
router.get('/:id', validateProjectsId, (req, res, next) => {
    res.json(req.Projects)
})

//POST api/projects
router.post('/', validatePoject, (req, res, next) => {
    Projects.insert(req.body)
    .then(post => {
        res.json(post)
    })
    .catch(next)
})

module.exports = router