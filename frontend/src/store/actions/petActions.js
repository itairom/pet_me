import { toysService } from '../../services/petService.js'


export function loadToys(filterBy) { // Action Creator
    return async dispatch => {
        try {
            const toys = await toysService.query(filterBy)
            dispatch({ type: 'SET_TOYS', toys })
        }
        catch (err) {
            console.log('unable to query toys', err);
        }

    
    }
}
export function addToy(toy) { 
    console.log("🚀 ~ file: toy.actions.js ~ line 16 ~ addToy ~ toy", toy)
    return dispatch => {
        return toysService.add(toy)
            .then(toy => {
                console.log("🚀 ~ file: toy.actions.js ~ line 20 ~ addToy ~ toy", toy)

                const action = {
                    type: 'ADD_TOY', toy
                }
                dispatch(action)
            })
    }
}

export function updateToy(toy) { // Action Creator
    console.log("🚀 ~ file: toy.actions.js ~ line 28 ~ updateToy ~ toy", toy)
    return dispatch => {
        return toysService.add(toy)
            .then(toy => {
                const action = {
                    type: 'UPDATE_TOY', toy
                }
                dispatch(action)
            })
    }
}

export function removeToy(toyId) { // Action Creator

    return dispatch => {
        return toysService.remove(toyId)
            .then((toyId) => {
                const action = {
                    type: 'REMOVE_TOY', toyId: toyId + ''
                }
                dispatch(action)
            })
    }
}

