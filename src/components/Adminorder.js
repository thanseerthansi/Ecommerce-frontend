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
  const arr = new Array(10).fill(0)
  // console.log("statusvalue",statusvalue)
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
      // let price = productdata.filter(t=>t.id===parseInt(product)  )
      // let productprice = price[0]?.price??""
      // console.log("price",productprice)
      const datalist = {
        product :product,
        customer_name :name,
        delivery_address:address,
        quantity:quantity.split('-')[0],
        city:city,
        contact:mobile,
        purchasestatus:"new",
        total:quantity.split('-')[1]
      }
      let data = await Callaxios("post","product/order/",datalist)
      console.log("datapost",data)
      if(data.data.Status===200){
        notifyadd("Added Successfully")
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
    setproduct('')
    setquantity('')
    setaddress('')
    setcity('')
    setmobile('')
    setname('')
  }

  const filterproduct =(id)=>{
    
    const productvalue = productdata.filter(t=>t.id===parseInt(id))[0]
    // console.log("productvalue",productvalue.price_list?"data":"none")
    setfilteredproduct(productvalue)
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
                      <li onClick={()=>setfilter(itm)} key={k}><span  style={{backgroundColor:itm.color,padding:"4px",borderRadius:"3px"}} className="text_14">{itm.status}</span></li>
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
          <table className="table table-bordered vh-100  overflow-auto">
            <thead className='text-center '>
                <tr>
                <th scope="col">#</th>
                <th scope="col ">SN.No</th>
                <th scope="col">Customer</th>
                <th scope="col">Contact</th>
                <th scope="col">quantity</th>
                <th scope="col">Product</th>
                <th scope="col">Price</th>
                <th scope="col">Address</th>
                <th scope="col">city</th>
                <th scope="col">Status</th>
                <th scope="col">Date</th>
                
                {/* <th scope="col">Save</th> */}
                <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody className='text-center'>
              {(filter.length===0 ? ordersearchdata :ordersearchdata.filter(t=>parseInt(t.status[0].id) === parseInt(filter.id))) .map((itm,k)=>(
                <tr key={k}>
                <th scope="row">{k+1}</th>
                <td>SN{itm.created_date.split('T')[1].split('.')[1]}{itm.id}</td>
                <td>{itm.customer_name}</td>
                <td>{itm.contact}</td>
                <td>{itm.quantity}</td>
                <td  >{itm.product?itm.product[0].title:""}</td>
                <td>{itm.total}</td>
                <td>{itm.delivery_address}</td>
                <td>{itm.city}</td>
                <td className='pt-3 '>
                  <div>
                  <span style={{backgroundColor:itm.status[0].color,padding:"5px",borderRadius:"4px"}}>{itm.status[0].status}</span>
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
                  
                  <td>{Date(itm.created_date).split('+')[0]}</td>
                  
                    {/* <td> <Icon className='btn p-0' icon="fluent:save-16-regular" width="30" height="30" /></td> */}
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
  {/* excelexport table startrs */}
  <table  ref={tableRef} hidden>
                  <tbody>
                    <tr>
                    <th scope="col">SN.No</th>
                    <th scope="col">Customer</th>
                    <th scope="col">Contact</th>
                    <th scope="col">Products</th>
                    <th scope="col">quantity</th>
                    <th scope="col">Price</th>
                    <th scope="col">Address</th>
                    <th scope="col">city</th>
                    <th scope="col">Status</th>
                    <th scope="col">Date</th>
                    
                    </tr>
                    {(filter.length===0 ? ordersearchdata :ordersearchdata.filter(t=>parseInt(t.status[0].id) === parseInt(filter.id))) .map((itm,k)=>(
                        <tr key={k}>
                           
                            <td>SN{itm.created_date.split('T')[1].split('.')[1]}{itm.id}</td>
                            <td>{itm. customer_name}</td>
                            <td>{itm.contact}</td>
                            <td>{itm.product?itm.product.title:""} </td>
                            <td>{itm.quantity}</td>
                            <td>{itm.total}</td>
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
                    
                  <div className="col-lg-6 col-md-12 col-12">
                        <div className='container'>                    
                        <div className="form-group pt-2 ">
                            <label htmlFor="exampleInputEmail1"><b>Quantity<span className='text-danger'>*</span></b></label>
                            <select required onChange={(e)=>setquantity(e.target.value)}   value={quantity} className='form-control w-full'>
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
                    
                        <div className="col-6">
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
                            <input type="number" required onChange={(e)=>setmobile(e.target.value)} value={mobile} className="form-control"   placeholder="Enter Mobile" />
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
                        </div></div>
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
  )
}
