import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export class Header extends Component {
    render() {
        return <header className="main-header main-layout">
            <nav className="main-nav flex">
                <div className="main-logo">
                    <NavLink exact to="/">PetMe.</NavLink>
                </div>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/explore">Explore</NavLink>
            </nav>
        </header>
    }
}
// const mapStateToProps = state => {
//     return {
//         loggedInUser: state.userModule.loggedInUser
//     }
// }
// const mapDispatchToProps = {}


// export const Header = connect(mapStateToProps, mapDispatchToProps)(_Header)