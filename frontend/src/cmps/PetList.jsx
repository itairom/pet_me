import { PetPreview } from '../cmps/PetPreview.jsx'


export function PetList({pets}) {
    // const pets = PetService.query()
    console.log(pets);
    return (
        <section className="pet-list">
            {pets.map(pet => <PetPreview key={pet._id}
                pet={pet}
            />)}
        </section>
    )
}