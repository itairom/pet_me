import React from 'react'
import { connect } from 'react-redux'
import { PetFilter } from './PetFilter'


export class _FilterSelect extends React.Component {
    state = {

    }

    componentDidMount() {
        // console.log(this.props);
    }

    componentWillUnmount() {

    }



    render() {
        const { options, name, handleChange } = this.props
        console.log(name);

        return (
            <div className={'select-modal'} >
                {options.map(option => {
                    return <option onClick={() => handleChange( option, name)} >{option}</option>

                })}

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {

    }
}
const mapDispatchToProps = {

}

export const FilterSelect = connect(mapStateToProps, mapDispatchToProps)(_FilterSelect)