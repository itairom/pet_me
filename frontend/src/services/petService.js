import axios from 'axios'
import { storageService } from './async-storage.service.js'
// import { httpService } from './http.service'
window.storageService = storageService;

const gPets = [{
    "_id": "",
    "type": "dog",
    "name": "Noble",
    "breed": "German Shepherd ",
    "title": "Noble dog",
    "desc": "Nobleman is slower to warm up to new people and would do best in a home willing to work with him and understanding his need to come to people on his own terms. This includes letting him sniff a new person and letting him walk away until he is ready to interact with them.  Nobleman is house and crate trained. We are looking for a home that will continue with the training and socialization methods set in place by his amazing trainer and foster parents. He needs patience, structure.He would do best in a home without small children or cats. While Nobleman does get along with his foster pack he would prefer to be an only dog If you are looking for a giant loving soul who will give you his full devotion in exchange for continuing to help him gain his confidence Please apply below!",
    "imgUrl": "url",
    "gender": "male",
    "age": "2",
    "isAdopted": false,
    "likes": "33",
    "size": "small",
    "neuterSpayed": true,
    "trained": false,
    "vaccine": false,
    "owner": {
        "_id": "s101",
        "name": "happy farm",
        "imgUrl": "url",
        "loc": "yafo"
    },
    "tags": [
        "fish",
        "pet",
        "small"
    ],
    "comments": [
        {
            "id": "rev101",
            "txt": "lovely cat",
            "by": {
                "_id": "u102",
                "fullname": "mika ",
                "imgUrl": "/img/img2.jpg"
            }
        }
    ]
}
]


const BASE_URL = process.env.NODE_ENV === 'production' ? '/api/pet' : 'http://localhost:3030/api/pet'
console.log(BASE_URL)

const STORAGE_KEY = 'pets'


export const petService = {
    query, getpetByid, add, remove
}


function query(filterBy) {

    const pets = storageService.query('pets')
    if (!pets || !pets.length) {
        // pets = JSON.parse(gPets);
        storageService.save('pets', pets);
    }
    return pets;
}


// function query(filterBy) {
// return httpService.get('pet')
// return axios.get(BASE_URL, { params: filterBy })
//     .then(res => res.data)
// }
function add(pet) {
    if (pet._id) {
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


