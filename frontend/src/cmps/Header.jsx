import userIcon from '../assets/img/header/user.svg' // relative path to image 
import menuIcon from '../assets/img/header/menu.svg' // relative path to image 
import logo from '../assets/img/logo.png' // relative path to image 
import { socketService } from '../services/socketService'
import { store } from 'react-notifications-component';
import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../store/actions/userActions'
import magnifyingGlass from '../assets/img/svg/magnifying-glass.svg' // relative path to image 
import { loadPets } from '../store/actions/petActions'
import { PetFilter } from './PetFilter'
import { ReactComponent as Logo } from '../assets/img/svg/logo1.svg'



class _Header extends Component {

    state = {
        isProfileShown: false,
        isRequested: false,
        nav: false,
        isFilterShown: false,
        navBackground: false

    }

    componentDidMount() {
        this.setListeners()
        window.addEventListener("scroll", this.handleScroll);
        console.log('inExplore', this.props.inExplore);
        this.props.loggedInUser && socketService.emit('user-join', this.props.loggedInUser._id)
    }


    componentWillUnmount() {
        window.removeEventListener('scroll', () => {
        })
        // socketService.off('user-join')
    }

    handleScroll = () => {

        this.setState({ isFilterShown: false })

        if (window.pageYOffset > 50) {
            this.setState({ navBackground: true });
        } else {
            if (this.state.nav) {
                this.setState({ nav: false });
            }
        }

    }

    toggleDropdown = () => {
        this.setState({ isProfileShown: !this.state.isProfileShown })
    }

    onToggleFilter = () => {
        this.setState({ isFilterShown: !this.state.isFilterShown }
        )
    }
    setListeners = () => {
        
    }


    render() {

        const { loggedInUser, inExplore, isShowSearch } = this.props
        const { isProfileShown, nav, isFilterShown } = this.state

        return (
            <header className={ `main-header ${nav && 'nav-white'} main-container` }>
                < nav className="header-container" >
                    <NavLink onClick={ () => this.props.loadPets() } to="/">
                        <div className="logo-container flex">
                            <Logo className="logo" />
                            <h1 className={ `logo-title  ${nav && 'black'} ${inExplore && 'black'} ` }>PetMe</h1>
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
                        { isShowSearch && isFilterShown && <div className="explore-search">
                            < PetFilter />
                        </div> }
                    </section>

                    <div>
                        {/* <span>{ (this.state.isRequested) ? 'requests' : '' }</span> */ }
                    </div>


                    <div className="right-nav">
                        <NavLink className={ `explore-btn ${this.state.navBackground && 'black'} ${inExplore && 'black'} ` }
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