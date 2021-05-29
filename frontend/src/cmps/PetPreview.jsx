import { ReactComponent as Heart } from '../assets/img/svg/heart.svg'
import { ReactComponent as HeartFill } from '../assets/img/svg/heart-fill.svg'
import { ReactComponent as Male } from '../assets/img/svg/mars.svg'
import { ReactComponent as Female } from '../assets/img/svg/venus.svg'
import { Link } from 'react-router-dom'
import { petService } from '../services/petService'

export function PetPreview({ pet }) {
    const gender = pet.gender === 'female' ? <Female /> : <Male />

    


    return (
        <section className="pet-card-container">
            < Link to={`/${pet._id}`} >
                <div className="img-container">
                    {/* <img src={pet.imgUrls[0]} alt="img" /> */}
                </div>
            </Link>
            <div className="card-info">
                <div className="pet-name-gender flex">
                    <p>{pet.name}</p>
                    <span>{gender}</span>
                </div>
                <p className="pet-title">{pet.title}</p>
                <div className="pet-preview-host flex">
                    <p>{pet.owner.name}</p>
                    <div  className="pet-preview-likes flex">
                    {/* <div onClick={() => this.props.onLiking()} className="pet-preview-likes flex"> */}
                        <Heart className="preview-heart" />
                        {/* <HeartFill className="preview-heart" /> */}
                        <span>{pet.likes}</span>
                    </div>
                </div>
            </div>
        </section>
    )
}

