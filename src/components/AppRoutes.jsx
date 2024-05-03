import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Main from './Main'
import Chat from './Chat'
import NotFound from './NotFound'

const AppRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Main />}/>
        <Route path="*" element={<NotFound />}/>
        <Route path='/chat' element={<Chat />}/>
    </Routes>
  )
}

export default AppRoutes