import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import MyContext from '../../context/context';
import './SignUp.css'
import { handleSignup } from '../../service/authService';

const SignUp = () => {
    const { setIsLogin, setUserName, setAccountNumber, setCurrentBalance } = useContext(MyContext);
    const [formData, setFormData] = useState({ fullName: '', email: '', password: '', cnfPassword: '' });
    const [error, setError] = useState({ fullName: '', email: '', password: '', cnfPassword: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async () => {
        let errors = { fullName: '', email: '', password: '', cnfPassword: '' };
        if (!formData.fullName) {
            errors.fullName = "fullName is required";
        } else if (formData.fullName.length < 3) {
            errors.fullName = "fullName must be atleast 3 character long!";
        }
        if (!formData.email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email is invalid';
        }
        if (!formData.password) {
            errors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            errors.password = 'Password must be a atleast 6 character long!'
        } else {
            const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;
            const isMatch = regex.test(formData.password);
            if (!isMatch) {
                errors.password = 'Password must content at least one uppercase, lowercase, number and a special symbol!'
            }
        }
        if (!formData.cnfPassword) {
            errors.cnfPassword = 'Password is required';
        } else if (formData.password.trim() !== formData.cnfPassword.trim()) {
            errors.cnfPassword = 'Password is not matched!';
        }
        if (errors.fullName !== '' || errors.email !== '' || errors.password !== '' || errors.cnfPassword !== '') {
            setError(errors);
            return;
        }

        const data = await handleSignup(JSON.stringify(formData));

        if (data.code == 112) {
            toast.error('Email id is already exist!')
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
        <div className='signup-container'>
            <div className='signup-section'>
                <div className='form'>
                    <div className="form-header">SignUp</div>
                    <div className='input-section'>
                        <div>fullName :</div>
                        <input type='text' placeholder='Enter fullName' value={formData.fullName} onChange={handleChange} name='fullName' />
                        {error.fullName ? <p className='error'>{error.fullName}</p> : null}
                    </div>
                    <div className='input-section'>
                        <div>Email :</div>
                        <input type='text' placeholder='Enter email' value={formData.email} onChange={handleChange} name='email' />
                        {error.email ? <p className='error'>{error.email}</p> : null}
                    </div>
                    <div className='input-section'>
                        <div>Password :</div>
                        <input type='password' placeholder='Enter password' value={formData.password} onChange={handleChange} name='password' />
                        {error.password ? <p className='error'>{error.password}</p> : null}
                    </div>
                    <div className='input-section'>
                        <div>Confirm-Password :</div>
                        <input type='password' placeholder='Enter password' value={formData.cnfPassword} onChange={handleChange} name='cnfPassword' />
                        {error.cnfPassword ? <p className='error'>{error.cnfPassword}</p> : null}
                    </div>
                    <div className='button-panel'>
                        <button onClick={handleSubmit}>SignUp</button>
                    </div>
                    <p style={{ textAlign: 'center', fontSize: '14px', marginTop: '-12px' }}>Already have an account? <Link to='/login'>Login</Link></p>
                </div>
            </div>
        </div>
    )
}

export default SignUp