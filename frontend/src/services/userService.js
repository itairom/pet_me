import { storageService } from './asyncStorageService'



const gUsers = [
  {
    "_id": "s101",
    "username": "mikeY",
    "fullname": "Mike York",
    "password": "123",
    "title": "pets lover",
    "desc": "Hello evreybody! ",
    "imgUrl": "https://res.cloudinary.com/dstqymucm/image/upload/v1622145053/petMe/rabbit/rabbit1/owner_iss67z.jpg",
    "isOwner": true,
    "tags": [
      "dogs",
      "cows"
    ],
    "loc": {
      "address": "Haifa",
      "lat": 21313123123,
      "lng": 23132131221
    },
    "pets": [
      {
        "_id": "p109",
        "isAdopted": false,
        "adoptQue": [
          {
            "userId": "123",
            "message": "lolo",
            "chatId": "i11"
          },
          {
            "userId": "123",
            "message": "i like to addopt",
            "chatId": "ch23"
          }
        ]
      },
      {
        "_id": "p110",
        "isAdopted": false,
        "adoptQue": [
          {
            "userId": "s102",
            "message": "Would love to addopt your rabbit!!",
            "chatId": "i11"
          },
          {
            "userId": "s104",
            "message": "i like to addopt",
            "chatId": "ch23"
          }
        ]
      }
    ],
    "reviews": [
      {
        "id": "rev101",
        "txt": "great farm",
        "rate": 4,
        "by": {
          "_id": "u102",
          "fullname": "user2",
          "imgUrl": "/img/img2.jpg"
        }
      }
    ]
  }
]

export const userService = {
  login,
  logout,
  signup,
  getUsers,
  getById,
  remove,
  update,
  getLoggedinUser,
}

// window.userService = userService

async function getUsers(filterBy = '') {
  let users = await storageService.query()
  if (!users || !users.length) {
    console.log('in');
    users = gUsers;
    storageService.save('user', users);
  }
  return users;
}


// function getUsers() {
//     return storageService.query('user')
//     // return httpService.get(`user`)
// }

function getById(userId) {
  return storageService.get('user', userId)
  // return httpService.get(`user/${userId}`)
}
function remove(userId) {
  return storageService.remove('user', userId)
  // return httpService.delete(`user/${userId}`)
}

async function update(user) {
  return storageService.put('user', user)
  // user = await httpService.put(`user/${user._id}`, user)
  // Handle case in which admin updates other user's details
  if (getLoggedinUser()._id === user._id) _saveLocalUser(user)
}



async function login(userCred) {
  const users = await storageService.query('user')
  const user = users.find(user => user.username === userCred.username)
  return _saveLocalUser(user)

  // const user = await httpService.post('auth/login', userCred)
  // if (user) return _saveLocalUser(user)
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

