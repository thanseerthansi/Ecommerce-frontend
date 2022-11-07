import React, { useContext, useEffect, useState } from 'react'
import Adminlogout from './Adminlogout';
import Adminslider from './Adminslider';
import { Simplecontext } from './Simplecontext';
import { Icon } from '@iconify/react';
// import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export default function Admincategory() {
    const {categoryvalue,filteredcategory,setfilteredcategory,Getcategory} =useContext(Simplecontext)
    // console.log("datcata",categoryvalue)
    const [searchvalue,setsearchvalue]=useState();
    const [modalvalue,setmodalvalue]=useState(false);
    const [selectedcat,setselectedcat]=useState(null);
    const [categoryname,setcategoryname]=useState();
    const [description,setdescription]=useState();
    var token = window.localStorage.getItem('access_token')
    // console.log("dsecrip",categoryname)
    useEffect(() => {
        setfilteredcategory(categoryvalue)
    }, [])
    const notifydelete = () => toast.success('✅ Deleted Successfully!', {
      position: "top-center",
      });
    const notifyadded = () => toast.success('✅ Added Successfully!', {
      position: "top-center",
      });
    const notifyupdated = () => toast.success('✅ Updated Successfully!', {
      position: "top-center",
      });
    const filterfunction=()=>{
        // console.log("sdfdfsd",searchvalue)
        if (searchvalue){
          let fvalue = categoryvalue.filter(t=>t.category_type.toUpperCase().includes(searchvalue.toUpperCase()))
          setfilteredcategory(fvalue)
        }
        else{setfilteredcategory(categoryvalue)}
    }
    const postcategory=async(e,itm)=>{
      e.preventDefault();
      // console.log("e",e)
      // console.log("itm",itm)
      let datalist = {"category_type":categoryname,         
          "description":description,
          }          
      if(itm){
        datalist.id=itm.id
      }
      try {
        const postdata = await  axios({
          method: 'post',
          url: 'http://127.0.0.1:8000/product/category/',
          headers:{"Authorization" : `Bearer ${token}`},
          data: datalist
        })
        // console.log(postdata.data)
        setselectedcat()
        if (postdata.data.Status===200){
          setmodalvalue(!modalvalue)
          Getcategory()
          
          if (itm ){
            notifyadded();
          }else{notifyupdated();}
          
        }
      } catch (error) {
        console.log(error)
      }
    }
    const allproductnull=()=>{
      setcategoryname();
      setdescription();
    }
    const deletecategory = async(id)=>{
      try {
        let data = await axios({
          method: 'delete',
          url: 'http://127.0.0.1:8000/product/category/',
          headers:{"Authorization" : `Bearer ${token}`},
          data:{"id":id},
        })
        if (data.data.Status===200){
          notifydelete()
          Getcategory()
        }
      } catch (error) {
        console.log(error)
      }
    }
    const submitdeletecategory = (itemid) => {
      confirmAlert({
        title: "Confirmation",
        message: `Are you sure to delete this Category ?`,
        buttons: [
          {
            label: "Yes",           
            onClick:()=>deletecategory(itemid),
          },
          {
            label: "No"
            // onClick: () => alert("Click No")
          } 
        ],
        
      });
    };
  return (
    <div> <Adminslider/>
        
    <div className=" vh-100 overflow-auto"  style={{backgroundColor:"#c3d5d5"}}>
    <Adminlogout/>
    <ToastContainer />
    <div className="col-12 row " >
      <div className='col-md-2 col-1'>
      </div>
      <div className='col-md-10 col-11'>
      
      <div className='pt-3 ps-md-5' >
          <div className=' vh-100 bg-white  shadow-lg overflow-auto' style={{width:"100%",borderRadius:".80rem"}}>
         
          <div className='container pt-md-0 pt-0'>
          <div className='d-flex pt-3' style={{color:"rgb(245, 189, 7)"}}>
            <Icon icon="mdi:package-variant-remove" width="40" height="25" /> <p className='fw-bolder'>Categories</p> 
            </div>
            {/* search view and add new section */}
            <div className='row col-12'>
            <div className='d-flex col-8 col-md-6 p-2 '>
              <div className=' d-flex w-100  border ps-1 rounded'>
              <i className='pt-1' ><Icon icon="ant-design:search-outlined" width="20" height="20" /></i>
            <input type="Name" id="typeEmailX" placeholder='Search Category'  onChange={(e)=>setsearchvalue(e.target.value)} className="form-control border-0 form-control-sm " />
            {/* {searchvalue? <button onClick={()=>setsearchvalue() & setfilteredcategory(categoryvalue)} className='d-flex btn-sm btn-danger'>{searchvalue}<Icon icon="ic:twotone-cancel" width="30" height="20" /></button> :null} */}
            <button className='btn-sm btn-warning' onClick={filterfunction}  ><Icon icon="ant-design:search-outlined" width="20" height="20" /></button>
            </div>
            
            </div>
            <div className='col-4 col-md-6 p-2 '>
              <button onClick={()=>setmodalvalue(!modalvalue)}  className='btn-sm btn-info text-white float-end'>Add New</button>
            </div>
          </div>
          <table className="table table-bordered">
            <thead className='text-center'>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Category Name</th>
                <th scope="col">Description</th>
                <th scope="col">Created on</th>
                <th scope="col">Action</th>
                
                </tr>
            </thead>
            <tbody className='text-center'>
              {filteredcategory.map((itm,k)=>(
                <tr key={k} >
                <th scope="row">{k+1}</th>
                <td>{itm.category_type}</td>
                <td>{itm.description}</td>
                <td>{itm.created_date.split('T')[0]}</td>
                <td><button onClick={()=>setselectedcat(itm)& setmodalvalue(!modalvalue)} className='h-auto w-auto rounded text-white p-1 bg-warning ' style={{width:"50%"}}><Icon icon="clarity:note-edit-line" width="20" height="20" />edit</button><br/>
                <div className='pt-1 '><button onClick={()=>submitdeletecategory(itm.id)} className='h-auto w-auto rounded text-white p-1 bg-danger ' ><Icon icon="fluent:delete-24-regular" width="20" height="20" />delete</button></div>
                </td>
                
                {/* <td><Icon  className='btn p-0' icon="fluent:delete-24-regular" width="30" height="25 " /></td> */}
                </tr>
              ))}   
            </tbody>
            </table>
          </div>
          {modalvalue?
            <div className="modal fade show" tabIndex={-1} id="quickview-modal" aria-modal="true" role="dialog" style={{display: 'block', paddingLeft: "20%",paddingRight:"2%"}}>
            <div className="modal-dialog modal-dialog-centered modal-xl w-md-50">
                <div className="modal-content">
                <div className="modal-header border-0">
                <div className='d-flex pt-3' style={{color:"rgb(245, 189, 7)"}}>
            <p className='fw-bolder ps-4'>Add Categories</p> 
            </div>
                    <button onClick={()=>setmodalvalue(!modalvalue) & setselectedcat() &allproductnull}  type="button" className="btn-close" data-bs-dismiss="modal"  aria-label="Close" />
                </div>
                {/* {idproduct.map((itm,k)=>( */}
                <div  className="modal-body">
                <form  onSubmit={(e)=>postcategory(e,selectedcat)}>
             
                
                        <div className='container'>                    
                        <div className="form-group pt-2 ">
                            <label htmlFor="exampleInputEmail1"><b>Category Name<span className='text-danger'>*</span></b></label>
                            <input type="text" required className="form-control" onChange={(e)=>setcategoryname(e.target.value)} defaultValue={selectedcat ? selectedcat.category_type : null}  placeholder="Category Name" />
                            {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                        </div>
                    </div>
                
                        <div className='container'>                    
                        <div className="form-group pt-2 ">
                            <label htmlFor="exampleInputEmail1"><b>Description</b></label>
                            <textarea type="text" required className="form-control"  onChange={(e)=>setdescription(e.target.value)} defaultValue={selectedcat ? selectedcat.description : null}  placeholder="Description" />
                            {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                        </div>
                    
              
                                
                    </div>
                    <div className='p-5 float-end d-flex justify-content-between'> 
                    <div className=''>
                    <button onClick={()=>setmodalvalue(!modalvalue) & setselectedcat() & allproductnull}  type='button'  className="btn btn-danger ">close</button>
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
            :null}
          </div>          
      </div>
      </div>
  </div> 
    </div></div>
  )
}
