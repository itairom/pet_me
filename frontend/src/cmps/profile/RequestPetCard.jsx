import React, { useEffect, useState } from 'react'


import { petService } from '../../services/petService'

export default function RequestPetCard({ petId }) {

    const [pet, setPet] = useState(null)

    useEffect(() => {
        onGetPetInfo()
    }, [petId,onGetPetInfo])

    const onGetPetInfo = async () => {
        const petById = await petService.getPetByid(petId)
        setPet(petById)
    }

    return (
        <div className='adopt-card my-requests-card flex align-center '>
            <h1>{pet?.name}</h1>
            <div className="imgs">
                {pet?.imgUrls.length !== 0 && <img src={pet?.imgUrls[0]} alt="pet" />}
                {pet?.imgUrls.length === 0 && <img src="https://res.cloudinary.com/dhorz8v6v/image/upload/v1641286512/dog-1185460_1280_ogdew3.png" alt="pet" />}
            </div>
        </div>
    )
}
