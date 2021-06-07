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
        navBackground: false,
        isFilterShown: false
    }

    componentDidMount() {
        window.addEventListener('click', this.handleClick)
        window.addEventListener('scroll', this.handleScroll)
        this.props.loggedInUser && socketService.emit('user-join', this.props.loggedInUser._id)

    }

    componentWillUnmount() {
        window.removeEventListener('click', this.handleClick)
        window.removeEventListener('scroll', this.handleScroll)
        // socketService.off('user-join')
    }

    handleScroll = () => {
        this.setState({ isFilterShown: false })
        if (window.pageYOffset > 50) {
            this.setState({ navBackground: true });
        } else {
            this.setState({ navBackground: false });
        }
    }

    handleClick = () => {
        if (this.state.isProfileShown && window.event.clientY > 80) {
            this.setState({ isProfileShown: false })
        }
    }

    onLogout = () => {
        this.props.logout()
    }

    toggleDropdown = () => {
        this.setState({ isProfileShown: !this.state.isProfileShown })
    }

    onToggleFilter = () => {
        this.setState({ isFilterShown: !this.state.isFilterShown }
        )
    }



    render() {

        const { loggedInUser, inExplore, isShowSearch } = this.props
        const { isProfileShown, navBackground, isFilterShown } = this.state

        return (
            <header className={`main-header ${navBackground && 'nav-white'}  ${!navBackground && 'nav-transparent'} 
              main-container     ${isShowSearch && isFilterShown && 'resize-nav'}`}   >
                < nav className="header-container" >
                    <NavLink  to="/">
                        <div className="logo-container flex">
                            <Logo className="logo" />
                            <h1 className={ `logo-title ${navBackground && 'black'} ${inExplore && 'black'} ` }>PetMe</h1>
                        </div>
                    </NavLink>

                    <section className="filter-section">
                        { isShowSearch && !isFilterShown && <div className="explore-search">
                            <span onClick={ () => this.onToggleFilter() } > Start your search</span>
                            {/* <span onClick={() => this.onToggleFilter()} > Start your search</span> */ }
                            <div className="search-btn-explore">
                                <img className="filter-search" src={ magnifyingGlass } alt="glass" />
                            </div>
                        </div> }
                        { isShowSearch && isFilterShown &&
                            < PetFilter />
                        }
                    </section>

                    <div>
                        {/* <span>{ (this.state.isRequested) ? 'requests' : '' }</span> */ }
                    </div>


                    <div className="right-nav">
                        <NavLink onClick={() => this.props.loadPets()} className={`explore-btn ${navBackground && 'black'} ${inExplore && 'black'} `}
                            to='/explore/?gender=&age=&type=&location=&size='>
                            Explore</NavLink>
                        <div onClick={ () => this.toggleDropdown() } className="login-profile">
                            { isProfileShown && <div className="user-dropdown">
                                <div className="dropdown-list">
                                    { (loggedInUser) && <Link to='/profile' >
                                        <span>Profile</span>
                                    </Link> }

                                    { (loggedInUser) &&
                                        <a href="" onClick={ () => this.onLogout() }>Logout</a>
                                    }
                                    { (!loggedInUser) && <Link to='/login' >
                                        <span>Login</span>
                                    </Link> }
                                </div>
                            </div> }

                            <img src={ menuIcon } alt="icon" />
                            { (!loggedInUser) && <img src={ userIcon } alt="icon" /> }
                            { (loggedInUser) && <img className="profile-icon" src={ loggedInUser.imgUrl } alt="icon" /> }
                        </div>
                    </div>
                </nav >
            </header >
        )
    }
}



const mapStateToProps = state => {
    return {
        loggedInUser: state.userModule.loggedInUser,
        inExplore: state.systemModule.onExplore,
        isShowSearch: state.systemModule.isShowSearch
    }
}
const mapDispatchToProps = {
    logout, loadPets
}


export const Header = connect(mapStateToProps, mapDispatchToProps)(_Header)