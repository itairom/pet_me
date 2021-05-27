import { petService } from '../services/petService.js'


export function Home() {

    const pets = petService.query()
    return (
        <section className="home">
            <h1>Home</h1>


        </section>
    )
}