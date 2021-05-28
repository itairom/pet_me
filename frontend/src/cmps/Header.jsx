import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export class Header extends Component {
    render() {
        return <header className="main-header">
            <nav>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/explore">Explore</NavLink>
                <NavLink exact to="/">PetMe</NavLink>
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