import { userService } from '../../services/userService'
import { socketService } from '../../services/socketService'

// THUNK action creators
// Work asynchronously with the service and dispatch actions to the reducers 

export function loadUsers() {
  return async dispatch => {
    try {
      dispatch({ type: 'LOADING_START' })
      const users = await userService.getUsers()
      dispatch({ type: 'SET_USERS', users })
      //for sending new requests
      socketService.on('user-updated', newAdoptReq => {
        console.log(newAdoptReq)
        dispatch({
          type: 'ADD_REQUEST', newAdoptReq
        })

      })
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
  // console.log("🚀 ~ file: userActions.js ~ line 42 ~ login ~ userCreds", userCreds)
  return async dispatch => {
    try {
      const user = await userService.login(userCreds)
      // const user = await userService.login(userCreds)
      // .then(x => {
      socketService.emit('user-watch', user._id)
      // })
      // console.log("🚀 ~ file: userActions.js ~ line 36 ~ login ~ user", user)
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

export function logout(userId) {
  console.log('logout');
  return async dispatch => {
    // socketService.off(userId)
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

export function newAdoptRequest(data) { // Action Creator
  return dispatch => {
    console.log('im in user action before service')
    return userService.saveNewRequest(data)
      .then((updatedUser) => {
        socketService.emit('adopt-request', data)
        console.log('im in user action after service')
        const action = {
          type: 'UPDATE_USER',
          user: updatedUser
        }
        dispatch(action)
      })
  }
}
export function approveAdopt(data) { // Action Creator
  return dispatch => {
    return userService.saveNewApprove(data)
      .then((updatedUser) => {
        socketService.emit('approve-requested', data)
        console.log('im in user action after service')
        const action = {
          type: 'UPDATE_USER',
          user: updatedUser
        }
        dispatch(action)
      })
  }
}
export function onExplore() {
  return dispatch => {
    const action = {
      type: 'ON_EXPLORE'
    }
    dispatch(action)
  }
}
export function onHome() {
  return dispatch => {
    const action = {
      type: 'ON_HOME'
    }
    dispatch(action)
  }
}
export function showSearch() {
  return dispatch => {
    const action = {
      type: 'SHOW_SEARCH'
    }
    dispatch(action)
  }
}
export function hideSearch() {
  return dispatch => {
    const action = {
      type: 'NOT_SHOW_SEARCH'
    }
    dispatch(action)
  }
}

