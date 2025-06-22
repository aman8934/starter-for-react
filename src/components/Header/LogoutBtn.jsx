import React, { use } from 'react'
import authService from '../../config/Appwrite/auth.js'
import {logout}  from '../../Store/authslice.js'
import { useDispatch } from 'react-redux'
function LogoutBtn() {
    const dispatch = useDispatch();
    const handleLogout =  () => {
       authService.Logout().then(() => {
        dispatch(logout());
       }
       ).catch((error) => {
        console.error("Logout failed:", error);
       });
    }
  return (
    <button onClick={handleLogout} className=''>
        Logout
    </button>
  )
}

export default LogoutBtn