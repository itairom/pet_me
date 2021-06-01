import { connect } from 'react-redux'
import React from 'react'
import { loadPets } from '../store/actions/petActions'
import { PetList } from '../cmps/PetList'
import userIcon from '../assets/img/loaders/1.gif' // relative path to image
import magnifyingGlass from '../assets/img/svg/magnifying-glass.svg' // relative path to image 
import { PetFilter } from '../cmps/PetFilter'

// window.addEventListener('click', () => {
//     this.setState({ isFilterShown: false })
// })

class _Explore extends React.Component {


    state = {
        pets: null,
        isFilterShown: false,
        filterBy: null
    }
    async componentDidMount() {
        await this.onSetFilter()
        console.log(this.state.filterBy)
        this.props.loadPets(this.state.filterBy)
        this.setState({ pets: this.props.pets })
    }

    onSetFilter = () => {
        const search = new URLSearchParams(this.props.location.search)
        let filterBy = {
            gender: search.get('gender'),
            type: search.get('type'),
            age: search.get('age'),
            size: search.get('size'),
            location: search.get('location')
        }
        this.setState({ filterBy })
    }

    onToggleFilter = () => {
        this.setState({ isFilterShown: !this.state.isFilterShown }
        )
    }


    render() {
        const { pets } = this.props
        const { isFilterShown, filterBy } = this.state
        if (!pets) return <img src={userIcon} alt="loading" />
        console.log(filterBy?.type);
        return (
            <section className="main-container">
                <div className="explore-search">
                    <span onClick={() => this.onToggleFilter()} > Start your search</span>

                    {isFilterShown && <PetFilter />}

                    <div className="search-btn">
                        <img className="filter-search" src={magnifyingGlass} alt="glass" />
                    </div>
                </div>

                {!filterBy?.type && <h1>Our pets</h1>}
                {filterBy?.type && <h1>Our <span> {filterBy.size} {filterBy.type}s</span></h1>}
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