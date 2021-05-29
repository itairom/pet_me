import { PetPreview } from '../cmps/PetPreview.jsx'

export function PetList({ pets }) {
    return (
        <section className="card-list">
            {pets.map(pet => <PetPreview  key={pet._id}
                pet={pet}
            />)}
        </section>
    )
}