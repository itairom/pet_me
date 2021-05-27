import { PetPreview } from '../cmps/PetPreview.jsx'
import {PetService} from '../services/PetService'

export function PetList() {
    const pets = PetService.query()
    console.log(pets);
    return (
        <section className="pet-list">
            {pets.map(pet => <PetPreview key={pet._id}
                pet={pet}
            />)}
        </section>
    )
}