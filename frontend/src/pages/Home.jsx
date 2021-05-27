import { petService } from '../services/petService.js'


export function Home() {

     const pets= petService.query()
    //  const pet = petService.getpetByid()
    //  console.log(pet);
     console.log(pets);
    return (
        <section className="home">
            <h1>Home</h1>
            <h2>{pets[0].name}</h2>

            

        </section>
    )
}