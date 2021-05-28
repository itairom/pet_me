import { connect } from 'react-redux'
import React from 'react'
import { PetList } from '../cmps/PetList';
import { loadPets, addPet } from '../store/actions/petActions'
class _PetApp extends React.Component {

    state = {
        pets: null
    }
    componentDidMount() {
        this.props.loadPets()
        this.setState({ pets: this.props.pets })
    }

    onAddPet = () => {
        let pet = {
            "_id": "456",
            "type": "dog",
            "name": "Noble",
            "breed": "German Shepherd ",
            "title": "Noble dog",
            "desc": "Nobleman is slower to warm up to new people and would do best in a home willing to work with him and understanding his need to come to people on his own terms. This includes letting him sniff a new person and letting him walk away until he is ready to interact with them.  Nobleman is house and crate trained. We are looking for a home that will continue with the training and socialization methods set in place by his amazing trainer and foster parents. He needs patience, structure.He would do best in a home without small children or cats. While Nobleman does get along with his foster pack he would prefer to be an only dog If you are looking for a giant loving soul who will give you his full devotion in exchange for continuing to help him gain his confidence Please apply below!",
            "imgUrl": "url",
            "gender": "male",
            "age": 7,
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
        console.log('add');
        this.props.addPet(pet)
    }

    render() {
        const { pets } = this.props
        if (!pets) return <h1>loading</h1>
        return (
            <section>
                <section className="hero-main" ></section>
                <img className="hero-img" src="https://c0.wallpaperflare.com/preview/33/261/178/tan-siberian-husky-on-snow-pathway.jpg" alt="Hero" />
                <div className="type-cards">
                    <h2>Find your next pet</h2>
                    <div className="type-img">
                        <img src="https://res.cloudinary.com/dhorz8v6v/image/upload/v1622184194/home/3_rhldud.jpg" alt="card" />
                        <img src="https://res.cloudinary.com/dhorz8v6v/image/upload/v1622184190/home/2_psg3af.jpg" alt="card" />
                        <img src="https://res.cloudinary.com/dhorz8v6v/image/upload/v1622184188/home/4_wqosra.jpg" alt="card" />
                        <img src="https://res.cloudinary.com/dhorz8v6v/image/upload/v1622184185/home/1_l4db6a.jpg" alt="card" />
                    </div>

                </div>

                < PetList pets={pets} />
                <button onClick={() => this.onAddPet()}>Add</button>
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        pets: state.petModule.pets
    }
}


const mapDispatchToProps = {
    loadPets, addPet
}

export const PetApp = connect(mapStateToProps, mapDispatchToProps)(_PetApp)