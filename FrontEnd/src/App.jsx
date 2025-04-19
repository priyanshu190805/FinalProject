import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage'
import SignupUser from './pages/SignupUser'
import LoginUser from './pages/LoginUser'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import Start from './pages/Start'
import UserProtectedWrapper from './pages/UserProtectedWrapper'
import UserLogout from './pages/UserLogout'
import CaptainProtectWrapper from './pages/CaptainProtectWrapper'
import CaptainStart from './pages/CaptainStart'
import CaptainLogout from './pages/CaptainLogout'
import Riding from './pages/Riding'
import CaptainRiding from './pages/CaptainRiding'


const App = () => {
  return (
    <div className=''>
      <Routes>
        <Route path='/' element={<Homepage />}/>
        <Route path='/signup' element={<SignupUser />} />
        <Route path='/login' element={<LoginUser />} />
        <Route path='/riding' element={<Riding />} />
        <Route path='/captain-riding' element={<CaptainRiding />}/>
        <Route path='/captain-login' element={<CaptainLogin />} />
        <Route path='/captain-signup' element={<CaptainSignup />} />
        <Route path='/start' element={
          <UserProtectedWrapper>
            <Start />
          </UserProtectedWrapper>
        } />
        <Route path='/user/logout' element={
          <UserProtectedWrapper>
            <UserLogout />
          </UserProtectedWrapper>
        } />
        <Route path='/captain-start' element={ 
          <CaptainProtectWrapper>
            <CaptainStart/>
          </CaptainProtectWrapper>
        } />
        <Route path='/captain/logout' element={
          <CaptainProtectWrapper>
            <CaptainLogout/>
          </CaptainProtectWrapper>
        }></Route>
      </Routes>
    </div>
  )
}

export default App
