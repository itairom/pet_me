import userIcon from '../assets/img/header/user.svg' // relative path to image 
import menuIcon from '../assets/img/header/menu.svg' // relative path to image 
<<<<<<< HEAD
=======
import logo from '../assets/img/logo.png' // relative path to image 
>>>>>>> de2872cc442df295ed30a944f4ca32bb2729786d
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'


class _Header extends Component {

    componentDidMount() {
        // console.log(this.props);
<<<<<<< HEAD
=======
    }

    toggleDropdown = () => {
        // this.props.history.push('/login')
>>>>>>> de2872cc442df295ed30a944f4ca32bb2729786d
    }

    render() {

        const { loggedInUser } = this.props
        // console.log( loggedInUser)
<<<<<<< HEAD

        return <header className="main-header">
            <nav className="main-container">
                <NavLink to="/">PetMe</NavLink>
                {/* <div className="search-bar"></div> */ }
                <div className="right-nav">
                    <NavLink to="/explore">Explore</NavLink>
                    <div className="login-profile">
                        <img src={ menuIcon } alt="icon" />
                        { (!loggedInUser) && <img src={ userIcon } alt="icon" /> }
                        { (loggedInUser) && <img className="profile-icon" src={ loggedInUser.imgUrl } alt="icon" /> }
=======

        return <header className="main-header main-container">
            <nav className="header-container">
                <NavLink to="/">
                    <img className="header-logo" src={logo} alt="PetMe" />
                </NavLink>

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
>>>>>>> de2872cc442df295ed30a944f4ca32bb2729786d
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