import React, {  useState } from 'react';
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { petService } from '../services/petService';
import { ImgUpload } from '../cmps/ImgUpload';
import { useHistory } from 'react-router';


export function AddPet() {

    const [imgUrl, setImgUrl] = useState([])
    const history = useHistory()

    const petInfo = {
        name: '',
        type: '',
        breed: '',
        title: '',
        desc: '',
        gender: 'male',
        age: '',
        size: '',
        neuterSpayed: false,
        trained: false,
        vaccine: false,
        likedBy: [],
        likes: 0,
        addedAt: '',
        isAdopted: false,
        comments: [],
        tags: [],


    }
    const validate = Yup.object({
        name: Yup.string()
            .required('Required'),
        breed: Yup.string()
            .required('Required'),
        desc: Yup.string()
            .required('Required'),
        title: Yup.string()
            .required('Required')
    })

    const onGetImgUrl = (img) => {
        setImgUrl([...imgUrl, img])
    }

    const onSubmit = async (values) => {
        const pet = values
        pet.imgUrls = imgUrl
        pet.owner = JSON.parse(sessionStorage.getItem('loggedinUser'))
        await petService.add(pet)
        history.push('./profile')
    }

    return (
        <section className="main-container add-pet-container">
            <div className="add-pet-form">
                <Formik
                    initialValues={petInfo}
                    validationSchema={validate}
                    onSubmit={(values) => {
                        onSubmit(values)
                    }} >
                    <Form className="flex column align-center">
                        <div className="flex">
                            <Field type="text" placeholder="Enter title" name="title" autoFocus />
                            <ErrorMessage name="title" component="p" />
                        </div>
                        <div className="flex">
                            <Field type="text" placeholder="Enter Description" name="desc" autoFocus />
                            <ErrorMessage name="desc" component="p" />
                        </div>
                        <div className="flex">
                            <Field type="text" placeholder="Enter name" name="name" />
                            <ErrorMessage name="name" component="p" />
                        </div>
                        <div className="flex">
                            <label >Enter type</label>
                            <Field as="select" name="type" >
                                <option selected value="dog">dog</option>
                                <option value="cat">cat</option>
                                <option value="rabbit">rabbit</option>
                                <option value="parrot">parrot</option>
                                <option value="hamster">hamster</option>

                            </Field>
                            <ErrorMessage name="type" component="p" />
                        </div>
                        <div className="flex">
                            <Field type="number" placeholder="Enter age" name="age" />
                            <ErrorMessage name="age" component="p" />
                        </div>
                        <div className="flex">
                            <label >Size</label>
                            <Field as="select" name="size" >
                                <option selected value="big">Big</option>
                                <option  value="medium">Medium</option>
                                <option value="small">Small</option>
                            </Field>
                        </div>
                        <div className="flex">
                            <label >Gender</label>
                            <Field as="select" name="gender" >
                                <option selected value="male">Male</option>
                                <option value="female">Female</option>
                            </Field>
                        </div>
                        <div className="flex">
                            <label >Vaccine</label>
                            <Field as="select" name="vaccine" >
                                <option selected value={false}>False</option>
                                <option value={true}>True</option>
                            </Field>
                        </div>
                        <div className="flex">
                            <label htmlFor="neuterSpayed">Neuter / Spayed</label>
                            <Field as="select" name="neuterSpayed" >
                                <option selected value={false}>False</option>
                                <option value={true}>True</option>
                            </Field>
                        </div>
                        <div className="flex">
                            <label htmlFor="trained">Trained</label>
                            <Field as="select" name="trained" >
                                <option selected value={false}>False</option>
                                <option value={true}>True</option>
                            </Field>
                        </div>
                        <div className="flex">
                            <label htmlFor="breed">Breed</label>
                            <Field type="breed" placeholder="Enter breed" name="breed" />
                            <ErrorMessage name="breed" component="p" />
                        </div>
                        <ImgUpload onGetImgUrl={onGetImgUrl} />

                        <button type="submit" className="primary-btn login-signup-btn">Submit</button>
                    </Form>
                </Formik>
                <hr />
            </div>
        </section>
    )

}

