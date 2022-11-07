import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'

export const Simplecontext = createContext();

export default function Simplecontextprovider({children}) {
    const [categoryvalue,setcategoryvalue]=useState([]);
    const [filteredcategory,setfilteredcategory]=useState([]);
    useEffect(() => {
      Getcategory()
    }, [])
    
    const Getcategory = ()=>{axios.get("http://127.0.0.1:8000/product/category/").then(response=>{
    // console.log("response",response.data[0])
    setcategoryvalue(response.data);
    setfilteredcategory(response.data)
    
    })
    .catch(err => console.warn("error",err));
  };
  return (
    <Simplecontext.Provider value={{

        categoryvalue,filteredcategory,setfilteredcategory,Getcategory

    }}>{children}</Simplecontext.Provider>
  )
}
