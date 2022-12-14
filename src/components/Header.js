import React from 'react'
import { Icon } from '@iconify/react';
export default function Header(show) {
  // console.log("show",show)
  return (
    <div>
       <header className="sticky-header position-fixed border-btm-black mt-auto pt-2" style={{height:"50px"}}>
  <div className="header-bottom mt-md-auto" >
    <div className="container " >
      <div className="row align-items-center">
        <div className="col-lg-3 col-md-4 col-4">
          <div className="header-logo">
            <a href="index-2.html" className="logo-main">
              <img src="assets/img/logo.png" loading="lazy" alt="bisum" />
            </a>
          </div>
        </div>
        <div className="col-lg-6 d-lg-block d-none h-25">
          <nav className="site-navigation h-25">
            {/* <ul className="main-menu list-unstyled justify-content-center">
              <li className="menu-list-item nav-item has-dropdown active">
                <div className="mega-menu-header">
                  <a className="nav-link" href="index-2.html">
                    Home
                  </a>
                  
                </div>
               
              </li>
              <li className="menu-list-item nav-item has-megamenu">
                <div className="mega-menu-header">
                  <a className="nav-link" href="collection-left-sidebar.html">
                    Shop
                  </a>
                  
                </div>
                
              </li>
              <li className="menu-list-item nav-item has-dropdown">
                <div className="mega-menu-header">
                  <a className="nav-link" href="blog.html">Blog</a>
                  <span className="open-submenu">
                    <svg className="icon icon-dropdown" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </div>
                <div className="submenu-transform submenu-transform-desktop">
                  <ul className="submenu list-unstyled">
                    <li className="menu-list-item nav-item-sub">
                      <a className="nav-link-sub nav-text-sub" href="blog.html">Blog</a>
                    </li>
                    <li className="menu-list-item nav-item-sub">
                      <a className="nav-link-sub nav-text-sub" href="article.html">Blog
                        Details</a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="menu-list-item nav-item has-dropdown">
                <div className="mega-menu-header">
                  <a className="nav-link" href="about-us.html">
                    Pages
                  </a>
                  <span className="open-submenu">
                    <svg className="icon icon-dropdown" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </div>
                
              </li>
              <li className="menu-list-item nav-item">
                <a className="nav-link" href="contact.html">Contact</a>
              </li>
            </ul> */}
          </nav>
        </div>
        <div className="col-lg-3 col-md-8 col-8">
          <div className="header-action d-flex align-items-center justify-content-end">
            <a className="header-action-item header-search" href="/">
              <svg className="icon icon-search" width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.75 0.250183C11.8838 0.250183 15.25 3.61639 15.25 7.75018C15.25 9.54608 14.6201 11.1926 13.5625 12.4846L19.5391 18.4611L18.4609 19.5392L12.4844 13.5627C11.1924 14.6203 9.5459 15.2502 7.75 15.2502C3.61621 15.2502 0.25 11.884 0.25 7.75018C0.25 3.61639 3.61621 0.250183 7.75 0.250183ZM7.75 1.75018C4.42773 1.75018 1.75 4.42792 1.75 7.75018C1.75 11.0724 4.42773 13.7502 7.75 13.7502C11.0723 13.7502 13.75 11.0724 13.75 7.75018C13.75 4.42792 11.0723 1.75018 7.75 1.75018Z" fill="black" />
              </svg>
            </a>
            <button className="header-action-item header-wishlist ms-4 d-none d-lg-block" onClick={()=>show.setshow(!show.show)} >
            <svg className="icon icon-cart" width={24} height={26} viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0.000183105C9.25391 0.000183105 7 2.25409 7 5.00018V6.00018H2.0625L2 6.93768L1 24.9377L0.9375 26.0002H23.0625L23 24.9377L22 6.93768L21.9375 6.00018H17V5.00018C17 2.25409 14.7461 0.000183105 12 0.000183105ZM12 2.00018C13.6562 2.00018 15 3.34393 15 5.00018V6.00018H9V5.00018C9 3.34393 10.3438 2.00018 12 2.00018ZM3.9375 8.00018H7V11.0002H9V8.00018H15V11.0002H17V8.00018H20.0625L20.9375 24.0002H3.0625L3.9375 8.00018Z" fill="black" />
              </svg>
            </button>
            <a className="header-action-item header-cart ms-4" href="#drawer-cart" data-bs-toggle="offcanvas">
              <button className='btn-light'><Icon icon="carbon:shopping-cart" width="30" height="30" /></button>
              {/* <svg className="icon icon-cart" width={24} height={26} viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0.000183105C9.25391 0.000183105 7 2.25409 7 5.00018V6.00018H2.0625L2 6.93768L1 24.9377L0.9375 26.0002H23.0625L23 24.9377L22 6.93768L21.9375 6.00018H17V5.00018C17 2.25409 14.7461 0.000183105 12 0.000183105ZM12 2.00018C13.6562 2.00018 15 3.34393 15 5.00018V6.00018H9V5.00018C9 3.34393 10.3438 2.00018 12 2.00018ZM3.9375 8.00018H7V11.0002H9V8.00018H15V11.0002H17V8.00018H20.0625L20.9375 24.0002H3.0625L3.9375 8.00018Z" fill="black" />
              </svg> */}
            </a>
            {/* <a className="header-action-item header-hamburger ms-4 d-lg-none" href="#drawer-menu" data-bs-toggle="offcanvas">
              <svg className="icon icon-hamburger" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <line x1={3} y1={12} x2={21} y2={12} />
                <line x1={3} y1={6} x2={21} y2={6} />
                <line x1={3} y1={18} x2={21} y2={18} />
              </svg>
            </a> */}
          </div>
        </div>
      </div>
    </div>
    {/* <div className="search-wrapper">
      <div className="container">
        <form action="#" className="search-form d-flex align-items-center">
          <button type="submit" className="search-submit bg-transparent pl-0 text-start">
            <svg className="icon icon-search" width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.75 0.250183C11.8838 0.250183 15.25 3.61639 15.25 7.75018C15.25 9.54608 14.6201 11.1926 13.5625 12.4846L19.5391 18.4611L18.4609 19.5392L12.4844 13.5627C11.1924 14.6203 9.5459 15.2502 7.75 15.2502C3.61621 15.2502 0.25 11.884 0.25 7.75018C0.25 3.61639 3.61621 0.250183 7.75 0.250183ZM7.75 1.75018C4.42773 1.75018 1.75 4.42792 1.75 7.75018C1.75 11.0724 4.42773 13.7502 7.75 13.7502C11.0723 13.7502 13.75 11.0724 13.75 7.75018C13.75 4.42792 11.0723 1.75018 7.75 1.75018Z" fill="black" />
            </svg>
          </button>
          <div className="search-input mr-4">
            <input type="text" placeholder="Search your products..." autoComplete="off" />
          </div>
          <div className="search-close">
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-close">
              <line x1={18} y1={6} x2={6} y2={18} />
              <line x1={6} y1={6} x2={18} y2={18} />
            </svg>
          </div>
        </form>
      </div>
    </div> */}
  </div>
</header>

    </div>
  )
}
