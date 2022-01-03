import React, { useEffect, useState } from 'react'
import { petService } from '../../services/petService'

export default function RequestPetCard({ petId }) {

const [pet, setPet] = useState(null)

    useEffect(() => {
        onGetPetInfo()
    }, [petId])

    const onGetPetInfo = async () => {
        const petById = await petService.getPetByid(petId)
        setPet(petById)
    }

    return (
        <div>
            <h1>{pet?.name}</h1>
            <h1>{pet?.id}</h1>
        </div>
    )
}
