// import { addComment } from '../store/actions/petActions';
import { storageService } from './asyncStorageService'
import { httpService } from '../services/httpService'
window.storageService = storageService;

export const petService = {
    query,
    getPetByid,
    add,
    remove,
    toggleLike,
    addComment
}

const BASE_URL = process.env.NODE_ENV === 'production' ? '/api/pet' : 'http://localhost:3030/api/pet'
let gPets = []

const STORAGE_KEY = 'pets'

async function query(filterBy = '') {
    var queryStr = (!filterBy) ? '' : `?gender=${filterBy.gender}&age=${filterBy.age}&type=${filterBy.type}&location=${filterBy.location}&size=${filterBy.size}`
    try {
        return httpService.get(`pet${queryStr}`)
    } catch (err) {
        throw err
    }
}

async function add(pet) {
    if (pet._id) {
    }
    let addPet = await storageService.post(STORAGE_KEY, pet)
    return addPet


}

async function addComment(newComment) {
    console.log(newComment)
    const { petId } = newComment

    let comment = await httpService.post(`pet/comment/${petId}`, newComment)

    return comment

}
    function remove(petId) {
        storageService.remove(STORAGE_KEY, petId)
    }

    async function getPetByid(petId) {

        let pet = await httpService.get(`pet/${petId}`)
        return pet
    }

    async function toggleLike(petId, userId, act, idx) {
        let likeDetails = {
            petId,
            userId,
            act
        }
        // const petIdx = gPets.findIndex(pet => pet._id === petId)
        try {
            let pet = await httpService.post('pet/like', likeDetails)
            return pet
        }
        catch (err) {
            throw err
        }
        // return Promise.resolve(petId, gPets[petIdx].likedBy)
    }
