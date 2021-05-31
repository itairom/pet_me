import userIcon from '../assets/img/header/user.svg' // relative path to image 
import menuIcon from '../assets/img/header/menu.svg' // relative path to image 
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'


class _Header extends Component {

    componentDidMount() {
        // console.log(this.props);
    }

    toggleDropdown = () => {
        // this.props.history.push('/login')
    }

    render() {

        const { loggedInUser } = this.props
        // console.log( loggedInUser)

        return <header className="main-header main-container">
            <nav className="header-container">
                <NavLink to="/">PetMe</NavLink>
                {/* <div className="search-bar"></div> */}
                <div className="right-nav">
                    <NavLink to="/explore">Explore</NavLink>
                    <div onClick={() => this.toggleDropdown()} className="login-profile">
                        {/* <div className="user-dropdown">
                            <ul className="dropdown-list">
                                <li>My Profile</li>
                                <li>Logout</li>
                            </ul>

                        </div> */}
                        <img src={menuIcon} alt="icon" />
                        {(!loggedInUser) && <img src={userIcon} alt="icon" />}
                        {(loggedInUser) && <img className="profile-icon" src={loggedInUser.imgUrl} alt="icon" />}
                    </div>
                </div>
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