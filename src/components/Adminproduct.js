import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Adminlogout from './Adminlogout'
import Adminslider from './Adminslider'
import { Icon } from '@iconify/react';
// import Dropdown from 'react-bootstrap/Dropdown';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Simplecontext } from './Simplecontext';
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Callaxios from './Callaxios';
export default function Adminproduct() {
  
//   const [orderdata,setorderdata]=useState([]);
  const [productlist,setproductlist]=useState([]);
  const [filteredprduct,setfilteredprduct]=useState([]);
  const [editproduct,seteditproduct]=useState(null);
  const [searchvalue,setsearchvalue]=useState();
  const [filter,setfilter]=useState();
  const [modalvalue,setmodalvalue]=useState(false);
  const [modaledit,setmodaledit]=useState(false);
  const [productvalues,setproductvalues]=useState([]);
  const [images,setimages]=useState([]);
  const [firstimages,setfirstimages]=useState();
  const [isloading,setisloading]=useState(false)
 
  const {categoryvalue,accesscheck} =useContext(Simplecontext)
  const imagetolist=(abc)=>{
    // let list = []
    // list.append(abc)
    // console.log("list",list)
    let imagelist = images.concat(abc)
    // console.log("imageslist",imagelist)
    setimages(imagelist)
  }

  const deletefromlist=(k)=>{
    const splc = images
    // console.log("splc",splc) 
    splc.splice(k,1)
    setimages(() => [ ...splc]);
  }
  // console.log("serav-41",productvalues)
  // console.log("images",images)
  // var token = window.localStorage.getItem('access_token')
  const filterfunction=()=>{
    if (searchvalue){
      let fvalue = productlist.filter(t=>t.title.toUpperCase().includes(searchvalue.toUpperCase()))
      setfilteredprduct(fvalue)
    }else{setfilteredprduct(productlist)}
}
  useEffect(() => {  
    window.scrollTo(0, 0);
    products()
    accesscheck()
  }, [])

  const notify = () => toast.success('✅ Deleted Successfully!', {
    position: "top-center",
    });
  const notifyproductupdated = () => toast.success('✅ Product Updated Successfully!', {
    position: "top-center",
    });
  const notifyproductadded = () => toast.success('✅ Product added Successfully!', {
    position: "top-center",
    });
  const notifydelete = () => toast.error(' !! Order exist under this product. you can disable this prodcut!!', {
    position: "top-center",
    });
  const notifyerror = (msg) => toast.error(msg, {
    position: "top-center",
    });
  const products =async()=>{
    try{
      accesscheck()
      let data = await Callaxios("get","product/product/")
      if(data.status===200){
        setproductlist(data.data)
        setfilteredprduct(data.data)
      }
     
    }
    catch (error) {
      console.log(error)
    }
  }
  const setstatus =async(status,pid)=>{
    accesscheck()  
    
      try {
        
        let data = await Callaxios("post","product/product/",{ "id":pid,"status":status})
        if (data.data.Status===200){
            products()            
        }else{
          // console.log(data.data.Message)
          notifyerror("Something went wrong ")
        }
      } catch (error) {
        console.log(error)
      }
     
  }
  const changevat =async(vat,pid)=>{
    accesscheck()  
      try {
        // console.log("vat",vat)
        let data = await Callaxios("post","product/product/",{ "id":pid,"vat":vat})
        // console.log("data",data)
        if (data.data.Status===200){
            products()            
        }else{
          // console.log(data.data.Message)
          notifyerror("Something went wrong ")
        }
      } catch (error) {
        console.log(error)
      }
     
  }
  const deleteproduct =async(id)=>{
    accesscheck()
   try {
    let data = await Callaxios("delete","product/product/",{"id":id})
    // console.log("data",data.data)
    if(data.data.Status===200){
        products()
        notify()  
    }else{console.log("error :",data.data.Message)
    if (data.data.Message==='FOREIGN KEY constraint failed'){
    notifydelete()}
    } 
   } catch (error) {
    console.log(error)
    notifyerror("Something Went Wrong")
   }
  }
  const imagedeletefromdb = async(item,k)=>{
    accesscheck()
   try {
    let datalist={"id":editproduct.id,
                  "images":JSON.stringify([item.id]),
                  "keyword":"remove"
                }
    let data = await Callaxios("patch","product/product/",datalist)
    
    // console.log("response",data.data)
    if (data.data.Status===200){
        // console.log("ok")
        products()
        const splc = editproduct.images
        // console.log("splc",splc)
        splc.splice(k,1)
        
          
    }else{console.log(data.data.Message)}
  } catch (error) {
    console.log(error)
  }
  }
  const submit = (item,k) => {
    confirmAlert({
      title: "Confirmation",
      message: `Are you sure to delete this image ?`,
      buttons: [
        {
          label: "Yes",           
          onClick:()=>imagedeletefromdb(item,k),
        },
        {
          label: "No"
          // onClick: () => alert("Click No")
        } 
      ],
      
    });
  };
  const submitdeleteproduct = (itemid) => {
    confirmAlert({
      title: "Confirmation",
      message: `Are you sure to delete this product ?`,
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
  const addproduct = async(e,id)=>{
    accesscheck()
    setisloading(true)
    e.preventDefault();
    const form_data = new FormData();
    if (id===null || id===undefined){ 
    }else{ 
      form_data.append('id',id)}
    if (firstimages){

      let totalimage = images.concat(firstimages)
      // console.log("timage",totalimage)     
      totalimage.map((itm,k)=>{
        form_data.append("images",itm)
      }) 
     
    }
   
    for (const [key, value] of Object.entries(productvalues)) {
      form_data.append(`${key}`, `${value}`)
    }
    try {
      const postdata = await  Callaxios("post","product/product/",form_data)
      // console.log("postdata",postdata)
      if(postdata.data.Status===200){
        if (id===null || id===undefined){
          setmodalvalue(!modalvalue)
          
          
          }
        else{ 
            // console.log("elsepssed")
            setmodaledit(!modaledit)
           
            
          }
        products()
        setproductvalues([]) 
        setimages([])
        setfirstimages()
        notifyproductadded()
        setisloading(false)    
      }else{console.log("postdata.data.Message")
      notifyerror("Something went wrong")
      setisloading(false)
    }
    } catch (error) {
      console.log(error)
      notifyerror("Something Went Wrong")
      setisloading(false)
    }
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
      
      <div className='pt-0 ps-md-0' >
          <div className=' vh-100 bg-white  shadow-lg overflow-auto' style={{width:"100%",borderRadius:".80rem"}}>       
          {/* <div className='float-right'><button className='btn btn-primary float-end'>Add new</button></div> */}         
          
          <div className='container pt-md-0 pt-0'>
          <div className='d-flex pt-2' style={{color:"rgb(245, 189, 7)"}}>
          <Icon icon="icon-park-twotone:order" width="40" height="23" />  <b>Products List</b> 
          </div>
           {/* filterstart */}
           <div className="filter-sort- d-flex pt-2  flex-wrap justify-content-center">
            <div className="filter-sorting justify-content-end">
              <div className="collection-sorting position-relative ">
                <div className="sorting-header  d-flex align-items-center justify-content-end">
                  <span className="sorting-title me-2"><b style={{color:"grey"}}>Sort by:</b></span>
                  <span className="active-sorting" >{filter ? <b>{filter.category_type}</b> :<b>All</b>}</span>
                  <span className="sorting-icon">
                    <svg className="icon icon-down" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </div>
                <ul className="sorting-lists list-unstyled md-10 w-auto ">
                  <li  className="text_14" style={{backgroundColor:"white",padding:"4px",borderRadius:"3px"}} onClick={()=>setfilter()}> All </li>
                  {categoryvalue.map((itm,k)=>(
                      <li onClick={()=>setfilter(itm)} key={k}><span  style={{backgroundColor:itm.color,padding:"4px",borderRadius:"3px"}} className="text_14">{itm.category_type}</span></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          {/* filterend? */}
          <div className='row col-12'>
            <div className='d-flex col-8 col-md-6 p-2 '>
              <div className=' d-flex w-100  border ps-1 rounded'>
              <i className='pt-1' ><Icon icon="ant-design:search-outlined" width="20" height="20" /></i>
            <input type="Name" id="typeEmailX" placeholder='Search Product by title' onChange={(e)=>setsearchvalue(e.target.value)}  className="form-control border-0 form-control-sm " />
            <button className='btn-sm btn-warning' onClick={filterfunction} ><Icon icon="ant-design:search-outlined" width="20" height="20" /></button>
            </div>
            
            </div>
            <div className='col-4 col-md-6 p-2 '>
              <button onClick={()=>setmodalvalue(!modalvalue)} className='btn-sm btn-info text-white float-end'>Add New</button>
            </div>
          </div>
          <table className="table table-bordered">
            <thead className='text-center'>
                <tr>
                <th scope="col">#</th>
                <th scope="col " style={{width:"20%"}} >Product Title</th>
                <th scope="col" style={{width:"20%"}}>Images</th>
                <th scope="col">Product Details</th>
                <th scope="col">Created Date</th>
                <th scope="col " style={{width:"10%"}}>status</th>
                <th scope="col" style={{width:"10%"}}>Action</th>
                </tr>
            </thead>
            <tbody className='text-center'>
              {(filter? filteredprduct .filter(t=>t.category[0].category_type.toUpperCase().includes(filter.category_type.toUpperCase())): filteredprduct).map((itm,k)=>(
                <tr key={k}>
                <th scope="row">{k+1}</th>
                <td>
                    <div className='d-flex-col text-start'>{itm.title}<br/>
                <img className='rounded w-25'  src={itm.images[0] ? itm.images[0].image :null} alt={itm.title} />
                </div>
                </td>   
                <td>
                    <div className='d-flex-col'>
                        {(itm.images).map((img,k)=>(
                        <div key={k}>
                             <img  className='rounded w-25'  src={img.image} alt={itm.title} /><br/>
                        </div>
                        ))}                       
                    </div>
                </td>
                <td><b>Description :</b>{itm.description}<br/>
                <b>Brand:</b>{itm.brand}<br/>
                <b>Code:</b>{itm.code}<br/>
                </td>
                <td>{itm.created_date.split('T')[0]}</td>
                <td>{itm.status===true ? 
                <button onClick={()=>setstatus(false,itm.id)} className='h-auto w-auto rounded text-white p-1 bg-success' >enabled</button>
                 :<button onClick={()=>setstatus(true,itm.id)} className='h-auto w-auto rounded text-white p-1 bg-danger'  >disabled</button>}</td>
                <td><button onClick={()=>setmodaledit(!modaledit)& seteditproduct(itm)} className='h-auto w-auto rounded text-white p-1 bg-warning ' style={{width:"50%"}}><Icon icon="clarity:note-edit-line" width="20" height="20" />edit</button><br/>
                <div className='pt-1 text-sm'><button onClick={()=>changevat(itm.vat? false:true,itm.id)} style={itm.vat?{backgroundColor:"#198754"}:{backgroundColor:"#d32525"}} className='h-auto w-auto rounded text-white p-1  ' ><Icon icon="ic:twotone-remove-red-eye"  width="20" height="20" />VAT</button></div>
                <div className='pt-1 '><button onClick={()=>submitdeleteproduct(itm.id)} className='h-auto w-auto rounded text-white p-1 bg-danger  ' ><Icon icon="fluent:delete-24-regular" width="20" height="20" />delete</button></div>
                </td>
                  
                </tr>
              ))}   
            </tbody>
            </table>
              {/* modal */}
              {modalvalue?
        <div className="modal fade show" tabIndex={-1} id="quickview-modal" aria-modal="true" role="dialog" style={{display: 'block', paddingLeft: "20%",paddingRight:"2%"}}>
          <div className="modal-dialog modal-dialog-centered modal-xl">
            <div className="modal-content">
              <div className="modal-header border-0">
                <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={()=>setmodalvalue(!modalvalue) & setproductvalues([]) & setimages([]) &setfirstimages()} aria-label="Close" />
              </div>
              {/* {idproduct.map((itm,k)=>( */}
              <div  className="modal-body">
              <form onSubmit={(e)=>addproduct(e)}>
                <div className="row">
                  <div className="col-lg-6 col-md-12 col-12">
                    <div className='container'>                  
                      <div className="form-group pt-1">
                        <label htmlFor="exampleInputEmail1"><b>Category<span className='text-danger'>*</span></b></label>
                        <select defaultValue={''} onChange={(e)=> setproductvalues({...productvalues,category:e.target.value}) } required className='form-control'  >
                          <option value=''  hidden disabled>-select Category-</option>
                          {categoryvalue.map((itm,k)=>(
                            <option key={k} value={itm.id}>{itm.category_type.toUpperCase()}</option>
                          ))}
                        
                        </select>
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                      </div>
                      <div className="form-group pt-2">
                        <label htmlFor="exampleInputEmail1"><b>Brand<span className='text-danger'>*</span></b></label>
                        <input type="text" required className="form-control" onChange={(e)=> setproductvalues({...productvalues,brand:e.target.value}) }  placeholder="Brand" />
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                      </div>
                      <div className="form-group pt-2">
                        <label htmlFor="exampleInputEmail1"><b>Code<span className='text-danger'>*</span></b></label>
                        <input type="text" className="form-control" required onChange={(e)=> setproductvalues({...productvalues,code:e.target.value}) } placeholder="Code" />
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                      </div>
                      <div className="form-group pt-2">
                        <label htmlFor="exampleInputEmail1"><b>Price<span className='text-danger'>*</span></b></label>
                        <input type="number" className="form-control" onChange={(e)=> setproductvalues({...productvalues,price:e.target.value})}  required  placeholder="Price" />
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                      </div>
                      <div className="form-group pt-2">
                        <label htmlFor="exampleInputEmail1"><b>Old Price<span className='text-danger'>*</span></b></label>
                        <input type="number" className="form-control" required onChange={(e)=> setproductvalues({...productvalues,old_price:e.target.value})}  placeholder="Old price" />
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                      </div>
                      <div className="form-group pt-2">
                        <label htmlFor="exampleInputEmail1"><b>Size</b></label>
                        <input type="text" className="form-control"  onChange={(e)=> setproductvalues({...productvalues,size:e.target.value})}  placeholder="Size separate by ," />
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                      </div>
                      <div className="form-group pt-2">
                        <label htmlFor=""><b>Quantity<span className='text-danger'>*</span></b></label>
                        <input type="number" className="form-control" required  onChange={(e)=> setproductvalues({...productvalues,quantity:e.target.value})} placeholder="Quantity" />
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                      </div>
                      <div className="form-group pt-2">
                        <label htmlFor=""><b>Fake Order Sold</b></label>
                        <input type="number" className="form-control"  onChange={(e)=> setproductvalues({...productvalues,Fake_order_sold:e.target.value})}  placeholder="Fake order sold" />
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                      </div>
                      <div className="form-group pt-2">
                        <label htmlFor=""><b>Description</b></label>
                        <textarea type="text" className="form-control"  onChange={(e)=> setproductvalues({...productvalues,description:e.target.value})}  placeholder="description"/>
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                      </div>
                      <div className="form-group pt-2">
                        <label htmlFor=""><b>Image<span className='text-danger'>*</span></b></label>
                        <input type="file" className="form-control"  required onChange={(e)=>setfirstimages(e.target.files[0])} placeholder="" />
                        {firstimages ?
                        <div>
                          <img  className='rounded w-25'  src={ URL.createObjectURL(firstimages)} alt='img' />
                          {/* <button className='btn ' onClick={()=>setfirstimages([])}><Icon className='bg-danger text-white rounded' icon="fluent:delete-24-regular" width="20" height="20" /></button> */}
                        </div> :null}
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                      </div>
                  </div>
                  </div>
                  <div className="col-lg-6 col-md-12 col-12">
                    <div className="product-details ">
                    <div className='container'>
                    <div className="form-group pt-1">
                      <label ><b>Google Category</b></label>
                      <input type="text" className="form-control" onChange={(e)=> setproductvalues({...productvalues,google_category:e.target.value})}   placeholder="Google Category" />
                      {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                    <div className="form-group pt-2">
                      <label ><b>Title<span className='text-danger'>*</span></b></label>
                      <input type="text" required className="form-control" onChange={(e)=> setproductvalues({...productvalues,title:e.target.value})}  placeholder="Title" />
                      {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                    <div className="form-group pt-2">
                      <label ><b>Purchase price</b></label>
                      <input type="text" className="form-control" onChange={(e)=> setproductvalues({...productvalues,purchase_price:e.target.value})}   placeholder="Purchase price" />
                      {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                    <div className="form-group pt-2">
                      <label ><b>Price List</b></label>
                      <input type="text"  className="form-control" onChange={(e)=> setproductvalues({...productvalues,price_list:e.target.value})}  placeholder="quantity-price Eg:1-50,2-100" />
                      {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                    <div className="form-group pt-2">
                      <label ><b>Color</b></label>
                      <input type="text" className="form-control"  onChange={(e)=> setproductvalues({...productvalues,colour:e.target.value})}  placeholder="Color separate by ," />
                      {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                    <div className="form-group pt-2">
                      <label ><b>Delivery charges</b></label>
                      <input type="text" className="form-control"  onChange={(e)=> setproductvalues({...productvalues,delivery_charge:e.target.value})}  placeholder="Delivery charge" />
                      {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                    <div className="form-group pt-2">
                      <label ><b>Quantity Text</b></label>
                      <input type="text" className="form-control"  onChange={(e)=> setproductvalues({...productvalues,quanity_text:e.target.value})}  placeholder="Quantity Text" />
                      {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                    <div className="form-group pt-2">
                      <label ><b>Rank<span className='text-danger'>*</span></b></label>
                      <input type="text" className="form-control"  onChange={(e)=> setproductvalues({...productvalues,rank:e.target.value})}  placeholder="Rank" />
                      {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                    <div className="form-group pt-2">
                      <label ><b>Status</b></label>
                      <select defaultValue={''} className='form-control' onChange={(e)=> setproductvalues({...productvalues,status:e.target.value})} >
                          <option value='' hidden disabled>select </option>
                          <option value='True' >Enabled </option>
                          <option value='False' >Disabled </option>  
                        </select>
                      {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                    <div className="form-group pt-2">                   
                      <div className='row col-12'>
                      {images[0]?
                        <>
                        {images.map((itm,k)=>(
                          <div key={k} className="col-6 pt-1"> 
                          <img  className='rounded w-50'  src={ URL.createObjectURL(itm)} alt='img' />
                          <button className='btn ' onClick={()=>deletefromlist(k)}><Icon className='bg-danger text-white rounded' icon="fluent:delete-24-regular" width="20" height="20" /></button>
                        </div> 
                        ))}
                      </>: null}
                      </div>
                      <label ><b>Extra Images</b></label>
                      <input type="file" className="form-control " value={''} onChange={(e)=>imagetolist(e.target.files[0])} placeholder="" />
                      {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                    {/* <button type="submit" className="btn btn-primary">Submit</button> */}
                  {/* 2nd row */}
                    </div>                   
                    </div>
                  </div>             
                </div>
                <div className='p-5 float-end d-flex justify-content-between'> 
                <div className=''>
                <button type='button' onClick={()=>setmodalvalue(!modalvalue)& setproductvalues([]) & setimages([]) &setfirstimages()} className="btn btn-danger ">Close</button>
                </div>
                <div className='ps-3'>
                <button type="submit" className="btn btn-success  ">Save</button>
                </div><br/>
                {isloading ? <div className='text-end'>
                  <p>Loading...</p>
                </div>:null}
                </div>
                </form>
              </div>
              {/* ))} */}
            </div>
          </div>
        </div>
        :null}
        {/* edit modal */}
        {modaledit?
        <div className="modal fade show" tabIndex={-1} id="quickview-modal" aria-modal="true" role="dialog" style={{display: 'block', paddingLeft: "20%",paddingRight:"2%"}}>
          <div className="modal-dialog modal-dialog-centered modal-xl">
            <div className="modal-content">
              <div className="modal-header border-0">
                <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={()=>setmodaledit(!modaledit)& setproductvalues([]) & setimages([]) &setfirstimages()} aria-label="Close" />
              </div>
              {/* {idproduct.map((itm,k)=>( */}
              <div  className="modal-body">
              <form onSubmit={(e)=>addproduct(e,editproduct.id)}>
                <div className="row">               
                  <div className="col-lg-6 col-md-12 col-12">
                    <div className='container'>                  
                      <div className="form-group pt-1">
                        <label htmlFor="exampleInputEmail1"><b>Category<span className='text-danger'>*</span></b></label>
                        <select defaultValue={''} onChange={(e)=> setproductvalues({...productvalues,category:e.target.value}) }  className='form-control'  >
                          <option value='' hidden disabled>{editproduct? editproduct.category[0].category_type.toUpperCase() :null}</option>
                          {categoryvalue.map((itm,k)=>(
                            <option key={k} value={itm.id}>{itm.category_type.toUpperCase()}</option>
                          ))}                        
                        </select>
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                      </div>
                      <div className="form-group pt-2">
                        <label htmlFor="exampleInputEmail1"><b>Brand<span className='text-danger'>*</span></b></label>
                        <input type="text"  className="form-control" onChange={(e)=> setproductvalues({...productvalues,brand:e.target.value}) }  defaultValue={editproduct? editproduct.brand:null} placeholder="Brand" />
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                      </div>
                      <div className="form-group pt-2">
                        <label htmlFor="exampleInputEmail1"><b>Code<span className='text-danger'>*</span></b></label>
                        <input type="text" className="form-control"  onChange={(e)=> setproductvalues({...productvalues,code:e.target.value}) } defaultValue={editproduct? editproduct.code:null} placeholder="Code" />
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                      </div>
                      <div className="form-group pt-2">
                        <label htmlFor="exampleInputEmail1"><b>Price<span className='text-danger'>*</span></b></label>
                        <input type="number" className="form-control" onChange={(e)=> setproductvalues({...productvalues,price:e.target.value})} required  defaultValue={editproduct? editproduct.price:null}  placeholder="Price"/>
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                      </div>
                      <div className="form-group pt-2">
                        <label htmlFor="exampleInputEmail1"><b>Old Price<span className='text-danger'>*</span></b></label>
                        <input type="number" className="form-control"  onChange={(e)=> setproductvalues({...productvalues,old_price:e.target.value})}   defaultValue={editproduct? editproduct.old_price:null} placeholder="Old Price" />
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                      </div>
                      <div className="form-group pt-2">
                        <label htmlFor="exampleInputEmail1"><b>Size</b></label>
                        <input type="text" className="form-control" onChange={(e)=> setproductvalues({...productvalues,size:e.target.value})}  defaultValue={editproduct? editproduct.size:null} placeholder="Size Separate by ," />
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                      </div>
                      <div className="form-group pt-2">
                        <label htmlFor=""><b>Quantity<span className='text-danger'>*</span></b></label>
                        <input type="number" className="form-control"  onChange={(e)=> setproductvalues({...productvalues,quantity:e.target.value})}  defaultValue={editproduct? editproduct.quantity:null} placeholder="Quantity" />
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                      </div>
                      <div className="form-group pt-2">
                        <label htmlFor=""><b>Fake Order Sold</b></label>
                        <input type="number" className="form-control" onChange={(e)=> setproductvalues({...productvalues,Fake_order_sold:e.target.value})} defaultValue={editproduct? editproduct.Fake_order_sold:null} placeholder="Fake Order Sold"/>
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                      </div>
                      <div className="form-group pt-2">
                        <label htmlFor=""><b>Description</b></label>
                        <textarea type="text" className="form-control" onChange={(e)=> setproductvalues({...productvalues,description:e.target.value})}  defaultValue={editproduct? editproduct.description:null} placeholder="Descrpition" />
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                      </div>
                      <div className="form-group pt-2">
                        <label htmlFor=""><b>Image<span className='text-danger'>*</span></b></label>
                        <input type="file" className="form-control"   onChange={(e)=> setfirstimages(e.target.files[0])} placeholder="" />                
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                        {editproduct.images[0]? 
                          <div>
                          <img  className='rounded w-25'  src={ editproduct.images[0].image} alt='img' />
                          <button type='button' className='btn ' onClick={()=>submit(editproduct.images[0],0)}><Icon className='bg-danger text-white rounded' icon="fluent:delete-24-regular" width="20" height="20" /></button>
                        </div> :
                        <div>
                        {firstimages ?<>
                        <div>
                          <img  className='rounded w-25'  src={ URL.createObjectURL(firstimages)} alt='img' />
                        </div></> : null
                        }</div>
                      }                     
                      </div>
                  </div>
                  </div>
                  <div className="col-lg-6 col-md-12 col-12">
                    <div className="product-details ">
                    <div className='container'>                  
                    <div className="form-group pt-1">
                      <label ><b>Google Category</b></label>
                      <input type="text" className="form-control"  onChange={(e)=> setproductvalues({...productvalues,google_category:e.target.value})}   placeholder="Google Category" />
                      {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                    <div className="form-group pt-2">
                      <label ><b>Title</b></label>
                      <input type="text" className="form-control" onChange={(e)=> setproductvalues({...productvalues,title:e.target.value})}   defaultValue={editproduct? editproduct.title:null} placeholder="Title" />
                      {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                    <div className="form-group pt-2">
                      <label ><b>Purchase price</b></label>
                      <input type="text" className="form-control" onChange={(e)=> setproductvalues({...productvalues,purchase_price:e.target.value})}   defaultValue={editproduct? editproduct.purchase_price:null}  placeholder="Purchase List" />
                      {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                    <div className="form-group pt-2">
                      <label ><b>Price List<span className='text-danger'>*</span></b></label>
                      <input type="text" className="form-control"  onChange={(e)=> setproductvalues({...productvalues,price_list:e.target.value})} placeholder='quantity-price Eg:1-50,2-100' defaultValue={editproduct? editproduct.price_list:null}  />
                      {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                    <div className="form-group pt-2">
                      <label ><b>Color</b></label>
                      <input type="text" className="form-control" onChange={(e)=> setproductvalues({...productvalues,colour:e.target.value})}  defaultValue={editproduct? editproduct.colour:null} placeholder="Color" />
                      {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                    <div className="form-group pt-2">
                      <label ><b>Delivery charges</b></label>
                      <input type="text" className="form-control" onChange={(e)=> setproductvalues({...productvalues,delivery_charge:e.target.value})}  defaultValue={editproduct? editproduct.delivery_charge:null} placeholder="Delivery Charge" />
                      {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                    <div className="form-group pt-2">
                      <label ><b>Quantity Text</b></label>
                      <input type="text" className="form-control" onChange={(e)=> setproductvalues({...productvalues,quanity_text:e.target.value})}  defaultValue={editproduct? editproduct.quantity_text:null} placeholder="Quantity Text" />
                      {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                    <div className="form-group pt-2">
                      <label ><b>Rank<span className='text-danger'>*</span></b></label>
                      <input type="text" className="form-control" onChange={(e)=> setproductvalues({...productvalues,rank:e.target.value})}   defaultValue={editproduct? editproduct.rank:null} placeholder="Rank" />
                      {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                    <div className="form-group pt-2">
                      <label ><b>Status</b></label>
                      <select defaultValue={editproduct? editproduct.status:null} required onChange={(e)=> setproductvalues({...productvalues,status:e.target.value})} className='form-control' placeholder='Status'  >
                          <option value='' hidden disabled>{editproduct? editproduct.status===true?"Enabled":"Disabled":null} </option>
                          <option value='True' >Enabled </option>
                          <option value='False' >Disabled </option>                         
                        </select>
                      {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                    <div className="form-group pt-2">                      
                      <div className=' row col-12'>
                      {editproduct.images[0] ? 
                        <>
                        {editproduct.images.map((itm,k)=>
                        <div key={k}   className='col-6 pt-1' >
                          {k===0 ?null :<>
                          <div key={itm.id} >                       
                          <img  className='rounded w-50'  src={itm.image} alt='img' />
                          <button type='button' onClick={()=>submit(itm,k)} className='btn ' ><Icon className='bg-danger text-white rounded' icon="fluent:delete-24-regular" width="20" height="20" /></button>
                        </div></> }</div>
                        )}
                        </>:null}
                        {images[0]?
                        <>
                        {images.map((itm,k)=>(
                          <div key={k} className="col-6 pt-1"> 
                          <img  className='rounded w-50'  src={ URL.createObjectURL(itm)} alt='img' />
                          <button className='btn ' onClick={()=>deletefromlist(k)}><Icon className='bg-danger text-white rounded' icon="fluent:delete-24-regular" width="20" height="20" /></button>
                        </div> 
                        ))}
                      </>: null}
                      </div>
                      <label className='pt-1'><b>Extra Images</b></label>
                      <input type="file" className="form-control " style={{color:"rgba(0,0,0,0)"}} onChange={(e)=>imagetolist(e.target.files[0])}  placeholder="" />                     
                      {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                    {/* <button type="submit" className="btn btn-primary">Submit</button> */}
                  {/* 2nd row */}
                    </div>    
                    </div>
                  </div>               
                </div>
                <div className='p-5 d-flex float-end'>
                <div className=''>
                <button type='button' onClick={()=>setmodaledit(!modaledit)& setproductvalues([]) & setimages([]) &setfirstimages()} className="btn btn-danger ">close</button>
                </div>
                <div className='ps-3 '>
                <button type="submit" className="btn btn-info  "><span className='text-white'>Save</span></button>
                </div><br/>
                {isloading ? <div className='text-end'>
                  <p>Loading...</p>
                </div>:null}
                </div>
                </form>
              </div>
              {/* ))} */}
            </div>
          </div>
        </div>
        :null}

          </div>
          </div>          
      </div>
      </div>
  </div>  
  </div>

</div>
  )
}
