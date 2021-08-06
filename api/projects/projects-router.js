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

module.exports = router