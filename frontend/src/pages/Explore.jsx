import { connect } from 'react-redux'
import React from 'react'
import { loadPets } from '../store/actions/petActions'
import { PetList } from '../cmps/PetList'
import userIcon from '../assets/img/loaders/loader_2.svg' // relative path to image
import magnifyingGlass from '../assets/img/svg/magnifying-glass.svg' // relative path to image 
import { PetFilter } from '../cmps/PetFilter'


class _Explore extends React.Component {
    state = {
        isFilterShown: false,
        filterBy: null
    }
    async componentDidMount() {
        await this.onSetFilter()
        await this.props.loadPets(this.state.filterBy)

        window.addEventListener('scroll', () => {
            this.setState({ isFilterShown: false })
        })
    }

    async componentWillUnmount() {
        await this.props.loadPets()
        window.removeEventListener('scroll', () => {
        })
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
        if (!filterBy) return <img src={userIcon} alt="loading" />
        console.log("🚀 ~ file: Explore.jsx ~ line 52 ~ _Explore ~ render ~ filterBy", filterBy)

        return (
            <section className="main-container">
                {!isFilterShown && <div className="explore-search">
                    <span onClick={() => this.onToggleFilter()} > Start your search</span>
                    <div className="search-btn-explore">
                        <img className="filter-search" src={magnifyingGlass} alt="glass" />
                    </div>
                </div>}
                {isFilterShown && <PetFilter />}
                {!filterBy.type && <h1>Our pets</h1>}
                {filterBy.type && <h1>Our <span> {filterBy.gender} {filterBy.size}  {filterBy.type}s</span></h1>}
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