import { userService } from '../../services/userService'

// THUNK action creators
// Work asynchronously with the service and dispatch actions to the reducers 

export function loadUsers() {
  return async dispatch => {
    try {
      dispatch({ type: 'LOADING_START' })
      const users = await userService.getUsers()
      dispatch({ type: 'SET_USERS', users })
    } catch (err) {
      console.log('UserActions: err in loadUsers', err)
    } finally {
      dispatch({ type: 'LOADING_DONE' })
    }
  }
}

export function removeUser(userId) {
  return async dispatch => {
    try {
      await userService.remove(userId)
      dispatch({ type: 'REMOVE_USER', userId })
    } catch (err) {
      console.log('UserActions: err in removeUser', err)
    }
  }
}


export function login(userCreds) {
  return async dispatch => {
    try {
      const user = await userService.login(userCreds)
      console.log("🚀 ~ file: userActions.js ~ line 36 ~ login ~ user", user)
      dispatch({ type: 'SET_USER', user })
    } catch (err) {
      console.log('UserActions: err in login', err)
    }
  }
}
export function signup(userCreds) {
  return async dispatch => {
    try {
      const user = await userService.signup(userCreds)
      dispatch({ type: 'SET_USER', user })
    } catch (err) {
      console.log('UserActions: err in signup', err)
    }
  }
}
export function logout() {
  console.log('logout');
  return async dispatch => {
    try {
      await userService.logout()
      dispatch({ type: 'SET_USER', user: null })
    } catch (err) {
      console.log('UserActions: err in logout', err)
    }
  }
}

export function adoptRequest(request) { 
  return dispatch => {
      return userService.adoptRequest(request)
          .then(request => {
          console.log("🚀 ~ file: userActions.js ~ line 69 ~ adoptRequest ~ request", request)
              const action = {
                  type: 'ADD_REQUEST', request
              }
              dispatch(action)
          })
  }
}