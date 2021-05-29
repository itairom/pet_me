import userIcon from '../assets/img/header/user.svg' // relative path to image 
import menuIcon from '../assets/img/header/menu.svg' // relative path to image 
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { PetFilter } from './PetFilter'

export class Header extends Component {
    render() {
        return <header className="main-header">
            <nav className="main-container">
                <NavLink to="/">PetMe</NavLink>
                {/* <div className="search-bar"></div> */}
                <PetFilter />
                <div className="right-nav">
                    <NavLink to="/explore">Explore</NavLink>
                    <div className="login-profile">
                        <img src={menuIcon} alt="icon" />
                        <img src={userIcon} alt="icon" />
                    </div>
                </div>
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