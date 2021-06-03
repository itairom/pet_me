const logger = require('../../services/logger.service')
const petService = require('../pet/pet.service')
const STORAGE_KEY = 'pets'

async function getPets(req, res) {
    try {
        const filterBy = req.query
        const pets = await petService.query( filterBy)
        res.send(pets)
    } catch (err) {
        logger.error('failed to get pets', err)
        res.status(500).send({ err: 'failed to get pets' })
    }
}
async function getPetByid(req, res) {
    try {
        const petId = req.params.id
        const pets = await petService.get(STORAGE_KEY, petId)
        res.send(pets)
    } catch (err) {
        logger.error('Failed to get pet by id', err)
        res.status(500).send({ err: 'Failed to get pet by id' })
    }
}
async function addLike(req, res) {
    try {
        const like = req.body
        const pet = await petService.addLike(like)
        res.send(pet)
    } catch (err) {
        logger.error('Failed to get pet by id', err)
        res.status(500).send({ err: 'Failed to get pet by id' })
    }
}
async function addComment(req, res) {
    try {
        const like = req.body
        const pet = await petService.addComment(like)
        res.send(pet)
    } catch (err) {
        logger.error('Failed to get pet by id', err)
        res.status(500).send({ err: 'Failed to get pet by id' })
    }
}

module.exports = {
    getPets, getPetByid, addLike, addComment
}
