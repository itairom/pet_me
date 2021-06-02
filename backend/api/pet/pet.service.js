const fs = require('fs')
const gPets = require('../../data/pet.json')

async function query(entityType, filterBy = '') {

    const { type, age, location, gender, size } = filterBy

    try {
        const entities = await gPets// JSON.parse(localStorage.getItem(entityType)) || []

        // if (type) {
        //     entities = entities.filter(entity => entity.type.includes(type))
        // }
        // if (age) {
        //     entities = entities.filter(entity => entity.age.includes(age))
        // }
        // if (location) {
        //     entities = entities.filter(entity => entity.owner.loc.address.toUpperCase().includes(location.toUpperCase()))
        // }
        // if (gender) {
        //     entities = entities.filter(entity => entity.gender === gender)
        // }
        // if (size) {
        //     entities = entities.filter(entity => entity.size.toUpperCase().includes(size.toUpperCase()))
        // }
        // // save(entityType, entities)

        return entities
    }

    catch {
        logger.error('cannot find pets', err)
        throw err
    }

}

function get(entityType, entityId) {
    return query(entityType)
        .then(entities => entities.find(entity => entity._id === entityId))
}

function post(entityType, newEntity) {
    newEntity._id = _makeId()
    return query(entityType)
        .then(entities => {
            console.log("🚀 ~ file: asyncStorageService.js ~ line 38 ~ query ~ entities", entities)
            entities.push(newEntity)
            save(entityType, entities)
            return newEntity
        })
}

function put(entityType, updatedEntity) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
            entities.splice(idx, 1, updatedEntity)
            save(entityType, entities)
            return updatedEntity
        })
}

function remove(entityType, entityId) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === entityId)
            entities.splice(idx, 1)
            save(entityType, entities)
        })
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



module.exports = {
    query, get
}