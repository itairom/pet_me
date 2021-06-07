import { storageService } from './asyncStorageService'
import { httpService } from '../services/httpService'
import { socketService } from '../services/socketService'



export const userService = {
  login,
  logout,
  signup,
  getUsers,
  getById,
  remove,
  update,
  getLoggedinUser,
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

  //finding if the user(owner) already got the request
  if (owner && owner.pets[petIdx] && owner.pets[petIdx].adoptQue) {
    const isAlreadyRequested = owner.pets[petIdx].adoptQue.some(pet => pet.userId === newRequest.userId)

    // if user(owner) already got the request - do no push the request again.
    if (!isAlreadyRequested) {
      const updatedOwner = owner

      //here: we push the new request to the updated user
      updatedOwner.pets[petIdx].adoptQue.push(newRequest)

      // here: turn on the save in the db (replace the old user with the new data)
      // return await update(updatedOwner)
      return owner

    }
    //future socket - for the requester
    else {
      socketService.emit('already-requested', 'You already requested the owner, please wait for him to response')
      return owner

    }
  }
}

async function saveNewApprove(data) {
  const { pet, req, loggedInUser, idx } = data

  let newOwner = await getById(req.userId)

  console.log('newOwner', newOwner)
  //create new pet for the new owner
  const newOwnerPet = {
    _id: pet._id,
    isAdopted: true,
    formerOwnerId: loggedInUser._id,
    adoptQue: []
  }
  
  //create old pet for the old owner
  const oldOwnerPet = {
    _id: pet._id,
    isAdopted: true,
    newOwner: req._id,
    formerOwnerId: loggedInUser._id,
    adoptQue: []
  }

  // creating new owner - the one who got the approve
  newOwner = {
    ...newOwner,
    pets: [...newOwner.pets, newOwner.pets.push(newOwnerPet)]
  }

  //creating old owner - the one who approve the request
  const newLoggedInUser = {
    ...loggedInUser,
    oldPets: (loggedInUser.oldPets) ?
      (!loggedInUser.oldPets.some(oldPet => oldPet._id === pet._id) ?
        [...loggedInUser.oldPets, loggedInUser.oldPets.push(oldOwnerPet)] : [...loggedInUser.oldPets])
      : [oldOwnerPet],
    pets: [loggedInUser.pets.splice(idx, 1), ...loggedInUser.pets]
  }

  console.log(newOwner, newLoggedInUser)

  //here: sending new users to backend
  // const updatedOwner = newOwner
  // // const updatedOwner = await update(newOwner)
  // const updatedLoggedInUser = await update(newLoggedInUser)
  // return Promise.resolve({ updatedOwner, updatedLoggedInUser })
}