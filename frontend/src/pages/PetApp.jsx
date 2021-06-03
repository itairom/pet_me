import { connect } from 'react-redux'
import React from 'react'
import { loadPets, addPet } from '../store/actions/petActions'
import { Link } from 'react-router-dom'
import { PetFilter } from '../cmps/PetFilter'
import { PetPreview } from '../cmps/PetPreview'
import { ReactComponent as RightArrow } from '../assets/img/svg/right-arrow.svg'
import magnifyingGlass from '../assets/img/svg/magnifying-glass.svg'
import contact from '../assets/img/svg/contact.svg'
import info from '../assets/img/svg/info.svg'
import paw from '../assets/img/svg/paw.svg'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';


class _PetApp extends React.Component {
    state = {
        pets: null,
        isFilterShown: false,
    }
    componentDidMount() {
        this.props.loadPets()
        this.setState({ pets: this.props.pets })
        window.addEventListener('scroll', () => {
            this.setState({ isFilterShown: false })
        })
    }
    render() {
        const { pets } = this.props
        if (pets.length === 0) return <h1>loading</h1>
        return (
            <section className="main-container">
                <section className="hero full">
                    <div className="hero-content">
                        < PetFilter />
                            <h1>Find your</h1>
                            <h1> best friend</h1>
                    </div>
                </section>
                <div className="type-cards">
                    <h2 className="type-cards-title">Our sweet pet types</h2>
                    <div className="type-img">
                        <div>
                            <Link to={`/explore/?&type=dog`} >
                                <img src="https://res.cloudinary.com/dstqymucm/image/upload/v1622205405/dogs/dog3/frnach-dog3_npdovb.jpg" alt="card" />
                                <h4>Dogs</h4>
                            </Link>
                        </div>
                        <div>
                            <Link to={`/explore/?&type=cat`} >
                                <img src="https://res.cloudinary.com/dstqymucm/image/upload/v1622203804/petMe/cats/cat_nnrk1h.jpg" alt="card" />
                                <h4>Cats</h4>
                            </Link>
                        </div>
                        <div>
                            <Link to={`/explore/?&type=rabbit`} >
                                <img src="https://res.cloudinary.com/dstqymucm/image/upload/v1622206572/petMe/rabbit/rrabit3/1_2_chadja.jpg" alt="card" />
                                <h4>Rabbits</h4>
                            </Link>
                        </div>
                        <div>
                            <Link to={`/explore/?&type=parrot`} >
                                <img src="https://res.cloudinary.com/dstqymucm/image/upload/v1622213930/petMe/parrot/1_3_s1zdqk.jpg" alt="card" />
                                <h4>Parrots</h4>
                            </Link>
                        </div>
                    </div>
                </div>
                <section className="homepage-section-info">
                    <div className="content">
                        <div>
                            <div className="info-title-icon">
                                <h2>Filter down to your perfect fit</h2>
                                <SearchOutlinedIcon className="info-icons" />
                            </div>
                            <p> Personalize your search with filters like gender,
                            type, size or a pool to get exactly what you want.
                            </p>
                        </div>
                        <div>
                            <div className="info-title-icon">
                                <h2>Dig into the details</h2>
                                <img className="info-icons" src={info} alt="glass" />
                            </div>
                            <p> Check out the photos and view pet information.
                                Next, read user reviews and comments about the pet and its owner.</p>
                        </div>
                        <div>
                            <div className="info-title-icon">
                                <h2>Contact pet owners</h2>
                                <img className="info-icons" src={contact} alt="glass" />
                            </div>
                            <p>  Once you have decided which pet you would like to adopt, contact the pet owners and keep your fingers crossed.</p>
                        </div>
                        <div>
                            <div className="info-title-icon">
                                <h2>Adopt a friend!</h2>
                                <img className="info-icons" src={paw} alt="glass" />
                            </div>
                            <p> In a quick and easy process you can adopt a pet that will become your new friend for life. </p>
                        </div>
                    </div>
                </section>
                <section className="type-cards preview-homepage">
                    <h2 className="type-cards-title">Waiting long time to adopt</h2>
                    <div className="preview-cards">
                        <PetPreview pet={pets[9]} key={pets[9]._id} />
                        <PetPreview pet={pets[13]} key={pets[13]._id} />
                        <PetPreview pet={pets[1]} key={pets[1]._id} />
                        <PetPreview pet={pets[14]} key={pets[14]._id} />
                    </div>
                </section>
                <section className="type-cards preview-homepage">
                    <h2 className="type-cards-title">Most Liked Pets Available For Adoption</h2>
                    <div className="preview-cards">
                        <PetPreview pet={pets[4]} key={pets[4]._id} />
                        <PetPreview pet={pets[5]} key={pets[5]._id} />
                        <PetPreview pet={pets[6]} key={pets[6]._id} />
                        <PetPreview pet={pets[7]} key={pets[7]._id} />
                    </div>
                </section>

                <section className="homepage-about main-container full">
                    <div className="blur full">
                        <div className="about-content main-container">
                            <h2>Our vision</h2>
                            <p>PetMe is dedicated to saving the lives of animals in need. We improve animal welfare in communities through adoption, education, and providing resources for people and pets.</p>
                            <p>We strive for a world where every companion animal has a safe and loving home and their family has the knowledge and resources needed to give them the life they deserve.</p>
                        </div>
                    </div>
                </section>
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
    loadPets,
    addPet
}

export const PetApp = connect(mapStateToProps, mapDispatchToProps)(_PetApp)