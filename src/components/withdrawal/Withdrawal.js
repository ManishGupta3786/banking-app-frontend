import React, { useState, useContext, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Withdrawal.css';
import { useNavigate } from 'react-router-dom';
import MyContext from '../../context/context';
import { handleWithdrawal } from '../../service/bankingService';

const Withdrawal = () => {
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
      setError({ amount: 'Amount must be at least 1 Rs.' })
      return;
    }
    const data = await handleWithdrawal(JSON.stringify({ amount: value }))
    if (data.code === 104) {
      localStorage.removeItem('token');
      setIsLogin(false);
      return navigate('/login')
    } else if (data.code === 114) {
      toast.error(`You have insufficient balance in your account`)
    }
    else {
      toast.success(`You have successfully withdrawn the amount of ${value}.`)
      setCurrentBalance(data.data.currentBalance);
      setValue(0);
      setError({ amount: '' });
    }
  }

  const handleCancel = () => {
    setValue(0);
    setError({ amount: '' });
    return navigate(`/banking`);

  }

  return (
    <div className='withdrawal-container'>
      <div className='withdrawal-section'>
        <div className='form'>
          <div className='form-header'>Withdrawal Money</div>
          <div className='input-section'>
            <div>Amount :</div>
            <input type='text' placeholder='Enter amount' value={value} onChange={handleChange} name='value' />
            {error.amount ? <p className='error'>{error.amount}</p> : null}
          </div>
          <div className='button-panel'>
            <button onClick={handleSubmit}>Withdrawal</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
  )
}

export default Withdrawal