import { connect } from 'react-redux'
import React from 'react'
import { loadPets, addPet } from '../store/actions/petActions'
import { Link } from 'react-router-dom'

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
            <section className="main-container">
                <section className="hero"></section>
                <div className="type-cards container">
                    <h2>Find your next friend</h2>
                    <div className="type-img">
                        <div>
                            <Link to="/explore/dog" >
                                <img src="https://res.cloudinary.com/dstqymucm/image/upload/v1622205405/dogs/dog3/frnach-dog3_npdovb.jpg" alt="card" />
                                <h4>Dogs</h4>
                            </Link>
                        </div>
                        <div>
                            <Link to="/explore/cat" >
                                <img src="https://res.cloudinary.com/dstqymucm/image/upload/v1622203804/petMe/cats/cat_nnrk1h.jpg" alt="card" />
                                <h4>Cats</h4>
                            </Link>
                        </div>
                        <div>
                            <img src="https://res.cloudinary.com/dstqymucm/image/upload/v1622206572/petMe/rabbit/rrabit3/1_2_chadja.jpg" alt="card" />
                            <h4>Rabbits</h4>
                        </div>
                        <div>
                            <img src="https://res.cloudinary.com/dstqymucm/image/upload/v1622213930/petMe/parrot/1_3_s1zdqk.jpg" alt="card" />
                            <h4>Parrots</h4>
                        </div>
                    </div>

                </div>

<<<<<<< HEAD
                {/* < PetList pets={pets} /> */ }
                <button onClick={ () => this.onAddPet() }>Add</button>
=======
                <button onClick={() => this.onAddPet()}>Add</button>
                <div className="type-cards container">
                    <h2>Find your next friend</h2>
                    <div className="type-img">
                        <div>
                            <Link to="/explore/dog" >
                                <img src="https://res.cloudinary.com/dstqymucm/image/upload/v1622206029/dogs/dog5/1_ys7agr.jpg" alt="card" />
                                <h4>Dogs</h4>
                            </Link>
                        </div>
                        <div>
                            <Link to="/explore/cat" >
                                <img src="https://res.cloudinary.com/dstqymucm/image/upload/v1622214651/petMe/cats/cat2_lekwe7.jpg" alt="card" />
                                <h4>Cats</h4>
                            </Link>
                        </div>
                        <div>
                            <img src="http://res.cloudinary.com/dstqymucm/image/upload/v1622204506/dogs/dog4/1_ahnfd1.jpg" alt="card" />
                            <h4>Dogs</h4>
                        </div>
                        <div>
                            <img src="https://res.cloudinary.com/dstqymucm/image/upload/v1622144479/petMe/hamster/1_r0a5d5.jpg" alt="card" />
                            <h4>Hammy</h4>
                        </div>
                    </div>
                </div>
                <section className="homepage-about">
                    <div className="inner-container container flex">
                        <div className="about-content">
                            <h2>About as/vision.........................</h2>
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque quidem, quibusdam reiciendis perspiciatis quo itaque ad ullam provident minus corporis autem ab? Voluptas nemo rerum, ut fuga hic reiciendis natus?s</p>
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque quidem, quibusdam reiciendis perspiciatis quo itaque ad ullam provident minus corporis autem ab? Voluptas nemo rerum, ut fuga hic reiciendis natus?s</p>
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque quidem, quibusdam reiciendis perspiciatis quo itaque ad ullam provident minus corporis autem ab? Voluptas nemo rerum, ut fuga hic reiciendis natus?s</p>
                            <button>Join Us</button>
                        </div>
                        <div className="about_imgs">
                            <img src="https://res.cloudinary.com/dstqymucm/image/upload/v1622209864/petMe/about-imgs/about1_rt4e2u.jpg" alt="card" />
                            <img src="https://res.cloudinary.com/dstqymucm/image/upload/v1622210087/petMe/about-imgs/about-cat_w78jtf.jpg" alt="card" />
                            <img src="https://res.cloudinary.com/dstqymucm/image/upload/v1622210260/petMe/about-imgs/boy-and-cat_hd5uqt.jpg" alt="card" />
                        </div>
                    </div>
                </section>
>>>>>>> ccf3a28b9eb5f942314fd1e2926f54dc0b5b4beb
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