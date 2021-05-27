import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

class _Header extends Component {
    render() {
        return <header className="main-header">
            <nav>
                <NavLink to="/pet">Pets</NavLink>
                <NavLink to="/login">Login</NavLink>
                <NavLink exact to="/">Home</NavLink>
            </nav>
        </header>
    }

}
const mapStateToProps = state => {
    return {
        loggedInUser: state.userModule.loggedInUser
    }
}
const mapDispatchToProps = {}


export const Header = connect(mapStateToProps, mapDispatchToProps)(_Header)