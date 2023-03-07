import axios from 'axios'
import React, { useContext, useEffect,useRef, useState } from 'react'
import Adminlogout from './Adminlogout'
import Adminslider from './Adminslider';
import { Icon } from '@iconify/react';
import Dropdown from 'react-bootstrap/Dropdown';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Test from './Adminexportexcel';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { Simplecontext } from './Simplecontext';
import Callaxios from './Callaxios';
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { BaseURL, imageURL } from './Url';

export default function Adminorder() {
  const {accesscheck} =useContext(Simplecontext)
  const [filterstatus,setfilterstatus]=useState([]);
  const [orderdata,setorderdata]=useState([]);
  const [ordersearchdata,setordersearchdata]=useState([]);
  const [filter,setfilter]=useState(1);
  const [citydata,setcitydata]=useState([]);
  const [searchvalue,setsearchvalue]=useState();
  const tableRef = useRef(null);
  const [modalvalue,setmodalvalue]=useState(false)
  const [productdata,setproductdata]=useState([]);
  const [product,setproduct]=useState()
  const [quantity,setquantity]=useState()
  const [name,setname]=useState()
  const [address,setaddress]=useState()
  const [city,setcity]=useState()
  const [mobile,setmobile]=useState()
  const [filteredproduct,setfilteredproduct]=useState();
  const [detailmodal,setdetailmodal]=useState(false);
  const [productitm,setproductitm]=useState()
  const arr = new Array(10).fill(0)
  const componentRef = useRef();
  const handlePrint = () => {
    const originalContents = document.body.innerHTML;
    const printContents = componentRef.current.innerHTML;
    document.body.innerHTML = printContents;
    // print the component
    window.print();

    // restore the original page contents
    document.body.innerHTML = originalContents;
    setTimeout(function() {
      window.location.reload();
    }, 1000);

  };
  // console.log("mobile",mobile)
  const notify = () => toast.success('✅ Deleted Successfully!', {
    position: "top-center",
    });
  const notifyadd = (msg) => toast.success(msg, {
    position: "top-center",
    });
  const statusnotify = () => toast.success('✅ Status Updated Successfully!', {
    position: "top-center",
    });
    const notifyerror = (msg) => toast.error(msg, {
      position: "top-center",
      });

  useEffect(() => {
    status()
    orders()
    accesscheck()
    // orderproduct()
   
  }, [])
  const status = async() =>{
    try{
      accesscheck()
      let data = await Callaxios("get","product/status/")
      if (data.status===200){
        setfilterstatus(data.data)
        setfilter([])
      }else{
        notifyerror("Something went wrong")
      }
      
    }
    catch (error) {
      console.log(error)
    } 
  }
  const orders =async()=>{
    accesscheck()
    try{
      let data = await Callaxios("get","product/order/")
      // console.log("data",data.data)
      if (data.status===200){
        setorderdata(data.data)
        setordersearchdata(data.data)
      }
     
    }
    catch (error) {
      console.log(error)
    }
  }
  const postorder=async(e)=>{
    accesscheck()
    e.preventDefault();
    try {
      // console.log("product",productdata)
      
      
      let datalist
      let msg
      if(productitm.id){
        datalist = {
          id:productitm.id,
          product :product,
          customer_name :name,
          delivery_address:address, 
          city:city,
          contact:mobile,
        
        }
        msg ="Updated Successfully"
      }else{
        
        let datap = productdata.filter(t=>t.id===parseInt(product)  )
        let price = quantity.split('-')[1]
        let vat = datap[0]?.vat.toString()??""
        let deliverycharge = datap[0]?.delivery_charge??""
        let vatprice =vat?parseInt(price*0.05):0 
        
       datalist = {
        product :product,
        customer_name :name,
        delivery_address:address,
        quantity:quantity.split('-')[0],
        city:city,
        contact:mobile,
        purchasestatus:"new",
        price: price,
        delivery_charge:deliverycharge,
        // total:price+deliverycharge+vatprice
      }
      msg ="Saved Successfully"
      }
      
      let data = await Callaxios("post","product/order/",datalist)
      // console.log("datapost",data)
      if(data.data.Status===200){
        notifyadd(msg)
        setmodalvalue(!modalvalue)
        orders()
        setallnull()
      }else{
        notifyerror("Something Went Wrong ")
      }
    } catch (error) {
      console.log(error)
    }
  }
  const Getproduct =async()=>{
    try {
      let data = await Callaxios("get","product/product/")
      if (data.status===200){
        setproductdata(data.data)
      }
    } catch (error) {
      
    }
  }
  
  const deleteproduct =async(id)=>{
    // console.log("k",k)
    // console.log("id",id)
      accesscheck()
      let data = await Callaxios("delete","product/order/",{"id":id})
      if (data.data.Status===200){
        notify()       
        orders()
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

    const changestatus=async(itmid,statusname)=>{
      accesscheck()
      let list = { "id":itmid,
        "purchasestatus":statusname
        }
      
      try {
        let data = await Callaxios("post","product/order/",list)
       
        if (data.data.Status===200){
          orders()
          statusnotify()
        }
        else{console.log(data.data.Message)
          notifyerror("Something Went Wrong")
        }
      } catch (error) {
        console.log(error)
      }
     

      
    }
    const filterfunction=()=>{
      // console.log("sdfdfsd",searchvalue)
      if (searchvalue){
      let searchid=searchvalue.split('Z')[1]
        let fvalue = orderdata.filter(t=>parseInt(t.id) === parseInt(searchid))
        setordersearchdata(fvalue)
      }
      else{setordersearchdata(orderdata)}
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
    setproductitm('')
    setproduct('')
    setquantity('')
    setaddress('')
    setcity('')
    setmobile('')
    setname('')
  }
  const productedithandler=(itm)=>{
    // console.log("contac",itm)
    setproductitm(itm)
    setproduct(itm.product[0].id)
    setquantity(itm.quantity)
    setaddress(itm.delivery_address)
    setcity(itm.city)
    setmobile(itm.contact)
    setname(itm.customer_name)
  }
  const filterproduct =(id)=>{
    
    const productvalue = productdata.filter(t=>t.id===parseInt(id))[0]
    // console.log("productvalue",productvalue.price_list?"data":"none")
    setfilteredproduct(productvalue)
  }
  const saveproducthandler=async()=>{
    accesscheck()
    console.log("productitm",productitm)
    try {
      let datalist =Object.assign({}, productitm);
      delete datalist['product']
      delete datalist['status']
      // console.log("datalist",datalist)
      let data = await Callaxios("post","product/order/",datalist) 
      // console.log("data",data)
      if(data.data.Status===200){
        notifyadd("Saved Successfully")
        orders()
      }else{
        notifyerror("Something went wrong")
      }
    } catch (error) {
      notifyerror("Something went wrong")
    }
  }
  // console.log("dtaquannit",quantity)
  return (
    <div >
    <Adminslider/>
    
  <div className=" vh-100 overflow-auto"  style={{backgroundColor:"#c3d5d5"}}>
  <Adminlogout/>
  <ToastContainer />
  <div className="col-12 row " >
      <div className='col-md-2 col-1'>
      </div>
      <div className='col-md-10 col-11'>
      <div className='pt-0 ps-md-0' >
          <div className=' vh-100 bg-white  shadow-lg overflow-auto' style={{width:"100%",borderRadius:".80rem"}}>
          <div className='d-flex pt-2' style={{color:"rgb(245, 189, 7)"}}>
          <Icon icon="icon-park-twotone:order" width="40" height="23" /> <p className='fw-bolder'> Orders</p>
          </div>
         
          {/* filterstart */}
          <div className="filter-sort- d-flex   flex-wrap justify-content-center">
            <div className="filter-sorting justify-content-end">
              <div className="collection-sorting position-relative ">
                <div className="sorting-header  d-flex align-items-center justify-content-end">
                  <span className="sorting-title me-2"><b>Sort by:</b></span>
                  <span className="active-sorting" style={filter.length!==0 ? {backgroundColor:filter.color,color:"white",padding:"3px",borderRadius:"3px"} :null}>{filter.length!==0 ? filter.status :<b>All</b>}</span>
                  <span className="sorting-icon">
                    <svg className="icon icon-down" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </div>
                <ul className="sorting-lists list-unstyled md-10 w-auto text-center">
                  <li  className="text_14" style={{backgroundColor:"white",padding:"4px",borderRadius:"3px"}} onClick={()=>setfilter([])}> All </li>
                  {filterstatus.map((itm,k)=>(
                      <li onClick={()=>setfilter(itm)} key={k}><span  style={{backgroundColor:itm.color,padding:"4px",borderRadius:"3px",color:"white",fontWeight:"500"}} className="text_14">{itm.status}</span></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          {/* filterend? */}
          {/* search start */}
         <div className='row col-12'>
            <div className='d-flex col-8 col-md-6 p-2 ps-4'>
              <div className=' d-flex w-100  border ps-1 rounded'>
              <i className='pt-1' ><Icon icon="ant-design:search-outlined" width="20" height="20" /></i>
            <input type="Name" id="typeEmailX" placeholder='Search Order by SN no' onChange={(e)=>setsearchvalue(e.target.value)}  className="form-control border-0 form-control-sm " />
            <button className='btn-sm btn-warning  ' onClick={filterfunction} ><Icon icon="ant-design:search-outlined" width="20" height="20" /></button>
            </div>
            
            </div>
            <div className='col-4 col-md-6 p-2 '>
              {/* <button onClick={()=>setmodalvalue(!modalvalue)} className='btn-sm btn-info text-white float-end'>Add New</button> */}
              {/* excel export button start */}
              <DownloadTableExcel
                    filename="Order table"
                    sheet="Orders"
                    currentTableRef={tableRef.current}
                >
                <div className='ps-4 '>
                <button  className='btn-sm btn-danger text-white float-end'  > Export to excel </button>
                </div>
              </DownloadTableExcel>
              {/* excel export button end */}
                </div>
                <div className=''>
                  <button onClick={()=>setmodalvalue(!modalvalue) & Getproduct() & Getcity()} className='btn-sm btn-info text-white float-end'>Add New</button>
                </div>
          </div>
          
          <div className='container pt-md-2 pt-2'>
          <table className="table table-bordered   overflow-auto">
            <thead className='text-center '>
                <tr>
                <th scope="col">#</th>
                <th scope="col ">SN.No</th>
                <th scope="col">Product</th>
                <th scope="col">Customer</th>
                <th scope="col">Contact</th>
                {/* <th scope="col">quantity</th> */}
                
                {/* <th scope="col">Price</th> */}
                {/* <th scope="col">Address</th> */}
                <th scope="col">city</th>
                <th scope="col">Status</th>
                <th scope="col">Date</th>
                
                {/* <th scope="col">Save</th> */}
                <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody className='text-center'>
              {(filter.length===0 ? ordersearchdata :ordersearchdata.filter(t=>parseInt(t.status[0].id) === parseInt(filter.id))) .map((itm,k)=>(
                <tr key={k} className="">
                <th scope="row">{k+1}</th>
                <td   style={{cursor: "pointer"}} onClick={()=>setdetailmodal(!detailmodal) & setproductitm(itm)} >SN{itm.created_date.split('T')[1].split('.')[1]}{itm.id}</td>
                <td className='flex text-start'>
                  {itm.product?itm.product[0].title:""}<br/>
                  <img className='rounded  ' style={{width:"50px"}} src={itm.product?itm.product[0].images[0] ?imageURL+itm.product[0].images[0].image :null:null} alt="product" />
                  </td>
                <td>{itm.customer_name}</td>
                <td>{itm.contact}</td>
                {/* <td>{itm.quantity}</td> */}
                
                {/* <td>{itm.total}</td> */}
                {/* <td>{itm.delivery_address}</td> */}
                <td>{itm.city}</td>
                <td className='pt-3 '>
                  <div>
                  <span className='font-bold' style={{backgroundColor:itm.status[0].color,padding:"5px",borderRadius:"4px",color:"white",fontWeight:"500"}}>{itm.status[0].status}</span>
                  </div><br/>
                  <div>
                  <select defaultValue={''}  onChange={(e)=>changestatus(itm.id,e.target.value)} >
                        {filterstatus ? <>
                          <option value={''} hidden>change status</option>

                            {filterstatus.map((item,k)=>(
                            <option  key={k} value={item.status} style={{backgroundColor:item.color,padding:"4px",borderRadius:"3px"}} >{item.status}</option>
                          ))}
                        </>:null}
                        </select>
                  </div>
                 
                  </td>
                  
                  <td >{(itm.created_date).split('T')[0]}</td>
                  
                    {/* <td> <Icon className='btn p-0' icon="fluent:save-16-regular" width="30" height="30" /></td> */}
                    <td>
                      <button onClick={()=>productedithandler(itm) & setmodalvalue(!modalvalue) & Getproduct() & Getcity()} className='h-auto w-auto rounded text-white p-1 bg-warning mr-1 mb-1' ><Icon icon="clarity:note-edit-line" width="20" height="20" /> Edit</button><br/>
                      <button onClick={()=>submitdeletecategory(itm.id)} className='h-auto w-auto rounded text-white p-1 bg-danger ' ><Icon icon="fluent:delete-24-regular" width="20" height="20" /> Delete</button>
                      {/* <Icon onClick={()=>submitdeletecategory(itm.id)} className='btn p-0' icon="fluent:delete-24-regular" width="30" height="25 " /></td> */}
                      </td>
                    
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
  {/* excelexport table startrs */}
  <table  ref={tableRef} hidden>
                  <tbody>
                    <tr>
                    <th scope="col">SN.No</th>
                    <th scope="col">Products</th>
                    <th scope="col">Size</th>
                    <th scope="col">Color</th>
                    <th scope="col">Customer</th>
                    <th scope="col">Contact</th> 
                    <th scope="col">quantity</th>
                    <th scope="col">Price</th>
                    <th scope="col">Shipping</th>
                    <th scope="col">Vat</th>
                    <th scope="col">Total</th>
                    <th scope="col">Address</th>
                    <th scope="col">city</th>
                    <th scope="col">Status</th>
                    <th scope="col">Date</th>
                    
                    </tr>
                    {(filter.length===0 ? ordersearchdata :ordersearchdata.filter(t=>parseInt(t.status[0].id) === parseInt(filter.id))) .map((itm,k)=>(
                        <tr key={k}>
                           
                            <td>SN{itm.created_date.split('T')[1].split('.')[1]}{itm.id}</td>
                            <td>{itm.product?itm.product[0].title:""} </td>
                            <td>{itm.size}</td>
                            <td>{itm.color}</td>                           
                            <td>{itm. customer_name}</td>
                            <td>{itm.contact}</td> 
                            <td>{itm.quantity}</td>
                            <td>{itm.price}</td>
                            <td>{itm.delivery_charge}</td>
                            <td>{itm.product?itm.product[0].vat?(itm.price*0.05).toFixed(2):0:0}</td>
                            <td>{itm.delivery_address}</td>
                            <td>{itm.city}</td>
                            <td >{itm.status[0].status}</td>
                            <td>{itm.created_date.split('T')[0]}</td>
                            
                        </tr>
                    ))}
                   
                    
                  </tbody>
                </table>
                
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
                <form  onSubmit={(e)=>postorder(e)} >
             
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
                            <select required onChange={(e)=>setproduct(e.target.value) & filterproduct(e.target.value)} value={product} className='form-control w-full'>
                              <option value='' hidden >Select Product</option>
                              {productdata ? productdata.map((pitm,pk)=>(
                                <option key={pk} value={pitm.id}>{pitm.title}</option>
                              )) :null}
                            </select>
                            {/* <input type="text" required className="form-control"   placeholder="Category Name" /> */}
                            {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                        </div>
                    </div>
                    </div>
                   
                    
                  <div className="col-lg-6 col-md-12 col-12" style={productitm?productitm.id?{display:"none"}:{display:'block'}:{}}>
                        <div className='container'>                    
                        <div className="form-group pt-2 ">
                            <label htmlFor="exampleInputEmail1"><b>Quantity<span className='text-danger'>*</span></b></label>
                            <select  onChange={(e)=>setquantity(e.target.value)}   value={quantity} className='form-control w-full'>
                              <option value='' hidden >Select quantity</option>
                              {filteredproduct? filteredproduct.price_list?filteredproduct.price_list.split(',').map((pitm,pk)=>(
                                <option key={pk} value={pitm}>{pitm} AED</option>
                              )):Array(10).fill(0).map((itm,k)=>(
                                <option key={k} value= {`${ k+1 + "-" + (filteredproduct.price)*(k+1)}`}  >{`${ k+1 + "-" + (filteredproduct.price)*(k+1)}`} AED</option>
                              ))
                               :null}
                            </select>
                            {/* <input type="number" required onChange={(e)=>setquantity(e.target.value)} value={quantity} className="form-control"  placeholder="Enter Quantity" /> */}
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
            <div className="modal fade show" tabIndex={-1} id="quickview-modal" aria-modal="true" role="dialog" style={detailmodal ? {display: 'block', paddingLeft: "20%",paddingRight:"2%"}:{display:"none"}}>
            <div className="modal-dialog modal-dialog-centered modal-xxl w-md-50">
                <div className="modal-content">
                <div className="modal-header border-0 pb-0">
                <div className='d-flex pt-0 ' style={{color:"rgb(245, 189, 7)"}}>
            <p className='fw-bolder ps-2'>Order Details</p> 
            </div>
                    <button  onClick={()=>setdetailmodal(!detailmodal)&setproductitm('')} type="button" className="btn-close" data-bs-dismiss="modal"  aria-label="Close" />
                </div>
                {/* {idproduct.map((itm,k)=>( */}
                <div  className="modal-body  ">
                  <div className='text-end'>
                  <button onClick={handlePrint} className='h-auto w-auto rounded text-white p-1 bg-danger ' ><Icon icon="material-symbols:print-outline-rounded" width="20" height="20" /> Print</button>
                  </div>
                  <div  ref={componentRef} className="print-section">
                  <div>
                    <b>OrderNo / Date : </b><span> SN{productitm?productitm.created_date.split('T')[1].split('.')[1] +productitm.id:null} / {productitm?productitm.created_date.split('T')[0]:null} </span><b></b><br/>
                    <b>Customer : </b><span> {productitm?productitm.customer_name:null}</span><br/>
                    <b>Address : </b><span> {productitm?productitm.delivery_address:null}</span><br/>
                  </div>
               <table className="border-collapse border border-slate-500 ... w-100">
                <thead>
                  <tr className='text-center'>
                    <th className="border border-slate-600 ... text-start p-2">Product</th>
                    <th className="border border-slate-600 ...  p-2">Color</th>
                    <th className="border border-slate-600 ...  p-2">Size</th>
                    <th className="border border-slate-600 ...p-2">U_Price</th>
                    <th className="border border-slate-600 ...p-2">Quantity</th>
                    <th className="border border-slate-600 ...p-2">Delivery</th>
                    <th className="border border-slate-600 ...p-2">VAT</th>
                    
                    <th className="border border-slate-600 ...p-2">Total</th>
                    <th className="border border-slate-600 ...p-2 print-only">Action</th>
                  </tr>
                </thead>
                  <tbody>
                    <tr className='text-center'>
                      <td className="border border-slate-700 ... text-start p-2">{productitm?productitm.product[0].title:null}<br/>
                      <img className='rounded  ' style={{width:"50px"}} src={productitm ? productitm.product[0].images[0] ?imageURL+productitm.product[0].images[0].image :null:null} alt="product" />
                      </td>
                      <td className="border border-slate-700 ..."><input type="text"  className='inputclass_order' onChange={(e)=>setproductitm({ ...productitm, color:e.target.value })} value={productitm?(productitm.color===null?"":productitm.color):""} placeholder="color"></input></td>
                      <td className="border border-slate-700 ..."><input type="number" className='inputclass_order' onChange={(e)=>setproductitm({ ...productitm, size:e.target.value })} value={productitm?(productitm.size===0?"":productitm.size):""} placeholder="size"></input></td>
                      <td className="border border-slate-700 ..."><input type="number" className='inputclass_order' onChange={(e)=>setproductitm({ ...productitm, price:e.target.value })} value={productitm?(productitm.price):""}></input></td>
                      <td className="border border-slate-700 ..."><input type="number" className='inputclass_order' onChange={(e)=>setproductitm({ ...productitm, quantity:e.target.value })} value={productitm?(productitm.quantity):""}></input></td>
                      <td className="border border-slate-700 ..."><input type="number" className='inputclass_order' onChange={(e)=>setproductitm({ ...productitm, delivery_charge:e.target.value })} value={productitm?(productitm.delivery_charge):""}></input></td>
                      <td className="border border-slate-700 ...">{productitm?productitm.product[0].vat?(productitm.price*0.05).toFixed(2):0:null}</td>
                      
                      <td className="border border-slate-700 ...">{productitm?productitm.price*productitm.quantity:null}</td>
                      <td className="border border-slate-700 ... print-only"><button onClick={()=>saveproducthandler()} className='h-auto w-auto rounded text-white p-1 bg-warning ' ><Icon icon="material-symbols:save-as-outline" width="20" height="20" /> Save</button></td>
                    </tr>
                    <tr  >
                      <td colSpan={3} className="border border-slate-700 ... p-2">Delivery Note : </td>
                      <td colSpan={6} className="border border-slate-700 ..."></td>
                    </tr>
                    <tr  >
                      <td colSpan={3} className="border border-slate-700 ... p-2">Price: </td>
                      <td colSpan={6} className="border border-slate-700 ... p-2">{productitm?productitm.price*productitm.quantity:null}</td>
                    </tr>
                    <tr  >
                      <td colSpan={3} className="border border-slate-700 ... p-2">Shipping Fee: </td>
                      <td colSpan={6} className="border border-slate-700 ... p-2">{productitm?productitm.delivery_charge:null}</td>
                    </tr>
                    <tr  >
                      <td colSpan={3} className="border border-slate-700 ... p-2">VAT: </td>
                      <td colSpan={6} className="border border-slate-700 ... p-2">{productitm?productitm.product[0].vat?(productitm.price*0.05).toFixed(2):0:null}</td>
                    </tr>
                    <tr  >
                      <td colSpan={3} className="border border-slate-700 ... p-2">Total: </td>
                      <td colSpan={6} className="border border-slate-700 ... p-2">{productitm ? parseFloat(parseFloat(productitm.price*productitm.quantity)+parseFloat(productitm.delivery_charge?productitm.delivery_charge:0)+parseFloat(productitm.product[0].vat?productitm.price*parseFloat(0.05):0)).toFixed()  :null}</td>
                    </tr>
                    
                  </tbody>
                </table>
                </div>

                </div>
                {/* ))} */}
                </div>
            </div>
            </div> 
</div>
  )
}
