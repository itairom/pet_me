
import React from 'react'
import { ReactComponent as Male } from '../assets/img/svg/mars.svg'
import { ReactComponent as Female } from '../assets/img/svg/venus.svg'
import { ReactComponent as Heart } from '../assets/img/svg/heart.svg'
import { Link } from 'react-router-dom'

// import ImageGallery from 'react-image-gallery';


export class PetPreview extends React.Component {

    render() {
        const { pet } = this.props
        if (!pet) <h1>Loading...</h1>
        const gender = pet.gender === 'female' ? <Female className="gender" /> : <Male className="gender" />
        return (
            <section className="pet-card-container">
                <Link key={pet._id} to={`/${pet._id}`}>
                    <div className="img-container">
                        {/* <ImageGallery items={pet.imgUrls} />; */}
                        <img src={pet.imgUrls[0]} alt="" />
                    </div>
                </Link>
                <div className="card-info">
                    <div className="pet-name-gender flex">
                        <p>{pet.name}</p>
                        {gender}
                    </div>
                    <p className="pet-title">{pet.title}</p>
                    <div className="pet-preview-host flex">
                        <p>{pet.owner.name}</p>
                        <div className="pet-preview-likes flex">
                            <Heart className="preview-heart" />
                            <span>{pet.likes}</span>
                        </div>
                    </div>
                </div>
            </section >
        )
    }
}

