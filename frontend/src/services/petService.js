import axios from 'axios'
import { storageService } from './async-storage.service.js'
import {httpService} from './http.service'
window.storageService = storageService;


const BASE_URL = process.env.NODE_ENV === 'production' ? '/api/pet' : 'http://localhost:3030/api/pet'
console.log(BASE_URL)

const STORAGE_KEY = 'pets'


export const petsService = {
    query, getpetByid, add, remove
}

function query(filterBy) {
// return httpService.get('pet')
    // return axios.get(BASE_URL, { params: filterBy })
    //     .then(res => res.data)
}
function add(pet) {
    if (pet._id){
        // return httpService.post(pet)
        // return axios.put(BASE_URL + '/edit', pet)
        // .then(res => res.data)
    }
    return axios.post(BASE_URL + '/edit', pet)
        .then(res => res.data)
}
function remove(petId) {
    // return axios.delete(BASE_URL + `/${petId}`)
    //     .then(res => res.data)
}

function getpetByid(petId) {
// return httpService.get(`pet/${petId}`)

}


