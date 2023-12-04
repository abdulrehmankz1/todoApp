import { useState } from 'react';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
// import { auth } from './firebase';
import { auth } from '../firebase/firebase.utils';

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error('Sign-in error:', error);
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Sign-out error:', error);
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleSignIn}>Sign In</button>
            <button onClick={handleSignOut}>Sign Out</button>
        </div>
    );
};

export default Auth;
