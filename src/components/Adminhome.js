import React from 'react'
import Adminlogout from './Adminlogout'

import Adminslider from './Adminslider'

export default function Adminhome() {
  return (
    
    <div>
        <Adminslider/>
      
        <div className=" vh-100 overflow-auto"  style={{backgroundColor:"#c3d5d5"}}>
          <Adminlogout/>
        <div className="col-12 row " >
        <div className='col-md-2 col-1'>
      </div>
      <div className='col-md-10 col-11'>
      <div className='pt-3 ps-md-5' >
                <div className=' vh-100 bg-white  shadow-lg overflow-auto' style={{width:"100%",borderRadius:".80rem"}}>
                <div className='container'>
                <p>container</p></div>
                </div>          
            </div>
            </div>
        </div>  
        </div>
        {/* {modalvalue?
        <div className="modal show "    style={{display: 'block'}}>
          <div className="modal-dialog modal-xl w-50 " >
            <div className="modal-content">
              <div className="modal-header border-0">
                <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={()=>setmodalvalue(!modalvalue)} aria-label="Close" />
              </div>
            
              <div  className="modal-body">
                <div className='row col-12'>
                  <div className='col-md-6 col-12'>
                <label >password</label><br/>
                <input className='form-control form-control-md'/>
                </div>
                  <div className='col-md-6 col-12'>
                <label >password</label><br/>
                <input className='form-control form-control-md'/><br/>
                <div className='justify-content-md-end d-flex'>
                <button className='btn btn-primary  '>Submit</button>
                </div>
                </div>
                
                </div>
              </div>
             
            </div>
          </div>
        </div>

        :null} */}
        </div>
  )
}
