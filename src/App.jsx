import React from 'react'
import CustomTable from './components/CustomTable'
import UserProfile from './components/UserProfile'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store'

const App = () => {
  return (
    <div>
      Test Table
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            <Route path='/' element={<CustomTable/>}/>
            <Route path='/profile' element={<UserProfile/>}/>
          </Routes>
        </Provider>
      </BrowserRouter>
    </div>
  )
}

export default App
