import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';
import AxiosClient from '../AxiosClient';

const Register = () => {

    const { setCurrentUser, setUserToken, setCurrentUserRole } = useStateContext();

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [password, setPassword] = useState('');
    // const [redirectProfile, setRedirectProfile] = useState(false);
    const [error, setError] = useState('');

    const onSubmit = (ev) => {
        ev.preventDefault();

        let formattedDateOfBirth = new Date(dateOfBirth).toString('yyyy/M/d');

        const registerData = {
            full_name: fullName,
            email: email,
            date_of_birth: formattedDateOfBirth,
            password: password,
        }

        AxiosClient.post('auth/register', registerData)
            .then(res => {
                console.log(res.data.user_role)
                setCurrentUser(res.data.user)
                setUserToken(res.data.access_token)
                setCurrentUserRole(res.data.user_role)
            })
            .catch(e =>
                setError(e.response.data.message)
            );

    }

    return (
        <div className='py-5 px-5'>
            <form className="form-signin" onSubmit={onSubmit}>
                <h1 className="h3 mb-3 font-weight-normal">Please Sign Up</h1>
                {/* Error message view */}
                {error ? (<p className='alert alert-danger'>{error}</p>) : ("")}
                <input type="text" id="inputName" className="form-control m-2" placeholder="Full Name" autoFocus onChange={(e) => setFullName(e.target.value)} />
                <input type="email" id="inputEmail" className="form-control m-2" placeholder="Email address" autofocus onChange={(e) => setEmail(e.target.value)} />

                <input type="date" id="inputDate" className="form-control m-2" placeholder="Birth Day" autofocus onChange={(e) => setDateOfBirth(e.target.value)} />


                <input type="password" id="inputPassword" className="form-control m-2" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <div className="checkbox mb-3">
                    <label>
                        <input type="checkbox" value="remember-me" /> Remember me
                    </label>
                </div>
                <button className="btn btn-lg btn-primary btn-block" type="submit">Sign Up</button>
            </form>
            <p>Have an account ? <Link to="/">Sign In</Link></p>
        </div>
    )
}

export default Register
