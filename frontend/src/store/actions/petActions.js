import { petService } from '../../services/petService.js'

export function loadPets(filterBy) { // Action Creator
    return async dispatch => {
        try {
            const pets = await petService.query(filterBy)
            dispatch({ type: 'SET_PETS', pets })
        }
        catch (err) {
            console.log('unable to query pets', err);
        }
    }
}
export function addPet(pet) {
    return dispatch => {
        return petService.add(pet)
            .then(pet => {
                const action = {
                    type: 'ADD_PET', pet
                }
                dispatch(action)
            })
    }
}

export function updatePet(pet) { // Action Creator
    return dispatch => {
        return petService.add(pet)
            .then(pet => {
                const action = {
                    type: 'UPDATE_PET', pet
                }
                dispatch(action)
            })
    }
}


export function removePet(petId) { // Action Creator
    return dispatch => {
        return petService.remove(petId)
            .then((petId) => {
                const action = {
                    type: 'REMOVE_PET', petId: petId + ''
                }
                dispatch(action)
            })
    }
}

export function toggleLike(petId, userId, act, idx) { // Action Creator
    console.log(petId, userId, act, idx)
    return dispatch => {
        return petService.toggleLike(petId, userId, act, idx)
            .then((petId, newLikedBy) => {
                console.log('newLikedBy', newLikedBy)
                const action = {
                    type: (act === 1) ? 'ADD_LIKE' : 'REMOVE_LIKE',
                    petId,
                    userId,
                    idx
                }
                dispatch(action)
            })
    }
}

export function addComment(petId, msg) { // Action Creator
    return dispatch => {
        return petService.addComment(petId, msg)
            .then((msg) => {
                const action = {
                    type: 'ADD_COMMENT',
                    msg: msg

                }
                dispatch(action)
            })
    }
}


