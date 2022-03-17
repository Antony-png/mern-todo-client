import React, { useState, useContext } from 'react';
import {BrowserRouter, Switch, Route, Link, useHistory} from 'react-router-dom'
import axios from 'axios'

import './AuthPage.scss'
import { AuthContext } from '../../context/AuthContext';


const Authpage = () => { 
    const history = useHistory()
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
    })
    const [error, setError] = useState('')
    const { login } = useContext(AuthContext)


    const changeHandler = (event) => {
        setForm({...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            await axios.post('https://test-todo-application.herokuapp.com/api/auth/signup', {...form}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            history.push('/')
        } catch (error) {
            setError(error.response.data.message)
        }
    }

    const loginHandler = async () => {
        try {
            await axios.post('https://test-todo-application.herokuapp.com/api/auth/login', {...form}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                login(response.data.token, response.data.userId)
            })
        } catch (error) {
          setError(error.response.data.message)
        }
    }

    return (
        <BrowserRouter>
            <React.Fragment>
                <Switch>
                    <div className="container">
                        <div className="auth-page">
                            <Route path="/login">
                                <h3>Login</h3>
                                <h3>{error && <span style={{color: 'red'}}> {error} </span>} </h3>
                                <form className="form form-login" onSubmit={e => e.preventDefault()}>
                                <div className="row">
                                    <label htmlFor="username">Username</label>
                                        <div className="input-field col s12">
                                            <input 
                                                type="text"
                                                name="username"
                                                className="validate"
                                                onChange={changeHandler}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                    <label htmlFor="password">Password</label>
                                        <div className="input-field col s12">
                                            <input 
                                                type="password"
                                                name="password"
                                                className="validate"
                                                onChange={changeHandler}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <button 
                                            className="wawes-effect wawes-light btn blue" 
                                            onClick={loginHandler}
                                            >
                                                Submit
                                            </button>
                                        <Link to="/signup" className="btn-outline btn-reg">Signup</Link>
                                    </div>
                                </form>    
                            </Route>    
                            <Route path="/signup">
                                <h3>Signup</h3>
                                <h3>{error && <span style={{color: 'red'}}> {error} </span>} </h3>
                                <form className="form form-login" onSubmit={e => e.preventDefault()}>
                                    <div className="row">
                                        <label htmlFor="username">Username</label>
                                            <div className="input-field col s12">
                                                <input 
                                                    type="text"
                                                    name="username"
                                                    className="validate"
                                                    onChange={changeHandler}
                                                />
                                            </div>
                                        </div>
                                    <div className="row">
                                    <label htmlFor="email">Email</label>
                                        <div className="input-field col s12">
                                            <input 
                                                type="email"
                                                name="email"
                                                className="validate"
                                                onChange={changeHandler}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                    <label htmlFor="password">Password</label>
                                        <div className="input-field col s12">
                                            <input 
                                                type="password"
                                                name="password"
                                                className="validate"
                                                onChange={changeHandler}
                                            />
                                        </div>
                                    </div>  
                                    <div className="row">
                                        <button className="wawes-effect wawes-light btn blue" onClick={registerHandler}>Submit</button>
                                        <Link to="/login" className="btn-outline btn-reg">Already registed?</Link>
                                    </div>
                                </form>
                            </Route>
                        </div>    
                    </div>  
                </Switch>
            </React.Fragment>
        </BrowserRouter>
    );
}

export default Authpage;
