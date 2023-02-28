import axios from 'axios'
// import React, { useContext } from 'react'
// import { Simplecontext } from './Simplecontext'
import { BaseURL } from './Url'

export default async function Callaxios(action,url,datalist) {
    // const {accesscheck} =useContext(Simplecontext)
    
    try {
        
        // accesscheck()
        // console.log("action",datalist)
        // console.log("url",BaseURL+url)
        let data
        const token = window.localStorage.getItem('access_token')
        if (action === "get"){

            data = await axios.get(BaseURL+url,{params:datalist})
        }else{
            // console.log("postdata")
            data = await axios(
                {
                    method:action,
                    url:BaseURL+url,
                    headers:{"Authorization" : `Bearer ${token}`},
                    data:datalist
                }
            )
            // console.log("data",data)
        }
        
        return data
    } catch (error) {
        return error
    }

}
