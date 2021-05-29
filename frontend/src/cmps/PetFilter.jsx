import magnifyingGlass from '../assets/img/svg/magnifying-glass.svg' // relative path to image 

import React from 'react'

import FormControl from '@material-ui/core/FormControl';
import Select from 'react-select';



export class PetFilter extends React.Component {

    state = {
        filterBy: {
            gender: '',
            ctg: '',
            type: '',
            sortBy: ''
        }
    }

    handleChange = ({ target }) => {
        const { name, value } = target
        const { filterBy } = this.state
        this.setState({ filterBy: { ...filterBy, [name]: value } }, () => {
            const { filterBy } = this.state
            // this.props.onSetFilter(filterBy)
        })
    }





    render() {
        const { gender, ctg, type, sortBy } = this.state

        const options = [
            { value: 'chocolate', label: 'Chocolate' },
            { value: 'strawberry', label: 'Strawberry' },
            { value: 'vanilla', label: 'Vanilla' },
        ];
        return (

            <section className='pet-filter'>
                <div className="filter-select gender-select">
                    <label >gender</label>
                    <input placeholder="gender" type="text" />
                </div>
                <div className="filter-select pet-select">
                    <label >pet</label>
                    <input placeholder="pet" type="text" />
                </div>
                <div className="filter-select age-select">
                    <label >age</label>
                    <input placeholder="age" type="text" />
                </div>
                <div className="filter-select location-select">
                    <label >location</label>
                    <input placeholder="location" type="text" />
                </div>
                <img src={magnifyingGlass} alt="" srcset="" />
                {/* <div className="age-select"></div>
                <div className="pet-select"></div> */}


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