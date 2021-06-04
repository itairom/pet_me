import React from 'react'
import { PetFilter } from './PetFilter'

import magnifyingGlass from '../assets/img/svg/magnifying-glass.svg' // relative path to image 


export class FilterDynamic extends React.Component {
    state = {
        isFilterShown: true
    }

    async componentDidMount() {
        this.setState({ isFilterShown: true });
        window.addEventListener("scroll", this.handleScroll);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', () => {
        })
    }

    handleScroll = () => {
        if (window.pageYOffset > 50) {
            if (this.state.isFilterShown) {
                this.setState({ isFilterShown: false });
            }
        } else {
            if (!this.state.isFilterShown) {
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
                {!isFilterShown && <div className="explore-search">
                    <span onClick={() => this.onToggleFilter()} > Start your search</span>
                    <div className="search-btn-explore">
                        <img className="filter-search" src={magnifyingGlass} alt="glass" />
                    </div>
                </div>
                }
                {isFilterShown && <PetFilter />}
            </>
        )
    }

}