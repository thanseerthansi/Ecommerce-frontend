import React from 'react'
import {useNavigate } from 'react-router-dom';

export default function Adminlogout() {
    let navigate = useNavigate();
    const logout =()=>{
        window.localStorage.removeItem("access_token")
        window.localStorage.removeItem("refresh_token")
        return navigate('/adminlogin');
    }
  return (
    <div>
        <div className='text-end p-2 ' style={{marginRight:"1.1rem"}}>
            <button onClick={logout} className='btn btn-danger'>Logout</button>
        </div>
    </div>
  )
}
