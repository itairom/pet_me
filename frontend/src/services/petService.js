import { storageService } from './asyncStorageService'
window.storageService = storageService;

export const petService = {
    query,
    getPetByid,
    add,
    remove,
    addLike,
    // addComment
}

const gPets = [
    {
        "_id": "p101",
        "type": "dog",
        "name": "Noble",
        "breed": "bulldog",
        "title": "Cool dog",
        "desc": "Nobleman is slower to warm up to new people and would do best in a home willing to work with him and understanding his need to come to people on his own terms. This includes letting him sniff a new person and letting him walk away until he is ready to interact with them.  Nobleman is house and crate trained. We are looking for a home that will continue with the training and socialization methods set in place by his amazing trainer and foster parents. He needs patience, structure.He would do best in a home without small children or cats. While Nobleman does get along with his foster pack he would prefer to be an only dog If you are looking for a giant loving soul who will give you his full devotion in exchange for continuing to help him gain his confidence Please apply below!",
        "imgUrls": [
            "https://res.cloudinary.com/dstqymucm/image/upload/v1622204892/dogs/dog3/2_hewutn.jpg",
            "https://res.cloudinary.com/dstqymucm/image/upload/v1622131780/dogs/dog3/5_phmhz7.jpg",
            "https://res.cloudinary.com/dstqymucm/image/upload/v1622131782/dogs/dog3/4_ddjzgt.jpg",
            "https://res.cloudinary.com/dstqymucm/image/upload/v1622131785/dogs/dog3/3_aqa9ih.jpg",
            "https://res.cloudinary.com/dstqymucm/image/upload/v1622131770/dogs/dog3/1_sgcpoy.jpg"
        ],
        "gender": "male",
        "age": "senior",
        "isAdopted": false,
        "likes": "33",
        "size": "small",
        "neuterSpayed": true,
        "trained": false,
        "vaccine": false,
        "owner": {
            "_id": "s101",
            "name": "happy farm",
            "imgUrl": "https://res.cloudinary.com/dstqymucm/image/upload/v1622133335/dogs/dog3/owner_lwk54f.jpg",
            "loc": {
                "address": "yafo",
                "lat": 21313123123,
                "lng": 23132131221
            }
        },
        "tags": [
            "dog",
            "small"
        ],
        "comments": [
            {
                "id": "rev101",
                "txt": "lovely dog!",
                "created": 1622299786455,
                "by": {
                    "_id": "u102",
                    "fullname": "mika ",
                    "imgUrl": "https://res.cloudinary.com/dstqymucm/image/upload/v1622144695/petMe/cats/cat1/houcine-ncib-B4TjXnI0Y2c-unsplash_xtt5d6.jpg"
                }
            }
        ]
    },
    {
        "_id": "p102",
        "type": "dog",
        "name": "Lenny",
        "breed": "Golden Retriever",
        "title": "Smart dog",
        "desc": "Lenny was sadly given up by his owner to go into a nursing home. He is a very affectionate boy, and hopes to find a new home very soon. He is housebroken, and would love a new family. At the time, Lenny is heartworm positive, but will have his treatment provided by us and will be healthy again! Your new pet will require a refresher in house-training. K-9 Lifesavers strongly recommends all new adopters enroll their new pet into obedience training. This provides for an easier transition into a new home, ensures the dog remains well socialized, and helps form a bond between the dog and the new family.",
        "imgUrls": [
            "https://res.cloudinary.com/dstqymucm/image/upload/v1622131751/dogs/dog1/1_otkf7t.jpg",
            "https://res.cloudinary.com/dstqymucm/image/upload/v1622131753/dogs/dog1/2_prj6tx.jpg",
            "https://res.cloudinary.com/dstqymucm/image/upload/v1622131774/dogs/dog1/5_xvsq88.jpg",
            "https://res.cloudinary.com/dstqymucm/image/upload/v1622131781/dogs/dog1/3_oalikj.jpg",
            "https://res.cloudinary.com/dstqymucm/image/upload/v1622131750/dogs/dog1/4_rrqk12.jpg"
        ],
        "gender": "male",
        "age": "adult",
        "isAdopted": false,
        "likes": "50",
        "size": "Medium",
        "neuterSpayed": true,
        "trained": true,
        "vaccine": true,
        "owner": {
            "_id": "s101",
            "name": "Joseph Gonzalez",
            "imgUrl": "https://res.cloudinary.com/dstqymucm/image/upload/v1622133443/dogs/dog1/owner_hiazkr.jpg",
            "loc": {
                "address": "tel aviv",
                "lat": 21313123123,
                "lng": 23132131221
            }
        },
        "tags": [
            "dog",
            "Medium"
        ],
        "comments": [
            {
                "id": "rev101",
                "txt": "lovely cat",
                "created": 1622299786455,
                "by": {
                    "_id": "u102",
                    "fullname": "mika ",
                    "imgUrl": "https://res.cloudinary.com/dstqymucm/image/upload/v1622144695/petMe/cats/cat1/houcine-ncib-B4TjXnI0Y2c-unsplash_xtt5d6.jpg"
                }
            }
        ]
    },
    {
        "_id": "p103",
        "type": "cat",
        "name": "Puki",
        "breed": "American Bobtail",
        "title": "Cute cat",
        "desc": "Punk is the sweetest girl. She has so much energy, loves people and other animals too. She needs a lot of love and attention. Preferred a home with other pets and children!",
        "imgUrls": [
            "https://res.cloudinary.com/dstqymucm/image/upload/v1622144482/petMe/cats/cat1/1_ufpynm.jpg",
            "https://res.cloudinary.com/dstqymucm/image/upload/v1622144483/petMe/cats/cat1/2_fh5v8y.jpg",
            "https://res.cloudinary.com/dstqymucm/image/upload/v1622144483/petMe/cats/cat1/5_nmribe.jpg",
            "https://res.cloudinary.com/dstqymucm/image/upload/v1622144482/petMe/cats/cat1/4_mtqmwa.jpg",
            "https://res.cloudinary.com/dstqymucm/image/upload/v1622144482/petMe/cats/cat1/3_vt9wis.jpg"
        ],
        "gender": "female",
        "age": "young",
        "isAdopted": false,
        "likes": "50",
        "size": "Small",
        "neuterSpayed": false,
        "trained": false,
        "vaccine": false,
        "owner": {
            "_id": "s101",
            "name": "Joseph Gonzalez",
            "imgUrl": "https://res.cloudinary.com/dstqymucm/image/upload/v1622144695/petMe/cats/cat1/houcine-ncib-B4TjXnI0Y2c-unsplash_xtt5d6.jpg",
            "loc": {
                "address": "tel aviv",
                "lat": 21313123123,
                "lng": 23132131221
            }
        },
        "tags": [
            "cat",
            "Small"
        ],
        "comments": [
            {
                "id": "rev101",
                "txt": "lovely cat",
                "created": 1622299786455,
                "by": {
                    "_id": "u102",
                    "fullname": "mika ",
                    "imgUrl": "https://res.cloudinary.com/dstqymucm/image/upload/v1622133335/dogs/dog3/owner_lwk54f.jpg"
                }
            }
        ]
    },
    {
        "_id": "p104",
        "type": "rabbit",
        "name": "Lily",
        "breed": "Netherland Rabbit",
        "title": "The sweetest bunny",
        "desc": "Ever wanted to feel like a disney princess? Well adopt this cute litle bunny and you can! He is super energetic and very loving. He is obsessed with carrots, feed him a carrot and he will love you forever. You will be so happy with this little guy.",
        "imgUrls": [
            "https://res.cloudinary.com/dstqymucm/image/upload/v1622144480/petMe/rabbit/rabbit1/1_pqadwd.jpg",
            "https://res.cloudinary.com/dstqymucm/image/upload/v1622144481/petMe/rabbit/rabbit1/5_fmknvz.jpg",
            "https://res.cloudinary.com/dstqymucm/image/upload/v1622144482/petMe/rabbit/rabbit1/4_g09b0s.jpg",
            "https://res.cloudinary.com/dstqymucm/image/upload/v1622144481/petMe/rabbit/rabbit1/2_t4cuxu.jpg",
            "https://res.cloudinary.com/dstqymucm/image/upload/v1622144482/petMe/rabbit/rabbit1/3_yljpts.jpg"
        ],
        "gender": "female",
        "age": "adult",
        "isAdopted": false,
        "likes": "77",
        "size": "Small",
        "neuterSpayed": false,
        "trained": false,
        "vaccine": true,
        "owner": {
            "_id": "s101",
            "name": "Joseph Gonzalez",
            "imgUrl": "https://res.cloudinary.com/dstqymucm/image/upload/v1622145053/petMe/rabbit/rabbit1/owner_iss67z.jpg",
            "loc": {
                "address": "eilat",
                "lat": 21313123123,
                "lng": 23132131221
            }
        },
        "tags": [
            "rabbit",
            "Small"
        ],
        "comments": [
            {
                "id": "rev101",
                "txt": "lovely cat",
                "created": 1622299786455,
                "by": {
                    "_id": "u102",
                    "fullname": "mika ",
                    "imgUrl": "https://res.cloudinary.com/dstqymucm/image/upload/v1622133335/dogs/dog3/owner_lwk54f.jpg"
                }
            }
        ]
    },
    {
        "_id": "p105",
        "type": "Frog",
        "name": "Ribb",
        "breed": "Tree Frog",
        "title": "Coolest Frog ever",
        "desc": "We got Ribb from a family who's kids weren't careful with him. He is awfully adorable but very fragile because he is so small. A person that has experience with raising reptiles is preferred. Ribb can't wait to find his forever home!",
        "imgUrls": [
            "https://res.cloudinary.com/dstqymucm/image/upload/v1622144483/petMe/frogs/frog1/1_pamdrb.jpg",
            "https://res.cloudinary.com/dstqymucm/image/upload/v1622144483/petMe/frogs/frog1/3_hjszko.jpg",
            "https://res.cloudinary.com/dstqymucm/image/upload/v1622144484/petMe/frogs/frog1/5_g1ma7k.jpg",
            "https://res.cloudinary.com/dstqymucm/image/upload/v1622144483/petMe/frogs/frog1/4_youmba.jpg",
            "https://res.cloudinary.com/dstqymucm/image/upload/v1622144483/petMe/frogs/frog1/2_wrlooo.jpg"
        ],
        "gender": "male",
        "age": "senior",
        "isAdopted": true,
        "likes": "87",
        "size": "Small",
        "neuterSpayed": false,
        "trained": false,
        "vaccine": true,
        "owner": {
            "_id": "s101",
            "name": "Joseph Gonzalez",
            "imgUrl": "https://res.cloudinary.com/dstqymucm/image/upload/v1622149457/petMe/frogs/frog1/owner_2_xiz5hx.jpg",
            "loc": {
                "address": "haifa",
                "lat": 21313123123,
                "lng": 23132131221
            }
        },
        "tags": [
            "frog",
            "Small"
        ],
        "comments": [
            {
                "id": "rev101",
                "txt": "lovely cat",
                "created": 1622299786455,
                "by": {
                    "_id": "u102",
                    "fullname": "mika ",
                    "imgUrl": "/img/img2.jpg"
                }
            }
        ]
    },
    {
        "_id": "p106",
        "type": "Hamster",
        "name": "Hammy",
        "breed": "Golden Hamster",
        "title": "Sweet Hamster",
        "desc": "Hammy is the funniest little hamster. He loves ham which is why we named him Hammy. Please don't feed him ham though, we don't feed it to him, but every time someone eats ham when they are around him, he goes straight to the hamster wheel!",
        "imgUrls": [
            "https://res.cloudinary.com/dstqymucm/image/upload/v1622144480/petMe/hamster/3_yzwxm1.jpg",
            "https://res.cloudinary.com/dstqymucm/image/upload/v1622144479/petMe/hamster/1_r0a5d5.jpg",
            "https://res.cloudinary.com/dstqymucm/image/upload/v1622144479/petMe/hamster/2_cl4fvq.jpg",
            "https://res.cloudinary.com/dstqymucm/image/upload/v1622144483/petMe/frogs/frog1/4_youmba.jpg",
            "https://res.cloudinary.com/dstqymucm/image/upload/v1622144480/petMe/hamster/5_slhx3j.jpg"
        ],
        "gender": "male",
        "age": "senior",
        "isAdopted": true,
        "likes": "93",
        "size": "Small",
        "neuterSpayed": false,
        "trained": false,
        "vaccine": true,
        "owner": {
            "_id": "s101",
            "name": "Joseph Gonzalez",
            "imgUrl": "https://res.cloudinary.com/dstqymucm/image/upload/v1622149457/petMe/frogs/frog1/owner_2_xiz5hx.jpg",
            "loc": {
                "address": "haifa",
                "lat": 21313123123,
                "lng": 23132131221
            }
        },
        "tags": [
            "frog",
            "Small"
        ],
        "comments": [
            {
                "id": "rev101",
                "txt": "lovely cat",
                "created": 1622299786455,
                "by": {
                    "_id": "u102",
                    "fullname": "mika ",
                    "imgUrl": "https://res.cloudinary.com/dstqymucm/image/upload/v1622149457/petMe/frogs/frog1/owner_2_xiz5hx.jpg"
                }
            }
        ]
    }
]

const BASE_URL = process.env.NODE_ENV === 'production' ? '/api/pet' : 'http://localhost:3030/api/pet'

const STORAGE_KEY = 'pets'

async function query(filterBy = '') {

    filterBy = {
        gender: 'female',
        type: '',
        age: '',
        location: 'tel aviv'
    }

    let pets = await storageService.query(STORAGE_KEY, filterBy)

    if (!pets || !pets.length) {
        console.log('in');
        pets = gPets;
        storageService.save(STORAGE_KEY, pets);
    }
    return pets;
}

async function add(pet) {
    if (pet._id) {
    }
    let addPet = await storageService.post(STORAGE_KEY, pet)
    return addPet

}
function remove(petId) {
    console.log("🚀 ~ file: petService.js ~ line 356 ~ remove ~ petId", petId)
    storageService.remove(STORAGE_KEY, petId)
}

async function getPetByid(petId) {
    let pet = await storageService.get(STORAGE_KEY, petId)
    return pet
}

async function addLike(petId) {
    return Promise.resolve(petId)
}
