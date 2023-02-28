import axios from 'axios';
import React, { useState } from 'react'
import {useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Callaxios from './Callaxios';
import { BaseURL } from './Url';

export default function Adminlogin () {
    const [username,setusername]=useState();
    const [password,setpassword]=useState();
    let navigate = useNavigate();
    const notifyerror = () => toast.error('! Invalid Password or Username', {
        position: "top-center",
        });
    const login=async(e)=>{
        e.preventDefault();
        const datalist={
            "username":username,
            "password":password,
          }   
          const data =await axios ({
                method: 'post',
                url: `${BaseURL}api/token/`,
                data:datalist,
            })
          if(data.status===200){
            window.localStorage.setItem('access_token', data.data.access)
            window.localStorage.setItem('refresh_token', data.data.refresh) 
            return navigate('/admindashboard');
          }else{
            notifyerror()
          }
        // axios({
        //     method: 'post',
        //     url: 'http://127.0.0.1:8000/api/token/',
        //     data:data,
        // }).then(response => {
        //     // console.log("response",response);
        //     if (response.status === 200){
        //         // console.log("pk")
        //         window.localStorage.setItem('access_token', response.data.access)
        //         window.localStorage.setItem('refresh_token', response.data.refresh) 
        //         return navigate('/admindashboard');
        //     }
        //     else{alert(response.data.Message) }
        //     })
        // .catch((error) => {
        // console.log(error)
        // notifyerror()
        // })
        }
  return (
        <div className='mt-5 vh-100 overflow-auto'>
          <ToastContainer />
          <section className=" gradient-custom">
        <div className="container w-75">
          <div className="row d-flex justify-content-center align-items-center ">
          
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card bg-dark text-white" style={{borderRadius: '1rem'}}>
                <div className="card-body p-md-4 m-md-2 text-center">
                <img src="/assets/img/logo.jpg" loading="lazy" alt="bisum" />
                <h5 className="fw-bold  mt-2 d-flex justify-content-center align-items-center " style={{color:"rgb(251 191 36)"}}>Admin Login</h5>
                  <div className="mb-md-5 mt-md-3 pb-2">
                   
                    <div className="form-outline form-white mb-4">
                      <input type="Name" id="typeEmailX" placeholder='Username' onChange={(e)=>setusername(e.target.value)} className="form-control form-control-md" />
                      {/* <label className="form-label" htmlFor="typeEmailX">Email</label> */}
                    </div>
                    <div className="form-outline form-white mb-4">
                      <input type="password" id="password" placeholder='password' onChange={(e)=>setpassword(e.target.value)} className="form-control form-control-md" />
                      {/* <label className="form-label" htmlFor="typePasswordX">Password</label> */}
                    </div>
                    
                    <button className="btn btn-outline-light btn-md px-5" onClick={login} style={{backgroundColor:"rgb(245 158 11)"}} type="submit"><span className=''>Login</span></button>
                 
                  </div>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
        </div>
  )
}
