import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getToken, logout } from '../../../piservices/authService';
import { Helmet } from 'react-helmet';
import "../index.css"

const Header = ({ className, sideClass }) => {
    require("./index.css");
    const navigate = useNavigate();

    useEffect(() => {
        // if (window.location.href.includes("/quotation")) {
        //     if (window.location.href.includes("/quotation/view")) {
        //         document.getElementById("sideBarDiv").classList.add("expander");
        //     }
        //     document.querySelector(".sidebar-listgroup .active")?.classList.remove("active");
        //     document.getElementById("dash-quotation")?.classList.add("active");
        // }
        document.querySelector(".sidebar-listgroup .active")?.classList.remove("active");

        document.getElementById("dash-quotation")?.classList.add("active");

        // document.getElementById("dash-" + tab)?.click();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <header style={{
            minHeight: '71px',
            paddingTop: '54px'
        }} className={className} >
            <Helmet>
                {/* {window.innerWidth > 1000 && <meta name="viewport" content="width = 1500" /> } */}

            </Helmet>
            <nav id="sidebarMenu" className={`sidebarMenu my-3 box-shadow-none  ${sideClass}`}>

                <div id='sideBarDiv' className="  position-fixed  sideBarDiv box-shadow py-3 mv-py-0 box-shadow-none border expander" style={{ width: '230px', overflow: "hidden", zIndex: "1" }} >
                    <div className="sidebar-listgroup list-group list-group-flush position-relative " style={{ minHeight: '92vh' }}  >

                        <a href="/dashboard/home" className="list-group-item list-group-item-action py-2 ripple border-none active " id='dash-home' aria-current="true">
                            <span className="homei icon8 me-md-4"></span>
                            <span className="pe-none  " >Home</span>
                        </a>
                        <a href="/dashboard/chat" className="list-group-item list-group-item-action py-2 ripple border-none chattab" id='dash-chat'>
                            {/* <img src="https://img.icons8.com/external-anggara-outline-color-anggara-putra/20/000000/external-chat-user-interface-anggara-outline-color-anggara-putra.png" className='me-md-4'/> */}
                            <span className="chati icon8 me-md-4"></span>

                            <span className="pe-none"  >Chat</span>

                        </a>
                        <a href="/quotation" className="list-group-item list-group-item-action py-2 ripple border-none" id='dash-quotation' >

                            <span className="quoi icon8 me-md-4"></span>
                            <span className="pe-none"  >Quotation</span>
                        </a>
                        <a href="/dashboard/saved" className="list-group-item list-group-item-action py-2 ripple border-none" id='dash-saved' >
                            <span className=" savei icon8 me-md-4"></span>
                            <span className="pe-none"  >Saved</span>
                        </a>
                        {/* <a href="#" className="list-group-item list-group-item-action py-2 ripple  mv-d-none logout" style={{ marginTop: "40vh" }} onClick={() => {
                            logout()
                        }} >
                            <div className="pe-none">
                                <i className="fa-solid fa-arrow-right-from-bracket me-4"></i>
                                <span>Sign Out</span>
                            </div>
                        </a> */}

                    </div>
                </div>
            </nav>
            <nav className="navbar navbar-expand-lg navbar-light bg-white  fixed-top box-shadow-none border-bottom" >
                {/* Container wrapper */}
                <div className="container-fluid py-2 justify-content-between">
                    {/* Toggle button */}
                    {/* <button className="navbar-toggler" type="button" data-mdb-toggle="collapse" data-mdb-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="fas fa-bars" />
                    </button> */}
                    <a className="pi navbar-brand mx-2 mt-lg-0" href="/">
                        <img src="https://pro.idesign.market/static/media/webViewLogo.5cbd374d615d9703f27f54b017238455.svg" className="" width={170} alt="iDesign Logo" loading="lazy" />
                    </a>
                    {/* Collapsible wrapper */}
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {/* Navbar brand */}

                        {/* Left links */}
                        {/* <ul className="navbar-nav me-auto mb-2 mb-lg-0 w-100 justify-content-center">
                            <li className="nav-item active">
                                <a className="nav-link fw-bold cl-black text-align-center" href="/find-professionals">Find Professionals </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link fw-bold cl-black text-align-center" href="/explore-projects">Explore Projects</a>
                            </li>
                            <li className="nav-item d-none">
                                <a className="nav-link fw-bold cl-black text-align-center" href="#">Brand Offers</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link fw-bold cl-black text-align-center" href="https://magazine.idesign.market/">Magazines</a>
                            </li>
                        </ul> */}
                        {/* Left links */}
                    </div>

                    {!getToken() &&
                        <div className="d-flex align-items-center">
                            <div type="button" className=" me-3 fw-bold signIn cl-sec-blue"
                                // data-mdb-toggle="modal" data-mdb-target="#loginModal"
                                id="loginBtn" onClick={() => {
                                    localStorage.setItem("fromRoute", window.location.href.split('/').slice(3).join('/'));
                                    navigate("/login");
                                }} >
                                Sign In / Up
                            </div>
                        </div>
                    }

                    {getToken() &&
                        <div className="d-flex align-items-center">
                            <a className="text-reset me-3  hidden-arrow" href="#!" role="button"  >
                                <i className="fas fa-bell" />
                            </a>
                            <a className="text-reset me-3" href="https://pro.idesign.market/mycart">
                                <i className="fas fa-shopping-cart" />
                            </a>

                            <div className="dropdown">
                                <a className=" d-flex align-items-center hidden-arrow" href="https://pro.idesign.market/myprofile" role="button"  >
                                    <img src="https://pro.idesign.market/static/media/defaultProfileIcon.a4b0027d2fa9e86a6e8ba305cf895fc8.svg" className="rounded-circle" style={{ maxWidth: '37px' }} alt="Black and White Portrait of a Man" loading="lazy" />
                                </a>

                            </div>
                        </div>

                    }

                </div>
            </nav>
        </header>

    )
}

export default Header
