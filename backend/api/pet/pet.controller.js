const logger = require('../../services/logger.service')
const petService = require('../pet/pet.service')
const STORAGE_KEY = 'pets'

async function getPets(req, res) {
    try {
        const filterBy = req.query
        console.log("🚀 ~ file: pet.controller.js ~ line 9 ~ getPets ~ filterBy", filterBy)
        const pets = await petService.query(STORAGE_KEY, filterBy)
        console.log('after service');
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




module.exports = {
    getPets, getPetByid
}