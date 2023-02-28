import React, { useContext, useEffect, useState } from 'react'
import Adminslider from './Adminslider';
import { Icon } from '@iconify/react';
import Adminlogout from './Adminlogout';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import { Simplecontext } from './Simplecontext';
import { BaseURL } from './Url';
export default function Adminprofile() {
  const {accesscheck} =useContext(Simplecontext)
  const [profil,setprofile]=useState();
  // const [password,setpassword]=useState();
  // const [modalvalue,setmodalvalue]=useState(false)
  // const [time, setTime] = useState(0);
  
  // console.log("id",userid)
  useEffect(() => {
    userdata()
    accesscheck()
  },[]);

  var token = window.localStorage.getItem('access_token')
  var decoded = jwt_decode(token);
  let userid = decoded.user_id
  // let headers = "Bearer "+token 
  // console.log("headre",headers)
  const userdata=()=>{axios.get(`]${BaseURL}user/user/`,{ headers: {"Authorization" : `Bearer ${token}`},params:{id:userid}}).then(response=>{
   
    // console.log("data",response.data)
    setprofile(response.data);
    })
    .catch(err => console.warn("error",err));
  };
  // const changepass=()=>{
    
  //     // e.preventDefault();
  //     const data={"id":userid,
  //       "password":password, 
  //     }
  //     axios({
  //       method: 'delete',
  //       url: 'http://127.0.0.1:8000/user/user/',
  //       headers:{"Authorization" : `Bearer ${token}`},
  //       data:data,
  //     }).then(response => {
  //       console.log(response.data);
  //       if (response.data.Status === 200){
  //         console.log(response.data);
  //         // Getproduct()
  //         // setsubpmodal(!subpmodal)
          
  //       }
  //       else{alert(response.data.Message)}
  //       })
  //       .catch(err => console.warn("error",err));
     
  //   };
  

  return (
    <div>
        <Adminslider/>
        <div className=" vh-100 overflow-auto"  style={{backgroundColor:"#c3d5d5"}}>
          <Adminlogout/>
        <div className="col-12 row " >
            <div className='col-md-2 col-1' >
            </div>
            <div className='col-md-10 col-11'>
            <div className='pt-3 ps-md-5 ' style={{}}>
                <div className=' vh-100 bg-white  shadow-lg overflow-auto' style={{width:"100%",borderRadius:".80rem"}}>
                <div className='container'>
                <div className='col-md-12 row' >
                    <div className='col-md-5'>
                    <div className='p-md-5 p-2'>
                    <Icon className='ps-md-2' icon="fa-solid:user-tie" width="200" height="200" /><br/><br/>
                    {/* <button onClick={()=>setmodalvalue(!modalvalue)} className='btn btn-success w-75 w-sm-100'><Icon icon="carbon:password" /> Change Password</button> */}
                    
                    </div>
                    {/* modal */}
                  
                    {/* modalend */}
                     </div>
                    <div className='col-md-7'>
                       <div className='pt-md-5 pt-1'>
                       <button className='btn p-23  border-bottom-0'> <b>About</b></button> <hr></hr>
                       <div className='p-md-5'>
                       <div className=' p-1 d-flex text-uppercase font-weight-bold col-12'>
                        <div className='col-5 col-md-5' >
                        <span className=''><b>User Name</b> </span>
                        </div>
                        <div className='col-2 col-md-2'>
                        <span className=''> <b>:</b></span>
                        </div>
                        <div className='col-6 '>
                        <span className=''><b>{profil ?profil[0].username:null}</b> </span>
                        </div>                       
                       </div>

                       <div className=' p-1 pt-4  d-flex text-uppercase font-weight-bold col-12'>
                        <div className='col-5 col-md-5' >
                        <span className=''><b>DOB</b> </span>
                        </div>
                        <div className='col-2 col-md-2'>
                        <span className=''> <b>:</b></span>
                        </div>
                        <div className='col-6 '>
                        <span className=''><b>{profil ?profil[0].dob:null}</b> </span>
                        </div>  
                       </div>

                       <div className=' p-1 pt-4  d-flex text-uppercase font-weight-bold col-12'>
                        <div className='col-5 col-md-5' >
                        <span className=''><b>contact</b> </span>
                        </div>
                        <div className='col-2 col-md-2'>
                        <span className=''> <b>:</b></span>
                        </div>
                        <div className='col-6 '>
                        <span className=''><b>{profil ?profil[0].contact:null}</b> </span>
                        </div>  
                       </div>

                       <div className=' p-1 pt-4  d-flex text-uppercase font-weight-bold col-12'>
                        <div className='col-5 col-md-5' >
                        <span className=''><b>Gender</b> </span>
                        </div>
                        <div className='col-2 col-md-2'>
                        <span className=''> <b>:</b></span>
                        </div>
                        <div className='col-6 '>
                        <span className=''><b>{profil ?profil[0].gender:null}</b> </span>
                        </div>  
                       </div>

                      

                       <div className=' p-1 pt-4  d-flex text-uppercase font-weight-bold col-12'>
                        <div className='col-5 col-md-5' >
                        <span className=''><b>status</b> </span>
                        </div>
                        <div className='col-2 col-md-2'>
                        <span className=''> <b>:</b></span>
                        </div>
                        <div className='col-6 '>
                        <span className=''><b>{profil ?profil[0].status:null}</b> </span>
                        </div>  
                       </div>

                       </div>
                       </div>
                    </div>
                </div>
                </div>
                </div>          
            </div>
            </div>
         
        </div>  
        </div>
    </div>
  )
}
