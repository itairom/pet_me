import magnifyingGlass from '../assets/img/svg/magnifying-glass.svg' // relative path to image 
import {  withRouter } from 'react-router-dom'
import React from 'react'



class _PetFilter extends React.Component {

    state = {
        filterBy: {
            gender: '',
            type: '',
            age: '',
            size: '',
            location: ''
        }
    }

    handleChange = ({ target }) => {
        const { name, value } = target
        const { filterBy } = this.state
        this.setState({ filterBy: { ...filterBy, [name]: value } })
    }

    onSubmitFilter = () => {
        const query = new URLSearchParams(this.state.filterBy)
        this.props.history.push(`/explore/?${query.toString()}`)
    }



    render() {
        const { gender, age, type, location, size } = this.state.filterBy


        return (

            <section className='pet-filter'>
                <div className="filter-select gender-select">
                    <label >Gender</label>
                    {/* <label > */}
                        <select className='main-select' value={gender} onChange={this.handleChange} name="gender" >
                            <option className="any-placeholder" value="">Both</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    {/* </label> */}
                </div>
                <div className="filter-select pet-select">
                    <label >Pet</label>
                    {/* <label  > */}
                        <select className='main-select' value={type} onChange={this.handleChange} name="type" >
                            <option className="any-placeholder" value="">Any</option>
                            <option value="cat">Cat</option>
                            <option value="dog">Dog</option>
                            <option value="rabbit">Rabbit</option>
                            <option value="parrot">Parrot</option>
                            <option value="hamster">Hamster</option>
                        </select>
                    {/* </label> */}
                </div>
                <div className="filter-select age-select">
                    <label >Age</label>
                    {/* <label  > */}
                        <select className='main-select' value={age} onChange={this.handleChange} name="age" >
                            <option className="any-placeholder" value="">Any</option>
                            <option value="young">Young</option>
                            <option value="adult">Adult</option>
                            <option value="senior">Senior</option>
                        </select>
                    {/* </label> */}
                </div>
                <div className="filter-select size-select">
                    <label >Size</label>
                    {/* <label > */}
                        <select className='main-select' value={size} onChange={this.handleChange} name="size" >
                            <option className="any-placeholder" value="">Any</option>
                            <option value="small">Small</option>
                            <option value="medium">Mediun</option>
                            <option value="big">Big</option>
                        </select>
                    {/* </label> */}
                </div>
                <div className="filter-select location-select">
                    <label >Location</label>
                    <input placeholder="Enter location" className='location-select' value={location} onChange={this.handleChange} name="location"  ></input>
                </div>

                <button className="search-btn" onClick={this.onSubmitFilter}>
                    <img className="filter-search" src={magnifyingGlass} alt="glass" />
                </button>

            </section>
        )
    }
}

export const PetFilter = withRouter(_PetFilter)