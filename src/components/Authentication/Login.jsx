import React from 'react';
import GoogleLogin from 'react-google-login';
import google_logo from '../../assets/google_logo.png';
import chat from '../../assets/chat.png';

import { login } from '../../features/authentication/authSlice';
import { useDispatch } from 'react-redux';

import useAuth from '../../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import Spinner from '../Utils/Spinner';

const Login = () => {
    const dispatch = useDispatch();
    const [isAuthenticated, setIsAuthenticated] = useAuth();
    
    const responseGoogle = (response) => {
        if (response.error) return;

        dispatch(login({
            userName: response.profileObj.name,
            userEmail: response.profileObj.email,
            userImg: response.profileObj.imageUrl,
            userId: response.googleId
        }));
        setIsAuthenticated(true);
    }

    if (isAuthenticated === null) {
        return <Spinner />;
    } else if (isAuthenticated) {
        return <Navigate to="/" />
    }

    return (
        <div className="flex justify-center items-center h-screen p-4 md:p-0">
            <div className="text-center space-y-6 border border-slate-600 p-10 rounded-lg shadow-xl">
                <h1 className="flex flex-col items-center text-2xl gap-4">
                <img className="w-12 h-12" src={chat} alt="Icon" />
                    AylChat Login
                </h1>
                <GoogleLogin
                    clientId='GOOGLE OAUTH2 CLIENT ID HERE'
                    render={renderProps => (
                        <button onClick={renderProps.onClick} disabled={renderProps.disabled}
                            className="shadow-md hover:bg-gray-50 px-4 py-2 rounded-lg"
                        >
                            <div className="flex justify-center items-center gap-2">                                
                                <img className="w-6 h-6" src={google_logo} alt="Google Logo" />
                                Login with Google
                            </div>
                        </button>
                    )}
                    buttonText="Login"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
                <div className="text-sm text-gray-600">(We will not share your email with anyone.)</div>
                <p>
                    Find more of my projects on my <a href="https://github.com/Bryan-0" className="text-blue-500 hover:underline" target="_blank" referrerPolicy="no-referrer">Github Page</a>
                </p>
            </div>
        </div>
    );
}

export default Login;