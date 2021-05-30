import magnifyingGlass from '../assets/img/svg/magnifying-glass.svg' // relative path to image 
import { Link } from 'react-router-dom'
import React from 'react'

// import FormControl from '@material-ui/core/FormControl';
// import Select from 'react-select';



export class PetFilter extends React.Component {

    state = {
        filterBy: {
            gender: '',
            type: '',
            age: '',
            location: ''
        }
    }

    handleChange = ({ target }) => {
        console.log(this.state)
        const { name, value } = target
        const { filterBy } = this.state
        this.setState({ filterBy: { ...filterBy, [name]: value } }, () => {
            const { filterBy } = this.state
            // this.props.onSetFilter(filterBy)
        })
    }

    submitForm=()=>{

    }



    render() {
        const { gender, age, type, sortBy } = this.state


        return (

            <section className='pet-filter'>
                <div className="filter-select gender-select">
                    <label >gender</label>
                    <form onSubmit={this.submitForm()}>
                        <label  >
                            <select className='gender-select' value={gender} onChange={this.handleChange} name="gender" >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </label>
                    </form>
                    {/* <input placeholder="gender" type="text" /> */}
                </div>
                <div className="filter-select pet-select">
                    <label >pet</label>
                    <form onSubmit={this.submitForm()}>
                        <label  >
                            <select className='gender-select' value={type} onChange={this.handleChange} name="type" >
                                <option value="cat">Cat</option>
                                <option value="dog">Dog</option>
                            </select>
                        </label>
                    </form>
                </div>
                <div className="filter-select age-select">
                    <label >age</label>
                    <form onSubmit={this.submitForm()}>
                        <label  >
                            <select className='gender-select' value={age} onChange={this.handleChange} name="age" >
                                <option value="young">Young</option>
                                <option value="adult">Adult</option>
                                <option value="senior">Senior</option>
                            </select>
                        </label>
                    </form>
                </div>
                <div className="filter-select location-select">
                    <label >location</label>
                    <form onSubmit={this.submitForm()}>
                        <label  >
                            <select className='gender-select' value={age} onChange={this.handleChange} name="age" >
                                <option value="south">South District</option>
                                <option value="center">Center District</option>
                                <option value="north">North District</option>
                            </select>
                        </label>
                    </form>
                </div>

                {/* <Link to={`/explore/${type}&${gender}`}>
                    <img src={magnifyingGlass} alt="glass" />
                </Link> */}

                <Link  to={`/explore/?&${type}&${gender}`}>
                    <img className="filter-search" src={magnifyingGlass} alt="glass" />
                </Link>

            </section>

            // <div className="pet-filter">
            //     <form onSubmit>
            //         <select className='gender-select' value={gender} onChange={this.onchange} name="gender" >
            //             <option value="male">Male</option>
            //             <option value="female">Female</option>
            //         </select>

            //     </form>

            // {/* <Select
            //     value={ctg}
            //     onChange={this.handleChange}
            //     options={options}
            // />
            // <Select
            //     value={ctg}
            //     onChange={this.handleChange}
            //     options={options}
            // /> */}

            // </div>
        )
    }
}