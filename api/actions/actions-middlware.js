// add middlewares here related to actions
const Actions = require("./actions-model");

async function validateActionsId (req, res, next) {
    try {
        const project = await Actions.get(req.params.id)
        if (!action) {
            res.status(404).json({ message: 'no such user'})
        } else {
            req.project = action
            res.json(action)
            next()
        }
    } catch (error) {
        next()
    }
}

function validateActions (req, res, next) {
    const { name, description } = req.body
    if (!name || !description) {
        res.status(400).json({ message: 'body is missing name'})
    } else {
        next()
    }
}

module.exports= {validateActionsId, validateActions}