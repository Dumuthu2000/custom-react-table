import React from 'react'
import CustomTable from './components/CustomTable'
import UserProfile from './components/UserProfile'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <div>
      Test Table
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<CustomTable/>}/>
          <Route path='/profile' element={<UserProfile/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
