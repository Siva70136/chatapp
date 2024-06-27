import { Link, useNavigate,Navigate  } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useState } from 'react';
import './index.css';

const Login = (props) => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    //console.log(props);

    const login = async (e) => {
        e.preventDefault();
        const formData = {
            "username": userName,
            "password": password
        }
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        }
        try {
            const res = await fetch('https://chatapp-1-xxay.onrender.com/login', options);
            const data = await res.json();
            //console.log(data);
            Cookies.set('jwt_token', data.token, { expires: 30, path: '/' });
            Cookies.set('user', data.username, { expires: 30, path: '/' });
            navigate('/chatui');
            setPassword('');
            setUserName('');
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }
    const token = Cookies.get('jwt_token');
    return (
        <div>
            {token !== undefined ?
                <Navigate to="/chatui" /> :
                <div className="container " id="login_page">
                    <div className="app-container  shadow-lg container2 ">
                        <form id="addUserForm" className="form m-auto ">
                            <h3 className="textHead">Login</h3>
                            <label htmlFor="name" className="label-data ">User Name</label>
                            <input type="text" name="" id="name" value={userName} className="form-control input" placeholder="username" onChange={(e) => { setUserName(e.target.value) }} />
                            <label htmlFor="PWD" className="label-data">Password</label>
                            <input type="password" name="" id="PWD" value={password} className="form-control input" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
                            <div className='remember-container'>
                                <input type="checkbox" name="" id="save" value="" className="label-check" />
                                <label htmlFor="save" className="label-data">Remember me</label>
                            </div>
                            <div className=" mt-2">
                                <button type="submit" className="button " onClick={e => { login(e) }}>Login</button>
                            </div>
                            <p className="no-account m-auto">Don't have an account?
                                <Link to='/' className="signup">
                                    <span >Sign UP</span>
                                </Link>
                            </p>
                        </form>



                    </div>
                </div>
            }
        </div>
    )
}

export default Login;