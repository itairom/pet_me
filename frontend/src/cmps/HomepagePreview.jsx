import { PetPreview } from '../cmps/PetPreview.jsx'
import { connect } from 'react-redux'
import React from 'react'
import { loadPets, addPet } from '../store/actions/petActions'

class _HomepagePreview extends React.Component {

    async componentDidMount() {
        await this.props.loadPets()
    }

    render() {

        const { pets } = this.props
        if (pets.length < 18) return <h1>loading</h1>

        return (
            <>
                <section className="type-cards preview-homepage">
                    <h2 className="type-cards-title">Waiting long time to adopt</h2>
                    <div className="preview-cards">
                        <PetPreview pet={ pets[9] } key={ pets[9]._id } />
                        <PetPreview pet={ pets[13] } key={ pets[13]._id } />
                        <PetPreview pet={ pets[1] } key={ pets[1]?._id } />
                        <PetPreview pet={ pets[14] } key={ pets[14]?._id } />
                    </div>
                </section>
                <section className="type-cards preview-homepage">
                    <h2 className="type-cards-title">Most Liked Pets</h2>
                    <div className="preview-cards">
                        <PetPreview pet={ pets[12] } key={ pets[11]?._id } />
                        <PetPreview pet={ pets[11] } key={ pets[12]?._id } />
                        <PetPreview pet={ pets[4] } key={ pets[4]?._id } />
                        <PetPreview pet={ pets[19] } key={ pets[19]?._id } />
                    </div>
                </section>
            </>

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

export const HomepagePreview = connect(mapStateToProps, mapDispatchToProps)(_HomepagePreview)