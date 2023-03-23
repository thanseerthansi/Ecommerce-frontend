import React, { useContext, useEffect, useState } from 'react'
import Adminlogout from './Adminlogout';
import Adminslider from './Adminslider';
import { Icon } from '@iconify/react';
// import Dropdown from 'react-bootstrap/Dropdown';
// import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Simplecontext } from './Simplecontext';
import Callaxios from './Callaxios';

export default function Admincontact() {
  const {accesscheck} =useContext(Simplecontext)
    // console.log("datcata",categoryvalue)
    const [contactdata,setcontactdata]=useState([]); 
    const [contact,setcontact]=useState();
    const [modalvalue,setmodalvalue]=useState(false);
    const [selectedcontact,setselectedcontact]=useState(null);
    const [address,setaddress]=useState();
    const [facebook,setfacebook]=useState();
    const [email,setemail]=useState();
    const [instagram,setinstagram]=useState();
    const [whatsapp,setwhatsapp]=useState();

    // var token = window.localStorage.getItem('access_token')
    // console.log("dsecrip",categoryname)
    useEffect(() => {
      window.scrollTo(0, 0);
        Getcontact()
        accesscheck()
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
    const notifyerror = (msg) => toast.error(msg, {
      position: "top-center",
      });
    const Getcontact=async()=>{
        try{
            let data = await Callaxios("get","product/contact/")
            // axios.get("http://127.0.0.1:8000/product/contact/",{ headers: {"Authorization" : `Bearer ${token}`}})
            // console.log("moissorderdata",data.data)
            if (data.status===200){
              setcontactdata(data.data)
            }else{
              notifyerror("Something went wrong")
            }
            
          
          }
          catch (error) {
            console.log(error)
          } 
    }
    // const filterfunction=()=>{
    //     // console.log("sdfdfsd",searchvalue)
    //     if (searchvalue){
    //       let fvalue = filtercitydata.filter(t=>t.city_name.toUpperCase().includes(searchvalue.toUpperCase()))
    //       setfiltercitydata(fvalue)
    //     }
    //     else{setfiltercitydata(citydata)}
    // }
    const postcontact=async(e,itm)=>{
      e.preventDefault();
      accesscheck()
      // console.log("e",e)
      // console.log("itm",itm)
      let datalist = {"address":address,         
          "facebook":facebook,
          "email":email,
          "instagram":instagram,
          "whatsapp":whatsapp,
          "contact":contact
          }          
      if(itm){
        datalist.id=itm.id
      }
      try {
        const postdata = await Callaxios("post","product/contact/",datalist)
        //  axios({
        //   method: 'post',
        //   url: 'http://127.0.0.1:8000/product/contact/',
        //   headers:{"Authorization" : `Bearer ${token}`},
        //   data: datalist
        // })
        // console.log(postdata.data)
        setselectedcontact()
        if (postdata.data.Status===200){
          setmodalvalue(!modalvalue)
          Getcontact()
          
          if (itm ){
            notifyadded();
          }else{notifyupdated();}
          
        }else{
          notifyerror("Something went wrong")
        }
      } catch (error) {
        console.log(error)
        notifyerror("Something went wrong")
      }
    }
    const allproductnull=()=>{
      setaddress();
      setfacebook();
      setemail();
      setinstagram();
      setwhatsapp();

    }
    const deletecontact = async(id)=>{
      try {
        accesscheck()
        let data = await Callaxios("delete","product/contact/",{"id":id})
       
        if (data.data.Status===200){
          notifydelete()
          Getcontact()
        }else{
          notifyerror("Something went wrong")
        }
      } catch (error) {
        console.log(error)
        notifyerror("Something went wrong")
      }
    }
    const submitdeletecontact = (itemid) => {
      confirmAlert({
        title: "Confirmation",
        message: `Are you sure to delete this City ?`,
        buttons: [
          {
            label: "Yes",           
            onClick:()=>deletecontact(itemid),
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
      
      <div className='pt-0 ps-md-0' >
          <div className=' vh-100 bg-white  shadow-lg overflow-auto' style={{width:"100%",borderRadius:".80rem"}}>
         
          <div className='container pt-md-0 pt-0'>
          <div className='d-flex pt-2' style={{color:"rgb(245, 189, 7)"}}>
          <Icon icon="bxs:contact" width="40" height="23" /><p className='fw-bolder'>Contact</p> 
            </div>
            {/* search view and add new section */}
            <div className='row col-12'>
            <div className='d-flex col-8 col-md-6 p-2 '>
            </div>
            <div className='col-4 col-md-6 p-2 '>
              <button onClick={()=>setmodalvalue(!modalvalue)}  className='btn-sm btn-info text-white float-end'>Add New</button>
            </div>
          </div>
          <table className="table table-bordered">
            <thead className='text-center'>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Address</th>
                <th scope="col">Contact</th>
                <th scope="col">Facebook</th>
                <th scope="col">Email</th>
                <th scope="col">Instagram</th>
                <th scope="col">Whatsapp</th>
                <th scope="col">Created on</th>
                <th scope="col">Action</th>
                
                </tr>
            </thead>
            <tbody className='text-center'>
              {contactdata.length? contactdata.map((itm,k)=>(
                <tr key={k} >
                <th scope="row">{k+1}</th>
                <td className='text-start'>{itm.address}</td>
                <td>{itm.contact}</td>
                <td>{itm.facebook}</td>
                <td>{itm.email}</td>
                <td>{itm.instagram}</td>
                <td>{itm.whatsapp}</td>
                <td>{itm.created_date.split('T')[0]}</td>
                <td><button onClick={()=>setselectedcontact(itm)& setmodalvalue(!modalvalue)} className='h-auto w-auto rounded text-white p-1 bg-warning ' style={{width:"50%"}}><Icon icon="clarity:note-edit-line" width="20" height="20" />edit</button><br/>
                <div className='pt-1 '><button onClick={()=>submitdeletecontact(itm.id)} className='h-auto w-auto rounded text-white p-1 bg-danger  ' ><Icon icon="fluent:delete-24-regular" width="20" height="20" />delete</button></div>
                </td>
                
                {/* <td><Icon  className='btn p-0' icon="fluent:delete-24-regular" width="30" height="25 " /></td> */}
                </tr>
              )):<tr><td colSpan={9}><p>No Data Found</p></td></tr>}   
            </tbody>
            </table>
          </div>
          {modalvalue?
            <div className="modal fade show" tabIndex={-1} id="quickview-modal" aria-modal="true" role="dialog" style={{display: 'block', paddingLeft: "20%",paddingRight:"2%"}}>
            <div className="modal-dialog modal-dialog-centered modal-xl w-md-50">
                <div className="modal-content">
                <div className="modal-header border-0">
                <div className='d-flex pt-0' style={{color:"rgb(245, 189, 7)"}}>
            <p className='fw-bolder ps-4'>Contact</p> 
            </div>
                    <button onClick={()=>setmodalvalue(!modalvalue) & setselectedcontact() &allproductnull()}  type="button" className="btn-close" data-bs-dismiss="modal"  aria-label="Close" />
                </div>
                {/* {idproduct.map((itm,k)=>( */}
                <div  className="modal-body">
                <form  onSubmit={(e)=>postcontact(e,selectedcontact)}>
             
                <div className="row col-12">
                  <div className="col-lg-6 col-md-12 col-12">
                        <div className='container'>                    
                        <div className="form-group pt-0 ">
                            <label htmlFor="exampleInputEmail1"><b>Address<span className='text-danger'>*</span></b></label>
                            <input type="text" required className="form-control" onChange={(e)=>setaddress(e.target.value)} defaultValue={selectedcontact ? selectedcontact.address : null}  placeholder="Address" />
                            {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                        </div>
                    </div>
                    </div>
                    <div className="col-lg-6 col-md-12 col-12">
                        <div className='container'>                    
                        <div className="form-group pt-0 ">
                            <label htmlFor="exampleInputEmail1"><b>Contact</b></label>
                            <input type="tel" required className="form-control"  onChange={(e)=>setcontact(e.target.value)} defaultValue={selectedcontact ? selectedcontact.contact : null}  placeholder="Contact" />
                            {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                        </div>     
                        </div>
                        </div>  
                  <div className="col-lg-6 col-md-12 col-12">
                        <div className='container'>                    
                        <div className="form-group pt-2 ">
                            <label htmlFor="exampleInputEmail1"><b>Facebook</b></label>
                            <input type="text"  className="form-control"  onChange={(e)=>setfacebook(e.target.value)} defaultValue={selectedcontact ? selectedcontact.facebook : null}  placeholder="Facebook" />
                            {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                        </div>     
                        </div>
                        </div>
                    
                        <div className="col-lg-6 col-md-12 col-12">
                        <div className='container'>                    
                        <div className="form-group pt-2 ">
                            <label htmlFor="exampleInputEmail1"><b>Email</b></label>
                            <input type="text" required  className="form-control"  onChange={(e)=>setemail(e.target.value)} defaultValue={selectedcontact ? selectedcontact.email : null}  placeholder="email" />
                            {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                        </div>     
                        </div>
                        </div>
                 
                        <div className="col-lg-6 col-md-12 col-12">
                        <div className='container'>                    
                        <div className="form-group pt-2 ">
                            <label htmlFor="exampleInputEmail1"><b>Instagram</b></label>
                            <input type="text"  className="form-control"  onChange={(e)=>setinstagram(e.target.value)} defaultValue={selectedcontact ? selectedcontact.instagram : null}  placeholder="instagram" />
                            {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                        </div>     
                        </div>
                        </div>
                     
                        <div className="col-lg-6 col-md-12 col-12">
                        <div className='container'>                    
                        <div className="form-group pt-2 ">
                            <label htmlFor="exampleInputEmail1"><b>Whatsapp</b></label>
                            <input type="tel" required className="form-control"  onChange={(e)=>setwhatsapp(e.target.value)} defaultValue={selectedcontact ? selectedcontact.whatsapp : null}  placeholder="whatsapp Number" />
                            {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                        </div>     
                        </div>
                        </div>
                        </div>
                    <div className='p-5 float-end d-flex justify-content-between'> 
                    <div className=''>
                    <button onClick={()=>setmodalvalue(!modalvalue) & setselectedcontact() & allproductnull()}  type='button'  className="btn btn-danger ">close</button>
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
