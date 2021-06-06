import React from 'react'
import { connect } from 'react-redux'
import { PetFilter } from './PetFilter'
import { onHome ,showSearch,notshowSearch} from '../store/actions/userActions'

import magnifyingGlass from '../assets/img/svg/magnifying-glass.svg' // relative path to image 


export class _FilterDynamic extends React.Component {
    state = {
        isFilterShown: true
    }

    async componentDidMount() {
        this.setState({ isFilterShown: true });
        window.addEventListener("scroll", this.handleScroll);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll',this.handleScroll)
    }
    
    handleScroll = () => {
        if (window.pageYOffset > 50) {
            this.props.showSearch()
            if (this.state.isFilterShown) {
                this.setState({ isFilterShown: false });
            }
        } else {
            if (!this.state.isFilterShown) {
                this.props.notshowSearch()
                this.setState({ isFilterShown: true });
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
                {/* {!isFilterShown && <div className="explore-search">
                    <span onClick={() => this.onToggleFilter()} > Start your search</span>
                    <div className="search-btn-explore">
                        <img className="filter-search" src={magnifyingGlass} alt="glass" />
                    </div>
                </div>
                } */}
                {isFilterShown && <PetFilter />}
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        // loggedInUser: state.userModule.loggedInUser,
        // inExplore: state.systemModule.onExplore,
        // isShowSearch: state.systemModule.isShowSearch
    }
}
const mapDispatchToProps = {
    showSearch,notshowSearch
}


export const FilterDynamic = connect(mapStateToProps, mapDispatchToProps)(_FilterDynamic)