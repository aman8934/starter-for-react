import { useEffect, useState } from 'react'
import {useDispatch} from 'react-redux'
import authService from './config/Appwrite/auth'
import { login ,logout } from './Store/authslice'
import { Outlet } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
function App() {
const [Loading ,setLoading] =useState(true)
const dispatch =useDispatch()
useEffect(() => {
    authService.getCurrentUser()
    .then(
      (userData) => {
        if(userData){
          
          
          dispatch(login({userData}))
        }
        else{
          console.log("this is user data",userData);
          dispatch(logout())
        }
      }
    )
    
    .finally(
      () => setLoading(false)
    )
} , [])
  
 return !Loading ? (
    <div className='min-h-screen bg-gray-500 flex flex-wrap
    content -between'>
      <div className="w-full block">
        <Header />
        <main className='bg-gray-300'>
          <h3 className='bg-green-500'>TODO:</h3>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
 ) : null

}

export default App
