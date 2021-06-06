import magnifyingGlass from '../assets/img/svg/magnifying-glass.svg' // relative path to image 
import { withRouter } from 'react-router-dom'
import React from 'react'



class _PetFilter extends React.Component {

    state = {
        filterBy: {
            gender: '',
            type: '',
            age: '',
            size: '',
            location: ''
        },
        types: ['cat,fish,lion']
    }

    handleChange = ({ target }) => {
        const { name, value } = target
        const { filterBy } = this.state
        this.setState({ filterBy: { ...filterBy, [name]: value } })
    }

    handleChangeModal = (value, name) => {
        // const { name, value } = target
        const { filterBy } = this.state
        this.setState({ filterBy: { ...filterBy, [name]: value } })
    }

    onSubmitFilter = () => {
        const query = new URLSearchParams(this.state.filterBy)
        this.props.history.push(`/explore/?${query.toString()}`)
    }

    render() {
        const { gender, age, type, location, size } = this.state.filterBy

        console.log('pet', type);

        return (

            <section className='pet-filter'>
                <div className="filter-select pet-select">
                    <label >Pet</label>
                    <select className='main-select' value={type} onChange={this.handleChange} name="type" >
                        <option className="any-placeholder" value="">Any</option>
                        <option value="cat">Cat</option>
                        <option value="dog">Dog</option>
                        <option value="rabbit">Rabbit</option>
                        <option value="parrot">Parrot</option>
                        <option value="hamster">Hamster</option>
                    </select>
                </div>
                <div className="filter-select gender-select">
                    <label >Gender</label>
                    <select className='main-select' value={gender} onChange={this.handleChange} name="gender" >
                        <option className="any-placeholder" value="">Both</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <div className="filter-select age-select">
                    <label >Age</label>
                    <select className='main-select' value={age} onChange={this.handleChange} name="age" >
                        <option className="any-placeholder" value="">Any</option>
                        <option value="young">0-3</option>
                        <option value="adult">4-6</option>
                        <option value="senior">6-15</option>
                    </select>
                </div>
                <div className="filter-select size-select">
                    <label >Size</label>
                    <select className='main-select' value={size} onChange={this.handleChange} name="size" >
                        <option className="any-placeholder" value="">Any</option>
                        <option value="small">Small</option>
                        <option value="medium">Mediun</option>
                        <option value="big">Big</option>
                    </select>
                </div>
                <div className="filter-select location-select">
                    <label >Location</label>
                    <input placeholder="Enter location" className='location-select' value={location} onChange={this.handleChange} name="location"  ></input>
                </div>

                {/* {this.state.types.map(type => {
                    return (
                        <div className="select-modal">
                            <div onClick={() => this.handleChangeModal(type, 'type')} value={type}> {type} </div>
                        </div>
                    )
                })} */}

                <button className="search-btn filter-select" onClick={this.onSubmitFilter}>
                    <img className="filter-search" src={magnifyingGlass} alt="glass" />
                </button>
            </section>
        )
    }
}

export const PetFilter = withRouter(_PetFilter)