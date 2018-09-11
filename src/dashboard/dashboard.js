import React, { Component } from 'react';
import { PLANET_URL } from '../utils/constants';
import './dashboard.css';
import { Button, PageHeader } from 'react-bootstrap';
import { searchPlanets } from '../action/dashboard';
import { connect } from 'react-redux';

export class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
        }
        this.handleChangeSearchText = this.handleChangeSearchText.bind(this);
        this.onPreviousButtonClick = this.onPreviousButtonClick.bind(this);
        this.onNextButtonClick = this.onNextButtonClick.bind(this);
        this.onLogout = this.onLogout.bind(this);
    }

    componentDidMount() {
        if (!(localStorage.getItem('authorized') === 'true')) {
            this.props.history.push('/');
        } else {
        const url = `${PLANET_URL}/?search=${this.state.searchText}`;
        this.fetchPlanets(url);
        }
    }

    fetchPlanets(url) {
        this.props.searchPlanets(this.state.searchText, url);
    }

    handleChangeSearchText(event) {
        this.setState({ searchText: event.target.value }, () => {
            const url = `${PLANET_URL}/?search=${this.state.searchText}`;
            this.fetchPlanets(url);
        });
    }

    onPreviousButtonClick() {
        this.fetchPlanets(this.props.previous);
    }

    onNextButtonClick() {
        this.fetchPlanets(this.props.next);
    }

    onLogout() {
        localStorage.clear();
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <div style={{ backgroundColor: '#007bff', color: 'white', padding: '10px' }}>
                    <PageHeader>
                        <span>Star wars</span>
                        <span><Button bsStyle="primary" style={{ float: 'right' }} onClick={this.onLogout}>Logout</Button></span>
                    </PageHeader>
                </div>
                <div className="container" style={{ marginTop: '20px' }}>
                    <div className="row">
                        <div className="col"></div>
                        <div className="col">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1"><strong>Search for planet name</strong></label>
                                    <input type="email" className="form-control" value={this.state.searchText} onChange={this.handleChangeSearchText} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Search planets" />
                                    {!(this.props.loading) && <div>
                                        {this.props.planets.length > 0 && this.props.planets.map((planet) => {
                                            return <div key={planet.name} className='dropdown'>
                                                {planet.name}
                                            </div>
                                        })}
                                        {this.props.planets.length === 0 && <div className='dropdown'>
                                            No records found
                                        </div>
                                        }
                                        {this.props.planets.length > 0 && <div style={{ marginTop: '10px', textAlign: 'center' }}>
                                            <Button bsStyle="primary" onClick={this.onPreviousButtonClick} disabled={(this.props.previous) ? false : true}>previous</Button>
                                            <Button bsStyle="primary" style={{ marginLeft: '10px' }} onClick={this.onNextButtonClick} disabled={(this.props.next) ? false : true}>next</Button>
                                        </div>
                                        }
                                    </div>}
                                    {(this.props.loading) && <div>
                                        Fetching planets...
                                        </div>
                                    }
                                </div>
                            </form>
                        </div>
                        <div className="col"></div>
                    </div>
                </div>
            </div >
        )
    }
}

export const mapStateToProps = ({ DashboardReducer }) => {
    return {
        loading: DashboardReducer.loading,
        planets: DashboardReducer.planets,
        next: DashboardReducer.next,
        previous: DashboardReducer.previous,
        error: DashboardReducer.error
    }
}

export const mapDispatchToProps = (dispatch) => {
    return {
        searchPlanets: (searchText, url) => dispatch(searchPlanets(searchText, url))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);