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

//GET api/projects by id
router.get('/:id', (req, res, next) => {
    const {id} = req.params
    Projects.get(id)
    .then(project =>{
        if (project){
            res.json(project)
        } else {
            res.status(404).json({ message: 'project not found'})
        }
    })
    .catch(next)
})

//POST api/projects
router.post('/', (req, res, next) => {
    const {name, description} = req.body
    Projects.insert(req.body)
    .then(post => {
        if (!name || !description) {
            res.status(400).json({ message: 'body is missing name'})
        } else {
            res.json(post)
        }
    })
    .catch(next)
})

module.exports = router