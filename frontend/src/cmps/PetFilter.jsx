import magnifyingGlass from '../assets/img/svg/magnifying-glass.svg' // relative path to image 
import { withRouter } from 'react-router-dom'
import React from 'react'
import { FilterSelect } from './FilterSelect'



class _PetFilter extends React.Component {

    state = {
        filterBy: {
            gender: '',
            type: '',
            age: '',
            size: '',
            location: ''
        },
        toggleSelect: false
    }

    // handleChange = ({ target }) => {
    //     const { name, value } = target
    //     const { filterBy } = this.state
    //     this.setState({ filterBy: { ...filterBy, [name]: value } })
    // }

    handleChange = (value, name) => {
        // console.log("🚀 ~ file: PetFilter.jsx ~ line 28 ~ _PetFilter ~ name", name)
        // console.log("🚀 ~ file: PetFilter.jsx ~ line 28 ~ _PetFilter ~ value", value)

        // const { name, value } = target
        const { filterBy } = this.state
        this.setState({
            filterBy: {
                ...filterBy,
                [name]: value
            }
        })
    }

    onSubmitFilter = () => {
        const query = new URLSearchParams(this.state.filterBy)
        this.props.history.push(`/explore/?${query.toString()}`)
    }

    onToggleSelect = () => {

        this.setState({ toggleSelect: !this.state.toggleSelect })
    }

    setOptions = () => {
        const options = {
            size: ['small', 'medium', 'big'],
            type: ['cat', 'dog', 'rabbit', 'dog', 'parrot', 'hamster'],
            gender: ['male', 'female'],
            age: ['young', 'adult', 'senior']
        }
        return options
    }

    render() {
        const options = this.setOptions()
        const sizeOptions = ['small', 'medium', 'big']
        const { gender, age, type, location, size } = this.state.filterBy
        const { toggleSelect } = this.state
        console.log('pet', this.state.filterBy);

        return (

            <section className='pet-filter'>
                <div className="filter-select pet-select">
                    <label >Pet</label>
                    <label onClick={this.onToggleSelect} className="select-label">
                        <label >{type}{!type && 'select'}</label>
                        {!toggleSelect && <FilterSelect key={type} handleChange={this.handleChange} options={options.type} name="type" />}
                    </label>
                    {/* <select className='main-select' value={type} onChange={this.handleChange} name="type" >
                        <option className="any-placeholder" value="">Any</option>
                        <option value="cat">Cat</option>
                        <option value="dog">Dog</option>
                        <option value="rabbit">Rabbit</option>
                        <option value="parrot">Parrot</option>
                        <option value="hamster">Hamster</option>
                    </select> */}
                </div>
                <div className="filter-select gender-select">
                    <label >Gender</label>
                    <label onClick={this.onToggleSelect} className="select-label">
                        <label >{gender}{!gender && 'select'}</label>
                        {!toggleSelect && <FilterSelect key={gender} handleChange={this.handleChange} options={options.gender} name="gender" />}
                    </label>

                    {/* <select className='main-select' value={gender} onChange={this.handleChange} name="gender" >
                        <option className="any-placeholder" value="">Both</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select> */}
                </div>
                <div className="filter-select age-select">
                    <label >Age</label>
                    <label onClick={this.onToggleSelect} className="select-label">
                        <label >{age}{!age && 'select'}</label>
                        {!toggleSelect && <FilterSelect key={age} handleChange={this.handleChange} options={options.age} name="age" />}
                    </label>

                    {/* <select className='main-select' value={age} onChange={this.handleChange} name="age" >
                        <option className="any-placeholder" value="">Any</option>
                        <option value="young">0-3</option>
                        <option value="adult">4-6</option>
                        <option value="senior">6-15</option>
                    </select> */}
                </div>
                <div className="filter-select size-select">
                    <label >Size</label>
                    <label onClick={this.onToggleSelect} className="select-label">
                        <label >{size}{!size && 'select'}</label>
                        {!toggleSelect && <FilterSelect key={size} handleChange={this.handleChange} options={options.size} name="size" />}
                    </label>


                    {/* <select onClick={()=>this.onToggleSelect()} className='main-select' value={size} onChange={this.handleChange} name="size" >
                        <option className="any-placeholder" value="">Any</option>
                        <option value="small">Small</option>
                        <option value="medium">Mediun</option>
                        <option value="big">Big</option>
                    </select> */}
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