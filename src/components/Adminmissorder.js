// import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Adminlogout from './Adminlogout'
import Adminslider from './Adminslider'
import { Icon } from '@iconify/react';
// import Dropdown from 'react-bootstrap/Dropdown';
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
  const [citydata,setcitydata]=useState([]);
  const [orderitm,setorderitm]=useState()
  const [modalvalue,setmodalvalue]=useState(false)
  const [name,setname]=useState()
  const [address,setaddress]=useState()
  const [city,setcity]=useState()
  const [mobile,setmobile]=useState()
  const [product,setproduct]=useState()
  // var token = window.localStorage.getItem('access_token')

  useEffect(() => {
    window.scrollTo(0, 0);
    missorders()
    accesscheck()
  }, [])
  const notifyerror = (msg) => toast.error(msg, {
    position: "top-center",
    });
    const notifyadd = (msg) => toast.success(msg, {
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
  // const orderproduct =async(orderid)=>{
  //   // console.log("ordreid",orderid)
  //   accesscheck()
  //   try{
  //     let data = await Callaxios("get","product/missingorderproduct/")
  //     //  axios.get("http://127.0.0.1:8000/product/missingorderproduct/",{headers:{"Authorization" : `Bearer ${token}`},params:{"missorder_id":orderid}})
  //     console.log("data",data.data)
  //     setoproducts(data.data)
  //   }
  //   catch (error) {
  //     console.log(error)
  //   }
  // }
  const Getproduct =async()=>{
    try {
      let data = await Callaxios("get","product/product/")
      if (data.status===200){
        setoproducts(data.data)
      }
    } catch (error) {
      
    }
  }
  const Getcity=async()=>{
    try {
      let data =await Callaxios("get","product/city/")
      // console.log("datacity",data)
      if (data.status===200){
        setcitydata(data.data)
      }
    } catch (error) {
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
  const setallnull=()=>{
    setorderitm('')
  }
  const editvaluehandler=(itm)=>{
    // console.log("itm",itm)
    setname(itm.customer_name)
    setaddress('')
    setcity(itm.city)
    setproduct(itm.product[0].id)
    setmobile(itm.contact)
  }
  const postorder=async(e)=>{
    accesscheck()
    e.preventDefault();
    try {
        // console.log("daaorder",orderitm)
        let datap = orderitm.product[0]
        // console.log("data[p",datap)
        let price = orderitm.product[0].price_list?orderitm.product[0].price_list.split(',')[0]:0
        // let vat = datap[0]?.vat.toString()??""
        let deliverycharge = datap?.delivery_charge??""
        // let vatprice =vat?parseInt(price*0.05):0 
        // console.log("deliverycharge",price)
       let datalist = {
        product :product,
        customer_name :name,
        delivery_address:address,
        quantity:price.split('-')[0],
        city:city,
        contact:mobile,
        purchasestatus:"new",
        price: price.split('-')[1],
        delivery_charge:deliverycharge,
        // total:price+deliverycharge+vatprice
      }
     
      
      
      let data = await Callaxios("post","product/order/",datalist)
      // console.log("datapost",data)
      if(data.data.Status===200){
        notifyadd("Saved Successfully")
        setmodalvalue(!modalvalue)
        missorders()
        setallnull()
        deleteproduct(orderitm.id)
        
        
      }else{
        notifyerror("Something Went Wrong ")
      }
    } catch (error) {
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
      <div className='col-md-2 col-1'>
      </div>
      <div className='col-md-10 col-11'>
      
      <div className='pt-0 ps-md-0' >
          <div className=' vh-100 bg-white  shadow-lg overflow-auto' style={{width:"100%",borderRadius:".80rem"}}>
         
          <div className='container pt-md-0 pt-0'>
          <div className='d-flex pt-2' style={{color:"rgb(245, 189, 7)"}}>
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
              {orderdata.length? orderdata.map((itm,k)=>(
                <tr key={k}>
                <th scope="row">{k+1}</th>
                <td>{itm.customer_name}</td>
                <td>{itm.contact}</td>
                <td>{itm.city}</td>
                <td>{itm.created_date.split('T')[0]}</td>
                <td className=''style={{width:"0"}} >{itm.product?itm.product[0].title:""}
                  
                    </td>
                    <td>
                      {/* <Icon onClick={()=>submitdeletecategory(itm.id)} className='btn p-0' icon="fluent:delete-24-regular" width="30" height="25 " /> */}
                      <button  onClick={()=>setorderitm(itm) & setmodalvalue(!modalvalue) & Getcity() & Getproduct() & editvaluehandler(itm)} className='h-auto w-auto rounded text-white p-1 bg-warning mr-1 mb-1' ><Icon icon="clarity:note-edit-line" width="20" height="20" />Save to Order</button><br/>
                      <button  onClick={()=>submitdeletecategory(itm.id)} className='h-auto w-auto rounded text-white p-1 bg-danger ' ><Icon icon="fluent:delete-24-regular" width="20" height="20" /> Delete</button>
                      </td>
                </tr>
              )):<tr><td colSpan={7}><p>No Data Found</p></td></tr>}  
            </tbody>
            </table>
          </div>
          </div>          
      </div>
      </div>
  </div>  
  <div className="modal fade show"  tabIndex={-1} id="quickview-modal" aria-modal="true" role="dialog" style={modalvalue ? {display: 'block', paddingLeft: "20%",paddingRight:"2%"}:{display:'none'}}>
            <div className="modal-dialog modal-dialog-centered modal-xl w-md-50">
                <div className="modal-content">
                <div className="modal-header border-0">
                <div className='d-flex pt-3' style={{color:"rgb(245, 189, 7)"}}>
            <p className='fw-bolder ps-4'>Add Order</p> 
            </div>
                    <button onClick={()=>setmodalvalue(!modalvalue)& setallnull()}  type="button" className="btn-close" data-bs-dismiss="modal"  aria-label="Close" />
                </div>
                {/* {idproduct.map((itm,k)=>( */}
                <div  className="modal-body">
                <form onSubmit={(e)=>postorder(e)} >
             
                <div className="row col-12">
                <div className="col-lg-6 col-md-12 col-12">
                        <div className='container'>                    
                        <div className="form-group pt-2 ">
                            <label htmlFor="exampleInputmobile"><b>Name</b></label>
                            <input type="text" required onChange={(e)=>setname(e.target.value) }  value={name} className="form-control"   placeholder="Enter Name" />
                            {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                        </div>     
                        </div>
                        </div>
                        <div className="col-lg-6 col-md-12 col-12">
                        <div className='container'>                    
                        <div className="form-group pt-2 ">
                            <label htmlFor="exampleInputmobile"><b>Mobile</b></label>
                            <input type="tel" required onChange={(e)=>setmobile(e.target.value)} value={mobile} className="form-control"   placeholder="Enter Mobile +971..." />
                            {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                        </div>     
                        </div>
                        </div>
                        <div className="col-lg-6 col-md-12 col-12">
                        <div className='container'>                    
                        <div className="form-group pt-2 ">
                            <label htmlFor="exampleInputEmail1"><b>Address</b></label>
                            <input type="text" required onChange={(e)=>setaddress(e.target.value)} value={address}  className="form-control"    placeholder="Enter Address" />
                            {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                        </div>     
                        </div>
                        </div>
                 
                       
                     
                        <div className="col-lg-6 col-md-12 col-12">
                        <div className='container'>                    
                        <div className="form-group pt-2 ">
                            <label htmlFor="exampleInputEmail1"><b>city</b></label>
                            <select required onChange={(e)=>setcity(e.target.value)} value={city} className='form-control w-full'>
                              <option value='' hidden >Select City</option>
                              {citydata ? citydata.map((citm,ck)=>(
                                <option key={ck} value={citm.city_name}>{citm.city_name}</option>
                              )) :null}
                            </select>
                            {/* <input type="text" required className="form-control"   placeholder="Enter city" /> */}
                            {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                        </div>     
                        </div>
                        </div>
                  <div className="col-lg-6 col-md-12 col-12" >
                        <div className='container'>                    
                        <div className="form-group pt-2 ">
                            <label htmlFor="exampleInputEmail1"><b>product<span className='text-danger'>*</span></b></label>
                            <select required onChange={(e)=>setproduct(e.target.value) } value={product} className='form-control w-full'>
                              <option value='' hidden >Select Product</option>
                              {oproduct ? oproduct.map((pitm,pk)=>(
                                <option key={pk} value={pitm.id}>{pitm.title}</option>
                              )) :null}
                            </select>
                            {/* <input type="text" required className="form-control"   placeholder="Category Name" /> */}
                            {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                        </div>
                    </div>
                    </div>
                   
                    
                  
                      
                        </div>
                    <div className='p-5 float-end d-flex justify-content-between'> 
                    <div className=''>
                    <button onClick={()=>setmodalvalue(!modalvalue) & setallnull()}  type='button'  className="btn btn-danger ">close</button>
                    </div>
                    <div className='ps-3'>
                    <button type="submit" className="btn btn-success  ">Save</button>
                    </div>
                    </div>
                    </form>
                </div>
                {/* ))} */}
                </div>
            </div>
            </div>
  </div>

</div>
  )
}
