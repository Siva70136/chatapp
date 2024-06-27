import { Link,Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useState } from 'react';
import './index.css';

const Register = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const register = async (e) => {
        e.preventDefault();
        const formData = {
            "username": userName,
            "password": password,
            "email": email
        }
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        }
        //console.log(options);
        
        const res = await fetch('https://chatapp-kryh.onrender.com/register', options);
        const data = await res.json();
        //console.log(data);
        setEmail('');
        setPassword('');
        setUserName('');
    }
    const token = Cookies.get('jwt_token');
    return (
        <div>
            {token !== undefined ?
                <Navigate to="/chatui" /> :
                <div className="container " id="login_page">
                    <div className="app-container  shadow-lg container2 ">
                        <form id="addUserForm" className="form m-auto ">
                            <h3 className="textHead">Register</h3>
                            <label htmlFor="name" className="label-data ">User Name</label>
                            <input type="text" name="" id="name" value={userName} className="form-control input" placeholder="Username" onChange={(e) => { setUserName(e.target.value) }} />
                            <label htmlFor="PWD" className="label-data">Password</label>
                            <input type="password" name="" id="PWD" value={password} className="form-control input" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
                            <label htmlFor="email" className="label-data">Email</label>
                            <input type="text" name="" id="email" value={email} className="form-control input" placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} />
                            <div className="submit-cntainer">
                                <button type="submit" className="button " onClick={(e) => { register(e) }}>Register</button>
                            </div>
                            <p className="no-account m-auto">I have an account?
                                <Link to='/login' className="signup">
                                    <span>Login</span>
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            }
        </div>
    )
}

export default Register;