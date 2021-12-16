// REACT IMAGE UPLOAD WRAPPER
import React, { useEffect, useState } from "react";
import ImageUploading from "react-images-uploading";
import { cloudinaryService } from "../services/cloudinaryService";

export const ImgUpload = ({ onGetImgUrl }) => {

    const [isUpload, setIsUpload] = useState(null);
    const [images, setImages] = useState([]);
    const maxNumber = 1;

    useEffect(() => {
        (async () => {
            if (images.length !== 0) {
                setIsUpload(true)
                const imgUrl = await cloudinaryService.uploadImg(images[0].file)
                onGetImgUrl(imgUrl.secure_url)
                setIsUpload(false)
            }
        })()
    }, [images])


    const onChange = (imageList, addUpdateIndex) => {
        setImages(imageList);
    };


    return (
        <ImageUploading
            // multiple
            value={images}
            onChange={onChange}
            maxNumber={maxNumber}
            dataURLKey="data_url"
            onClick={(ev) => { ev.stopPropagation() }}
        >
            {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps
            }) => (
                <div
                    onClick={(ev) => {
                        ev.stopPropagation()
                        ev.preventDefault()
                    }}
                    className="upload__image-wrapper ">
                    <button
                        className="upload-btn btn"
                        style={isDragging ? { color: "red" } : null}
                        onClick={(ev) => {
                            ev.preventDefault()
                            ev.stopPropagation()
                            onImageUpload()
                        }}
                        {...dragProps}
                    >
                        הוסף תמונה
                    </button>
                    &nbsp;
                    {/* <button
                        className="btn"
                        onClick={onImageRemoveAll}>Remove all images</button> */}
                    {!isUpload&& imageList.map((image, index) => (
                        <div key={index} className="image-item">
                            <img src={image.data_url} alt="" width="100" />
                            {/* <div className="image-item__btn-wrapper">
                                <button onClick={() => onImageUpdate(index)}>Update</button>
                                <button onClick={() => onImageRemove(index)}>Remove</button>
                            </div> */}
                        </div>
                    ))}
                </div>
            )}
        </ImageUploading>)
}