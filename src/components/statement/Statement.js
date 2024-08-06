import React, { useState, useEffect, useContext } from 'react'
import './Statement.css'
import { useNavigate } from 'react-router-dom';
import MyContext from '../../context/context';
import { handleStatement } from '../../service/bankingService';

const Statement = () => {
  const { userName, accountNumber, currentBalance, setIsLogin } = useContext(MyContext)
  const [filters, setFilters] = useState({ startDate: '', endDate: '', type: '', orderBy: '' });
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const [isVisibleApplyBtn, setIsVisibleApplyBtn] = useState(true);

  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
    setIsVisibleApplyBtn(false);
  }

  const handleCancel = () => {
    return navigate(`/banking`);
  }

  useEffect(() => {
    let token = localStorage.getItem('token');
    if (token) {
      setIsLogin(true)
    } else {
      setIsLogin(false)
    }
  })

  useEffect(() => {
    const fetchApiData = async () => {
      const queryParams = new URLSearchParams({
        ...filters
      }).toString();
      const data = await handleStatement(currentPage, queryParams);
      if (data.code === 104) {
        localStorage.removeItem('token');
        setIsLogin(false);
        return navigate('/login')
      }
      setTransactions(data.data.statement);
      setLoadMore(data.data.loadMore)//
    }
    fetchApiData()
  }, [currentPage]);


  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleApply = async () => {
    const queryParams = new URLSearchParams({
      ...filters
    }).toString();
    const data = await handleStatement(currentPage, queryParams);
    if (data.code === 104) {
      localStorage.removeItem('token');
      setIsLogin(false);
      return navigate('/login')
    }
    setTransactions(data.data.statement);
    setLoadMore(data.data.loadMore)//
    setCurrentPage(1)
  }

  // const handleClear = async () => {
  //   setFilters({ startDate: '', endDate: '', type: '', orderBy: '' });
  //   setIsVisibleClearBtn(true);
  //   setIsVisibleApplyBtn(true);
  //   await fetchTransactions(currentPage);
  // }

  const convertToIST = (dateString) => {
    const date = new Date(dateString);

    const options = {
      timeZone: 'Asia/Kolkata', // IST timezone
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };

    return date.toLocaleString('en-IN', options);
  };

  return (
    <div className='statement-container'>
      <div className='statement-header'>
        <div className='st-heading'>
          <h1>Account Statement</h1>
        </div>
        <div className='acount-details'>
          <div className='ac-details-section'>
            <label>Account holder</label>
            <div className='cln'>:</div>
            <div>{userName}</div>
          </div>
          <div className='ac-details-section'>
            <label>Account number</label>
            <div className='cln'>:</div>
            <div>{accountNumber}</div>
          </div>
          <div className='ac-details-section'>
            <label>Current balance</label>
            <div className='cln'>:</div>
            <div> &#8377;{currentBalance}</div>
          </div>
          <div>
          </div>
        </div>
        <button onClick={handleCancel} className='cancel-btn'>x</button>

      </div>
      <div className='filters-container'>
        <div>
          <label>Start Date :</label>
          <input type='date' onChange={handleChange} name='startDate' value={filters.startDate} className='inp-el' />
        </div>
        <div>
          <label>End Date :</label>
          <input type='date' onChange={handleChange} name='endDate' value={filters.endDate} className='inp-el' />
        </div>
        <div>
          <label>Transaction Type :</label>
          <select onChange={handleChange} name='type' value={filters.type} className='inp-el'>
            <option value="">All</option>
            <option value="withdrawal">Withdrawal</option>
            <option value="deposit">Deposite</option>
            <option value="transfer">Transfer</option>
            {/* <option value="none">None</option> */}
          </select>
        </div>
        <div>
          <label>Order by :</label>
          <select name='orderBy' onChange={handleChange} value={filters.orderBy} className='inp-el'>
            <option value="">Desc</option>
            <option value="ASC">Asc</option>
          </select>
        </div>
        <button className='apply-btn' onClick={async () => { await handleApply() }} disabled={isVisibleApplyBtn}>Apply</button>
        {/* <button className='apply-btn' onClick={async () => { await handleClear() }} disabled={isVisibleClearBtn}>Clear</button> */}
      </div>
      <div className="container">
        <table className="bank-statement">
          <thead>
            <tr>
              <th>Date</th>
              <th>Transaction Id</th>
              <th>Transaction Type</th>
              <th>To</th>
              <th>Amount</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index}>
                <td>{convertToIST(transaction.trxDate)}</td>
                <td>{transaction.trxId}</td>
                <td>{transaction.type}</td>
                <td>{transaction.targetAcc}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.balanceAfter}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <button className='pagination' onClick={handlePrevPage} disabled={currentPage === 1}>
            Prev
          </button>
          <button className='pagination' onClick={handleNextPage} disabled={!loadMore}>
            Next
          </button>
        </div>
      </div>
    </div >


  )
}

export default Statement;