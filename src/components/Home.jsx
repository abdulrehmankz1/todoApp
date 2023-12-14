import React, { useState, useEffect } from 'react';
import TodoApp from './TodoApp';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import Login from './Login'

function Home() {
    const [userName, setUserName] = useState(null);
    const [user, setUser] = useState(null);
    const auth = getAuth();

    useEffect(() => {
        // Check the authentication state when the component mounts
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserName(user.displayName);
                setUser(user);
            } else {
                setUserName(null);
                setUser(null);
            }
        });
    }, [auth]);

    const handleLogout = () => {
        signOut(auth).then(() => {
            console.log('Sign - out successful.')
            // Sign - out successful.
            window.location.href = '/login';
        }).catch((error) => {
            // Handle sign-out error.
            console.error(error);
        });
    }

    return (
        <div>
            <div className='d-flex container-fluid p-3 justify-content-between align-items-center mx-auto ' style={{ backgroundColor: '#f2f2f2' }}>
                {userName ? (
                    <>
                        <h2>Welcome {userName}</h2>
                        <button onClick={handleLogout} className='btn btn-primary'>Logout</button>
                    </>
                ) : (
                    <div className='container'>
                        <Login />
                    </div>
                )}
            </div>
            {user && <TodoApp />}
        </div>
    );
}

export default Home;

