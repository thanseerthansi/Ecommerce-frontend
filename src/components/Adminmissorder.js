import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Adminlogout from './Adminlogout'
import Adminslider from './Adminslider'
import { Icon } from '@iconify/react';
import Dropdown from 'react-bootstrap/Dropdown';
import { Simplecontext } from './Simplecontext';
import Callaxios from './Callaxios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export default function Adminmissorder() {
  const {accesscheck} =useContext(Simplecontext)
  const [orderdata,setorderdata]=useState([]);
  const [oproduct,setoproducts]=useState([]);
  // var token = window.localStorage.getItem('access_token')

  useEffect(() => {
   
    missorders()
  }, [])
  const notifyerror = (msg) => toast.error(msg, {
    position: "top-center",
    });
  const missorders =async()=>{
    accesscheck()
    try{
      let data = await  Callaxios("get","product/missingorder/")
      // axios.get("http://127.0.0.1:8000/product/missingorder/",{ headers: {"Authorization" : `Bearer ${token}`}})
      if (data.status===200){
        setorderdata(data.data)
      }else{
        notifyerror("Something went wrong")
      }
        
    }
    catch (error) {
      console.log(error)
    }
  }
  const orderproduct =async(orderid)=>{
    // console.log("ordreid",orderid)
    accesscheck()
    try{
      let data = await Callaxios("get","product/missingorderproduct/")
      //  axios.get("http://127.0.0.1:8000/product/missingorderproduct/",{headers:{"Authorization" : `Bearer ${token}`},params:{"missorder_id":orderid}})
      console.log("data",data.data)
      setoproducts(data.data)
    }
    catch (error) {
      console.log(error)
    }
  }
  const deleteproduct =async(id)=>{
    // console.log("k",k)
    // console.log("id",id)
    accesscheck()
   try {
    let data = await Callaxios("delete","product/missingorder/",{"id":id})
    
    if (data.data.Status===200){
      missorders()
    }else{
      notifyerror("Something went wrong")
    }
    
    // const splc = orderdata
    // splc.splice(k,1)
    // setorderdata(() => [ ...splc]);

   } catch (error) {
    console.log(error)
   }
  }
  const submitdeletecategory = (itemid) => {
    confirmAlert({
      title: "Confirmation",
      message: `Are you sure to delete this ?`,
      buttons: [
        {
          label: "Yes",           
          onClick:()=>deleteproduct(itemid),
        },
        {
          label: "No"
          // onClick: () => alert("Click No")
        } 
      ],
      
    });
  };
  return (
    <div >
    <Adminslider/>
    
  <div className=" vh-100 overflow-auto"  style={{backgroundColor:"#c3d5d5"}}>
  
  <Adminlogout/>
  
  <div className="col-12 row " >
      <div className='col-md-2 col-1'>
      </div>
      <div className='col-md-10 col-11'>
      
      <div className='pt-3 ps-md-5' >
          <div className=' vh-100 bg-white  shadow-lg overflow-auto' style={{width:"100%",borderRadius:".80rem"}}>
         
          <div className='container pt-md-0 pt-0'>
          <div className='d-flex pt-3' style={{color:"rgb(245, 189, 7)"}}>
            <Icon icon="mdi:package-variant-remove" width="40" height="25" /> <p className='fw-bolder'>Missing Orders</p> 
            </div>
          <table className="table table-bordered">
            <thead className='text-center'>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Customer</th>
                <th scope="col">contact</th>
                <th scope="col">city</th>
                <th scope="col">Date</th>
                <th scope="col">products</th>
                <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody className='text-center'>
              {orderdata.map((itm,k)=>(
                <tr key={k}>
                <th scope="row">{k+1}</th>
                <td>{itm.customer_name}</td>
                <td>{itm.contact}</td>
                <td>{itm.city}</td>
                <td>{itm.created_date.split('T')[0]}</td>
                <td className=''style={{width:"0"}} ><Dropdown  onClick={()=>orderproduct(itm.id)}  >
                    <Dropdown.Toggle  className='btn'  >
                    <Icon  icon="eva:list-fill" width="15" height="25" />
                  
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{width:"150%"}}>
                    <div className="dropdown-menu dropdown-menu-xl dropdown-menu-end p-0 dropdown-menu-cart show" aria-labelledby="page-header-cart-dropdown" style={{position: 'absolute', inset: '0px 0px auto auto', margin: 0, transform: 'translate3d(0px, -30px, 0px)'}} data-popper-placement="bottom-end">

                    <div data-simplebar="init" style={{maxHeight: 300}}><div className="simplebar-wrapper" style={{margin: 0}}><div className="simplebar-height-auto-observer-wrapper"><div className="simplebar-height-auto-observer" /></div><div className="simplebar-placeholder" style={{width: 'auto', height: "auto"}} /></div><div className="simplebar-track simplebar-horizontal" style={{visibility: 'hidden'}}><div className="simplebar-scrollbar" style={{width: 0, display: 'none'}} /></div><div className="simplebar-track simplebar-vertical" style={{visibility: 'visible'}}><div className="simplebar-scrollbar" style={{height:" auto", display: 'block', transform: 'translate3d(0px, 0px, 0px)'}} /></div></div>
                    <div className="p-1 border-bottom-0 border-start-0 border-end-0 border-dashed border" id="checkout-elem" style={{display: 'block'}}>
                        {/* <div className="card-body p-4"> */}
                    <div className="p-1 mt-4">
                    <div className="">     
                        <div className="card-body" >
                        <div className=" table-card">   
                        <table className="table table-nowrap table-centered align-middle" style={{backgroundColor:"white"}}>
                            <thead className="bg-light text-muted">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Product</th>
                                <th scope="col">  Date</th>
                                {/* <th scope="col">Quantity</th> */}
                                               
                            </tr>
                            {/* end tr */}
                            </thead>{/* thead */}
                            <tbody>  
                            {oproduct.map((itm,k)=>(
                                < tr key={k}>                               
                                    <td className="">{k+1}</td>
                                    <td className="">{itm.product[0].title}</td>
                                    <td className="" >{itm.created_date.split('T')[0]}</td>
                                    {/* <td className="">4</td>            */}
                                           
                                </tr>
                                ))}                         
                            </tbody>{/* end tbody */}
                        </table>{/* end table */}                       
                        </div>
                        </div>    
                    </div>
                    </div>
                    </div>
                    </div>
                    </Dropdown.Menu>           
                    </Dropdown></td>
                    <td><Icon onClick={()=>submitdeletecategory(itm.id)} className='btn p-0' icon="fluent:delete-24-regular" width="30" height="25 " /></td>
                </tr>
              ))}  
            </tbody>
            </table>
          </div>
          </div>          
      </div>
      </div>
  </div>  
  </div>

</div>
  )
}
