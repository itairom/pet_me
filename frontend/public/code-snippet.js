export class _FilterDynamic extends React.Component {
    state = {
        isFilterShown: true
    }

    async componentDidMount() {
        window.addEventListener("scroll", this.handleScroll)
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
    }

    handleScroll = () => {
        if (window.pageYOffset > 50) {
            this.props.showSearch()
            if (this.state.isFilterShown) {
                this.setState({ isFilterShown: false })
            }
        } else {
            if (!this.state.isFilterShown) {
                this.props.hideSearch()
                this.setState({ isFilterShown: true })
            }
        }
    }

    onToggleFilter = () => {
        this.setState({ isFilterShown: !this.state.isFilterShown }
        )
    }

    render() {
        const { isFilterShown } = this.state
        return (
            <>
                {isFilterShown && <PetFilter />}

                <header className={`main-header ${navBackground && 'nav-white'}  ${!navBackground && 'nav-transparent'}   main-container`}>
                    < nav className="header-container" >
                        <NavLink onClick={() => this.props.loadPets()} to="/">
                            <div className="logo-container flex">
                                <Logo className="logo" />
                                <h1 className={`logo-title ${navBackground && 'black'} ${inExplore && 'black'} `}>PetMe</h1>
                            </div>
                        </NavLink>
                    </ nav>
                </header>

            </>
        )
    }
}

