import React, { useContext, useEffect, useState } from 'react'
import Adminlogout from './Adminlogout'
import Adminslider from './Adminslider'
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
// import axios from 'axios';
import { Simplecontext } from './Simplecontext';
import Callaxios from './Callaxios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Admindashboard() {
  const {accesscheck} =useContext(Simplecontext)
  const[orderdata,setorderdata]=useState([]);
  const[todaysorder,settodaysorder]=useState([]);
  // var token = window.localStorage.getItem('access_token')
  useEffect(() => {
    window.scrollTo(0, 0);
    orders()
    accesscheck()

  }, [])
  const notifyerror = (msg) => toast.error(msg, {
    position: "top-center",
    });
  const orders =async()=>{
    accesscheck()
    try{
      let data = await Callaxios("get","product/order/")
      // axios.get("http://127.0.0.1:8000/product/order/",{headers:{"Authorization" : `Bearer ${token}`}})
      // console.log("data",data.data[0].updated_date.split('T')[0])
      if (data.status===200){
        setorderdata(data.data)
        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);
        let newdate = today.toISOString();
        // console.log("ldate",newdate.split('T')[0])
        let fvalue = data.data.filter(t=>t.updated_date.split('T')[0].includes(newdate.split('T')[0]))
            settodaysorder(fvalue)
            // console.log("favlue",fvalue)
      }else{
        notifyerror("Something went wrong")
      }
      
    }
    catch (error) {
      console.log(error)
    }
  }
  return (
    <div >
        <Adminslider/>
        
      <div className=" vh-100 overflow-auto"  style={{backgroundColor:"#c3d5d5"}}>
      <Adminlogout/>
      <ToastContainer/>
      <div className="col-12 row " >
          <div className='col-2'>
          </div>
          <div className='col-10 '>
          <div className='pt-0' >
              <div className=' vh-100 bg-white  shadow-lg overflow-auto' style={{width:"100%",borderRadius:".80rem"}}>
              <div className='container p-5'>
               {/* data start */}
                 <div className='row col-12'>
                  <div className='col-12 col-md-4 pt-3'>
                  <div className='container rounded bg-success p-3 '><h5 className='text-white'>Today Orders</h5>
                    <div className='row col-12'>
                      <div className='col-6'>
                        <h1 className='p-2' ><span className='text-white' >{todaysorder.length}</span></h1>
                      </div>
                      <div className='col-6'>
                      <p className='float-end '><Icon className='' icon="line-md:calendar" color="rgb(209, 224, 224)" width="60" height="60" /></p>
                      </div>
                    </div>
                    <Link  to="/adminorder" className="link-warning" data-key="t-analytics">
                  <span>More info </span><Icon icon="bxs:down-arrow-circle" width="25" height="25" rotate={3} />
                 </Link>
                    </div>
                  </div>
                  
                  <div className='col-12 col-md-4 pt-3'>
                  <div className='container rounded bg-danger p-3 '><h5 className='text-white'>Total Orders</h5>
                    <div className='row col-12'>
                      <div className='col-6'>
                        <h1 className='p-2' ><span className='text-white' >{orderdata.length}</span></h1>
                      </div>
                      <div className='col-6'>
                        <p className='float-end'><Icon icon="line-md:text-box-multiple" color="rgb(209, 224, 224)" width="60" height="60" /></p>
                      </div>
                    </div>
                
                    <Link  to="/adminorder" className="link-warning" data-key="t-analytics">
                  <span>More info </span><Icon icon="bxs:down-arrow-circle" width="25" height="25" rotate={3} />
                 </Link>
                
                    
                    </div>
                  </div>
                  
                  

                 </div>
               {/* data end */}
              </div>
              </div>          
          </div>
          </div>
      </div>  
      </div>

    </div>
  )
}
