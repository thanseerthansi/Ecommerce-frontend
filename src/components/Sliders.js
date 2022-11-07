import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Sliders() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
  return (
    <>
    <div>
    <Slider {...settings}>
      
        <div className="slide-item slide-item-bag position-relative">
        <img className="slide-img d-none d-md-block" src="assets/img/slideshow/f1.jpg" alt="slide-1" />
        <img className="slide-img d-md-none" src="assets/img/slideshow/f1-m.jpg" alt="slide-1" />
        <div className="content-absolute content-slide">
            <div className="container height-inherit d-flex align-items-center justify-content-end">
            <div className="content-box slide-content slide-content-1 py-4">
                <h2 className="slide-heading heading_72 animate__animated animate__fadeInUp" data-animation="animate__animated animate__fadeInUp">
                Discover The Best Furniture
                </h2>
                <p className="slide-subheading heading_24 animate__animated animate__fadeInUp" data-animation="animate__animated animate__fadeInUp">
                Look for your inspiration here
                </p>
                <a className="btn-primary slide-btn animate__animated animate__fadeInUp" href="collection-left-sidebar.html" data-animation="animate__animated animate__fadeInUp">SHOP
                NOW</a>
            </div>
            </div>
        </div>
        </div>

        <div className="slide-item slide-item-bag position-relative">
        <img className="slide-img d-none d-md-block" src="assets/img/slideshow/f2.jpg" alt="slide-2" />
        <img className="slide-img d-md-none" src="assets/img/slideshow/f2-m.jpg" alt="slide-2" />
        <div className="content-absolute content-slide">
            <div className="container height-inherit d-flex align-items-center justify-content-end">
            <div className="content-box slide-content slide-content-1 py-4 text-center">
                <h2 className="slide-heading heading_72 animate__animated animate__fadeInUp" data-animation="animate__animated animate__fadeInUp">
                Discover The Best Furniture
                </h2>
                <p className="slide-subheading heading_24 animate__animated animate__fadeInUp" data-animation="animate__animated animate__fadeInUp">
                Look for your inspiration here
                </p>
                <a className="btn-primary slide-btn animate__animated animate__fadeInUp" href="collection-left-sidebar.html" data-animation="animate__animated animate__fadeInUp">SHOP
                NOW</a>
            </div>
            </div>
        </div>  
        </div>

       
    </Slider>
    
           
    </div></>
  )
}
