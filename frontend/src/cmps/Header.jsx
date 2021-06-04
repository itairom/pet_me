import userIcon from '../assets/img/header/user.svg' // relative path to image 
import menuIcon from '../assets/img/header/menu.svg' // relative path to image 
import logo from '../assets/img/logo.png' // relative path to image 
import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../store/actions/userActions'
import { socketService } from '../services/socketService'
import { store } from 'react-notifications-component';
import magnifyingGlass from '../assets/img/svg/magnifying-glass.svg' // relative path to image 
import { loadPets } from '../store/actions/petActions'
import { PetFilter } from './PetFilter'
import { ReactComponent as Logo } from '../assets/img/svg/logo1.svg'


class _Header extends Component {

    state = {
        isProfileShown: false,
        isRequested: false,
        nav: false,
        isFilterShown: false

    }

    onToggleFilter = () => {
        this.setState({ isFilterShown: !this.state.isFilterShown }
        )
    }

    componentDidMount() {
        this.setListeners()
        window.addEventListener("scroll", this.handleScroll);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', () => {
        })
    }

    handleScroll = () => {
        if (window.pageYOffset > 50) {
            if (!this.state.nav) {
                this.setState({ nav: true });
            }
        } else {
            if (this.state.nav) {
                this.setState({ nav: false });
            }
        }

    }

    // console.log(this.props);
    // socketService.on('eyal', (data) => {
    //     this.setState({ isRequested: true })
    //     console.log(data)
    //     console.log('requested from socket')
    //     store.addNotification({
    //         title: "Wonderful!",
    //         message: data.message,
    //         type: "info",
    //         insert: "top-right",
    //         container: "bottom-right",
    //         animationIn: ["animate__animated", "animate__fadeIn"],
    //         animationOut: ["animate__animated", "animate__fadeOut"],
    //         dismiss: {
    //             duration: 5000,
    //             onScreen: true
    //         }
    //     });
    // })



    toggleDropdown = () => {
        this.setState({ isProfileShown: !this.state.isProfileShown })
    }

    onLogout = () => {
        this.props.logout()
        // this.props.history.push('/')
    }

    setListeners = () => {
        window.addEventListener('click', () => {
            if (this.state.isProfileShown && window.event.clientY > 80) {
                this.setState({ isProfileShown: false })
            }
        })
    }

    render() {

        const { loggedInUser } = this.props
        const { isProfileShown, nav } = this.state

        return (
            <header className={`main-header ${nav && 'nav-white'} main-container`}>
                < nav className="header-container" >
                    <NavLink onClick={() => this.props.loadPets()} to="/">
                        <div className="logo-container flex">
                            <Logo className="logo" />
                            <h1 className={`logo-title ${nav && 'black'} `}>PetMe</h1>
                        </div>
                    </NavLink>
                    <div>
                        {/* <span>{ (this.state.isRequested) ? 'requests' : '' }</span> */}

                    </div>

                    <div className="right-nav">

                        <NavLink className={`explore-btn ${nav && 'black'} `} to='/explore/?gender=&age=&type=&location=&size='>
                            Explore</NavLink>
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
                </nav >
            </header >
        )
    }
}



const mapStateToProps = state => {
    return {
        loggedInUser: state.userModule.loggedInUser
    }
}
const mapDispatchToProps = {
    logout, loadPets
}


export const Header = connect(mapStateToProps, mapDispatchToProps)(_Header)