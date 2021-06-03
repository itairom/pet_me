let localLoggedinUser = null
if (sessionStorage.loggedinUser) localLoggedinUser = JSON.parse(sessionStorage.loggedinUser)

const initialState = {
  loggedInUser: localLoggedinUser,
  users: [],
  pets: {} //userId => pets
}

export function userReducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, loggedInUser: action.user }
    case 'REMOVE_USER':
      return {
        ...state,
        users: state.users.filter(user => user._id !== action.userId)
      }
    case 'ADD_REQUEST':
      console.log('adding request on reducer')
      return { ...state, users: action.users }

    case 'SET_USERS':
      return { ...state, users: action.users }
  
    case 'ADOPT':
      const user = state.users.find(user => user._id === action.userId)
      const userPet = user.pets.find(pet => pet._id)
      userPet.adoptQue.push({
        userId: action.userId,
        message: action.message,
        //"chatId": "i11"
      })
      user.pets = userPet;
      const idx = state.users.findIndex(user => user._id === action.userId)
      state.users.splice(idx, 1, user)
      return { ...state, users: action.users }



    case 'SET_SCORE':
      return { ...state, loggedInUser: { ...state.loggedInUser, score: action.score } }
    default:
      return state
  }
}
