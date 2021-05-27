import {petService} from '../../services/petService.js'
// import {petService} from '../../services/'

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
    console.log("🚀 ~ file: pet.actions.js ~ line 16 ~ addpet ~ pet", pet)
    return dispatch => {
        return petService.add(pet)
            .then(pet => {
                console.log("🚀 ~ file: pet.actions.js ~ line 20 ~ addpet ~ pet", pet)
                const action = {
                    type: 'ADD_PET', pet
                }
                dispatch(action)
            })
    }
}

export function updatePet(pet) { // Action Creator
    console.log("🚀 ~ file: pet.actions.js ~ line 28 ~ updatepet ~ pet", pet)
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

