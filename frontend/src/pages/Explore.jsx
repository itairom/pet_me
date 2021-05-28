import { connect } from 'react-redux'
import React from 'react'
import { PetList } from '../cmps/PetList';
import { loadPets } from '../store/actions/petActions'
class _Explore extends React.Component {

    state = {
        pets: null
    }
    componentDidMount() {
        this.props.loadPets()
        this.setState({ pets: this.props.pets })
    }

    render() {
        const { pets } = this.props
        console.log(pets);
        if (!pets) return <h1>loading...</h1>
        return (
            <section>
                <h1>Explor</h1>
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
    loadPets
}

export const Explore = connect(mapStateToProps, mapDispatchToProps)(_Explore)