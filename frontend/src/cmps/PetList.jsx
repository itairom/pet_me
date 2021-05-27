import { PetPreview } from '../cmps/PetPreview.jsx'

<<<<<<< HEAD
export function PetList({pets}) {
=======

export function PetList({pets}) {
    // const pets = PetService.query()
>>>>>>> dd4832957aee82bf42821ad706f34f2d1fcff68e
    console.log(pets);
    return (
        <section className="pet-list">
            {/* {pets.map(pet => <PetPreview key={pet._id}
                pet={pet}
            />)} */}
        </section>
    )
}