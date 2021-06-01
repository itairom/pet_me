import { connect } from 'react-redux'
import React from 'react'
import { loadPets, addPet } from '../store/actions/petActions'
import { Link } from 'react-router-dom'
import { PetFilter } from '../cmps/PetFilter'
import { PetPreview } from '../cmps/PetPreview'
// import { ReactComponent as Glass } from '../assets/img/svg/magnifying-glass.svg'



class _PetApp extends React.Component {

    state = {
        pets: null
    }

    componentDidMount() {
        this.props.loadPets()
        this.setState({ pets: this.props.pets })
    }

    
    

    render() {
        const { pets } = this.props
        if (pets.length === 0) return <h1>loading</h1>

        return (
            <section className="main-container">
                <section className="hero full ">
                    <div className="hero-content">
                        < PetFilter />
                        <h1>Find your</h1>
                        <h1> best friend</h1>
                    </div>
                </section>
                <div className="type-cards">
                    <h2>Our sweet pet types</h2>
                    <div className="type-img">
                        <div>
                            <Link to={`/explore/dog`} >
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
                            <Link to="/explore/rabbit" >
                                <img src="https://res.cloudinary.com/dstqymucm/image/upload/v1622206572/petMe/rabbit/rrabit3/1_2_chadja.jpg" alt="card" />
                                <h4>Rabbits</h4>
                            </Link>
                        </div>
                        <div>
                            <Link to="/explore/parrot" >
                                <img src="https://res.cloudinary.com/dstqymucm/image/upload/v1622213930/petMe/parrot/1_3_s1zdqk.jpg" alt="card" />
                                <h4>Parrots</h4>
                            </Link>
                        </div>
                    </div>
                </div>
                <section className="homepage-section-info">
                    <div className="content">
                        <div>
                            <h2>Filter down to your perfect fit</h2>
                            <p> Personalize your search with filters like gender,
                                 type, size or a pool to get exactly what you want. </p>
                        </div>
                        <div>
                            <h2>Dig into the details</h2>
                            <p> Check out the photos and view pet information. 
                                Next, read user reviews and comments about the pet and its owner.</p>
                        </div>
                        <div>
                            <h2>Contact pet owners</h2>
                            <p>  Once you have decided which pet you would like to adopt, contact the pet owners and keep your fingers crossed that the pet will be your next friend </p>
                        </div>
                        <div>
                            <h2>Adopt a friend!</h2>
                            <p> In a quick and easy process you can adopt a pet that will become your new friend for life. </p>
                        </div>
                    </div>
                </section>
                <section className="type-cards preview-homepage">
                    <h2>Waiting long time to adopt</h2>
                    <div className="preview-cards">
                        <div>
                            <PetPreview pet={pets[0]} key={pets[0]._id} />
                        </div>
                        <div>
                            <PetPreview pet={pets[1]} key={pets[1]._id} />
                        </div>
                        <div>
                            <PetPreview pet={pets[2]} key={pets[2]._id} />
                        </div>
                        <div>
                            <PetPreview pet={pets[3]} key={pets[3]._id} />
                        </div>

                    </div>
                </section>
                <section className="type-cards preview-homepage">
                    <h2>Most Liked Pets Available For Adoption</h2>
                    <div className="preview-cards">
                        <div>
                            <PetPreview pet={pets[4]} key={pets[4]._id} />
                        </div>
                        <div>
                            <PetPreview pet={pets[5]} key={pets[5]._id} />
                        </div>
                        <div>
                            <PetPreview pet={pets[6]} key={pets[6]._id} />
                        </div>
                        <div>
                            <PetPreview pet={pets[7]} key={pets[7]._id} />
                        </div>

                    </div>
                </section>

                {/* <div className="type-cards">
                    <h2>Find your next friend</h2>
                    <div className="type-img">
                        <div>
                            <Link to="/p107" >
                                <img src="https://res.cloudinary.com/dstqymucm/image/upload/v1622362244/dogs/dog5/1_ys7agr.jpg" alt="card" />
                                <h4>Rex</h4>
                            </Link>
                        </div>
                        <div>
                            <Link to="/p108" >
                                <img src="https://res.cloudinary.com/dstqymucm/image/upload/v1622214651/petMe/cats/cat2_lekwe7.jpg" alt="card" />
                                <h4>Misty</h4>
                            </Link>
                        </div>
                        <div>
                            <Link to="/p109" >
                                <img src="http://res.cloudinary.com/dstqymucm/image/upload/v1622204506/dogs/dog4/1_ahnfd1.jpg" alt="card" />
                                <h4>Ray</h4>
                            </Link>

                        </div>
                        <div>
                            <Link to="/p106" >
                                <img src="https://res.cloudinary.com/dstqymucm/image/upload/v1622144479/petMe/hamster/1_r0a5d5.jpg" alt="card" />
                                <h4>Hammy</h4>
                            </Link>
                        </div>
                    </div>
                </div>  */}
                <section className="homepage-about main-container full">
                    {/* <div className="inner-container flex"> */}

                        {/* <div className="about_imgs"> */}
                        {/* <img src="https://res.cloudinary.com/dstqymucm/image/upload/v1622209864/petMe/about-imgs/about1_rt4e2u.jpg" alt="card" />
                            <img src="https://res.cloudinary.com/dstqymucm/image/upload/v1622210087/petMe/about-imgs/about-cat_w78jtf.jpg" alt="card" />
                            <img src="https://res.cloudinary.com/dstqymucm/image/upload/v1622210260/petMe/about-imgs/boy-and-cat_hd5uqt.jpg" alt="card" /> */}
                        {/* </div> */}
                    {/* </div> */}
                    <div className="about-content">
                        <h2>Our vision</h2>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque quidem, quibusdam reiciendis perspiciatis quo itaque ad ullam provident minus corporis autem ab? Voluptas nemo rerum, ut fuga hic reiciendis natus?s</p>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque quidem, quibusdam reiciendis perspiciatis quo itaque ad ullam provident minus corporis autem ab? Voluptas nemo rerum, ut fuga hic reiciendis natus?s</p>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque quidem, quibusdam reiciendis perspiciatis quo itaque ad ullam provident minus corporis autem ab? Voluptas nemo rerum, ut fuga hic reiciendis natus?s</p>
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
    loadPets, addPet
}

export const PetApp = connect(mapStateToProps, mapDispatchToProps)(_PetApp)