import React from 'react' 
import {Route, Routes } from 'react-router-dom'
import './index.css'

import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import NoteDetailPage from './pages/NoteDatailPage'

const App = () => {
  return (  
    <div className='relative h-full w-full'>
    <div data-theme="forest">
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/create' element={<CreatePage />} />
        <Route path='/note/:id' element={<NoteDetailPage />} />
      </Routes>
    </div>
    </div>
  )
}

export default App