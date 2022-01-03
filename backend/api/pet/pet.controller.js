const logger = require('../../services/logger.service')
const petService = require('../pet/pet.service')
const STORAGE_KEY = 'pets'

async function getPets(req, res) {
    try {
        const filterBy = req.query
        const pets = await petService.query(filterBy)
        res.send(pets)
    } catch (err) {
        logger.error('failed to get pets', err)
        res.status(500).send({ err: 'failed to get pets' })
    }
}
async function getPetByid(req, res) {
    try {
        const petId = req.params.id
        const pet = await petService.getById(petId)
        res.send(pet)
    } catch (err) {
        logger.error('Failed to get pet by id', err)
        res.status(500).send({ err: 'Failed to get pet by id' })
    }
}
// async function getPetByid(req, res) {
//     try {
//         const petId = req.params.id
//         const pets = await petService.get(STORAGE_KEY, petId)
//         console.log("🚀 ~ file: pet.controller.js ~ line 19 ~ getPetByid ~ pets", pets)
//         res.send(pets)
//     } catch (err) {
//         logger.error('Failed to get pet by id', err)
//         res.status(500).send({ err: 'Failed to get pet by id' })
//     }
// }

async function updatePet(req, res) {
    try {
        const pet = req.body
        const savedPet = await petService.save(pet)
        res.send(savedPet)
        // socketService.broadcast({ type: 'pet-updated', data: 'review', to: savedpet._id })
    } catch (err) {
        logger.error('Failed to update pet', err)
        res.status(500).send({ err: 'Failed to update pet' })
    }
}


module.exports = {
    getPets,
    getPetByid,
    updatePet
}
