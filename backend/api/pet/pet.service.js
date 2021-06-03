const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId


async function query(filterBy = '') {
    // console.log("🚀 ~ file: pet.service.js ~ line 7 ~ query ~ filterBy", filterBy)
    const criteria = _buildCriteria(filterBy)
    // console.log("🚀 ~ file: pet.service.js ~ line 9 ~ query ~ criteria", criteria)

    try {
        const collection = await dbService.getCollection('pet')
        const pets = await collection.find(criteria).toArray()
        return pets
    } catch (err) {
        logger.error('cannot find pets', err)
        throw err
    }
}
async function addComment(comment) {
    const { txt, petId, loggedInUser } = comment
    const commentToAdd =
    {
        id: petId,
        txt,
        created: Date.now(),
        by: {
            _id: loggedInUser._id,
            fullname: loggedInUser.fullname,
            imgUrl: loggedInUser.imgUrl
        }
    }
    try {
        const collection = await dbService.getCollection('pet')
        await collection.findOne({ _id: petId }, { $push: { comments: commentToAdd } })
        return commentToAdd
    } catch (err) {
        logger.error('cannot find pets', err)
        throw err
    }
}

function get(entityType, entityId) {
    return query(entityType)
        .then(entities => entities.find(entity => entity._id === entityId))
}

async function addLike(likeDetails) {
    const { petId, userId, act } = likeDetails

    const collection = await dbService.getCollection('pet')
    if (act > 0) {
        await collection.updateOne({ _id: petId }, { $inc: { likes: 1 } });
    }
    else {
        await collection.updateOne({ _id: petId }, { $inc: { likes: -1 } });
    }
    // await collection.updateOne({ _id: petId }, { $addToSet: { likedBy: userId } });
    return act
}



function save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}


function _makeId(length = 5) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

function _buildCriteria(filterBy) {
    console.log("🚀 ~ file: pet.service.js ~ line 79 ~ _buildCriteria ~ filterBy", filterBy)

    if (!filterBy) return {}

    const { type, age, location, gender, size } = filterBy

    const criteria = {}
    // if (filterBy.type === type ) {


    if (size) {
        criteria.size.find( { $text: { $search: size } } )
    }
    if (type) {
        criteria.type = type
    }
    if (age) {
        criteria.age = type
    }
    if (gender) {
        criteria.gender = gender
    }
    if (location) {
        criteria.location.include(location)
    }

    return criteria
}

module.exports = {
    query, get, addLike, addComment
}