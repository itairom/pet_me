

export const storageService = {
    query,
    get,
    post,
    put,
    remove,
    save
}

function query(entityType, filterBy='') {
    const { type } = filterBy

    var entities = JSON.parse(localStorage.getItem(entityType)) || []
    console.log('type', type);

    if (type) {
        entities = entities.filter(entity => entity.type.includes(type))
    }


    return Promise.resolve(entities)
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