import React, { Component } from 'react';
import { PEOPLE_URL } from '../utils/constants';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            validUsers: [],
            username: '',
            password: ''
        }
        this.handleChangeUserName = this.handleChangeUserName.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }


    componentDidMount() {
        fetch(PEOPLE_URL)
            .then(res => res.json())
            .then(res => { this.setState({ validUsers: res.results }) })
    }

    handleChangeUserName(event) {
        this.setState({ username: event.target.value });
    }

    handleChangePassword(event) {
        this.setState({ password: event.target.value });
    }

    onSubmit() {
        const authorizedUser = this.state.validUsers.filter((person) => {
            if (person.name.toLowerCase() === this.state.username.toLowerCase() && person.birth_year.toLowerCase() === this.state.password.toLowerCase()) {
                return true;
            } else {
                return false;
            }
        });
        if (authorizedUser.length > 0) {
            localStorage.setItem('authorized','yes');
            this.props.history.push('/dashboard');
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row" style={{marginTop: '20%'}}>
                    <div className="col"></div>
                    <div className="col" style={{border: '1px solid #ced4da',padding: '50px',borderRadius: '10px'}}>
                        <h2 style={{textAlign: 'center'}}>Login</h2>
                        <form>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Name</label>
                                <input type="email" className="form-control" value={this.state.username} onChange={this.handleChangeUserName} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input type="password" className="form-control" value={this.state.password} onChange={this.handleChangePassword} id="exampleInputPassword1" placeholder="Enter Password" />
                            </div>
                        </form>
                        <button className="btn btn-primary" onClick={this.onSubmit} style={{textAlign: 'center'}}>Submit</button>
                    </div>
                    <div className="col"></div>
                </div>
            </div>
        )
    }
}

export default Login;