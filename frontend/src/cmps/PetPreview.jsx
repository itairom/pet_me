import { ReactComponent as Heart } from '../assets/fonts/svg/Preview/heart.svg'
import { ReactComponent as Male } from '../assets/fonts/svg/Preview/mars.svg'
import { ReactComponent as Female } from '../assets/fonts/svg/Preview/venus.svg'
import { Link } from 'react-router-dom'


export function PetPreview({ pet }) {
    const gender = pet.gender === 'female' ? <Female /> : <Male />
    return (
        <section className="pet-card-container">
            <Link key={ pet._id } to={ `/${pet._id}` }>
                <div className="img-container">
                    <img src={ pet.imgUrls[0] } alt="" />
                </div>
            </Link>
            <div className="card-info">
                <div className="pet-name-gender flex">
                    <p>{ pet.name }</p>
                    <span>{ gender }</span>
                </div>
                <p className="pet-title">{ pet.title }</p>
                <div className="pet-preview-host flex">
                    <p>{ pet.owner.name }</p>
                    <div className="pet-preview-likes flex">
                        <Heart className="preview-heart" />
                        <span>{ pet.likes }</span>
                    </div>
                </div>
            </div>
        </section >
    )
}

