// Write your "actions" router here!
const express = require('express');
const Actions = require('./actions-model');

const router = express.Router();

const { validateActionsId, validateActions } = require('./actions-middlware')


//GET api/actions
router.get('/', (req, res, next) => {
    Actions.get()
    .then(projects => {
        res.json(projects)
    })
    .catch(next)
})

//GET api/actions by id
router.get('/:id', validateActionsId, (req, res ) => {
    res.json(req.Actions)
})

//POST api/projects
router.post('/', validateActions, (req, res, next) => {
    Actions.insert(req.body)
    .then(post => {
        res.json(post)
    })
    .catch(next)
})

//Put api/actions 
router.put('/:id', async (req, res, next) => {
    
    const {id} = req.params;
    const body = req.body;

    if (!body.description || !body.notes) {
        res.status(400).json({message: 'fields required'})
    } else {
        
        try {
            const project = await Actions.update(id, body);
            res.status(200).json(project)
        } catch  {
            next()
        }
    }
})

//DELETE
router.delete('/:id', validateActionsId, (req, res, next) => {
    Actions.remove(req.project.id)
    .then(() => {
        res.status(200).json({message: 'deleted'})
    })
    .catch(next)
})


module.exports = router