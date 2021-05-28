import { connect } from 'react-redux'
import React from 'react'
import { PetList } from '../cmps/PetList';
import { loadPets } from '../store/actions/petActions'
class _Explore extends React.Component {

    state = {
        pets: null
    }
    componentDidMount() {
        // console.log(this.props.match.params.type);
        this.props.loadPets(this.props.match.params)
        this.setState({ pets: this.props.pets })
    }

    render() {
        const { pets } = this.props
        if (!pets) return <h1>loading...</h1>
        return (
            <section>
                <h1>Explore</h1>
                < PetList pets={ pets } />
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