import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { BaseURL } from './Url';
import jwt_decode from "jwt-decode";
import Callaxios from './Callaxios';

export const Simplecontext = createContext();

export default function Simplecontextprovider({children}) {
    const [categoryvalue,setcategoryvalue]=useState([]);
    const [filteredcategory,setfilteredcategory]=useState([]);
    let navigate = useNavigate();
    useEffect(() => {
      Getcategory()
      accesscheck()
    }, [])
    
    const Getcategory = ()=>{Callaxios("get",`product/category/`).then(response=>{
    // console.log("responsedata",response.data)
    setcategoryvalue(response.data);
    setfilteredcategory(response.data)
    })
    .catch(err => console.warn("error",err));
  };
  const accesscheck =async()=>{
    const token = window.localStorage.getItem('access_token')
    const refresh_token = window.localStorage.getItem('refresh_token')
    if (token && refresh_token){
      var decodedToken=jwt_decode(token, {complete: true});
      var dateNow = new Date();
      if(decodedToken.exp < dateNow.getTime()){
        try {
          let accessdata = await axios({
            method: 'post',
            url: BaseURL+'api/token/refresh/',
            data:{"refresh" : refresh_token },
          })
          // console.log("accessdata",accessdata)    
          if(accessdata.status===200){
            window.localStorage.setItem('access_token', accessdata.data.access)   
          } else{
            return navigate('/adminlogin')
          }
          
      }catch (error) {
        console.log("error",error)
        
        // console.log("erro/rmessga",error.response.status)
        if (error.response.status===401){
            return navigate('/adminlogin');
        }
      }
      }
      // else{
      //   return navigate('/adminlogin')
      // }
    }else{
      return navigate('/adminlogin')
    }
  }
  return (
    <Simplecontext.Provider value={{

        categoryvalue,filteredcategory,setfilteredcategory,Getcategory,accesscheck

    }}>{children}</Simplecontext.Provider>
  )
}
