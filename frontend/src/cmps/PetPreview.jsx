import { Link } from "react-router-dom";

export function PetPreview({pet}) {
    return (
        <section>
            <img src="" alt="" />
            <p>pet.name</p>
            <Link to={`/${pet._id}`} className="primary-btn">Show details</Link>

        </section>
    )
}