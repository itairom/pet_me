const initialState = {
    pets: [],
    pet: null
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
                        return pet;
                    }
                    return pet;
                })
            }
        default:
            return state
    }
}