import axios from 'axios'
import React, { useEffect,useRef, useState } from 'react'
import Adminlogout from './Adminlogout'
import Adminslider from './Adminslider';
import { Icon } from '@iconify/react';
import Dropdown from 'react-bootstrap/Dropdown';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Test from './Adminexportexcel';
import { DownloadTableExcel } from 'react-export-table-to-excel';
export default function Adminorder() {
  const [filterstatus,setfilterstatus]=useState([]);
  const [orderdata,setorderdata]=useState([]);
  const [ordersearchdata,setordersearchdata]=useState([]);
  const [filter,setfilter]=useState(1);
  const [oproduct,setoproducts]=useState([]);
  const [searchvalue,setsearchvalue]=useState();
  const tableRef = useRef(null);
  // const [editorder,seteditorder]=useState([]);
  // const [statusvalue,setstatusvalue]=useState();

  // console.log("statusvalue",statusvalue)
  const notify = () => toast.success('✅ Deleted Successfully!', {
    position: "top-center",
    });
  const statusnotify = () => toast.success('✅ Status Updated Successfully!', {
    position: "top-center",
    });
  var token = window.localStorage.getItem('access_token')
  // console.log("token",token)
  useEffect(() => {
    status()
    orders()
    orderproduct()
   
  }, [])
  const status = async() =>{
    try{
      let data = await axios.get("http://127.0.0.1:8000/product/status/",{headers:{"Authorization" : `Bearer ${token}`}})
      // console.log(data.data)
      setfilterstatus(data.data)
      setfilter([])
    }
    catch (error) {
      console.log(error)
    } 
  }
  const orders =async()=>{
    try{
      let data = await axios.get("http://127.0.0.1:8000/product/order/",{headers:{"Authorization" : `Bearer ${token}`}})
      // console.log("data",data.data)
      setorderdata(data.data)
      setordersearchdata(data.data)
    }
    catch (error) {
      console.log(error)
    }
  }
  const orderproduct =async()=>{
    // console.log("ordreid",orderid)
    try{
      let data = await axios.get("http://127.0.0.1:8000/product/ordererproduct/",{headers:{"Authorization" : `Bearer ${token}`}})
      // console.log("data",data.data)
      setoproducts(data.data)
    }
    catch (error) {
      console.log(error)
    }
  }
 
  const deleteproduct =(k,id)=>{
    // console.log("k",k)
    // console.log("id",id)

     axios({
      method: 'delete',
      url: 'http://127.0.0.1:8000/product/order/',
      headers:{"Authorization" : `Bearer ${token}`},
      data:{"id":id},

    }).then(response => {
      if (response.data.Status===200){
        // console.log("data",response.data)
        const splc = orderdata
        // console.log("array",splc[k])
        splc.splice(k,1)
        setorderdata(() => [ ...splc]);
        notify()
      }else{console.log(response.data.Message)}
      })
      .catch(err => console.warn("error",err));   
      };
    const changestatus=async(itmid,statusname)=>{
      // console.log("itm",itmid)
      // console.log("item",statusname)
      let list = [
        { "id":itmid,
        "purchasestatus":statusname
        }
      ]
      try {
        let data = await axios({
          method: 'post',
          url: 'http://127.0.0.1:8000/product/order/',
          headers:{"Authorization" : `Bearer ${token}`},
          data:list
        })
        // console.log("response",data.data)
        if (data.data.Status===200){
          orders()
          statusnotify()
        }else{console.log(data.data.Message)}
      } catch (error) {
        console.log(error)
      }
     

      
    }
    const filterfunction=()=>{
      console.log("sdfdfsd",searchvalue)
      if (searchvalue){
      let searchid=searchvalue.split('Z')[1]
        let fvalue = orderdata.filter(t=>parseInt(t.id) === parseInt(searchid))
        setordersearchdata(fvalue)
      }
      else{setordersearchdata(orderdata)}
  }

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
      <div className='pt-3 ps-md-5' >
          <div className=' vh-100 bg-white  shadow-lg overflow-auto' style={{width:"100%",borderRadius:".80rem"}}>
          <div className='d-flex p-3' style={{color:"rgb(245, 189, 7)"}}>
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
                <ul className="sorting-lists list-unstyled md-10 w-auto ">
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
            <button className='btn-sm btn-warning' onClick={filterfunction} ><Icon icon="ant-design:search-outlined" width="20" height="20" /></button>
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
                <button  className='btn-sm btn-info text-white float-end'  > Export to excel </button>
                </div>
              </DownloadTableExcel>
              {/* excel export button end */}
                </div>
          </div>
          
          <div className='container pt-md-3 pt-2'>
          <table className="table table-bordered">
            <thead className='text-center'>
                <tr>
                <th scope="col">#</th>
                <th scope="col ">SN.No</th>
                <th scope="col">Customer</th>
                <th scope="col">Contact</th>
                <th scope="col">Price</th>
                <th scope="col">Address</th>
                <th scope="col">city</th>
                <th scope="col">Status</th>
                <th scope="col">Date</th>
                <th scope="col">Products</th>
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
                          <option value={''} disabled>change status</option>

                            {filterstatus.map((item,k)=>(
                            <option  key={k} value={item.status} style={{backgroundColor:item.color,padding:"4px",borderRadius:"3px"}} >{item.status}</option>
                          ))}
                        </>:null}
                        </select>
                  </div>
                 
                  </td>
                  <td>{itm.created_date.split('T')[0]}</td>
                <td className='text-muted' style={{width:"0"}}><Dropdown >
                    <Dropdown.Toggle   >
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
                                <th scope="col">Price</th>
                                <th scope="col">Quantity</th>
                                               
                            </tr>
                            {/* end tr */}  
                            </thead>{/* thead */}
                            <tbody>  
                            {oproduct.filter(t=>parseInt(t.order_id[0].id) === parseInt(itm.id)).map((productitm,k1)=>(
                                < tr key={k1}>
                                
                                    <td className="">{k1+1}</td>
                                    <td className="">{productitm.product[0].title}<br/></td>
                                    <td className="">{productitm.subtotal}</td>
                                    <td className="">{productitm.quantity}</td>           
                                           
                                </tr>
                                ))}
                          
                            </tbody>{/* end tbody */}
                        </table>{/* end table */}
                        
                        </div>
                        </div>    
                    </div>
                    </div>
                    {/* </div> */}  
                    </div>
                    </div>  
                    </Dropdown.Menu>
            
                    </Dropdown></td>
                    {/* <td> <Icon className='btn p-0' icon="fluent:save-16-regular" width="30" height="30" /></td> */}
                    <td><Icon onClick={()=>deleteproduct(k,itm.id)} className='btn p-0' icon="fluent:delete-24-regular" width="30" height="25 " /></td>
                    
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
                    <th scope="col">Price</th>
                    <th scope="col">Address</th>
                    <th scope="col">city</th>
                    <th scope="col">Status</th>
                    <th scope="col">Date</th>
                    <th scope="col">Products</th>
                    </tr>
                    {(filter.length===0 ? ordersearchdata :ordersearchdata.filter(t=>parseInt(t.status[0].id) === parseInt(filter.id))) .map((itm,k)=>(
                        <tr key={k}>
                           
                            <td>SN{itm.created_date.split('T')[1].split('.')[1]}{itm.id}</td>
                            <td>{itm. customer_name}</td>
                            <td>{itm.contact}</td>
                            <td>{itm.total}</td>
                            <td>{itm.delivery_address}</td>
                            <td>{itm.city}</td>
                            <td >{itm.status[0].status}</td>
                            <td>{itm.created_date.split('T')[0]}</td>
                            <td>
                                {/* {itm.id} */}
                                {oproduct.filter(t=>parseInt(t.order_id[0].id) === parseInt(itm.id)).map((productitm,k1)=>(
                                    
                                        <li key={k1}>{productitm.product[0].title} - {productitm.quantity} - {productitm.subtotal} </li>   
                                
                                ))}
                            </td>
                        </tr>
                    ))}
                   
                    
                  </tbody>
                </table>

</div>
  )
}
