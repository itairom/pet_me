import userIcon from '../assets/img/header/user.svg' // relative path to image 
import menuIcon from '../assets/img/header/menu.svg' // relative path to image 
import logo from '../assets/img/logo.png' // relative path to image 
import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../store/actions/userActions'
import { socketService } from '../services/socketService'
import { loadPets } from '../store/actions/petActions'

class _Header extends Component {

    state = {
        isProfileShown: false,
        isRequested: false
    }

    componentDidMount() {
        // console.log(this.props);
        socketService.on(socketService.SOCKET_EVENT_ADOPT_REQUEST, (data) => {
            console.log(data)
            console.log('requested from socket')
            this.setState({ isRequested: true })
        })
    }


    toggleDropdown = () => {
        this.setState({ isProfileShown: !this.state.isProfileShown })
    }

    onLogout = () => {
        this.props.logout()
        // this.props.history.push('/')
    }



    render() {

        const { loggedInUser } = this.props
        const { isProfileShown } = this.state

        return <header className="main-header main-container">
            <nav className="header-container">
                <NavLink onClick={()=>this.props.loadPets()} to="/">
                    <img  className="header-logo" src={logo} alt="PetMe" />
                </NavLink>
                <div>
                    <span>{(this.state.isRequested) ? 'requests' : ''}</span>
                </div>

                <div className="right-nav"> 
                    <NavLink className="explore-btn" to='/explore/?gender=&age=&type=&location=&size='>Explore</NavLink>
                    <div onClick={() => this.toggleDropdown()} className="login-profile">
                        {isProfileShown && <div className="user-dropdown">
                            <div className="dropdown-list">
                                {(loggedInUser) && <Link to='/profile' >
                                    <span>Profile</span>
                                </Link>}

                                {(loggedInUser) &&
                                    <a href="" onClick={() => this.onLogout()}>Logout</a>
                                }
                                {(!loggedInUser) && <Link to='/login' >
                                    <span>Login</span>
                                </Link>}
                            </div>
                        </div>}

                        <img src={menuIcon} alt="icon" />
                        {(!loggedInUser) && <img src={userIcon} alt="icon" />}
                        {(loggedInUser) && <img className="profile-icon" src={loggedInUser.imgUrl} alt="icon" />}
                    </div>
                </div>
            </nav>
        </header >
    }
}



const mapStateToProps = state => {
    return {
        loggedInUser: state.userModule.loggedInUser
    }
}
const mapDispatchToProps = {
    logout,loadPets
}


export const Header = connect(mapStateToProps, mapDispatchToProps)(_Header)