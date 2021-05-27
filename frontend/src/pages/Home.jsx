import {petService} from '../services/petService.js'


export function Home() {

     const pets= petService.query()
     console.log(pets);
    return (
        <section className="home">
            <h1>Home</h1>
            <h2>{pets[0].name}</h2>

        </section>
    )
}