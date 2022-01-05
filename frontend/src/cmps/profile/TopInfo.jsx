import Rating from '@material-ui/lab/Rating'
import React, { useEffect, useState } from 'react'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined'
import Pin from '../../assets/img/svg/pin.svg' // relative path to image 
import { ImgUpload } from '../ImgUpload'
import { userService } from '../../services/userService'

export default function TopInfo({ loggedInUser }) {
    const [imgUrl, setImgUrl] = useState(null)

    useEffect(() => {

    }, [loggedInUser])

    const onGetImgUrl = (img) => {
        setImgUrl(img)
    }

    const onUpdateImg = async () => {
        const loggedInUserCopy = { ...loggedInUser }
        loggedInUserCopy.imgUrl = imgUrl
        await userService.update(loggedInUserCopy)
    }

    return (
        <section className="user-card">
            <div className="profile-img">
                {loggedInUser.imgUrl && <img src={loggedInUser.imgUrl} alt={<AccountCircleOutlinedIcon />} />}
                <div className="">
                    <ImgUpload onGetImgUrl={onGetImgUrl} />
                    {imgUrl && <h1 onClick={() => { onUpdateImg() }}>Update Image Profile</h1>}
                </div>
            </div>
            <section className="user-info">
                <h1>{loggedInUser.fullname} </h1>
                <h4>{loggedInUser.username} </h4>
                <h4 className="italic">"{loggedInUser.title}"</h4>
                <div className="location-info">
                    <img src={Pin} alt="location info" />
                    <div>{loggedInUser?.loc?.address}</div>
                </div>
                <div className="user-rate">
                    <Rating name="disabled" value={loggedInUser?.rating ? loggedInUser?.rating : loggedInUser?.reviews[0]?.rate} disabled />
                </div>
            </section>
        </section>
    )
}
