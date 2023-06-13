// import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import Adminlogout from './Adminlogout'
import Adminslider from './Adminslider';
import { Icon } from '@iconify/react';
// import Dropdown from 'react-bootstrap/Dropdown';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Test from './Adminexportexcel';
// import { DownloadTableExcel } from 'react-export-table-to-excel';
import { useDownloadExcel } from 'react-export-table-to-excel';
import { Simplecontext } from './Simplecontext';
import Callaxios from './Callaxios';
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {imageURL } from './Url';
import DataTable from 'react-data-table-component';
export default function Adminorder() {
  const { accesscheck } = useContext(Simplecontext)
  const [filterstatus, setfilterstatus] = useState([]);
  const [orderdata, setorderdata] = useState([]);
  const [ordersearchdata, setordersearchdata] = useState([]);
  const [filter, setfilter] = useState(1);
  const [citydata, setcitydata] = useState([]);
  const [searchvalue, setsearchvalue] = useState();
  const tableRef = useRef(null);
  const tableRef360 = useRef(null);
  const [modalvalue, setmodalvalue] = useState(false)
  const [productdata, setproductdata] = useState([]);
  const [product, setproduct] = useState()
  const [quantity, setquantity] = useState()
  const [name, setname] = useState()
  const [address, setaddress] = useState()
  const [city, setcity] = useState()
  const [mobile, setmobile] = useState()
  const [filteredproduct, setfilteredproduct] = useState();
  const [detailmodal, setdetailmodal] = useState(false);
  const [productitm, setproductitm] = useState()
  const [mutivalue, setmutivalues] = useState([])
  console.log("productseletcc",productitm)
  console.log("products",product)
  console.log("productseletcc",productitm)
  // const arr = new Array(10).fill(0)
  const componentRef = useRef();
  const handlePrint = () => {
    const originalContents = document.body.innerHTML;
    const printContents = componentRef.current.innerHTML;
    document.body.innerHTML = printContents;
    // print the component
    window.print();

    // restore the original page contents
    document.body.innerHTML = originalContents;
    setTimeout(function () {
      window.location.reload();
    }, 1000);

  };
  // console.log("multivalue",mutivalue)
  // const notify = () => toast.success('✅ Deleted Successfully!', {
  //   position: "top-center",
  // });
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
    window.scrollTo(0, 0);
    status()
    orders()
    accesscheck()
    // orderproduct()

  }, [])
  const status = async () => {
    try {
      accesscheck()
      let data = await Callaxios("get", "product/status/")
      if (data.status === 200) {
        setfilterstatus(data.data)
        setfilter([])
      } else {
        notifyerror("Something went wrong")
      }

    }
    catch (error) {
      console.log(error)
    }
  }
  const orders = async () => {
    accesscheck()
    try {
      let data = await Callaxios("get", "product/order/")
      // console.log("data",data.data)
      if (data.status === 200) {
        setorderdata(data.data)
        setordersearchdata(data.data)
      }

    }
    catch (error) {
      console.log(error)
    }
  }
  const postorder = async (e) => {
    accesscheck()
    e.preventDefault();
    try {
      // console.log("product",productdata)


      let datalist
      let msg
      console.log("productitm",productitm)
      if (productitm?productitm.id:productitm) {
        datalist = {
          id: productitm.id,
          product: product,
          customer_name: name,
          delivery_address: address,
          city: city,
          contact: mobile,

        }
        msg = "Updated Successfully"
      } else {
        console.log("orderlist")
        let datap = productdata.filter(t => t.id === parseInt(product))
        let price = quantity.split('-')[1]
        // let vat = datap[0]?.vat.toString() ?? ""
        let deliverycharge = datap[0]?.delivery_charge ?? ""
        // let vatprice = vat ? parseInt(price * 0.05) : 0

        datalist = {
          product: product,
          customer_name: name,
          delivery_address: address,
          quantity: quantity.split('-')[0],
          city: city,
          contact: mobile,
          purchasestatus: "new",
          price: price,
          delivery_charge: deliverycharge,
          // total:price+deliverycharge+vatprice
        }
        msg = "Saved Successfully"
      }

      let data = await Callaxios("post", "product/order/", datalist)
      console.log("datapost",data)
      if (data.data.Status === 200) {
        notifyadd(msg)
        setmodalvalue(!modalvalue)
        orders()
        setallnull()
      } else {
        notifyerror("Something Went Wrong ")
      }
    } catch (error) {
      console.log(error)
    }
  }
  const Getproduct = async () => {
    try {
      let data = await Callaxios("get", "product/product/")
      if (data.status === 200) {
        setproductdata(data.data)
      }
    } catch (error) {

    }
  }

  // const deleteproduct = async (id) => {
  //   // console.log("k",k)
  //   // console.log("id",id)
  //   accesscheck()
  //   let data = await Callaxios("delete", "product/order/", { "id": id })
  //   if (data.data.Status === 200) {
  //     notify()
  //     orders()
  //   }
  // }
  const Getcity = async () => {
    try {
      let data = await Callaxios("get", "product/city/")
      // console.log("datacity",data)
      if (data.status === 200) {
        setcitydata(data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const changestatus = async (itmid, statusname) => {
    accesscheck()
    let list = {
      "id": itmid,
      "purchasestatus": statusname
    }

    try {
      let data = await Callaxios("post", "product/order/", list)

      if (data.data.Status === 200) {
        orders()
        statusnotify()
      }
      else {
        console.log(data.data.Message)
        notifyerror("Something Went Wrong")
      }
    } catch (error) {
      console.log(error)
    }



  }
  const filterfunction = () => {
    // console.log("sdfdfsd",searchvalue)
    if (searchvalue) {
      let searchid = searchvalue.split('Z')[1]
      let fvalue = orderdata.filter(t => parseInt(t.id) === parseInt(searchid))
      setordersearchdata(fvalue)
    }
    else { setordersearchdata(orderdata) }
  }
  const exporthadndler = () => {
    confirmAlert({
      title: "Export",
      message: `Select the excel template!`,
      buttons: [
        {
          label: "J&T Express",
          onClick: () => onDownloadTable1(),
        },
        {
          label: "360 Express",
          onClick: () => onDownloadTable2(),
        }
      ],

    });
  };
  const setallnull = () => {
    setproductitm('')
    setproduct('')
    setquantity('')
    setaddress('')
    setcity('')
    setmobile('')
    setname('')
  }
  const productedithandler = (itm) => {
    // console.log("contac",itm)
    setproductitm(itm)
    setproduct(itm.product[0].id)
    setquantity(itm.quantity)
    setaddress(itm.delivery_address)
    setcity(itm.city)
    setmobile(itm.contact)
    setname(itm.customer_name)
  }
  const filterproduct = (id) => {

    const productvalue = productdata.filter(t => t.id === parseInt(id))[0]
    // console.log("productvalue",productvalue.price_list?"data":"none")
    setfilteredproduct(productvalue)
  }
  const saveproducthandler = async () => {
    accesscheck()
    // console.log("productitm",productitm)
    try {
      let datalist = Object.assign({}, productitm);
      delete datalist['product']
      delete datalist['status']
      // console.log("datalist",datalist)
      let data = await Callaxios("post", "product/order/", datalist)
      // console.log("data",data)
      if (data.data.Status === 200) {
        notifyadd("Saved Successfully")
        orders()
      } else {
        notifyerror("Something went wrong")
      }
    } catch (error) {
      notifyerror("Something went wrong")
    }
  }
  // console.log("dtaquannit",quantity)
  let mutipleselectvalue =(filter.length === 0 ? ordersearchdata : ordersearchdata.filter(t => parseInt(t.status[0].id) === parseInt(filter.id)))
  
  const Multiselect = (itm) => {
    // console.log("itm",itm)
    if (itm === "all") {
      let idlist = []
      // console.log("orderdata",orderdata)
      // console.log("filter",filter)
      let orderslist =(filter.length === 0 ? ordersearchdata : ordersearchdata.filter(t => parseInt(t.status[0].id) === parseInt(filter.id)))
      // console.log("orderlist",orderslist)
      orderslist.forEach(element => {
        idlist.push(element.id)
      });
      // console.log("idlist",idlist)

      setmutivalues([...idlist])
    } else {
      let valuelist = mutivalue
      valuelist.push(parseInt(itm))
      setmutivalues([...valuelist])
      // console.log("multibvak",mutivalue)
    }
  }
  const Deleteselect = (itm) => {
    // console.log("itmdelete",itm)
    if (itm === "all") {
      setmutivalues([])
    } else {
      let valuelist = mutivalue
      var index = valuelist.indexOf(parseInt(itm));
      // console.log("index",index)
      if (index !== -1) {
        valuelist.splice(index, 1);
      }
      setmutivalues([...valuelist])
    }
  }


  const { onDownload: onDownloadTable1 } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: 'J&T Express Upload',
    sheet: 'Order'
  })
  const { onDownload: onDownloadTable2 } = useDownloadExcel({
    currentTableRef: tableRef360.current,
    filename: '360 Express ',
    sheet: 'Order'
  })

  const MultiStatuschange = (valuestatus) => {
    // console.log("value",valuestatus)
    try {
      if (mutivalue.length) {
        var itemsProcessed = 0;
        
        mutivalue.forEach(async(element) => {
          let list = {
            "id": element,
            "purchasestatus": valuestatus
          }
          let data = await Callaxios("post", "product/order/", list)
          // console.log("daata",data)
          if (data.status === 200) {
            // console.log("datadone")
            itemsProcessed++;
            if (itemsProcessed === mutivalue.length) {
              // console.log("ok")
              orders();
              setmutivalues([])
              notifyadd("Status updated")
            }
          }
        });
      }
    } catch (error) {
    }
  }
  const columns =[
    
    {
      name: <div><input type="checkbox" id="" checked={mutivalue.length===mutipleselectvalue.length} value="all" onChange={(e) => e.target.checked ? Multiselect(e.target.value) : Deleteselect(e.target.value)} /><br/>#</div>,
      selector: (itm,index) => <div><input type="checkbox" id="" checked={mutivalue.includes(itm.id) ? mutivalue.includes(itm.id) : false} value={itm.id} onChange={(e) => e.target.checked ? Multiselect(e.target.value) : Deleteselect(e.target.value)} /><br />{(mutipleselectvalue.indexOf(itm) + 1)}</div>,
      width:"50px",
    },
    {
      name:"ORDER.NO",
      selector : (itm)=><div style={{ cursor: "pointer" }} onClick={() => setdetailmodal(!detailmodal) & setproductitm(itm)} >JE{itm.created_date.split('T')[1].split('.')[1]}{itm.id}</div>,
      width:"auto",
    },
    {
      name:"PRODUCT",
      selector : (itm)=><div className='flex text-start'>
      {itm.product ? itm.product[0].title : ""}<br />
      <img className='rounded  ' style={{ width: "50px" }} src={itm.product ? itm.product[0].images[0] ? imageURL + itm.product[0].images[0].image : null : null} alt="product" />
    </div>,
    // width:"auto"
    },
    {
      name:"CUSTOMER",
      selector : (itm)=>itm.customer_name,
    },
    {
      name:"CONTACT",
      selector : (itm)=>itm.contact,
      width:"auto"
    },
    {
      name:"CITY",
      selector : (itm)=>itm.city,
    },
    {
      name:"STATUS",
      selector : (itm)=> <div className='pt-3  mb-2 '>
      <div className=''>
        <span className='font-bold p-2' style={{ backgroundColor: itm.status[0].color, borderRadius: "4px", color: "white", fontWeight: "500" }}>{itm.status[0].status}</span>
      </div><br />
      <div>
        <select defaultValue={''} onChange={(e) => changestatus(itm.id, e.target.value)} >
          {filterstatus ? <>
            <option value={''} hidden>change status</option>

            {filterstatus.map((item, k) => (
              <option key={k} value={item.status} style={{ backgroundColor: item.color, padding: "4px", borderRadius: "3px" }} >{item.status}</option>
            ))}
          </> : null}
        </select>
      </div>

    </div>,
    width:"150px",
    },
    {
      name:"DATE",
      selector : (itm)=>(itm.created_date).split('T')[0],
    },
    {
      name:"ACTION",
      selector : (itm)=> <div className='d-flex'>
      <button onClick={() => productedithandler(itm) & setmodalvalue(!modalvalue) & Getproduct() & Getcity()} className='h-auto w-auto rounded d-flex text-white p-1 bg-warning mr-1 mb-1' ><Icon icon="clarity:note-edit-line" width="20" height="20" />Edit </button><br />
    </div>,
    width:"100px"
    },
    
  ]
  const customStyles = {
    cells: {
      style: {
        border: "0.5px solid #f5f2f2 ",
        
      },
    },
    
    headCells: {
      style: {
        minHeight: '40px',
        border:"0.5px solid #e8e2e2 ",
        borderTopWidth: '1.5px'
      },
    
    },
    filter:{
      style:{
        border:"1px solid gray",
      }
    }
 
  };
  return (
    <div >
      <Adminslider />

      <div className=" vh-100 overflow-auto" style={{ backgroundColor: "#c3d5d5" }}>
        <Adminlogout />
        <ToastContainer />
        <div className="col-12 row " >
          <div className='col-md-2 col-1'>
          </div>
          <div className='col-md-10 col-11'>
            <div className='pt-0 ps-md-0' >
              <div className='  bg-white  shadow-lg overflow-auto' style={{ width: "100%", borderRadius: ".80rem" }}>
                <div className='d-flex pt-2' style={{ color: "rgb(245, 189, 7)" }}>
                  <Icon icon="icon-park-twotone:order" width="40" height="23" /> <p className='fw-bolder'> Orders</p>
                </div>

                {/* filterstart */}

                <div className="filter-sort- d-flex   flex-wrap justify-content-center">

                  <div className="filter-sorting justify-content-end">
                    <div className="collection-sorting position-relative ">
                      <div className="sorting-header  d-flex align-items-center justify-content-end">
                        <span className="sorting-title me-2"><b>Sort by:</b></span>
                        <span className="active-sorting" style={filter.length !== 0 ? { backgroundColor: filter.color, color: "white", padding: "3px", borderRadius: "3px" } : null}>{filter.length !== 0 ? filter.status : <b>All</b>}</span>
                        <span className="sorting-icon">
                          <svg className="icon icon-down" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </span>
                      </div>

                      <ul className="sorting-lists list-unstyled md-10 w-auto text-center">
                        <li className="text_14" style={{ backgroundColor: "white", padding: "4px", borderRadius: "3px" }} onClick={() => setfilter([])&setmutivalues([])}> All </li>
                        {filterstatus.map((itm, k) => (
                          <li onClick={() => setfilter(itm) &setmutivalues([])} key={k}><span style={{ backgroundColor: itm.color, padding: "4px", borderRadius: "3px", color: "white", fontWeight: "500" }} className="text_14">{itm.status}</span></li>
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
                      <input type="Name" id="typeEmailX" placeholder='Search Order by SN no' onChange={(e) => setsearchvalue(e.target.value)} className="form-control border-0 form-control-sm " />
                      <button className='btn-sm btn-warning  ' onClick={filterfunction} ><Icon icon="ant-design:search-outlined" width="20" height="20" /></button>
                    </div>

                  </div>
                  <div className='col-4 col-md-6 p-2 '>
                    {/* <button onClick={()=>setmodalvalue(!modalvalue)} className='btn-sm btn-info text-white float-end'>Add New</button> */}
                    {/* excel export button start */}
                    {/* <DownloadTableExcel
                    filename="Order table"
                    sheet="Orders"
                    currentTableRef={tableRef.current}
                > */}
                    <div className='ps-4 '>
                      <button onClick={() => mutivalue.length ? exporthadndler() : notifyerror("No Order Selected")} className='btn-sm btn-danger text-white float-end'  > Export to excel </button>
                    </div>
                    {/* </DownloadTableExcel> */}
                    {/* excel export button end */}
                  </div>
                  <div className='row col-12'>
                    <div className='ml-4  col-6'  >
                      <select defaultValue={''} onChange={(e) => MultiStatuschange(e.target.value)} style={mutivalue.length===0?{display:'none'}:{display:'block',marginLeft: "20px"}} >
                        {filterstatus ? <>
                          <option value={''} disabled>change status</option>

                          {filterstatus.map((item, k) => (
                            <option key={k} value={item.status} style={{ backgroundColor: item.color, padding: "4px", borderRadius: "3px" }} >{item.status}</option>
                          ))}
                        </> : null}
                      </select>
                    </div>
                    <div className=' col-6'>
                      <button onClick={() => setmodalvalue(!modalvalue) & Getproduct() & Getcity()} className='btn-sm btn-info text-white float-end'>Add New</button>
                    </div>
                  </div>
                </div>

                <div className='container pt-md-2 pt-2'>
                <DataTable
                  pagination
                  highlightOnHover
                  columns={columns}
                  data={(filter.length === 0 ? ordersearchdata : ordersearchdata.filter(t => parseInt(t.status[0].id) === parseInt(filter.id)))}               
                  defaultSortField="_id"
                  defaultSortAsc={false}               
                  paginationRowsPerPageOptions={[10,20,50,100]}
                  // fixedHeader
                  // fixedHeaderScrollHeight='63vh'
                  // className="tablereact  tablereact "
                  customStyles={customStyles}
                />
                
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* excelexport table startrs */}
         
      <table ref={tableRef} hidden>
        <tbody>
          <tr style={{backgroundColor:"yellow"}}>
            <th scope="col">Customer Order Number</th>
            <th scope="col">*Receiver name</th>
            <th scope="col">*Receiver phone number</th>
            <th scope="col">Receiver Backup NO.</th>
            <th scope="col">Receiver province</th>
            <th scope="col">*Receiver city</th>
            <th scope="col">Receiver street</th>
            <th scope="col">Receiver District</th>
            <th scope="col">*Receiver address</th>
            <th scope="col">Receiver email</th>
            <th scope="col">Receiver company name</th>
            <th scope="col">*Product type</th>
            <th scope="col">Payment type</th>
            <th scope="col">PACKAGE</th>
            <th scope="col">*Item type</th>
            <th scope="col">*Item weight (kg)</th>
            <th scope="col">*Item name</th>
            <th scope="col">*Is it insured?</th>
            <th scope="col">Declared value</th>
            <th scope="col">Platform name</th>
            <th scope="col">Customer account</th>
            <th scope="col">COD amount</th>
            <th scope="col">Currency type</th>
            <th scope="col">*Customer unpacking inspection</th>
            <th scope="col">Notes</th>

          </tr>
          {orderdata.length ? orderdata.filter(t => mutivalue.includes(t.id)).map((itm, k) => (
            <tr key={k}>

              <td>JE{itm.created_date.split('T')[1].split('.')[1]}{itm.id}</td>
              <td>{itm.customer_name}</td>
              <td>{itm.contact}</td>
              <td></td>
              <td>{itm.city}</td>
              <td>{itm.city}</td>
              <td></td>
              <td></td>
              <td>{itm.delivery_address}</td>
              <td></td>
              <td></td>
              <td></td>
              <td>Cash</td>
              <td></td>
              <td></td>
              <td>{itm.quantity}  </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>{parseFloat(parseFloat(itm.price * itm.quantity) + parseFloat(itm.delivery_charge ? itm.delivery_charge : 0) + parseFloat(itm.product[0].vat ? itm.price * parseFloat(0.05) : 0)).toFixed()}</td>
              <td>AED</td>
              <td></td>
              <td>{itm.product ? itm.product[0].title : ""} </td>
              
              {/* <td>{itm.product ? itm.product[0].code : ""} </td>
              <td>{itm.delivery_charge}</td>
              
              <td>{itm.quantity}</td>
              <td>{itm.price}</td>
              <td>{itm.product ? itm.product[0].vat ? (itm.price * 0.05).toFixed(2) : 0 : 0}</td>
              <td>{parseFloat(parseFloat(itm.price * itm.quantity) + parseFloat(itm.delivery_charge ? itm.delivery_charge : 0) + parseFloat(itm.product[0].vat ? itm.price * parseFloat(0.05) : 0)).toFixed()}</td>
              <td>{itm.size === 0 ? "" : itm.size}</td>
              <td>{itm.color}</td> */}

            </tr>
          )) : null}


        </tbody>
      </table>
      <table ref={tableRef360} hidden>
        <tbody>
          <tr>
            <th ></th>
            <th ></th>
            <th colSpan={12} style={{backgroundColor:"#ffff80"}}>Shipper Information</th>
            <th colSpan={11} style={{backgroundColor:"#40bf80"}}>Consignee Information</th>
            <th colSpan={6} style={{backgroundColor:"#80bfff" }}>Package Details</th>
            <th colSpan={6} style={{backgroundColor:"#ffcccc" }}>Item Details</th>
            <th colSpan={1} >Fulfillment</th>
            <th colSpan={4} >Freight</th>
            <th colSpan={3} >Delivery Charge</th>
            <th colSpan={2} >COD</th>
          </tr>
          <tr >
            <th scope="col">Client ID</th>
            <th scope="col">Booking Type</th>
            <th scope="col">Shipper Reference</th>
            <th scope="col">Name</th>
            <th scope="col">Company Name</th>
            <th scope="col">Contact</th>
            <th scope="col">Alternate Contact</th>
            <th scope="col">Email</th>
            <th scope="col">Address</th>
            <th scope="col">Area</th>
            <th scope="col">Postal Code</th>
            <th scope="col">Country</th>
            <th scope="col">City</th>
            <th scope="col">State</th>
            <th scope="col">Name</th>
            <th scope="col">Company Name</th>
            <th scope="col">Contact</th>
            <th scope="col">Alternate Contact</th>
            <th scope="col">Email</th>
            <th scope="col">Address</th>
            <th scope="col">Area</th>
            <th scope="col">Postal Code</th>
            <th scope="col">Country</th>
            <th scope="col">City</th>
            <th scope="col">State</th>
            <th scope="col">Package Type</th>
            <th scope="col"> H</th>
            <th scope="col"> W</th>
            <th scope="col"> L</th>
            <th scope="col"> Weight</th>
            <th scope="col"> Pieces</th>
            <th scope="col"> Item Description</th>
            <th scope="col"> SKU</th>
            <th scope="col"> HS Code</th>
            <th scope="col"> Country of Origin</th>
            <th scope="col"> Declared Value</th>
            <th scope="col"> Item Quantity</th>
            <th scope="col"> Fulfillment Location</th>
            <th scope="col"> Declared Value Currency</th>
            <th scope="col"> Currency</th>
            <th scope="col">Amount</th>
            <th scope="col">Payer</th>
            <th scope="col">Currency</th>
            <th scope="col">Amount</th>
            <th scope="col">Payer</th>
            <th scope="col">Currency</th>
            <th scope="col">Amount</th>
            {/* <th scope="col">Customer Order Number</th>
            <th scope="col">*Receiver name</th>
            <th scope="col">*Receiver phone number</th>
            <th scope="col">Receiver Backup NO.</th>
            <th scope="col">Receiver province</th>
            <th scope="col">*Receiver city</th>
            <th scope="col">Receiver street</th>
            <th scope="col">Receiver District</th>
            <th scope="col">*Receiver address</th>
            <th scope="col">Receiver email</th>
            <th scope="col">Receiver company name</th>
            <th scope="col">*Product type</th>
            <th scope="col">Payment type</th>
            <th scope="col">PACKAGE</th>
            <th scope="col">*Item type</th>
            <th scope="col">*Item weight (kg)</th>
            <th scope="col">*Item name</th>
            <th scope="col">*Is it insured?</th>
            <th scope="col">Declared value</th>
            <th scope="col">Platform name</th>
            <th scope="col">Customer account</th>
            <th scope="col">COD amount</th>
            <th scope="col">Currency type</th>
            <th scope="col">*Customer unpacking inspection</th>
            <th scope="col">Notes</th> */}
          </tr>
          {orderdata.length ? orderdata.filter(t => mutivalue.includes(t.id)).map((itm, k) => (
            <tr key={k}>
              <td></td>
              <td>JE{itm.created_date.split('T')[1].split('.')[1]}{itm.id}</td>
              <td>{itm.customer_name}</td>
              <td>{itm.contact}</td>
              <td></td>
              <td>{itm.city}</td>
              <td>{itm.city}</td>
              <td></td>
              <td></td>
              <td>{itm.delivery_address}</td>
              <td></td>
              <td></td>
              <td></td>
              <td>Cash</td>
              <td></td>
              <td></td>
              <td>{itm.quantity}  </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>{parseFloat(parseFloat(itm.price * itm.quantity) + parseFloat(itm.delivery_charge ? itm.delivery_charge : 0) + parseFloat(itm.product[0].vat ? itm.price * parseFloat(0.05) : 0)).toFixed()}</td>
              <td>AED</td>
              <td></td>
              <td>{itm.product ? itm.product[0].title : ""} </td>
              
              {/* <td>{itm.product ? itm.product[0].code : ""} </td>
              <td>{itm.delivery_charge}</td>
              
              <td>{itm.quantity}</td>
              <td>{itm.price}</td>
              <td>{itm.product ? itm.product[0].vat ? (itm.price * 0.05).toFixed(2) : 0 : 0}</td>
              <td>{parseFloat(parseFloat(itm.price * itm.quantity) + parseFloat(itm.delivery_charge ? itm.delivery_charge : 0) + parseFloat(itm.product[0].vat ? itm.price * parseFloat(0.05) : 0)).toFixed()}</td>
              <td>{itm.size === 0 ? "" : itm.size}</td>
              <td>{itm.color}</td> */}

            </tr>
          )) : null}


        </tbody>
      </table>

      <div className="modal fade show" tabIndex={-1} id="quickview-modal" aria-modal="true" role="dialog" style={modalvalue ? { display: 'block', paddingLeft: "20%", paddingRight: "2%" } : { display: 'none' }}>
        <div className="modal-dialog modal-dialog-centered modal-xl w-md-50">
          <div className="modal-content">
            <div className="modal-header border-0">
              <div className='d-flex pt-3' style={{ color: "rgb(245, 189, 7)" }}>
                <p className='fw-bolder ps-4'>Add Order</p>
              </div>
              <button onClick={() => setmodalvalue(!modalvalue) & setallnull()} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            {/* {idproduct.map((itm,k)=>( */}
            <div className="modal-body">
              <form onSubmit={(e) => postorder(e)} >

                <div className="row col-12">
                  <div className="col-lg-6 col-md-12 col-12">
                    <div className='container'>
                      <div className="form-group pt-2 ">
                        <label htmlFor="exampleInputmobile"><b>Name</b></label>
                        <input type="text" required onChange={(e) => setname(e.target.value)} value={name} className="form-control" placeholder="Enter Name" />
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12 col-12">
                    <div className='container'>
                      <div className="form-group pt-2 ">
                        <label htmlFor="exampleInputmobile"><b>Mobile</b></label>
                        <input type="tel" required onChange={(e) => setmobile(e.target.value)} value={mobile} className="form-control" placeholder="Enter Mobile +971..." />
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12 col-12">
                    <div className='container'>
                      <div className="form-group pt-2 ">
                        <label htmlFor="exampleInputEmail1"><b>Address</b></label>
                        <input type="text" required onChange={(e) => setaddress(e.target.value)} value={address} className="form-control" placeholder="Enter Address" />
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                      </div>
                    </div>
                  </div>



                  <div className="col-lg-6 col-md-12 col-12">
                    <div className='container'>
                      <div className="form-group pt-2 ">
                        <label htmlFor="exampleInputEmail1"><b>city</b></label>
                        <select required onChange={(e) => setcity(e.target.value)} value={city} className='form-control w-full'>
                          <option value='' hidden >Select City</option>
                          {citydata ? citydata.map((citm, ck) => (
                            <option key={ck} value={citm.city_name}>{citm.city_name}</option>
                          )) : null}
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
                        <select required onChange={(e) => setproduct(e.target.value) & filterproduct(e.target.value)} value={product} className='form-control w-full'>
                          <option value='' hidden >Select Product</option>
                          {productdata ? productdata.map((pitm, pk) => (
                            <option key={pk} value={pitm.id}>{pitm.title}</option>
                          )) : null}
                        </select>
                        {/* <input type="text" required className="form-control"   placeholder="Category Name" /> */}
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                      </div>
                    </div>
                  </div>


                  <div className="col-lg-6 col-md-12 col-12" style={productitm ? productitm.id ? { display: "none" } : { display: 'block' } : {}}>
                    <div className='container'>
                      <div className="form-group pt-2 ">
                        <label htmlFor="exampleInputEmail1"><b>Quantity<span className='text-danger'>*</span></b></label>
                        <select onChange={(e) => setquantity(e.target.value)} value={quantity} className='form-control w-full'>
                          <option value='' hidden >Select quantity</option>
                          {filteredproduct ? filteredproduct.price_list ? filteredproduct.price_list.split(',').map((pitm, pk) => (
                            <option key={pk} value={pitm}>{pitm} AED</option>
                          )) : Array(10).fill(0).map((itm, k) => (
                            <option key={k} value={`${k + 1 + "-" + (filteredproduct.price) * (k + 1)}`}  >{`${k + 1 + "-" + (filteredproduct.price) * (k + 1)}`} AED</option>
                          ))
                            : null}
                        </select>
                        {/* <input type="number" required onChange={(e)=>setquantity(e.target.value)} value={quantity} className="form-control"  placeholder="Enter Quantity" /> */}
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                      </div>
                    </div>
                  </div>

                </div>
                <div className='p-5 float-end d-flex justify-content-between'>
                  <div className=''>
                    <button onClick={() => setmodalvalue(!modalvalue) & setallnull()} type='button' className="btn btn-danger ">close</button>
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
      <div className="modal fade show" tabIndex={-1} id="quickview-modal" aria-modal="true" role="dialog" style={detailmodal ? { display: 'block', paddingLeft: "20%", paddingRight: "2%" } : { display: "none" }}>
        <div className="modal-dialog modal-dialog-centered modal-xl w-md-50">
          <div className="modal-content">
            <div className="modal-header border-0 pb-0">
              <div className='d-flex pt-0 ' style={{ color: "rgb(245, 189, 7)" }}>
                <p className='fw-bolder ps-2'>Order Details</p>
              </div>
              <button onClick={() => setdetailmodal(!detailmodal) & setproductitm('')} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            {/* {idproduct.map((itm,k)=>( */}
            <div className="modal-body  ">
              <div className='text-end'>
                <button onClick={handlePrint} className='h-auto w-auto rounded text-white p-1 bg-danger ' ><Icon icon="material-symbols:print-outline-rounded" width="20" height="20" /> Print</button>
              </div>
              <div ref={componentRef} className="print-section">
                <div>
                  <b>OrderNo / Date : </b><span> JE{productitm ? productitm.created_date.split('T')[1].split('.')[1] + productitm.id : null} / {productitm ? productitm.created_date.split('T')[0] : null} </span><b></b><br />
                  <b>Customer : </b><span> {productitm ? productitm.customer_name : null}</span><br />
                  <b>Address : </b><span> {productitm ? productitm.delivery_address : null}</span><br />
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
                      <td className="border border-slate-700 ... text-start p-2">{productitm ? productitm.product[0].title : null}<br />
                        <img className='rounded  ' style={{ width: "50px" }} src={productitm ? productitm.product[0].images[0] ? imageURL + productitm.product[0].images[0].image : null : null} alt="product" />
                      </td>
                      <td className="border border-slate-700 ..."><input type="text" className='inputclass_order' onChange={(e) => setproductitm({ ...productitm, color: e.target.value })} value={productitm ? (productitm.color === null ? "" : productitm.color) : ""} placeholder="color"></input></td>
                      <td className="border border-slate-700 ..."><input type="number" className='inputclass_order' onChange={(e) => setproductitm({ ...productitm, size: e.target.value })} value={productitm ? (productitm.size === 0 ? "" : productitm.size) : ""} placeholder="size"></input></td>
                      <td className="border border-slate-700 ..."><input type="number" className='inputclass_order' onChange={(e) => setproductitm({ ...productitm, price: e.target.value })} value={productitm ? (productitm.price) : ""}></input></td>
                      <td className="border border-slate-700 ..."><input type="number" className='inputclass_order' onChange={(e) => setproductitm({ ...productitm, quantity: e.target.value })} value={productitm ? (productitm.quantity) : ""}></input></td>
                      <td className="border border-slate-700 ..."><input type="number" className='inputclass_order' onChange={(e) => setproductitm({ ...productitm, delivery_charge: e.target.value })} value={productitm ? (productitm.delivery_charge) : ""}></input></td>
                      <td className="border border-slate-700 ...">{productitm ? productitm.product[0].vat ? (productitm.price * 0.05).toFixed(2) : 0 : null}</td>

                      <td className="border border-slate-700 ...">{productitm ? productitm.price * productitm.quantity : null}</td>
                      <td className="border border-slate-700 ... print-only"><button onClick={() => saveproducthandler()} className='h-auto w-auto rounded text-white p-1 bg-warning ' ><Icon icon="material-symbols:save-as-outline" width="20" height="20" /> Save</button></td>
                    </tr>
                    <tr  >
                      <td colSpan={3} className="border border-slate-700 ... p-2">Delivery Note : </td>
                      <td colSpan={6} className="border border-slate-700 ..."></td>
                    </tr>
                    <tr  >
                      <td colSpan={3} className="border border-slate-700 ... p-2">Price: </td>
                      <td colSpan={6} className="border border-slate-700 ... p-2">{productitm ? productitm.price * productitm.quantity : null}</td>
                    </tr>
                    <tr  >
                      <td colSpan={3} className="border border-slate-700 ... p-2">Shipping Fee: </td>
                      <td colSpan={6} className="border border-slate-700 ... p-2">{productitm ? productitm.delivery_charge : null}</td>
                    </tr>
                    <tr  >
                      <td colSpan={3} className="border border-slate-700 ... p-2">VAT: </td>
                      <td colSpan={6} className="border border-slate-700 ... p-2">{productitm ? productitm.product[0].vat ? (productitm.price * 0.05).toFixed(2) : 0 : null}</td>
                    </tr>
                    <tr  >
                      <td colSpan={3} className="border border-slate-700 ... p-2">Total: </td>
                      <td colSpan={6} className="border border-slate-700 ... p-2">{productitm ? parseFloat(parseFloat(productitm.price * productitm.quantity) + parseFloat(productitm.delivery_charge ? productitm.delivery_charge : 0) + parseFloat(productitm.product[0].vat ? productitm.price * parseFloat(0.05) : 0)).toFixed() : null}</td>
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
