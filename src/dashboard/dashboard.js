import React, { Component } from 'react';
import { PLANET_URL } from '../utils/constants';
import './dashboard.css';
import { Button, PageHeader } from 'react-bootstrap';
class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            planets: [],
            next: null,
            previous: null,
        }
        this.handleChangeSearchText = this.handleChangeSearchText.bind(this);
        this.onPreviousButtonClick = this.onPreviousButtonClick.bind(this);
        this.onNextButtonClick = this.onNextButtonClick.bind(this);
        this.onLogout = this.onLogout.bind(this);
    }

    componentDidMount() {
        if (!(localStorage.getItem('authorized') === 'yes')) {
            this.props.history.push('/');
        } else {
            const url = `${PLANET_URL}/?search=${this.state.searchText}`;
            this.fetchPlanets(url);
        }
    }

    fetchPlanets(url) {
        this.setState({ loading: true });
        fetch(url)
            .then(res => res.json())
            .then(res => this.setState({
                planets: res.results,
                next: res.next || null,
                previous: res.previous || null,
                loading: false
            }))
    }

    handleChangeSearchText(event) {
        this.setState({ searchText: event.target.value }, () => {
            const url = `${PLANET_URL}/?search=${this.state.searchText}`;
            this.fetchPlanets(url);
        });
    }

    onPreviousButtonClick() {
        this.fetchPlanets(this.state.previous);
    }

    onNextButtonClick() {
        this.fetchPlanets(this.state.next);
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
                                    {!(this.state.loading) && <div>
                                        {this.state.planets.length > 0 && this.state.planets.map((planet) => {
                                            return <div key={planet.name} className='dropdown'>
                                                {planet.name}
                                            </div>
                                        })}
                                        {this.state.planets.length === 0 && <div className='dropdown'>
                                            No records found
                                        </div>
                                        }
                                        {this.state.planets.length > 0 && <div style={{ marginTop: '10px', textAlign: 'center' }}>
                                            <Button bsStyle="primary" onClick={this.onPreviousButtonClick} disabled={(this.state.previous) ? false : true}>previous</Button>
                                            <Button bsStyle="primary" style={{ marginLeft: '10px' }} onClick={this.onNextButtonClick} disabled={(this.state.next) ? false : true}>next</Button>
                                        </div>
                                        }
                                    </div>}
                                    {(this.state.loading) && <div>
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

export default Dashboard;