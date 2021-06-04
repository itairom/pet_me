import { connect } from 'react-redux'
import React from 'react'
import { loadPets } from '../store/actions/petActions'
import { PetList } from '../cmps/PetList'
import userIcon from '../assets/img/loaders/loader_2.svg' // relative path to image
import magnifyingGlass from '../assets/img/svg/magnifying-glass.svg' // relative path to image 
import { PetFilter } from '../cmps/PetFilter'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';


class _Explore extends React.Component {
    state = {
        isFilterShown: false,
        filterBy: null
    }
    async componentDidMount() {
        await this.onSetFilter()
        await this.props.loadPets(this.state.filterBy)

        window.addEventListener('scroll', () => {
            this.setState({ isFilterShown: false })
        })
    }

    async componentWillUnmount() {
        await this.props.loadPets()
        window.removeEventListener('scroll', () => {
        })
    }

    handleChange = (event) => {
        this.setState({ sortBy: event.target.value });
    };

    onSetFilter = () => {
        const search = new URLSearchParams(this.props.location.search)
        let filterBy = {
            gender: search.get('gender'),
            type: search.get('type'),
            age: search.get('age'),
            size: search.get('size'),
            location: search.get('location')
        }
        this.setState({ filterBy })
    }

    onToggleFilter = () => {
        this.setState({ isFilterShown: !this.state.isFilterShown }
        )
    }

    makeStyles = ((theme) => ({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 200,
            color:'red'


        },
        selectEmpty: {
            marginTop: theme.spacing(2),
            minWidth: 200,

        },
    }))

    render() {
        const { pets } = this.props
        const { isFilterShown, filterBy } = this.state
        if (!pets) return <img src={userIcon} alt="loading" />
        if (!filterBy) return <img src={userIcon} alt="loading" />
        const classes = makeStyles();

        return (
            <section className="main-container explore-container">
                {!isFilterShown && <div className="explore-search">
                    <span onClick={() => this.onToggleFilter()} > Start your search</span>
                    <div className="search-btn-explore">
                        <img className="filter-search" src={magnifyingGlass} alt="glass" />
                    </div>
                </div>}
                
                {/* {isFilterShown && <PetFilter />} */}
                {/* <section className="sort-by"> */}
                {/* <FormControl className={classes.formControl}> */}
                {/* </section> */}
                <div className="filter-description">
                    {!filterBy.type && <h1 >Our pets</h1>}
                    {filterBy.type && <h1>Our <span> {filterBy.gender} {filterBy.size}  {filterBy.type}s</span></h1>}
                <FormControl className="sort-form">
                    <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={this.state.sortBy}
                        onChange={this.handleChange}
                    >
                        <MenuItem value={'likes'}>Likes</MenuItem>
                        <MenuItem value={'name'}>name</MenuItem>
                        {/* <MenuItem value={30}>Thirty</MenuItem> */}
                    </Select>
                </FormControl>
                </div>
                < PetList pets={pets} />
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        pets: state.petModule.pets
    }
}

const mapDispatchToProps = {
    loadPets
}

export const Explore = connect(mapStateToProps, mapDispatchToProps)(_Explore)