const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { getPets, getPetByid, updatePet } = require('./pet.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getPets)
router.get('/:id', log, getPetByid)
router.put('/:id', log, updatePet)
// router.delete('/:id', requireAuth, requireAdmin, log, removePet)

module.exports = router