import React, { useEffect, useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MyContext from '../../context/context';
import './Login.css';
import {handleLogin} from '../../service/authService';

const Login = () => {
    const { setIsLogin, setUserName, setAccountNumber, setCurrentBalance } = useContext(MyContext);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }


    const handleSubmit = async() => {
        let errors = { email: '', password: '' };
        if (!formData.email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email is invalid';
        }
        if (!formData.password) {
            errors.password = 'Password is required';
        }
        if (errors.email != '' || errors.password != '') {
            setError(errors);
            return;
        }

        const data = await handleLogin(JSON.stringify(formData));

        if (data.code === 111) {
            toast.error('Invalid login credentials!')
        } else {
            setFormData({ email: '', password: '' })
            setError({ amount: '', account: '' });
            localStorage.setItem('token', data.data.token);
            setIsLogin(true);
            setAccountNumber(data.data.accNo);
            setUserName(data.data.fullName);
            setCurrentBalance(data.data.balance);
            navigate('/');
        }
    }

    return (
        <div className='login-container'>
            <div className='login-section'>
                <div className='form'>
                    <div className='form-header'>Login</div>
                    <div className='input-section'>
                        <div>Email :</div>
                        <input type='text' placeholder='Enter email' value={formData.email} onChange={handleChange} name='email' />
                        {error.email ? <p className='error'>{error.email}</p> : null}
                    </div>
                    <div className='input-section'>
                        <div>Password :</div>
                        <input type={showPassword ? 'text' : 'password'} placeholder='Enter password' value={formData.password} onChange={handleChange} name='password' />
                        {error.password ? <p className='error'>{error.password}</p> : null}
                    </div>
                    <div className='button-panel'>
                        <button onClick={handleSubmit}>Login</button>
                    </div>
                    <p style={{textAlign:'center', fontSize:'14px', marginTop:'-12px'}}>Don't have an account? <Link to='/signup'>SignUp</Link></p>
                </div>
            </div>
            <ToastContainer/>
        </div>
    )
}

export default Login