import React, {  useState } from 'react'
import { Icon } from '@iconify/react';
import { motion } from "framer-motion"
import { Link} from 'react-router-dom';
// import axios from 'axios';
export default function Adminslider() {
    const [isOpen, setIsOpen] = useState(false)
    const [isslider, setisslider] = useState(true)
    // console.log("isslider",isslider)
    // const [isproduct, setisproduct] = useState(false)
    const variants = {
        open: { opacity: 1, height:"100%" },
        closed: { opacity: 0, height: "0",display:"none" },
      }
    
  return (
    <div className=' p-1  position-fixed ' style={{zIndex:"2"}}>
        <div className='d-block d-md-none'>
        <Icon onClick={()=>setisslider(!isslider)} icon="dashicons:menu" width="30" height="30" />

        </div>
      
        <>
        {/* <div className='hov bg-dark'><Link  to="/admindashboard" className="link-light" data-key="t-analytics" style={{paddingLeft:"2rem"}}> <Icon icon="ic:baseline-person" width="40" height="24" />  <span> Profile</span></Link></div> */}
        <div  className={isslider ?'  d-none d-md-block rounded pt-2 bg-dark vh-100 overflow-auto': ' rounded pt-2 bg-dark vh-100 overflow-auto'} style={{width:"190px"}}>
        <div className='hov p-1'><Link  to="/adminprofile" className="link-light" data-key="t-analytics" style={{paddingLeft:"2rem"}}> <Icon icon="ic:baseline-person" width="40" height="24" />  <span> Profile</span></Link></div>
        <hr style={{color:"white"}}></hr>
        <ul className="custom-list-marker hov ">
            
           <li role='button'  className=' d-flex text-white mt-3' >
            <Link  to="/admindashboard" className="link-light" data-key="t-analytics"> <Icon  icon="clarity:dashboard-solid-badged" width="38" height="23" />  <span>Dashboard</span></Link></li>
            {/* <li className='flex text-slate-300 hover:text-amber-200 mt-3' onClick={() => setIsOpen(isOpen => !isOpen)} ><Icon icon="ic:baseline-border-color" width="40" height="23" />Orders {isOpen===true ? <Icon className='ml-6' icon="ant-design:down-outlined" width="15" height="23" rotate={1} /> :<Icon className='ml-6'  icon="akar-icons:chevron-down" width="15" height="23" />}</li> */}
            <li  role='button' className='d-flex  text-white  mt-3' onClick={() => setIsOpen(isOpen => !isOpen)} >
            <Link  to="" className="d-flex link-light" data-key="t-analytics"><Icon icon="ic:baseline-border-color" width="40" height="23" /><span>Orders</span> <motion.div className='ms-3 ' animate={{rotate: isOpen ? 90 : 0}} ><Icon icon="akar-icons:circle-chevron-down-fill" height="25" width="18" /></motion.div></Link></li>
           
            <motion.nav
            animate={isOpen ? "open" : "closed"}
            variants={variants}
            className=''
            >
                <li  role='button' className='d-flex text-white hover:text-amber-200 mt-3'>
                <Link  to="/adminorder" className="d-flex link-light" data-key="t-analytics">
                    <Icon icon="icon-park-twotone:order" width="40" height="23" /> <p> Orders</p>
                    </Link></li>
                <li  role='button'className='d-flex text-white hover:text-amber-200 mt-1'>
                <Link  to="/adminmissorder" className="d-flex link-light" data-key="t-analytics">
                    <Icon icon="mdi:package-variant-remove" width="40" height="25" /> <p>Missing Orders</p>
                    </Link></li>
            
            </motion.nav>
            <li  role='button' className='d-flex  text-white  mt-3'  >
        
                <Link  to="/adminproduct" className="d-flex link-light" data-key="t-analytics"> <Icon icon="ri:product-hunt-fill" width="40" height="23" />  <p>Products</p></Link></li>
            {/* <motion.nav
            animate={isproduct ? "open" : "closed"}
            variants={variants}
            className=''
            >
                <li  role='button'className='d-flex text-white hover:text-amber-200 mt-3'>
                <Link  to="/adminproduct" className="d-flex link-light" data-key="t-analytics"><Icon icon="icon-park-twotone:order" width="40" height="23" />  <p>Products</p></Link></li>
                <li  role='button'className='d-flex text-white hover:text-amber-200 mt-1'>
                <Link  to="" className="d-flex link-light" data-key="t-analytics"><Icon icon="mdi:package-variant-remove" width="40" height="25" /> <p>Google Category</p></Link></li>
            
            </motion.nav> */}
            <li role='button'  className=' d-flex text-white mt-2' >
            <Link  to="/admincategory" className="link-light" data-key="t-analytics">
            <Icon icon="bxs:category" width="38" height="23" /><span>Categories</span>
                 </Link></li>
            <li role='button'  className=' d-flex text-white mt-3' >
            <Link  to="/admincity" className="link-light" data-key="t-analytics">
            <Icon icon="healthicons:city" width="38" height="25" /><span>Cities</span>
                 </Link></li>
            <li role='button'  className=' d-flex text-white mt-3' >
            <Link  to="/admincontact" className="link-light" data-key="t-analytics">
            <Icon icon="bxs:contact" width="38" height="23" /><span>Contact</span>
                 </Link></li>
            <li role='button'  className=' d-flex text-white mt-3' >
            <Link  to="/status" className="link-light" data-key="t-analytics">
            <Icon icon="gridicons:stats-up-alt" width="38" height="23" /><span>Status</span>
                 </Link></li>
            {/* <li role='button'  className=' d-flex text-white mt-3' >
            <Link  to="/metatags" className="link-light" data-key="t-analytics">
            <Icon icon="material-symbols:code-blocks" width="38" height="25" /><span>MetaTag</span>
                 </Link></li> */}
        </ul>
        </div>
        </>
    </div>
  )
}
