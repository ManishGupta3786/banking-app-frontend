import React, { useState, useContext, useEffect } from 'react'
import './Transfer.css'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MyContext from '../../context/context';
import { handleTransfer } from '../../service/bankingService';

const Transfer = () => {
  const { setIsLogin, setCurrentBalance } = useContext(MyContext);
  const [amount, setAmount] = useState(0);
  const [account, setAccount] = useState('');
  const [error, setError] = useState({ account: '', amount: '' })
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
    const { name, value } = e.target;
    if (name === 'amount' && (value === '' || /^[0-9\b]+$/.test(value))) {
      setAmount(value);
    } else if (name === 'account' && (value === '' || /^[0-9\b]+$/.test(value))) {
      setAccount(value)
    }
  };

  const handleSubmit = async () => {
    const errors = { account: '', amount: '' };
    if (amount === 0 || amount === '') {
      errors.amount = 'Amount must be at least 1 Rs.!';
    }
    if (account === '') {
      errors.account = 'Account number is required!';
    }
    if (errors.account !== '' || errors.amount !== '') {
      setError({ ...errors });
      return;
    }

    const data = await handleTransfer(JSON.stringify({ "amount": amount, "toAccountNo": account }));
    if (data.code === 114) {
      toast.error(`You have insufficient balance in your account`)
    } else if (data.code === 104) {
      localStorage.removeItem('token');
      setIsLogin(false);
      return navigate('/login')
    } else if (data.code === 115) {
      toast.error(`You have entered an invalid account number!`)
    } else {
      toast.success(`You have successfully transferred the amount ${amount} to ${account}`)
      setCurrentBalance(data.data.currentBalance);
    }
    setAmount(0);
  }

  const handleCancel = () => {
    setAccount('');
    setAmount(0);
    setError({ amount: '', account: '' });
    return navigate(`/banking`);

  }

  return (
    <div className='transfer-container'>
      <div className='transfer-section'>
        <div className='form'>
          <div className='form-header'>Transfer Money</div>
          <div className='input-section'>
            <div>Amount :</div>
            <input type='text' placeholder='Enter amount' value={amount} onChange={handleChange} name='amount' />
            {error.amount ? <p className='error'>{error.amount}</p> : null}
          </div>
          <div className='input-section'>
            <div>To :</div>
            <input type='text' placeholder='Enter account number' value={account} onChange={handleChange} name='account' />
            {error.account ? <p className='error'>{error.account}</p> : null}
          </div>
          <div className='button-panel'>
            <button onClick={handleSubmit}>Transfer</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
  )
}

export default Transfer