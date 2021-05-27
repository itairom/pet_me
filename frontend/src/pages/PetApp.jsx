import { connect } from 'react-redux'
import React from 'react'
import { PetList } from '../cmps/PetList';
import { loadPets,addPet } from '../store/actions/petActions'
class _PetApp extends React.Component {

    state = {
        pets: null
    }
    componentDidMount() {
        this.props.loadPets()
        this.setState({ pets: this.props.pets })
    }

    onAddPet=()=>{
        
    }

    render() {
        const { pets } = this.props
        if (!pets) return <h1>loading</h1>
        return (
            <section>
                < PetList pets={pets} />
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
    loadPets,addPet
}

export const PetApp = connect(mapStateToProps, mapDispatchToProps)(_PetApp)