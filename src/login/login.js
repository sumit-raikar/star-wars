import React, { Component } from 'react';
import { PEOPLE_URL } from '../utils/constants';
import { connect } from 'react-redux';
import { loginService } from '../action/login';

export class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: null,
        }
        this.handleChangeUserName = this.handleChangeUserName.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    componentDidUpdate(prevProps){
        if(this.props.authorized!==prevProps.authorized){
            this.props.history.push('/dashboard');
        }
    }

    handleChangeUserName(event) {
        this.setState({ username: event.target.value, error: null });
    }

    handleChangePassword(event) {
        this.setState({ password: event.target.value, error: null });
    }

    onSubmit() {
        if (this.state.username.trim() && this.state.password.trim()) {
            this.props.loginService(this.state.username, this.state.password);
        } else {
            this.setState({ error: 'Please enter the details' });
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row" style={{ marginTop: '20%' }}>
                    <div className="col"></div>
                    <div className="col" style={{ border: '1px solid #ced4da', padding: '50px', borderRadius: '10px' }}>
                        <h2 style={{ textAlign: 'center' }}>Login</h2>
                        <form>
                            <div className="form-group">
                                <label htmlFor="inputText">Name</label>
                                <input type="text" className="form-control" value={this.state.username} onChange={this.handleChangeUserName} id="inputText" aria-describedby="emailHelp" placeholder="Enter Name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input type="password" className="form-control" value={this.state.password} onChange={this.handleChangePassword} id="exampleInputPassword1" placeholder="Enter Password" />
                            </div>
                        </form>
                        {this.state.error && <div style={{ color: 'red' }}>{this.state.error}</div>}
                        {this.props.error && <div style={{ color: 'red' }}>{this.props.error}</div>}
                        <button className="btn btn-primary" onClick={this.onSubmit} style={{ textAlign: 'center' }}>{this.props.loading ? 'Loading...' : 'Login'}</button>
                    </div>
                    <div className="col"></div>
                </div>
            </div>
        )
    }
}

export const mapStateToProps = ({ LoginReducer }) => {
    return {
        loading: LoginReducer.loading,
        authorized: LoginReducer.authorized,
        error: LoginReducer.error
    }
}

export const mapDispatchToProps = (dispatch) => {
    return {
        loginService: (username, password) => dispatch(loginService(username, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);