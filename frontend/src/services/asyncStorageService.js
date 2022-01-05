export const storageService = {
    query,
    get,
    post,
    put,
    remove,
    save,
    postComment
}

function query(entityType, filterBy = '') {
    const { type, age, location, gender, size } = filterBy
    var entities = JSON.parse(localStorage.getItem(entityType)) || []

    if (type) {
        entities = entities.filter(entity => entity.type.includes(type))
    }
    if (age) {
        entities = entities.filter(entity => entity.age.includes(age))
    }
    if (location) {
        entities = entities.filter(entity => entity.owner.loc.address.toUpperCase().includes(location.toUpperCase()))
    }
    if (gender) {
        entities = entities.filter(entity => entity.gender===gender)
    }
    if (size) {
        entities = entities.filter(entity => entity.size.toUpperCase().includes(size.toUpperCase()))
    }


    return Promise.resolve(entities)
}

function get(entityType, entityId) {
    return query(entityType)
        .then(entities => entities.find(entity => entity._id === entityId))
}

function post(entityType, newEntity) {
    return query(entityType)
        .then(entities => {
            entities.push(newEntity)
            save(entityType, entities)
            return newEntity
        })
}

function postComment(entityType, newComment) {
    const { txt, petId, loggedInUser } = newComment

    return query(entityType)
        .then(entities => {
            console.log("🚀 ~ file: asyncStorageService.js ~ line 38 ~ query ~ entities", entities)
            const pet = entities.find((entity) => entity._id === petId)
            const newComment = {
                "id": petId,
                "txt": txt,
                "created": Date.now(),
                "by": {
                    "_id": loggedInUser._id,
                    "fullname": loggedInUser.fullname,
                    "imgUrl": loggedInUser.imgUrl
                }
            }
            pet.comments.push(newComment)
            const idx = entities.findIndex(entity => entity._id === petId)
            entities.splice(idx, 1, pet)
            save(entityType, entities)
            return newComment
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
