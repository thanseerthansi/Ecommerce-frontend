import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Footer from './Footer'
import Header from './Header'
import Slider from './Sliders'
// import ReactTooltip from 'react-tooltip';
import { Icon } from '@iconify/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





export default function Home() {
  const [product,setproduct]=useState([]);
  const [prdquantity,setprdquantity]=useState(null);
  const [modalvalue,setmodalvalue]=useState(false);
  const [viewcart,setviewcart]=useState([]);
  const [idproduct,setidproduct]=useState();
  const [selectedimage,setselectedimage]=useState(null);
  const [city,setcity]=useState([]);
  const [selectcity,setselectcity]=useState();
  const [customername,setcustomername]=useState();
  const [contact,setcontact]=useState();
  const [address,setaddress]=useState();
  const [order,setorder]=useState([]);
  const [checkoutorder,setcheckoutorder]=useState([]);
  const [myordermodal,setmyordermodal]=useState(false)
  const [category,setcategory]=useState([])
  const [filtercat,setfiltercat]=useState();
  // const [checkerror,setcheckerror]=useState()
  console.log("cartcheckoutorder",checkoutorder)
  const notify = () => toast.success('✅ Added to Cart!', {
    position: "top-left",
    });
  const notifyadd = () => toast.success('✅ Order has been placed successfully!', {
    position: "top-left",
    });
  const notifyquantity = () => toast.error('Add Quantity!', {
    position: "top-center",
    });
  const notifycheck = () => toast.error('Please fill required fields!', {
    position: "top-center",
    });
  // console.log("dta",idproduct[0].title)
  useEffect(()=>{
    Getproduct() 
    Getcity()
    Getcategory()
    // window.localStorage.setItem('checkoutorder',[])
    let orderlist = window.localStorage.getItem('checkoutorder')
    // checkoutorder
    // console.log("orderlis3",JSON.parse(orderlist))
    try {
      if (window.localStorage.getItem('checkoutorder').length){
        // console.log("listpresent")
        setcheckoutorder(JSON.parse(orderlist))  
      }else{}      
    } catch (error) {} 
    let cartadd = window.localStorage.getItem('cart')
    try {
      if (window.localStorage.getItem('cart').length){
        setviewcart(JSON.parse(cartadd))  
      }else{}      
    } catch (error) {}    
  },[]);
  const Getcategory = ()=>{axios.get("http://127.0.0.1:8000/product/category/").then(response=>{
    // console.log("response",response.data[0])
    setcategory(response.data);
    setfiltercat(response.data[0]);
    })
    .catch(err => console.warn("error",err));
  };
  const Getproduct = ()=>{axios.get("http://127.0.0.1:8000/product/product/",{params:{"status":"True"}}).then(response=>{
    // console.log("responsefilter",response.data.filter(t=>parseInt(t.category[0].id) === parseInt(2)))
    // console.log("responsecat",response.data)
    setproduct(response.data);
    })
    .catch(err => console.warn("error",err));
  };
  const Getcity = ()=>{axios.get("http://127.0.0.1:8000/product/city/").then(response=>{
    // console.log("response",response.data)
    setcity(response.data);
    })
    .catch(err => console.warn("error",err));
  };
  const productid = (itm)=>{
    setidproduct(itm);
    setmodalvalue(!modalvalue)
   
  };

  const addtocart =(itm,p_quantity)=>{
    
    // console.log("",itm)
    // console.log("itm",itm)
    // console.log("quantity",p_quantity)
    let quan = p_quantity.split('-')[0]
    let price = p_quantity.split('-')[1]
    // console.log("quantity",quan)
    // console.log("price",price)
    let productdata = {"product":itm,
      "quantity":quan,
      "subtotal":price
      }
      let cart = viewcart.concat(productdata)
      setviewcart(cart)
      // console.log("vewcart",cart)
      window.localStorage.setItem('cart',JSON.stringify(cart))
      // setprdquantity(1)
      notify()
      setorder([])
      if (modalvalue===true){setmodalvalue(!modalvalue)}
    
      
  }
  const handlerincrement = (itm,k)=>{
    // console.log("itm",itm.split('-')[0])
    let quantity = itm.split('-')[0] 
    let price = itm.split('-')[1]
    viewcart[k].quantity= quantity
    viewcart[k].subtotal=price
    setviewcart(() => [ ...viewcart]); 
    // console.log("vewcart",viewcart)
    window.localStorage.setItem('cart',JSON.stringify(viewcart))
    // console.log("daaa",window.localStorage.getItem('cart'))
  }

  // const Handlerdecrement = (k)=>{
  //   if(viewcart[k].quantity>1 ){
  //     viewcart[k].quantity=viewcart[k].quantity-1
  //     viewcart[k].subtotal=viewcart[k].subtotal-viewcart[k].product.price
  //     setviewcart(() => [ ...viewcart]);
  //     window.localStorage.setItem('cart',JSON.stringify(viewcart))
  //   } 
  // }

  const removeproduct = (k) => {
    // console.log("kkkkkkkk",k.k)
    const splc = viewcart
    // console.log("splc",splc) 
    splc.splice(k.k,1)
    setviewcart(() => [ ...splc]);
    // setviewcart(splc);
    window.localStorage.setItem('cart', viewcart)
    setorder([])
     
  };


  const missorder = (productlist)=>{
    if(customername&&contact&&selectcity!==undefined&&address){
      if (order.length){console.log("full")   
    }
      else{
        let list =[];
        productlist.forEach(element => {
          const data = {
            "customer_name":customername,
            "product":element.product.id,
            "contact":contact,
            "city":selectcity
          } 
          list.push(data)
          }
        );
        setorder(list)
        // console.log("order",list)
        // postmissorder(list)
        axios({
          method: 'post',
          url: 'http://127.0.0.1:8000/product/missingorder/',
          // headers:headers,
          data:list,
        }).then(response => {
            // console.log(response.data);
            if (response.data.Status === 200){
              // console.log(response.data);
            }else{console.log(response.data.Message)}
          })
          .catch((error) => {
            alert("error")
            console.log(error)
          })
      }}}
    const checkout = (productlist,total,delivery) =>{
      if(customername&&contact&&selectcity!==undefined&&address){
        let list =[];
        productlist.forEach(element => {
          // console.log("quantity",element)
          const data = {
            "customer_name":customername,
            "product":element.product.id,
            "quantity":element.quantity,
            "delivery_address":address,
            "total":total+delivery+(total/10),
            "subtotal_price":total,
            "delivery_charge":delivery,
            "subtotal":element.subtotal,
            "purchasestatus":"NEW",
            "contact":contact,
            "city":selectcity
          } 
          list.push(data)
          }
        );
        setorder(list)
        // console.log("listview",list)
        axios({
          method: 'post',
          url: 'http://127.0.0.1:8000/product/order/',
          // headers:headers,
          data:list,
        }).then(response => {
            // console.log(response.data.Status);
            if (response.data.Status ===200){
              console.log(response.data);
              // add to orderlist
              let ordlist =[];
              productlist.forEach(element => {
                // console.log("quantity",element)
                const ord = {
                  "product":element.product,
                  "quantity":element.quantity,
                  "total":total+delivery+(total/10),
                  "vat":total/10,
                  "subtotal_price":total,
                  "delivery_charge":delivery,
                  "subtotal":element.subtotal,
                } 
                ordlist.push(ord)
                }
              );
              let broughtorder = checkoutorder.concat(ordlist)
              console.log("broughtorder",broughtorder)
              setcheckoutorder(broughtorder)
              window.localStorage.setItem("checkoutorder",JSON.stringify(broughtorder))
              setviewcart([])
              window.localStorage.removeItem('cart')
              notifyadd()
            }else{console.log(response.data.Message)}
          })
          .catch((error) => {
            alert("error")
            console.log(error)
          })
        }else{notifycheck()}
    }
  return (
    <div>      
        <Header show={myordermodal} setshow={setmyordermodal}/>
   
        <Slider/> 
    
        <br/><br/>
        
        <ToastContainer />
    
        <div>
        <div className='container' >
        {filtercat ?  
        <h3 className='text-center'><u><b>{filtercat.category_type}</b></u></h3> :null}
       <div className="">
       <div className="filter-sort- d-flex  flex-wrap justify-content-end">
  <div className="filter-sorting justify-content-end">
    <div className="collection-sorting position-relative ">
          
          <div className="sorting-header text_16 d-flex align-items-center   justify-content-end">
           
            {/* {filtercat.id} */}
            <span className="sorting-title me-2"><b>Sort by:</b></span>
            {filtercat ? <span className="active-sorting">{filtercat.category_type}</span> :null}
            {/* <span className="active-sorting">{filtercat.category_type}</span> */}
            <span className="sorting-icon">
              <svg className="icon icon-down" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </span>
          </div>
          <ul className="sorting-lists list-unstyled md-10 w-25">
            {category.map((itm,k)=>(
              <li key={k} onClick={()=>setfiltercat(itm)}><span  className="text_14">{itm.category_type}</span></li>
            ))}
            
            
          </ul>
          
        </div></div></div>
        {/* <div className="filter-drawer-trigger mobile-filter d-flex align-items-center d-lg-none">
          <span className="mobile-filter-icon me-2">
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-filter">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
          </span>
          <span className="mobile-filter-heading">Filter and Sorting</span>
        </div> */}
      </div>

        <br/>
        <div className="row">
        {/* <div style={{wrapFlex:"wrap",float:"left"}} className="col-lg-3 col-md-6 col-6 aos-init aos-animate" data-aos="fade-up" data-aos-duration={700} > */}
        {filtercat ?<>
        { product.filter(t=>parseInt(t.category[0].id) === parseInt(filtercat.id)).map((itm,k)=>(      
        <div key={k}  className="col-lg-3 col-md-6 col-6 aos-init col-md"  data-aos="fade-up" data-aos-duration={700} >
          <div  className="product-card"  style={{padding:"20px"}}>
            <div className="product-card-img">
              <button className="hover-switch" onClick={()=>productid(itm) }>
                {/* <img className="secondary-img" src="assets/img/products/furniture/10.jpg" alt="product-img" /> */}
                {/* {itm.images[0]?  */}
                <img className="primary-img" src={itm.images[0] ?
                itm.images[0].image : 'https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png'} alt={itm.title} />
                {/* :null} */}
              </button>
              <div className=" product-card-action-2 justify-content-center">
                <button data-tip data-for="registerTip" onClick={()=>productid(itm) } className="action-card action-quickview">
                <Icon icon="bi:zoom-in" width="20" height="25" />
                </button>
                <button data-tip data-for="carttip" onClick={()=>{if(itm.price_list){addtocart(itm,itm.price_list.split(',')[0])}} }  className="action-card action-quickview">
                <Icon icon="bi:cart4" width="35" height="30" />
                </button>
              </div>             
            </div>
            <div className="product-card-details">              
              <h3 className="product-card-title">
                <p>{itm.title}</p>
              </h3>
              <div className="product-card-price">
                <span className="card-price-regular">{itm.price} AED</span>
                <span className="card-price-compare text-decoration-line-through">{itm.old_price} AED</span>
              </div>
            </div>
          </div>
      
        </div>
        
        ))}
        </>:null}
        {filtercat ? <>
        {filtercat.category_type.toUpperCase()!=="DEALS" ?
        <>
        <h3 className='text-center'><u><b>Great Deals</b></u></h3>
        { product.filter(t=>t.category[0].category_type.toUpperCase().includes("DEALS")).map((itm,k)=>(      
        <div key={k}  className="col-lg-3 col-md-6 col-6 aos-init col-md"  data-aos="fade-up" data-aos-duration={700} >
          <div  className="product-card"  style={{padding:"20px"}}>
            <div className="product-card-img">
              <button className="hover-switch" onClick={()=>productid(itm) }>
                {/* <img className="secondary-img" src="assets/img/products/furniture/10.jpg" alt="product-img" /> */}
                {/* {itm.images[0]?  */}
                <img className="primary-img" src={itm.images[0] ?
                itm.images[0].image : 'https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png'} alt={itm.title} />
                {/* :null} */}
              </button>
              <div className=" product-card-action-2 justify-content-center">
                <button data-tip data-for="registerTip" onClick={()=>productid(itm) } className="action-card action-quickview">
                <Icon icon="bi:zoom-in" width="20" height="25" />
                </button>
                <button data-tip data-for="carttip" onClick={()=>{if(itm.price_list){addtocart(itm,itm.price_list.split(',')[0])}} }  className="action-card action-quickview">
                <Icon icon="bi:cart4" width="35" height="30" />
                </button>
              </div>             
            </div>
            <div className="product-card-details">              
              <h3 className="product-card-title">
                <p>{itm.title}</p>
              </h3>
              <div className="product-card-price">
                <span className="card-price-regular">{itm.price} AED</span>
                <span className="card-price-compare text-decoration-line-through">{itm.old_price} AED</span>
              </div>
            </div>
          </div>
      
        </div>
        
        ))}
        </>:null }
        </>:null}
        </div>
        </div><br/>
        </div>
        {modalvalue?
        <div className="modal fade show" tabIndex={-1} id="quickview-modal" aria-modal="true" role="dialog" style={{display: 'block', paddingLeft: 0}}>
          <div className="modal-dialog modal-dialog-centered modal-xl">
            <div className="modal-content">
              <div className="modal-header border-0">
                <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={()=>setmodalvalue(!modalvalue)} aria-label="Close" />
              </div>
              {/* {idproduct.map((itm,k)=>( */}
              <div  className="modal-body">
                <div className="row">
                  <div className="col-lg-6 col-md-12 col-12">
                    <div className="product-gallery product-gallery-vertical d-flex">
                      <div className="product-img-large">
                        <div className="qv-large-slider img-large-slider common-slider slick-initialized slick-slider" data-slick="{
                                          &quot;slidesToShow&quot;: 1, 
                                          &quot;slidesToScroll&quot;: 1,
                                          &quot;dots&quot;: false,
                                          &quot;arrows&quot;: false,
                                          &quot;asNavFor&quot;: &quot;.qv-thumb-slider&quot;
                                      }">
                          <div className="slick-list draggable"><div className="slick-track" style={{opacity: 1, width: 3269, transform: 'translate3d(0px, 0px, 0px)'}}><div className="img-large-wrapper slick-slide slick-current slick-active" data-slick-index={0} aria-hidden="false" tabIndex={0} style={{width: 443}}>
                              {idproduct.images[0] ?
                                <img src= {selectedimage ?? idproduct.images[0].image} alt={idproduct.title} />
                              :<img src='https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png' alt={idproduct.title} />
                              }
                                </div></div></div>
                        </div>
                      </div>
                      <div className="product-img-thumb ">
                        <div className=" slick-vertical "  >
                          <div className="overflow-auto" style={{height: '12rem',width:"6rem"}}><div className="slick-track" style={{opacity: 1, height: "auto", transform: 'translate3d(0px, 0px, 0px)'}}>
                            {idproduct.images.map((itm,k)=>(

                           
                            <div key={k} className="slick-slide slick-current slick-active" data-slick-index={0} aria-hidden="false" tabIndex={0} style={{width: 73}}>
                                <div onClick={()=>setselectedimage(itm.image)} className="img-thumb-wrapper">
                                  <img src={itm.image ??  'https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png'} alt="img" />
                                </div>
                              </div>
                              ))}
                              </div></div>
                        </div>
                        {/* <div className="activate-arrows show-arrows-always arrows-white d-none d-lg-flex justify-content-between mt-3"><span className="arrow-slider arrow-prev slick-arrow slick-disabled" aria-disabled="true" style={{}}><svg xmlns="http://www.w3.org/2000/svg" width={100} height={100} viewBox="0 0 24 24" fill="none" stroke="#FEFEFE" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" className="icon-arrow-left"><polyline points="15 18 9 12 15 6" /></svg></span><span className="arrow-slider arrow-next slick-arrow" aria-disabled="false" style={{}}><svg xmlns="http://www.w3.org/2000/svg" width={100} height={100} viewBox="0 0 24 24" fill="none" stroke="#FEFEFE" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" className="icon-arrow-right"><polyline points="9 18 15 12 9 6" /></svg></span></div> */}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12 col-12">
                    <div className="product-details ps-lg-4">
                      <div className="mb-3"><span className="product-availability">In Stock</span></div>
                      <h2 className="product-title mb-3">{idproduct.title}</h2>
                      <p>{idproduct.Fake_order_sold ?<b className='font-weight-normal text-secondary'>{idproduct.Fake_order_sold} Sold out </b> :null}</p>
                      {/* <div className="product-rating d-flex align-items-center mb-3">
                        <span className="star-rating">
                          <svg width={16} height={15} viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.168 5.77344L10.082 5.23633L8 0.566406L5.91797 5.23633L0.832031 5.77344L4.63086 9.19727L3.57031 14.1992L8 11.6445L12.4297 14.1992L11.3691 9.19727L15.168 5.77344Z" fill="#FFAE00" />
                          </svg>
                          <svg width={16} height={15} viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.168 5.77344L10.082 5.23633L8 0.566406L5.91797 5.23633L0.832031 5.77344L4.63086 9.19727L3.57031 14.1992L8 11.6445L12.4297 14.1992L11.3691 9.19727L15.168 5.77344Z" fill="#FFAE00" />
                          </svg>
                          <svg width={16} height={15} viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.168 5.77344L10.082 5.23633L8 0.566406L5.91797 5.23633L0.832031 5.77344L4.63086 9.19727L3.57031 14.1992L8 11.6445L12.4297 14.1992L11.3691 9.19727L15.168 5.77344Z" fill="#FFAE00" />
                          </svg>
                          <svg width={16} height={15} viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.168 5.77344L10.082 5.23633L8 0.566406L5.91797 5.23633L0.832031 5.77344L4.63086 9.19727L3.57031 14.1992L8 11.6445L12.4297 14.1992L11.3691 9.19727L15.168 5.77344Z" fill="#FFAE00" />
                          </svg>
                          <svg width={16} height={15} viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.168 5.77344L10.082 5.23633L8 0.566406L5.91797 5.23633L0.832031 5.77344L4.63086 9.19727L3.57031 14.1992L8 11.6445L12.4297 14.1992L11.3691 9.19727L15.168 5.77344Z" fill="#B2B2B2" />
                          </svg>                                            
                        </span>
                        <span className="rating-count ms-2">(22)</span>
                      </div> */}
                      <div className="product-price-wrapper mb-4">
                        <span className="product-price regular-price">{idproduct.price} AED</span>
                        <del className="product-price compare-price ms-2">{idproduct.old_price} AED</del>
                      </div>
                      <div className="product-sku product-meta mb-1">
                        <strong className="label">Delivery:</strong> {idproduct.delivery_charge===0? <span className='font-weight-normal text-secondary'>Free Delivery</span>:<span className='text-secondary'>{idproduct.delivery_charge} AED</span>}
                      </div>
                      <div className="product-vendor product-meta mb-3">
                        <strong className="label">Vendor:</strong> leather
                      </div>
                      
                      <div className="misc d-flex align-items-end justify-content-between mt-4">
                        <div className=" d-flex align-items-center justify-content-between">
                          {/* <button onClick={()=>{if(prdquantity>1){setprdquantity(prdquantity-1)}  }} className="qty-btn dec-qty"><img src="assets/img/icon/minus.svg" alt="minus" /></button>
                         
                          <b className="qty-input" type="number" name="qty"  min={0} >{prdquantity}</b>
                          <button onClick={()=>setprdquantity(prdquantity+1)} className="qty-btn inc-qty"><img src="assets/img/icon/plus.svg" alt="plus" /></button> */}
                        <select defaultValue={''} onChange={(e)=>setprdquantity(e.target.value)}>
                        {idproduct.price_list ? <>
                          <option value={''} hidden disabled>Select quantity</option>

                            {idproduct.price_list.split(',').map((itm,k)=>(
                            <option key={k} value={itm}>{itm} AED</option>
                          ))}
                        </>:null}
                        </select>
                        </div>
                        
                      </div>
                      
                        {/* <div className="buy-it-now-btn mt-4">
                          
                          <button  onClick={()=>{if(prdquantity===null){}else{addtocart(idproduct,prdquantity)}  }} type="submit" className="position-relative btn-atc btn-add-to-cart loader">ADD TO CART</button>
                         
                        </div> */}
                        <div className="buy-it-now-btn mt-4">
                          <button type="submit" onClick={()=>{if(prdquantity===null){notifyquantity()}else{addtocart(idproduct,prdquantity)}  }} className="position-relative btn-atc btn-buyit-now btn-add-to-cart">BUY IT NOW</button>
                        </div>
          
                      
                    </div>
                  </div>
                </div>
              </div>
              {/* ))} */}
            </div>
          </div>
        </div>
        :null}
        {/* product drawer  strats*/}
                                    
        <div className="offcanvas offcanvas-end w-75 p-3" tabIndex={-1} id="drawer-cart" >
          <div className="offcanvas-header border-btm-black">
            <h5 className="cart-drawer-heading text_16">Your Cart( {viewcart.reduce((n, {quantity}) => n + parseInt(quantity), 0)} )</h5>
            <button type="button" onClick={()=>missorder(viewcart)} className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" />
          </div>
          {viewcart.length ? 
          <div className="offcanvas-body p-0 row">
            <div className="cart-content-area d-flex justify-content-between flex-column col-md-6">
              <div className="minicart-loop custom-scrollbar">
            
                {viewcart.map((itm,k)=>(
                <div key={k} className="minicart-item d-flex">
                  <div className="mini-img-wrapper">
                    <img className="mini-img" src={itm.product.images[0].image} alt="img" />
                  </div>
                  <div className="product-info">
                    <h2 className="product-title">{itm.product.title}</h2>
                   
                    <div className="misc d-flex align-items-end justify-content-between">
                      <div className=" d-flex align-items-center justify-content-between">
                        {/* <button onClick={()=>Handlerdecrement(k)} className="qty-btn dec-qty"><img src="assets/img/icon/minus.svg" alt="minus" /></button>
                        <b className="qty-input" type="number" name="qty"  min={0} >{itm.quantity}</b>
                        <button onClick={()=>handlerincrement(k)} className="qty-btn inc-qty"><img src="assets/img/icon/plus.svg" alt="plus" /></button> */}
                        <select defaultValue={''} onChange={(e)=>handlerincrement(e.target.value,k)}>
                          <option value={''} hidden disabled>{itm.quantity}</option>
                          {itm.product.price_list ? <>
                            {itm.product.price_list.split(',').map((itm,k)=>(
                            <option key={k} value={itm}>{itm} AED</option>
                          ))}
                          </>:null}
                        </select>
                      </div>
                      <div className="product-remove-area d-flex flex-column align-items-end">
                        <div className="product-price">{itm.subtotal} AED</div>
                        <button onClick={()=>removeproduct(k)} className="product-remove">Remove</button>
                      </div>
                    </div>
                  </div>
                </div>
                ))}  
              </div>
              <div className="minicart-footer">
                <div className="minicart-calc-area">
                  <div className="minicart-calc d-flex align-items-center justify-content-between">
                    <span className="cart-subtotal mb-0">Price</span>
                    <span className="cart-subprice">{viewcart.reduce((n, {subtotal}) => n + parseInt(subtotal), 0)} AED</span>
                  </div>
                  <div className="minicart-calc d-flex align-items-center justify-content-between">
                    <span className="cart-subtotal mb-0">VAT</span>
                    <span className="cart-subprice">{(parseInt(viewcart.reduce((n, {subtotal}) => n + parseInt(subtotal), 0))/10)} AED</span>
                  </div>
                  <div className="minicart-calc d-flex align-items-center justify-content-between">
                    <span className="cart-subtotal mb-0">Delivery</span>
                    <span className="cart-subprice">{ Math.max(...viewcart.map(o => o.product.delivery_charge))} AED</span>
                  </div>
                  <hr/>
                  <div className="minicart-calc d-flex align-items-center justify-content-between">
                    <span className="cart-subtotal mb-0">Total Amount</span>
                    {/* <span className="cart-subprice">{parseInt((Math.max(...viewcart.map(o => o.product.delivery_charge))))+parseInt(viewcart.reduce((n, {subtotal}) => n + parseInt(subtotal), 0))} AED</span> */}
                    <span className="cart-subprice">{parseInt((Math.max(...viewcart.map(o => o.product.delivery_charge))))+parseInt(viewcart.reduce((n, {subtotal}) => n + parseInt(subtotal), 0))+((parseInt((Math.max(...viewcart.map(o => o.product.delivery_charge))))+parseInt(viewcart.reduce((n, {subtotal}) => n + parseInt(subtotal), 0)))/10)} AED</span>
                  </div>
                  
                </div>
                
              </div>
            </div>
            <div className='col-md-6'>
            <div className="container col-12 ">
            <fieldset className='mt-2'>
              <label className="label float-start">Full name <span className='text-danger'>*</span></label>
              <input className='form-control' onChange={(e)=>setcustomername(e.target.value)} type="text" placeholder="Full name" />
            </fieldset><br/>
            <fieldset >
              <label className="label float-start">Mobile <span className='text-danger'>*</span></label>
              <input className='form-control' onChange={(e)=>setcontact(e.target.value)} type="number" placeholder="Mobile" />
            </fieldset><br/>
            <fieldset >
              <label className="label float-start">Emirates<span className='text-danger'>*</span></label>
              
              <select defaultValue={''} className='form-control'  onChange={(e)=>setselectcity(e.target.value)}>
                <option value='' hidden disabled>select</option>
                {city.map((itm,k)=>(
                  <option key={k} value={itm.city_name}>{itm.city_name}</option>
                ))}
               
              </select>
            </fieldset><br/>
            <fieldset >
              <label className="label float-start">Delivery Address <span className='text-danger'>*</span></label>
              <textarea onChange={(e)=>setaddress(e.target.value)} className='form-control'/>
            </fieldset><br/>
            {/* <p><b className='text-danger'>{checkerror}*</b></p><br/> */}
            <div className="minicart-btn-area d-flex align-items-center justify-content-between ">
                  
                  <button onClick={()=>checkout(viewcart,viewcart.reduce((n, {subtotal}) => n + parseInt(subtotal), 0),Math.max(...viewcart.map(o => o.product.delivery_charge)))} className="minicart-btn btn-primary">Checkout</button>
                </div><br/><br/>
                
                
              

            </div>
            </div>
          </div>
          :<><p className='mt-5 text-center'><b>Your cart is empty</b></p></>}
          
          </div>
        
       


        {/* product drawer ends */}
        {/* my orders start */}
        {myordermodal? 
        <div className="modal fade show" tabIndex={-1} id="quickview-modal" aria-modal="true" role="dialog" style={{display: 'block', paddingLeft: "20%",paddingRight:"2%"}}>
          <div className="modal-dialog modal-dialog-centered modal-xl">
            <div className="modal-content">
              <div className="modal-header border-0">
                <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={()=>setmyordermodal(!myordermodal) } aria-label="Close" />
              </div>
              {/* {idproduct.map((itm,k)=>( */}
              <div  className="modal-body">
              {checkoutorder.length ? 
          <div className="offcanvas-body p-0 row">
            <div className="cart-content-area d-flex justify-content-between flex-column col-md-6">
              <div style={{height: '20rem'}} className="minicart-loop overflow-auto custom-scrollbar">
            
                {checkoutorder.map((itm,k)=>(
                <div key={k} className="minicart-item d-flex">
                  <div className="mini-img-wrapper">
                    <img className="mini-img" src={itm.product.images[0].image} alt="img" />
                  </div>
                  <div className="product-info">
                    <h2 className="product-title">{itm.product.title}</h2>
                   
                    <div className="misc d-flex align-items-end justify-content-between">
                      <div className=" d-flex align-items-center justify-content-between">
                        {/* <button onClick={()=>Handlerdecrement(k)} className="qty-btn dec-qty"><img src="assets/img/icon/minus.svg" alt="minus" /></button>
                        <b className="qty-input" type="number" name="qty"  min={0} >{itm.quantity}</b>
                        <button onClick={()=>handlerincrement(k)} className="qty-btn inc-qty"><img src="assets/img/icon/plus.svg" alt="plus" /></button> */}
                        
                          
                          <div className="product-price">Quantity : {itm.quantity}</div>
                      </div>
                      <div className="product-remove-area d-flex flex-column align-items-end">
                        <div className="product-price">{itm.subtotal} AED</div>
                        
                      </div>
                    </div>
                  </div>
                </div>
                ))}  
              </div>
              
            </div>
            <div className='col-md-6'>
            <div className="container col-12 ">
           
            <div className="minicart-footer">
                <div className="minicart-calc-area">
                  <div className="minicart-calc d-flex align-items-center justify-content-between">
                    <span className="cart-subtotal mb-0">Price</span>
                    <span className="cart-subprice">{checkoutorder.reduce((n, {subtotal}) => n + parseInt(subtotal), 0)} AED</span>
                  </div>
                  <div className="minicart-calc d-flex align-items-center justify-content-between">
                    <span className="cart-subtotal mb-0">VAT</span>
                    <span className="cart-subprice">{(checkoutorder.reduce((n, {vat}) => n + (vat), 0))} AED</span>
                  </div>
                  <div className="minicart-calc d-flex align-items-center justify-content-between">
                    <span className="cart-subtotal mb-0">Delivery</span>
                    <span className="cart-subprice">{(checkoutorder.reduce((n, {product}) => n + (product.delivery_charge), 0))}AED</span>
                  </div>
                  <hr/>
                  <div className="minicart-calc d-flex align-items-center justify-content-between">
                    <span className="cart-subtotal mb-0">Total Amount</span>
                    {/* <span className="cart-subprice">{parseInt((Math.max(...viewcart.map(o => o.product.delivery_charge))))+parseInt(viewcart.reduce((n, {subtotal}) => n + parseInt(subtotal), 0))} AED</span> */}
                    <span className="cart-subprice">{(checkoutorder.reduce((n, {product}) => n + (product.delivery_charge), 0))+parseInt(checkoutorder.reduce((n, {subtotal}) => n + parseInt(subtotal), 0))+checkoutorder.reduce((n, {vat}) => n + vat, 0)} AED</span>
                  </div>
                  
                </div>
                
              </div>
            
            
            {/* <p><b className='text-danger'>{checkerror}*</b></p><br/> */}
            {/* <div className="minicart-btn-area d-flex align-items-center justify-content-between ">
                  
                  <button onClick={()=>checkout(viewcart,viewcart.reduce((n, {subtotal}) => n + parseInt(subtotal), 0),Math.max(...viewcart.map(o => o.product.delivery_charge)))} className="minicart-btn btn-primary">Checkout</button>
                </div><br/><br/> */}
                
                
              

            </div>
            </div>
          </div>
          :<><p className='mt-5 text-center'><b>Your Order is empty</b></p></>}
              </div>
              {/* ))} */}
            </div>
          </div>
        </div>
        :null} 
        {/* my orders ends */}
        <Footer/>
      
    </div>
  )
}
