<<<<<<< HEAD
import { petService } from '../services/petService.js'
import { PetDetails } from '../pages/PetDetails.jsx'
=======
import { petService } from '../services/petService'
>>>>>>> a7cae71230b720c6869b6d33552470308d4d94b9


export function Home() {

<<<<<<< HEAD
    const pets = petService.query()
    console.log(pets);
    return (
        <section className="home">
            <h1>Home</h1>
            <h2>{ pets[0].name }</h2>
            <PetDetails pet={ pets[0] } />
=======

    return (
        <section className="home">



>>>>>>> a7cae71230b720c6869b6d33552470308d4d94b9
        </section>
    )
}