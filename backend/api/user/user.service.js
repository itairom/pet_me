
const dbService = require('../../services/db.service')
// const logger = require('../../services/logger.service')
const reviewService = require('../review/review.service')
const gUsers = require('../../data/user.json')


module.exports = {
    query,
    getById,
    getByUsername,
    remove,
    update,
    add,
    updateRequest
}

async function query() {

    try {
        const entities = await gUsers
        return entities
    }

    catch (err) {
        logger.error('cannot find userz', err)
        throw err
    }
}

async function getById(userId) {
    try {
        const collection = await dbService.getCollection('user')
        const user = await collection.findOne({ '_id': ObjectId(userId) })
        delete user.password

        user.givenReviews = await reviewService.query({ byUserId: ObjectId(user._id) })
        user.givenReviews = user.givenReviews.map(review => {
            delete review.byUser
            return review
        })

        return user
    } catch (err) {
        logger.error(`while finding user ${userId}`, err)
        throw err
    }
}
async function getByUsername(username) {
    const entities = await gUsers
    try {
        return entities.find(entity => entity.username === username)

    } catch (err) {
        logger.error(`while finding user ${username}`, err)
        throw err
    }
}

async function remove(userId) {
    try {
        const collection = await dbService.getCollection('user')
        await collection.deleteOne({ '_id': ObjectId(userId) })
    } catch (err) {
        logger.error(`cannot remove user ${userId}`, err)
        throw err
    }
}

async function updateRequest(request) {
    try {
    const entities = await gUsers
    // let user = entities.find(user => user._id === request.userId)
    // console.log("🚀 ~ file: user.service.js ~ line 75 ~ updateRequest ~ user", user)
    // user.pets.find((pet)=> {pet._id===petId})

    return request
    }
    catch(err){
        logger.error(`cannot add req `, err)
        throw err
    }
}


async function update(user) {
    try {
        // peek only updatable fields!
        const userToSave = {
            _id: ObjectId(user._id),
            username: user.username,
            fullname: user.fullname,
            score: user.score
        }
        const collection = await dbService.getCollection('user')
        await collection.updateOne({ '_id': userToSave._id }, { $set: userToSave })
        return userToSave;
    } catch (err) {
        logger.error(`cannot update user ${user._id}`, err)
        throw err
    }
}

async function add(user) {
    try {
        // peek only updatable fields!
        const userToAdd = {
            username: user.username,
            password: user.password,
            fullname: user.fullname,
            score: user.score || 0
        }
        const collection = await dbService.getCollection('user')
        await collection.insertOne(userToAdd)
        return userToAdd
    } catch (err) {
        logger.error('cannot insert user', err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.txt) {
        const txtCriteria = { $regex: filterBy.txt, $options: 'i' }
        criteria.$or = [
            {
                username: txtCriteria
            },
            {
                fullname: txtCriteria
            }
        ]
    }
    if (filterBy.minBalance) {
        criteria.score = { $gte: filterBy.minBalance }
    }
    return criteria
}


