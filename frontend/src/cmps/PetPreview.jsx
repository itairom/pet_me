
import React from 'react'
import { ReactComponent as Male } from '../assets/img/svg/mars.svg'
import { ReactComponent as Female } from '../assets/img/svg/venus.svg'
import { ReactComponent as Heart } from '../assets/img/svg/heart.svg'
import { Link } from 'react-router-dom'
// import "~slick-carousel/slick/slick.css";
// import "~slick-carousel/slick/slick-theme.css";
import "../../node_modules/slick-carousel/slick/slick.css";
import "../../node_modules/slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";


export class PetPreview extends React.Component {

    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        const { pet } = this.props
        if (!pet) <h1>Loading...</h1>
        const gender = pet?.gender === 'female' ? <Female className="gender" /> : <Male className="gender" />
        return (
            <section className="pet-card-container">
                <Link key={ pet._id } to={ `/${pet._id}` }>
                    <div className="img-container">
                        <Slider {...settings}>
                            {pet.imgUrls.map(imgUrl => <img src={imgUrl} alt="" key={pet._id}/>)}
                        </Slider>
                    </div>
                </Link>
                <div className="card-info">
                    <div className="pet-name-gender flex">
                        <p>{ pet.name }</p>
                        { gender }
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
}

