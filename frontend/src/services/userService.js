import { storageService } from './asyncStorageService'
import { httpService } from '../services/httpService'
import { socketService } from '../services/socketService'
import { petService } from './petService'



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
  saveNewApprove,
  updateLoggedInUser,
  discardAdoption
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
  let updatedUser = await httpService.put(`user/${user._id}`, user)
  return updatedUser
}

async function login(userCred) {

  const user = await httpService.post('auth/login', userCred)
  if (user) return _saveLocalUser(user)
}

async function signup(userCred) {
  const user = storageService.post('user', userCred)
  await httpService.post('auth/signup', userCred)
  return _saveLocalUser(user)
}

async function logout() {
  sessionStorage.clear()
  // return await httpService.post('auth/logout')
}

async function updateLoggedInUser(userId) {
  const user = await getById(userId);
  return _saveLocalUser(user);
}

function _saveLocalUser(user) {
  sessionStorage.setItem('loggedinUser', JSON.stringify(user))
  return user
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem('loggedinUser'))
}

const updetedRequester = async (requester, petId) => {
  const isAlreadyRequested = requester.requests.find(pet => pet === petId)
  if (!isAlreadyRequested) {
    const copyRequester = { ...requester }
    copyRequester.requests = [...requester.requests, petId]
    await update(copyRequester)
  }
  else {
    console.log('already request');
  }
}


async function saveNewRequest(data) { //ADOPT
  const { newRequest, owner, petId, Requester } = data
  const petIdx = owner.pets.findIndex(pet => pet._id === petId)

  if (owner.pets[petIdx].adoptQue) {
    //finding if the user(owner) already got the request
    const isAlreadyRequested = owner.pets[petIdx].adoptQue.some(pet => pet.userId === newRequest.userId)

    if (!isAlreadyRequested) { // if user(owner) already got the request - do no push the request again.

      await updetedRequester(Requester, petId)

      owner.pets[petIdx].adoptQue.push(newRequest)
      const updatedOwner = await update(owner)
      socketService.emit('adopt-request', data)
      return updatedOwner
    }
    //future socket - for the requester {}

    else {
      const alreadyReqInfo = {
        msg: 'You had already requested the owner, please wait for him to response',
        userId: newRequest.userId
      }
      socketService.emit('already-requested-msg', alreadyReqInfo)
      return owner
    }
  }
  else { //OWNER DONT OWN THE PET
    console.log('else', petIdx)

  }
}

async function saveNewApprove(data) { // CREATING NEW USERS 
  const { pet, req, loggedInUser, idx } = data
  let newOwner = await getById(req.userId)


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
    // pets: (newOwner.pets > 0) ? [...newOwner.pets, newOwnerPet] : [newOwnerPet]
    pets: [...newOwner.pets, newOwnerPet]
  }

  newOwner.requests = newOwner.requests.filter(req => { // Remove Request from Requester 
    return req !== newOwnerPet._id
  })

  //Update pet object
  const petById = await petService.getPetByid(pet._id)
  petById.isAdopted = true
  await petService.add(petById)


  //creating old owner - the one who approve the request
  loggedInUser.pets.splice(idx, 1)
  const newLoggedInUser = {
    ...loggedInUser,
    oldPets: (loggedInUser.oldPets) ?
      (!loggedInUser.oldPets.some(oldPet => oldPet._id === pet._id) ?
        [...loggedInUser.oldPets, oldOwnerPet] : [...loggedInUser.oldPets])
      : [oldOwnerPet],
  }
  // ON (back-end enable)
  const updatedOwner = await update(newOwner)
  const updatedLoggedInUser = await update(newLoggedInUser)
  const newUsers = { updatedOwner, updatedLoggedInUser }

  // OFF (back-end off)
  // const newUsers = { newOwner, newLoggedInUser }

  return newUsers
}
async function discardAdoption(data) { // CREATING NEW USERS 
  const { pet, req, loggedInUser, idx } = data
  let newOwner = await getById(req.userId)

  const updatedRequester = { ...newOwner } //NEED TO FIX INCORRECT
  updatedRequester.requests.pop()

  const updatedOwner = { ...loggedInUser }

  let newPetQue = null

  updatedOwner.pets.forEach((p, idx) => {
    if (pet._id === p._id) {
      newPetQue = p.adoptQue.filter(item => {
        return item.userId !== updatedRequester._id
      })
      updatedOwner.pets[idx].adoptQue = newPetQue
    }
  })

  await update(updatedOwner)
  await update(updatedRequester)
  const newUsers = { updatedOwner, updatedRequester }

  return newUsers
}