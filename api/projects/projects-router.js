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

//Put api/projects 
router.put('/:id', async (req, res, next) => {
    // Projects.update(req.params.id, req.body)
    // .then(() =>{
    //     return Projects.get(req.params.id)
    // })
    // .then(project =>{
    //     res.json(project)
    // })
    // .catch(next)
    const {id} = req.params;
    const body = req.body;

    if (!body.name || !body.description) {
        res.status(400).json({message: 'fields required'})
    } else {
        
        try {
            const project = await Projects.update(id, body);
            res.status(200).json(project)
        } catch  {
            next()
        }
    }
})

//DELETE
router.delete('/:id', validateProjectsId, (req, res, next) => {
    Projects.remove(req.project.id)
    .then(() => {
        res.status(200).json({message: 'deleted'})
    })
    .catch(next)
})

//GET projects/:id/actions
// router.get(':id/actions', validateProjectsId, (req, res, next) => {
//     Projects.getProjectActions(req.params.id)
//     .then(projectAction => {
//         res.json(projectAction)
//     })
//     .catch(next)
// })
router.get("/:id/actions", (req, res, next) => {
    const { id } = req.params;
    Projects.getProjectActions(id)
      .then((actions) => {
        if (!actions) {
          res.status(404);
        } else {
          res.json(actions);
        }
      })
      .catch(next);
  });


module.exports = router