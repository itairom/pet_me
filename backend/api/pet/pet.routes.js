const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { getPets,getPetByid } = require('./pet.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getPets)
router.get('/:id',  log, getPetByid)
// router.post('/', requireAuth, requireAdmin, log, addToy)
// router.delete('/:id', requireAuth, requireAdmin, log, deleteToy)

module.exports = router