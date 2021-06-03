const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { getPets, getPetByid, addLike, addComment } = require('./pet.controller')
const router = express.Router()

router.post('/comment/:petId', addComment)
router.get('/:id', log, getPetByid)
router.post('/like', addLike)
router.get('/', getPets)


module.exports = router