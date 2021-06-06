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
  adoptRequest,
  saveNewRequest,
  saveNewApprove
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
  console.log('updating user')
  let updatedUser = await httpService.put(`user/${user._id}`, user)
  return updatedUser
}


async function adoptRequest(request) {
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


async function saveNewRequest(data) {
  console.log('im in userService (front)')
  const { newRequest, owner, petId } = data
  const petIdx = owner.pets.findIndex(pet => pet._id === petId)
  const isAlreadyRequested = owner.pets[petIdx].adoptQue.some(pet => pet.userId === newRequest.userId)
  if (!isAlreadyRequested) {
    const updatedOwner = owner
    updatedOwner.pets[petIdx].adoptQue.push(newRequest)
    return await update(updatedOwner)
  }
  else {
    // add toggle and splice the que from the array, then send update(updatedOwner)
    // in the jsx change the button to "Adopt" again
    return console.log('You already requested the owner, please wait for a response')
  }
}


async function saveNewApprove(data) {
  const { pet, req, loggedInUser, idx } = data
  const newPet = {
    _id: pet._id,
    isAdopted: true,
    formerOwnerId: loggedInUser._id,
    adoptQue: []
  }
  let newOwner = getById(req.userId)
  newOwner = {
    ...newOwner,
    pets: [...newOwner.pets, newOwner.pets.push(newPet)]
  }
  const newLoggedInUser = {
    ...loggedInUser,
    pets: [...loggedInUser.pets, loggedInUser.pets.splice(idx, 1)]

  }
  const updatedOwner = await update(newOwner)
  const updatedLoggedInUser = await update(newLoggedInUser)
  return { updatedOwner, updatedLoggedInUser }
}