import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import MainPage from './pages/MainPage/MainPage';
import LoginPage from './pages/AuthPages/LoginPage';
import RegisterPage from './pages/AuthPages/RegisterPage';
import ResetPasswordPage from './pages/AuthPages/ResetPasswordPage';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import StudioPage from './pages/StudioPage/StudioPage'
import CreatePage from './pages/CreatePage/CreatePage';
import PlayPage from './pages/PlayPage/PlayPage';
import QuizPage from './pages/QuizPage/QuizPage';
import ResultsPage from './pages/ResultsPage/ResultsPage';
import HistoryPage from './pages/HistoryPage/HistoryPage';
import AuthService from './service/AuthService';
import ErrorPage from './pages/ErrorPage/ErrorPage';


const App = () => {

  const { isLogined } = useSelector(state=> state.user)
  const dispatch = useDispatch()

  useEffect(() => {
      if (localStorage.getItem('token')) {
          dispatch(AuthService({alert: null, openBackdrop: null}).checkAuth())
      }
  },[]);

  return (
      <BrowserRouter>
          <Routes>

              <Route path='/' element={<MainPage/>} />
              <Route path='/login' element={isLogined === false? <LoginPage /> : <Navigate to='/' />}/>
              <Route path='/change-password/*' element={<ResetPasswordPage />}/>
              <Route path='/registration/*' element={isLogined === false? <RegisterPage /> : <Navigate to='/' />}/>
              <Route path='/settings' element={isLogined === true? <SettingsPage /> : <Navigate to='/' />}/>
              <Route path='/history' element={isLogined === true? <HistoryPage /> : <Navigate to='/' />}/>

              <Route path='/studio' element={isLogined === true? <StudioPage /> : <Navigate to='/' />}/>
              <Route path='/studio/create' element={isLogined === true? <CreatePage /> : <Navigate to='/' />}/>

              <Route path='/play' element={isLogined === true? <PlayPage /> : <Navigate to='/' />}/>
              <Route path='/quiz/:id' element={isLogined === true? <QuizPage /> : <Navigate to='/' />}/>
              <Route path='/quiz/:id/results/:count' element={isLogined === true? <ResultsPage /> : <Navigate to='/' />}/>

              <Route path='*' element={<ErrorPage />} />

          </Routes>
      </BrowserRouter>
  );
}

export default App;