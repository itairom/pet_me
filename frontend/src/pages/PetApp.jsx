import React from 'react'
import { PetList } from '../cmps/PetList';
import { petService } from '../services/petService'
export class PetApp extends React.Component {
    state = {
        pets: null
    }
    async componentDidMount() {
        const pets = await petService.query();
        this.setState({ pets }, () => console.log(this.state.pets))
    }
    render() {
        const {pets} = this.state

        if (!this.state.pets) return <h1>loading</h1>
        return (
            <section>
                < PetList pets={pets} />
                {this.state.pets[0].name}
            </section>
        )
    }
}

