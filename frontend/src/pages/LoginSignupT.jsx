
import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { connect } from 'react-redux'
import { login, signup } from '../store/actions/userActions.js'
import { TextField } from '@material-ui/core'

 class _LoginSignup extends Component {

    state = {
        userInfo: {
            fullname: '',
            username: '',
            password: ''
        },
        credentials: {
            username: '',
            password: ''
        },
        pageMode: null
    }

    componentDidMount() {
        const { loggedinUser } = this.props
        if (loggedinUser) this.props.history.push('/toy')
        const pageMode = this.props.location.pathname === '/login' ? 'login' : 'signup'
        this.setState({ pageMode })
    }

    componentDidUpdate() {
        const { loggedInUser } = this.props
        if (loggedInUser) this.props.history.push('/toy')
    }

    validate = (values) => {
        const errors = {}
        if (!values.username) {
            errors.username = 'Required'
        } else if (values.username.length < 64) {
            errors.username = 'Please use at least 4 characters'
        }
        if (values.password.length < 4) {
            errors.password = 'Password too short'
        }
        if (!values.fullname) {
            errors.fullname = 'Required'
        } else if (values.fullname.length < 4) {
            errors.fullname = 'Please use at least 4 characters'
        }
        return errors
    }

    onSubmit = (values) => {
        const { pageMode } = this.state
        const { login, signup } = this.props
        pageMode === 'login' ? login(values) : signup(values)
    }

    styledField = (props) => {
        return <TextField {...props} variant="outlined" color={'primary'} />
    }

    render() {
        const { pageMode, credentials, userInfo } = this.state
        if (!pageMode) return ''
        return (<>
            {pageMode === 'login' && <section className="login-signup flex column align-center">
                <h1>Login</h1>
                <Formik initialValues={credentials} onSubmit={this.onSubmit} >
                    <Form className="flex column">
                        <Field type="username" label="Username" name="username" as={this.styledField} />
                        <ErrorMessage name="username" component="div" />
                        <Field type="password" label="Password" name="password" as={this.styledField} />
                        <ErrorMessage name="password" component="div" as={this.styledField} />
                        <button type="submit" className="primary-btn">Login</button>
                    </Form>
                </Formik>
            </section>}
            {pageMode === 'signup' &&
                <section className="login-signup flex column align-center full">
                    <h1>Signup</h1>
                    <Formik initialValues={userInfo} validateOnChange={false} validateOnBlur={false} validate={this.validate} onSubmit={this.onSubmit}>
                        <Form className="flex column">
                            <Field type="fullname" label="Fullname" name="fullname" as={this.styledField} />
                            <ErrorMessage name="fullname" component="p" />
                            <Field type="username" label="Username" name="username" as={this.styledField} />
                            <ErrorMessage name="username" component="p" />
                            <Field type="password" label="Password" name="password" as={this.styledField} />
                            <ErrorMessage name="password" component="p" />
                            <button type="submit" className="primary-btn">Signup</button>
                        </Form>
                    </Formik>
                </section>}
        </>
        )
    }
}

function mapStateToProps(state) {
    return {
        loggedInUser: state.userModule.loggedInUser

    }
}


const mapDispatchToProps = {
    login, signup
}

export const LoginSignup = connect(mapStateToProps, mapDispatchToProps)(_LoginSignup)