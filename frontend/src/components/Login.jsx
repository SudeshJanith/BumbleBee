import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import AxiosClient from '../AxiosClient';
import axios from 'axios';
import { useStateContext } from '../contexts/ContextProvider';
// import cookie from 'js-cookie';

const Login = () => {
    const { setCurrentUser, setUserToken, setCurrentUserRole } = useStateContext();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const onSubmit = (ev) => {
        ev.preventDefault();

        const loginData = {
            email: email,
            password: password,
        }

        AxiosClient.post('auth/login', loginData)
            .then(res => {
                console.log(res.data.user_role)
                setCurrentUser(res.data.user)
                setUserToken(res.data.access_token)
                setCurrentUserRole(res.data.user_role)
            })
            .catch(e =>
                // console.log(e.response.data.message)
                setError(e.response.data.message)
            );
        // AxiosClient.post('auth/login', data)
        //     .then(res => {
        //         setCurrentUser(res.data.user)
        //         setUserToken(res.data.access_token)
        //         setCurrentUserRole(res.data.user_role)
        //     })
        //     .catch(e =>
        //         console.log(e)
        //         // setError(e)

        //     );

    }

    return (
        <div className='py-5 px-5'>
            <form className="form-signin" onSubmit={onSubmit}>
                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>

                {/* Error message view */}
                {error ? (<p className='alert alert-danger'>{error}</p>) : ("")}

                <input type="email" id="inputEmail" className="form-control m-2" placeholder="Email address" autoFocus onChange={(e) => setEmail(e.target.value)} />
                <input type="password" id="inputPassword" className="form-control m-2" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <div className="checkbox mb-3">
                    <label>
                        <input type="checkbox" value="remember-me" /> Remember me
                    </label>
                </div>
                <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                <p>Don't have an account ? <Link to="/signup">Signup</Link></p>
            </form>
        </div>
    )
}

export default Login
