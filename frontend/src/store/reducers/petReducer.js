const initialState = {
    pets: [],
    pet: null,
    filter: null
}

export function petReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_PETS':
            return { ...state, pets: action.pets }
        case 'ADD_PET':
            return { ...state, pets: [...state.pets, action.pet] }
        case 'REMOVE_PET':
            return { ...state, pets: state.pets.filter(pet => pet._id !== action.petId) }
        case 'ADD_LIKE':
            return {
                ...state,
                pets: state.pets.map(pet => {
                    if (pet._id === action.petId) {
                        pet.likes++
                        pet.likedBy.push(action.userId)
                        return pet;
                    }
                    return pet;
                })
            }
        case 'REMOVE_LIKE':
            return {
                ...state,
                pets: state.pets.map(pet => {
                    if (pet._id === action.petId) {
                        pet.likes--
                        pet.likedBy.splice(action.idx, 1)
                        return pet;
                    }
                    return pet;
                })
            }
        case 'SET_FILTER':
            return { ...state, filter: action.filter }
        default:
            return state
    }
}