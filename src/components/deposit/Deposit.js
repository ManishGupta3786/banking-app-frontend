import React, { useState, useContext, useEffect } from 'react'
import './Deposit.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import MyContext from '../../context/context';
import { handleDeposite } from '../../service/bankingService';

const Deposit = () => {
    const { setIsLogin, setCurrentBalance } = useContext(MyContext);
    const [value, setValue] = useState(0);
    const [error, setError] = useState({ amount: '' });
    const navigate = useNavigate();

    useEffect(() => {
        let token = localStorage.getItem('token');
        if (token) {
          setIsLogin(true)
        } else {
          setIsLogin(false)
        }
      })

    const handleChange = (e) => {
        const newValue = e.target.value;
        if (newValue === '' || /^[0-9\b]+$/.test(newValue)) {
            setValue(newValue);
        }
    };

    const handleSubmit = async () => {
        if (value === '' || value === 0) {
            setError({ amount: 'Amount must be at least 1Rs.' })
            return;
        }
        const data = await handleDeposite(JSON.stringify({ "amount": value }));
        if (data.code === 104) {
            localStorage.removeItem('token');
            setIsLogin(false);
            return navigate('/login')
        }
        setCurrentBalance(data.data.currentBalance)
        toast.success(`You have successfully deposite the amount ${value}.`)
        setValue(0);
        setError({ amount: '' });
    }

    const handleCancel = () => {
        setValue(0);
        setError({ amount: '' });
        return navigate('/banking');
    }

    return (
        <div className='deposite-container'>
            <div className='deposite-section'>
                <div className='form'>
                    <div className='form-header'>Deposite Money</div>
                    <div className='input-section'>
                        <div>Amount :</div>
                        <input type='text' placeholder='Enter amount' value={value} onChange={handleChange} name='value' />
                        {error.amount ? <p className='error'>{error.amount}</p> : null}
                    </div>
                    <div className='button-panel'>
                        <button onClick={handleSubmit}>Deposite</button>
                        <button onClick={handleCancel}>Cancel</button>
                    </div>
                    <ToastContainer />
                </div>
            </div>
        </div>
    )
}

export default Deposit
