import { useContext, useEffect, useState } from 'react';
import register from '../libs/register.js';
import UserContext from '../contexts/UserContext';
import '../scss/Register.scss';

export default function Register(props) {
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const setUser = useContext(UserContext)[1];

    function submitHandler(e) {
        e.preventDefault();
        if (password !== passwordConfirm) {
            setMessage("Passwords must match");
        } else {
            setMessage("");
            register(email, password, setUser, setMessage);
        }
    };

    // Scroll down when message is set:
    useEffect(() => {
        window.scrollTo(0, document.body.scrollHeight);
    }, [message]);

    return <div>
        <form onSubmit={submitHandler}>
            <div className="registerContainer">
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email" id="email" placeholder="type your email..." required maxLength={60}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password" id="password" required minLength={6}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="passwordConfirm">Confirm your Password:</label>
                    <input
                        type="password" id="passwordConfirm" required minLength={6}
                        onChange={e => setPasswordConfirm(e.target.value)}
                    />
                </div>
            </div>
            <button type="submit" className="regSubmit">
                Register
            </button>
            <div className="warning">{`${message}`}</div>
        </form>
    </div>
}