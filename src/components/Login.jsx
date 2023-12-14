import { signInWithEmailAndPassword, sendPasswordResetEmail, signInWithPopup, FacebookAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../firebase/firebase.utils';
import '../App.css';


const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false); // State to manage password visibility

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [submitDisabled, setSubmitDisabled] = useState(false);

    const handleLogin = async () => {
        if (!values.email || !values.password || submitDisabled) {
            return;
        }

        setErrorMsg('');
        setSubmitDisabled(true);

        try {
            const res = await signInWithEmailAndPassword(auth, values.email, values.password);
            const user = res.user;
            console.log(user)
            // User is successfully entered
            setSuccessMessage('User is successfully entered');
            window.location.href = '/';

        } catch (err) {
            setSubmitDisabled(false);

            if (err.code === 'auth/wrong-password') {
                setErrorMsg('Wrong password. Please try again.');
            } else if (err.code === 'auth/user-not-found') {
                setErrorMsg('User not found. Please sign up first.');
            } else {
                setErrorMsg(err.message);
            }
        }
    };
    const handleForgotPassword = async () => {
        if (!values.email) {
            setErrorMsg('Please enter your email.');
            return;
        }

        try {
            await sendPasswordResetEmail(auth, values.email);
            setSuccessMessage('Password reset email sent. Check your inbox.');
        } catch (err) {
            setErrorMsg(err.message);
        }
    };
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword); // Toggle the state to show/hide the password
    };

    const handleFacebookLogin = async () => {
        try {
            const result = await signInWithPopup(auth, new FacebookAuthProvider());
            // Handle the successful login
            const user = result.user;
            console.log(user);
            // Redirect or perform necessary actions upon successful login
            window.location.href = '/';
        } catch (error) {
            // Handle errors
            console.error('Facebook login error:', error);
        }
    };
    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, new GoogleAuthProvider());
            // Handle the successful login
            const user = result.user;
            console.log(user);
            // Redirect or perform necessary actions upon successful login
            window.location.href = '/';
        } catch (error) {
            // Handle errors
            console.error('Facebook login error:', error);
        }
    };

    return (
        <div>
            <div className='container mx-auto'>
                <div className='w-50 mx-auto border p-3 mt-5 shadow p-3 mb-5 bg-white rounded login-container'>
                    <h2 className='text-center title'>Login</h2>
                    <form className='w-100 mx-auto '>
                        <div className="mb-3">
                            <label className="form-label">Email address</label>
                            <input type="email"
                                onChange={event => setValues({ ...values, email: event.target.value })}
                                className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <div className="input-group">
                                <input className="form-control"
                                    type={showPassword ? 'text' : 'password'}
                                    value={values.password}
                                    onChange={event => setValues({ ...values, password: event.target.value })}
                                />
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary border-none"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ?
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                                            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                        </svg>
                                        : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash-fill" viewBox="0 0 16 16">
                                            <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
                                            <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
                                        </svg>
                                    }
                                </button>
                            </div>
                        </div>
                        <div className='mb-2 text-center'>
                            <b>{errorMsg}</b>
                            <b>{successMessage}</b>
                        </div>
                        <div className='d-flex justify-content-end'>
                            <button className='forgot-pass roboto' onClick={handleForgotPassword}>
                                Forgot Password
                            </button>
                        </div>
                        <div className='d-flex justify-content-center align-items-center flex-wrap'>
                            <button type="submit"
                                onClick={handleLogin}
                                disabled={submitDisabled}
                                className="btn btn-primary w-25 login-btn"> Login</button>
                            <p className='mt-3 ms-3'>
                                Not a member? <a href='/signup'>SignUp</a>
                            </p>
                            <button
                                type='button'
                                id='facebook-login'
                                name='facebook-login'
                                className='btn btn-primary w-75 login-btn'
                                onClick={handleFacebookLogin}
                            >
                                Login with Facebook
                            </button>
                            <button
                                type='button'
                                id='google-login'
                                name='google-login'
                                className='btn btn-primary w-75 login-btn mt-1'
                                onClick={signInWithGoogle}
                            >
                                Login with Google
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;