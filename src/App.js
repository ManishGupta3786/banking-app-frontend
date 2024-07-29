import React, { useState } from 'react';
import Navbar from './components/navbar/Navbar';
import Routing from './routes/Routes';
import MyContext from './context/context';
import Profile from './pages/profile/Profile';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [userName, setUserName] = useState('');
  const [accountNumber, setAccountNumber] = useState('')
  const [currentBalance, setCurrentBalance] = useState('');
  const contextData = { isLogin, userName, accountNumber, currentBalance, setIsLogin, setUserName, setAccountNumber, setCurrentBalance };
 
  return (
    <MyContext.Provider value={contextData}>
      <Navbar />
      <Routing />
    </MyContext.Provider>
  );
}

export default App;
