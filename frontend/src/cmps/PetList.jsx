import { PetPreview } from '../cmps/PetPreview.jsx'

export function PetList({pets}) {
<<<<<<< HEAD
    console.log(pets);
=======
>>>>>>> f30257cb64b8ef4a04a72c6b046795bad32e3a0f
    return (
        <section className="card-list">
            {pets.map(pet => <PetPreview key={pet._id}
                pet={pet}
            />)}
        </section>
    )
}