import { Routes, Route, Navigate } from 'react-router-dom';

import React, {useContext} from 'react';
import ProtectedRoute from './ProtectedRoute';
import Home from '../pages/home/Home';
import Login from '../pages/login/Login';
import SignUp from '../pages/signup/SignUp';
import Banking from '../pages/banking/Banking';
import Deposit from '../components/deposit/Deposit';
import Withdrawal from '../components/withdrawal/Withdrawal';
import Transfer from '../components/transfer/Transfer';
import Statement from '../components/statement/Statement';
import NotFound from '../pages/404page/NotFound';
import Welcome from '../components/welcome/Welcome';
import Profile from '../pages/profile/Profile';
import MyContext from '../context/context';

const Routing = () => {
    const {isLogin} = useContext(MyContext);
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/*" element={<NotFound />} />
            {!isLogin ? (
                <>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                </>
            ) : (
                <>
                    <Route path="/login" element={<Navigate to="/" />} />
                    <Route path="/signup" element={<Navigate to="/" />} />
                </>
            )}
            <Route path="/banking" element={<ProtectedRoute Component={Banking} />}>
                <Route path='' element={<Welcome />} />
                <Route path='deposit' element={<Deposit />} />
                <Route path='withdrawal' element={<Withdrawal />} />
                <Route path='transfer' element={<Transfer />} />
                <Route path='statement' element={<Statement />} />
            </Route>
            {/* <Route path='/profile' element={<ProtectedRoute Component={Profile}/>}>
                    <Route path='' element={<div>This is profile Page</div>} />
                    <Route path='account' element={<div>This is profile account page</div>} />
                    <Route path='setting' element={<div>This is profile setting page</div>} />
                    <Route path='privacy' element={<div>This is profile privacy page</div>} />
                </Route> */}
            {/* </Route> */}

        </Routes>
    )
}

export default Routing
