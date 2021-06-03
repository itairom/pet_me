import { storageService } from './asyncStorageService'
import { httpService } from '../services/httpService'




// ]

export const userService = {
  login,
  logout,
  signup,
  getUsers,
  getById,
  remove,
  update,
  getLoggedinUser,
  adoptRequest
}

// window.userService = userService p

function getUsers() {
    return httpService.get(`user`)
}

function getById(userId) {
  return httpService.get(`user/${userId}`)
}
function remove(userId) {
  return httpService.delete(`user/${userId}`)
}

async function update(user) {
  return storageService.put('user', user)
  // user = await httpService.put(`user/${user._id}`, user)
  // Handle case in which admin updates other user's details
  if (getLoggedinUser()._id === user._id) _saveLocalUser(user)
}

async function adoptRequest(request){
  // return storageService.put('user/req', user)
  return httpService.put('user/request', request)
  // Handle case in which admin updates other user's details
  // if (getLoggedinUser()._id === user._id) _saveLocalUser(user)
}


async function login(userCred) {

  const user = await httpService.post('auth/login', userCred)
  if (user) return _saveLocalUser(user)
}
async function signup(userCred) {
  const user = await storageService.post('user', userCred)
  // const user = await httpService.post('auth/signup', userCred)
  return _saveLocalUser(user)
}
async function logout() {
  sessionStorage.clear()
  // return await httpService.post('auth/logout')
}
function _saveLocalUser(user) {
  sessionStorage.setItem('loggedinUser', JSON.stringify(user))
  return user
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem('loggedinUser'))
}

