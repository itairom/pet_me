import { storageService } from './asyncStorageService'
import { httpService } from '../services/httpService'
window.storageService = storageService;

export const petService = {
    query,
    getPetByid,
    add,
    remove,
    toggleLike
}

// const gPets = [
//     {
//         "_id": "p101",
//         "addedAt": 1622299586455,
//         "type": "dog",
//         "name": "Noble",
//         "breed": "bulldog",
//         "title": "A pleasant and comfortable dog",
//         "desc": "Nobleman is slower to warm up to new people and would do best in a home willing to work with him and understanding his need to come to people on his own terms. This includes letting him sniff a new person and letting him walk away until he is ready to interact with them.  Nobleman is house and crate trained. We are looking for a home that will continue with the training and socialization methods set in place by his amazing trainer and foster parents. He needs patience, structure.He would do best in a home without small children or cats. While Nobleman does get along with his foster pack he would prefer to be an only dog If you are looking for a giant loving soul who will give you his full devotion in exchange for continuing to help him gain his confidence Please apply below!",
//         "imgUrls": [
//             "https://res.cloudinary.com/dstqymucm/image/upload/v1622204892/dogs/dog3/2_hewutn.jpg",
//             "https://res.cloudinary.com/dstqymucm/image/upload/v1622131780/dogs/dog3/5_phmhz7.jpg",
//             "https://res.cloudinary.com/dstqymucm/image/upload/v1622131782/dogs/dog3/4_ddjzgt.jpg",
//             "https://res.cloudinary.com/dstqymucm/image/upload/v1622131785/dogs/dog3/3_aqa9ih.jpg",
//             "https://res.cloudinary.com/dstqymucm/image/upload/v1622131770/dogs/dog3/1_sgcpoy.jpg"
//         ],
//         "gender": "male",
//         "age": "senior",
//         "isAdopted": false,
//         "likes": "33",
//         "likedBy": [
//             "s103"
//         ],
//         "size": "big",
//         "neuterSpayed": true,
//         "trained": false,
//         "vaccine": false,
//         "owner": {
//             "_id": "s101",
//             "name": "Charlotte Sarah",
//             "imgUrl": "https://res.cloudinary.com/dstqymucm/image/upload/v1622133335/dogs/dog3/owner_lwk54f.jpg",
//             "loc": {
//                 "address": "yafo",
//                 "lat": 21313123123,
//                 "lng": 23132131221
//             }
//         },
//         "tags": [
//             "dog",
//             "small"
//         ],
//         "comments": [
//             {
//                 "id": "rev101",
//                 "txt": "lovely dog!",
//                 "created": 1622299786455,
//                 "by": {
//                     "_id": "u102",
//                     "fullname": "mika ",
//                     "imgUrl": "https://res.cloudinary.com/dstqymucm/image/upload/v1622144695/petMe/cats/cat1/houcine-ncib-B4TjXnI0Y2c-unsplash_xtt5d6.jpg"
//                 }
//             }
//         ]
//     },
//     {
//         "_id": "p102",
//         "addedAt": 1622299586455,
//         "type": "dog",
//         "name": "Lenny",
//         "breed": "Golden Retriever",
//         "title": "Cute Lenny is waiting for you",
//         "desc": "Lenny was sadly given up by his owner to go into a nursing home. He is a very affectionate boy, and hopes to find a new home very soon. He is housebroken, and would love a new family. At the time, Lenny is heartworm positive, but will have his treatment provided by us and will be healthy again! Your new pet will require a refresher in house-training. K-9 Lifesavers strongly recommends all new adopters enroll their new pet into obedience training. This provides for an easier transition into a new home, ensures the dog remains well socialized, and helps form a bond between the dog and the new family.",
//         "imgUrls": [
//             "https://res.cloudinary.com/dstqymucm/image/upload/v1622131751/dogs/dog1/1_otkf7t.jpg",
//             "https://res.cloudinary.com/dstqymucm/image/upload/v1622131753/dogs/dog1/2_prj6tx.jpg",
//             "https://res.cloudinary.com/dstqymucm/image/upload/v1622131774/dogs/dog1/5_xvsq88.jpg",
//             "https://res.cloudinary.com/dstqymucm/image/upload/v1622131781/dogs/dog1/3_oalikj.jpg",
//             "https://res.cloudinary.com/dstqymucm/image/upload/v1622131750/dogs/dog1/4_rrqk12.jpg"
//         ],
//         "gender": "male",
//         "age": "adult",
//         "isAdopted": false,
//         "likes": "50",
//         "likedBy": [
//             "s103"
//         ],
//         "size": "Medium",
//         "neuterSpayed": true,
//         "trained": true,
//         "vaccine": true,
//         "owner": {
//             "_id": "s102",
//             "name": "Joseph Gonzalez",
//             "imgUrl": "https://res.cloudinary.com/dstqymucm/image/upload/v1622133443/dogs/dog1/owner_hiazkr.jpg",
//             "loc": {
//                 "address": "tel aviv",
//                 "lat": 21313123123,
//                 "lng": 23132131221
//             }
//         },
//         "tags": [
//             "dog",
//             "Medium"
//         ],
//         "comments": [
//             {
//                 "id": "rev101",
//                 "txt": "lovely cat",
//                 "created": 1622299786455,
//                 "by": {
//                     "_id": "u102",
//                     "fullname": "mika ",
//                     "imgUrl": "https://res.cloudinary.com/dstqymucm/image/upload/v1622144695/petMe/cats/cat1/houcine-ncib-B4TjXnI0Y2c-unsplash_xtt5d6.jpg"
//                 }
//             }
//         ]
//     },
//     {
//         "_id": "p103",
//         "addedAt": 1622299526455,
//         "type": "cat",
//         "name": "Puki",
//         "breed": "American Bobtail",
//         "title": "The redhead wants a house",
//         "desc": "Punk is the sweetest girl. She has so much energy, loves people and other animals too. She needs a lot of love and attention. Preferred a home with other pets and children!",
//         "imgUrls": [
//             "https://res.cloudinary.com/dstqymucm/image/upload/v1622144482/petMe/cats/cat1/1_ufpynm.jpg",
//             "https://res.cloudinary.com/dstqymucm/image/upload/v1622144483/petMe/cats/cat1/2_fh5v8y.jpg",
//             "https://res.cloudinary.com/dstqymucm/image/upload/v1622144483/petMe/cats/cat1/5_nmribe.jpg",
//             "https://res.cloudinary.com/dstqymucm/image/upload/v1622144482/petMe/cats/cat1/4_mtqmwa.jpg",
//             "https://res.cloudinary.com/dstqymucm/image/upload/v1622144482/petMe/cats/cat1/3_vt9wis.jpg"
//         ],
//         "gender": "female",
//         "age": "young",
//         "isAdopted": false,
//         "likes": "50",
//         "likedBy": [
//             "s103"
//         ],
//         "size": "Small",
//         "neuterSpayed": false,
//         "trained": false,
//         "vaccine": false,
//         "owner": {
//             "_id": "s103",
//             "name": "Madison Jessica",
//             "imgUrl": "https://res.cloudinary.com/dstqymucm/image/upload/v1622144695/petMe/cats/cat1/houcine-ncib-B4TjXnI0Y2c-unsplash_xtt5d6.jpg",
//             "loc": {
//                 "address": "tel aviv",
//                 "lat": 21313123123,
//                 "lng": 23132131221
//             }
//         },
//         "tags": [
//             "cat",
//             "Small"
//         ],
//         "comments": [
//             {
//                 "id": "rev101",
//                 "txt": "lovely cat",
//                 "created": 1622299786455,
//                 "by": {
//                     "_id": "u102",
//                     "fullname": "mika ",
//                     "imgUrl": "https://res.cloudinary.com/dstqymucm/image/upload/v1622133335/dogs/dog3/owner_lwk54f.jpg"
//                 }
//             }
//         ]
//     },
//     {
//         "_id": "p104",
//         "addedAt": 1622299426455,
//         "type": "Frog",
//         "name": "Ribb",
//         "breed": "Tree Frog",
//         "title": "A charming green frog",
//         "desc": "We got Ribb from a family who's kids weren't careful with him. He is awfully adorable but very fragile because he is so small. A person that has experience with raising reptiles is preferred. Ribb can't wait to find his forever home!",
//         "imgUrls": [
//             "https://res.cloudinary.com/dstqymucm/image/upload/v1622144483/petMe/frogs/frog1/1_pamdrb.jpg",
//             "https://res.cloudinary.com/dstqymucm/image/upload/v1622144483/petMe/frogs/frog1/3_hjszko.jpg",
//             "https://res.cloudinary.com/dstqymucm/image/upload/v1622144484/petMe/frogs/frog1/5_g1ma7k.jpg",
//             "https://res.cloudinary.com/dstqymucm/image/upload/v1622144483/petMe/frogs/frog1/4_youmba.jpg",
//             "https://res.cloudinary.com/dstqymucm/image/upload/v1622144483/petMe/frogs/frog1/2_wrlooo.jpg"
//         ],
//         "gender": "male",
//         "age": "senior",
//         "isAdopted": true,
//         "likes": "87",
//         "likedBy": [
//             "s103"
//         ],
//         "size": "Small",
//         "neuterSpayed": false,
//         "trained": false,
//         "vaccine": true,
//         "owner": {
//             "_id": "s104",
//             "name": "Jack Connor",
//             "imgUrl": "https://res.cloudinary.com/dstqymucm/image/upload/v1622149457/petMe/frogs/frog1/owner_2_xiz5hx.jpg",
//             "loc": {
//                 "address": "Haifa",
//                 "lat": 21313123123,
//                 "lng": 23132131221
//             }
//         },
//         "tags": [
//             "frog",
//             "Small"
//         ],
//         "comments": [
//             {
//                 "id": "rev101",
//                 "txt": "lovely cat",
//                 "created": 1622299786455,
//                 "by": {
//                     "_id": "u102",
//                     "fullname": "mika ",
//                     "imgUrl": "/img/img2.jpg"
//                 }
//             }
//         ]
//     },
//     {
//         "_id": "p105",
//         "addedAt": 1622299586455,
//         "type": "rabbit",
//         "name": "Lily",
//         "breed": "Netherland Rabbit",
//         "title": "Lily the rabbit is quiet and calm",
//         "desc": "Ever wanted to feel like a disney princess? Well adopt this cute litle bunny and you can! He is super energetic and very loving. He is obsessed with carrots, feed him a carrot and he will love you forever. You will be so happy with this little guy.",
//         "imgUrls": [
//             "https://res.cloudinary.com/dstqymucm/image/upload/v1622144480/petMe/rabbit/rabbit1/1_pqadwd.jpg",
//             "https://res.cloudinary.com/dstqymucm/image/upload/v1622144481/petMe/rabbit/rabbit1/5_fmknvz.jpg",
//             "https://res.cloudinary.com/dstqymucm/image/upload/v1622144482/petMe/rabbit/rabbit1/4_g09b0s.jpg",
//             "https://res.cloudinary.com/dstqymucm/image/upload/v1622144481/petMe/rabbit/rabbit1/2_t4cuxu.jpg",
//             "https://res.cloudinary.com/dstqymucm/image/upload/v1622144482/petMe/rabbit/rabbit1/3_yljpts.jpg"
//         ],
//         "gender": "female",
//         "age": "adult",
//         "isAdopted": false,
//         "likes": "77",
//         "likedBy": [
//             "s103",
//             "s101"
//         ],
//         "size": "Small",
//         "neuterSpayed": false,
//         "trained": false,
//         "vaccine": true,
//         "owner": {
//             "_id": "s101",
//             "name": "Harry Callum",
//             "imgUrl": "https://res.cloudinary.com/dstqymucm/image/upload/v1622145053/petMe/rabbit/rabbit1/owner_iss67z.jpg",
//             "loc": {
//                 "address": "eilat",
//                 "lat": 21313123123,
//                 "lng": 23132131221
//             }
//         },
//         "tags": [
//             "rabbit",
//             "Small"
//         ],
//         "comments": [
//             {
//                 "id": "rev101",
//                 "txt": "lovely cat",
//                 "created": 1622299786455,
//                 "by": {
//                     "_id": "u102",
//                     "fullname": "mika ",
//                     "imgUrl": "https://res.cloudinary.com/dstqymucm/image/upload/v1622133335/dogs/dog3/owner_lwk54f.jpg"
//                 }
//             }
//         ]
//     },
//     {
//         "_id": "p106",
//         "addedAt": 1622298586355,
//         "type": "Hamster",
//         "name": "Hammy",
//         "breed": "Golden Hamster",
//         "title": "A sweet little hamster",
//         "desc": "Hammy is the funniest little hamster. He loves ham which is why we named him Hammy. Please don't feed him ham though, we don't feed it to him, but every time someone eats ham when they are around him, he goes straight to the hamster wheel!",
//         "imgUrls": [
//             "https://res.cloudinary.com/dstqymucm/image/upload/v1622144480/petMe/hamster/3_yzwxm1.jpg",
//             "https://res.cloudinary.com/dstqymucm/image/upload/v1622144479/petMe/hamster/1_r0a5d5.jpg",
//             "https://res.cloudinary.com/dstqymucm/image/upload/v1622144479/petMe/hamster/2_cl4fvq.jpg",
//             "https://res.cloudinary.com/dstqymucm/image/upload/v1622144481/petMe/hamster/4_m9m8bd.jpg",
//             "https://res.cloudinary.com/dstqymucm/image/upload/v1622144480/petMe/hamster/5_slhx3j.jpg"
//         ],
//         "gender": "male",
//         "age": "young",
//         "isAdopted": true,
//         "likes": "93",
//         "likedBy": [
//             "s103",

//         ],
//         "size": "medium",
//         "neuterSpayed": false,
//         "trained": false,
//         "vaccine": true,
//         "owner": {
//             "_id": "s106",
//             "name": "Charlie Kyle",
//             "imgUrl": "https://res.cloudinary.com/dstqymucm/image/upload/v1622381042/petMe/hamster/owner_9_fhtzmn.jpg",
//             "loc": {
//                 "address": "haifa",
//                 "lat": 21313123123,
//                 "lng": 23132131221
//             }
//         },
//         "tags": [
//             "hamster",
//             "Small"
//         ],
//         "comments": [
//             {
//                 "id": "rev101",
//                 "txt": "lovely cat",
//                 "created": 1622299786455,
//                 "by": {
//                     "_id": "u102",
//                     "fullname": "mika ",
//                     "imgUrl": "https://res.cloudinary.com/dstqymucm/image/upload/v1622149457/petMe/frogs/frog1/owner_2_xiz5hx.jpg"
//                 }
//             }
//         ]
//     },
//     {
//         "_id": "p107",
//         "addedAt": 1622299526455,
//         "type": "Dog",
//         "name": "Rex",
//         "breed": "Akita",
//         "title": "Akita is a strong and brave dog",
//         "desc": "",
//         "imgUrls": [
//             "https://res.cloudinary.com/dstqymucm/image/upload/v1622206109/dogs/dog5/3_bzucwm.jpg",
//             "https://res.cloudinary.com/dstqymucm/image/upload/v1622206168/dogs/dog5/4_drxmwv.jpg",
//             "https://res.cloudinary.com/dstqymucm/image/upload/v1622206216/dogs/dog5/5_tz8hhn.jpg",
//             "https://res.cloudinary.com/dstqymucm/image/upload/v1622362244/dogs/dog5/1_ys7agr.jpg",
//             "https://res.cloudinary.com/dstqymucm/image/upload/v1622206053/dogs/dog5/2_jhwvqt.jpg"
//         ],
//         "gender": "male",
//         "age": "senior",
//         "isAdopted": false,
//         "likes": "93",
//         "likedBy": [
//             "s103"
//         ],
//         "size": "Small",
//         "neuterSpayed": true,
//         "trained": true,
//         "vaccine": true,
//         "owner": {
//             "_id": "s107",
//             "name": "Thomas	Joe",
//             "imgUrl": "https://res.cloudinary.com/dstqymucm/image/upload/v1622380429/dogs/dog5/owner_8_mcd1be.jpg",
//             "loc": {
//                 "address": "haifa",
//                 "lat": 21313123123,
//                 "lng": 23132131221
//             }
//         },
//         "tags": [
//             "dog",
//             "big"
//         ],
//         "comments": [
//             {
//                 "id": "rev101",
//                 "txt": "",
//                 "created": 1622299786455,
//                 "by": {
//                     "_id": "",
//                     "fullname": "",
//                     "imgUrl": ""
//                 }
//             }
//         ]
//     },
//     {
//         "_id": "p108",
//         "addedAt": 1622299986455,
//         "type": "Cat",
//         "name": "Misty",
//         "breed": "white cat",
//         "title": "Misty the White Cat loves to rest",
//         "desc": "",
//         "imgUrls": [
//             "https://res.cloudinary.com/dstqymucm/image/upload/v1622363512/petMe/cats/cat2/2_2_tcoaxc.jpg",
//             "https://res.cloudinary.com/dstqymucm/image/upload/v1622363849/petMe/cats/cat2/1_4_gude8u.jpg",
//             "https://res.cloudinary.com/dstqymucm/image/upload/v1622363787/petMe/cats/cat2/5_2_e9qxds.jpg",
//             "https://res.cloudinary.com/dstqymucm/image/upload/v1622363652/petMe/cats/cat2/4_2_vbqag1.jpg",
//             "https://res.cloudinary.com/dstqymucm/image/upload/v1622363569/petMe/cats/cat2/3_2_ggwxo6.jpg"
//         ],
//         "gender": "female",
//         "age": "adult",
//         "isAdopted": false,
//         "likes": "93",
//         "likedBy": [
//             "s103"
//         ],
//         "size": "Small",
//         "neuterSpayed": true,
//         "trained": true,
//         "vaccine": true,
//         "owner": {
//             "_id": "s108",
//             "name": "George	Reece",
//             "imgUrl": "https://res.cloudinary.com/dstqymucm/image/upload/v1622380349/petMe/cats/cat2/owner_7_yhyw90.jpg",
//             "loc": {
//                 "address": "haifa",
//                 "lat": 21313123123,
//                 "lng": 23132131221
//             }
//         },
//         "tags": [
//             "dog",
//             "big"
//         ],
//         "comments": [
//             {
//                 "id": "rev101",
//                 "txt": "",
//                 "created": 1622299786455,
//                 "by": {
//                     "_id": "",
//                     "fullname": "",
//                     "imgUrl": ""
//                 }
//             }
//         ]
//     },
//     {
//         "_id": "p109",
//         "addedAt": 1622299296455,
//         "type": "Dog",
//         "name": "Ray",
//         "breed": "Basenji dog",
//         "title": "Ray loves to walk and sniff",
//         "desc": "",
//         "imgUrls": [
//             "https://res.cloudinary.com/dstqymucm/image/upload/v1622364484/dogs/dog4/4_3_iosbdd.jpg",
//             "https://res.cloudinary.com/dstqymucm/image/upload/v1622364514/dogs/dog4/5_3_auyswq.jpg",
//             "https://res.cloudinary.com/dstqymucm/image/upload/v1622131784/dogs/dog4/3_ytuoax.jpg",
//             "https://res.cloudinary.com/dstqymucm/image/upload/v1622364436/dogs/dog4/2_3_jy8krb.jpg",
//             "https://res.cloudinary.com/dstqymucm/image/upload/v1622204506/dogs/dog4/1_ahnfd1.jpg"
//         ],
//         "gender": "male",
//         "age": "senior",
//         "isAdopted": false,
//         "likes": "93",
//         "likedBy": [
//             "s103"
//         ],
//         "size": "Small",
//         "neuterSpayed": true,
//         "trained": true,
//         "vaccine": true,
//         "owner": {
//             "_id": "s101",
//             "name": "Mike York",
//             "imgUrl": "https://res.cloudinary.com/dstqymucm/image/upload/v1622145053/petMe/rabbit/rabbit1/owner_iss67z.jpg",
//             "loc": {
//                 "address": "haifa",
//                 "lat": 21313123123,
//                 "lng": 23132131221
//             }
//         },
//         "tags": [
//             "dog",
//             "small"
//         ],
//         "comments": [
//             {
//                 "id": "rev101",
//                 "txt": "",
//                 "created": 1622299786455,
//                 "by": {
//                     "_id": "",
//                     "fullname": "",
//                     "imgUrl": ""
//                 }
//             }
//         ]
//     },
//     {
//         "_id": "p110",
//         "addedAt": 1622299102455,
//         "type": "Rabbit",
//         "name": "Angel",
//         "breed": "Blanc de Hotot",
//         "title": "An angelic and charming rabbit",
//         "desc": "",
//         "imgUrls": [
//             "https://res.cloudinary.com/dstqymucm/image/upload/v1622207016/petMe/rabbit/rrabit3/2_kno829.jpg",
//             "https://res.cloudinary.com/dstqymucm/image/upload/v1622206852/petMe/rabbit/rrabit3/4_rqenct.jpg",
//             "https://res.cloudinary.com/dstqymucm/image/upload/v1622206926/petMe/rabbit/rrabit3/5_z2ulci.jpg",
//             "https://res.cloudinary.com/dstqymucm/image/upload/v1622206816/petMe/rabbit/rrabit3/3_r9is3t.jpg",
//             "https://res.cloudinary.com/dstqymucm/image/upload/v1622206572/petMe/rabbit/rrabit3/1_2_chadja.jpg"
//         ],
//         "gender": "female",
//         "age": "young",
//         "isAdopted": false,
//         "likes": "100",
//         "likedBy": [
//             "s103"
//         ],
//         "size": "Small",
//         "neuterSpayed": true,
//         "trained": true,
//         "vaccine": true,
//         "owner": {
//             "_id": "s101",
//             "name": "Mike York",
//             "imgUrl": "https://res.cloudinary.com/dstqymucm/image/upload/v1622145053/petMe/rabbit/rabbit1/owner_iss67z.jpg",
//             "loc": {
//                 "address": "haifa",
//                 "lat": 21313123123,
//                 "lng": 23132131221
//             }
//         },
//         "tags": [
//             "dog",
//             "small"
//         ],
//         "comments": [
//             {
//                 "id": "rev101",
//                 "txt": "",
//                 "created": 1622299786455,
//                 "by": {
//                     "_id": "",
//                     "fullname": "",
//                     "imgUrl": ""
//                 }
//             }
//         ]
//     },
//     {
//         "_id": "p111",
//         "addedAt": 1622299116455,
//         "type": "Parrot",
//         "name": "Jake",
//         "breed": "Lories",
//         "title": "The colorful parrot Jake",
//         "desc": "",
//         "imgUrls": [
//             "https://res.cloudinary.com/dstqymucm/image/upload/v1622364986/petMe/parrot/parrot1/3_3_xqin04.jpg",
//             "https://res.cloudinary.com/dstqymucm/image/upload/v1622364955/petMe/parrot/parrot1/2_5_ejaipl.jpg",
//             "https://res.cloudinary.com/dstqymucm/image/upload/v1622365084/petMe/parrot/parrot1/5_4_ztysd8.jpg",
//             "https://res.cloudinary.com/dstqymucm/image/upload/v1622365049/petMe/parrot/parrot1/4_4_x2snno.jpg",
//             "https://res.cloudinary.com/dstqymucm/image/upload/v1622365193/petMe/parrot/parrot1/1_6_sgu9j5.jpg"
//         ],
//         "gender": "male",
//         "age": "adult",
//         "isAdopted": false,
//         "likes": "95",
//         "likedBy": [
//             "s103"
//         ],
//         "size": "Small",
//         "neuterSpayed": true,
//         "trained": true,
//         "vaccine": true,
//         "owner": {
//             "_id": "s111",
//             "name": "Sophie	Tracy",
//             "imgUrl": "https://res.cloudinary.com/dstqymucm/image/upload/v1622379848/petMe/parrot/parrot1/owner_5_nofgky.jpg",
//             "loc": {
//                 "address": "haifa",
//                 "lat": 21313123123,
//                 "lng": 23132131221
//             }
//         },
//         "tags": [
//             "dog",
//             "small"
//         ],
//         "comments": [
//             {
//                 "id": "rev101",
//                 "txt": "",
//                 "created": 1622299786455,
//                 "by": {
//                     "_id": "",
//                     "fullname": "",
//                     "imgUrl": ""
//                 }
//             }
//         ]
//     },
//     {
//         "_id": "p112",
//         "addedAt": 1622299586455,
//         "type": "Rabbit",
//         "name": "Mopsy",
//         "breed": "American Rabbit",
//         "title": "Just a sweet rabbit",
//         "desc": "",
//         "imgUrls": [
//             "https://res.cloudinary.com/dstqymucm/image/upload/v1622366729/petMe/rabbit/rabbit2/1_itx6fr.jpg",
//             "https://res.cloudinary.com/dstqymucm/image/upload/v1622366679/petMe/rabbit/rabbit2/2_qlenwu.jpg",
//             "https://res.cloudinary.com/dstqymucm/image/upload/v1622366644/petMe/rabbit/rabbit2/4_ruzd4e.jpg",
//             "https://res.cloudinary.com/dstqymucm/image/upload/v1622366707/petMe/rabbit/rabbit2/5_kou7yn.jpg",
//             "https://res.cloudinary.com/dstqymucm/image/upload/v1622144481/petMe/rabbit/rabbit2/3_oti3h0.jpg"
//         ],
//         "gender": "male",
//         "age": "senior",
//         "isAdopted": false,
//         "likes": "101",
//         "likedBy": [
//             "s103"
//         ],
//         "size": "big",
//         "neuterSpayed": true,
//         "trained": true,
//         "vaccine": true,
//         "owner": {
//             "_id": "s112",
//             "name": "William Damian",
//             "imgUrl": "https://res.cloudinary.com/dstqymucm/image/upload/v1622379372/petMe/rabbit/rabbit2/owner_3_xqnlwn.jpg",
//             "loc": {
//                 "address": "haifa",
//                 "lat": 21313123123,
//                 "lng": 23132131221
//             }
//         },
//         "tags": [
//             "dog",
//             "small"
//         ],
//         "comments": [
//             {
//                 "id": "rev101",
//                 "txt": "",
//                 "created": 1622299786455,
//                 "by": {
//                     "_id": "",
//                     "fullname": "",
//                     "imgUrl": ""
//                 }
//             }
//         ]
//     }
// ]

const BASE_URL = process.env.NODE_ENV === 'production' ? '/api/pet' : 'http://localhost:3030/api/pet'
let gPets=[]


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
function remove(petId) {
    storageService.remove(STORAGE_KEY, petId)
}

async function getPetByid(petId) {

    let pet = await httpService.get(`pet/${petId}`)
    return pet
}

async function toggleLike(petId, userId, act, idx) {
    const petIdx = gPets.findIndex(pet => pet._id === petId)
    // switch (act) {
    //     case 1:
    //         gPets[petIdx].likedBy.push(userId)
    //         gPets[petIdx].likes++
    //         break;
    //     case -1:
    //         gPets[petIdx].likedBy.splice(idx, 1)
    //         gPets[petIdx].likes--
    //         break;
    //     default:
    //         break;
    // }
    return Promise.resolve(petId, gPets[petIdx].likedBy)
}
