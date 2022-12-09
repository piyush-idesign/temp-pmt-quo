import React, { useEffect, useState } from 'react'
import "./index.css";
import imgx2 from "./Images/fl.webp"
import { toast, ToastContainer } from 'react-toastify';
import authservice from '../../piservices/authService';
const Footer = () => {
    // https://home-api.idesign.market/api/newsletter
    const [subLet, setSubLet] = useState();
    const submitLetter = async () => {
        try {
            await authservice.subscribe({ email: subLet });
            // window.location.href = "/find-professionals";
            toast.success("You Will Recieve our NewsLetters Now")
        } catch (error) {
            if (error.response && error.response.status === 400) {
                toast.error(error.response.data, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }
    }
    const init = () => {

    }
    useEffect(() => {
        init();

    })
    return (
        <section className="footer">
            <ToastContainer />

            {/* Footer */}
            <footer className="bg-dark text-white text-center text-md-start">
                {/* Grid container */}

                <div className=" p-4">
                    {/*Grid row*/}
                    <div className="row d-flex flex-wrap justify-content-evenly">
                        <div className="col-lg-3 col-md-12 mb-4 mb-md-0">
                            <h5 className="mv-text-align-center"><a href="https://www.idesign.market/"><img style={{ maxWidth: '245px' }} src={imgx2} alt="iDesign Market Logo" title="iDesign Market Logo" /></a></h5>
                            <small className="mt-2">
                                iDesign.Market is an online marketplace providing SaaS, Design Tools and workflow features, dedicated to Interior Community.
                            </small>
                        </div>

                        <div className="col-lg-1 col-md-2 mb-0  py-3 pb-0 ">
                            <p className="fw-bold">Quick Links</p>
                            <ul className="list-unstyled mb-0 qli">
                                <li>
                                    <a href="https://www.idesign.market/about-us" className="text-white"><small>About</small></a>
                                </li>
                                <li>
                                    <a href="https://angel.co/company/idesign-market-1/jobs" className="text-white"><small>Careers</small></a>
                                </li>
                                <li>
                                    <a href="https://www.idesign.market/contact-us" className="text-white"><small>Contact</small></a>
                                </li>
                                <li>
                                    <a href="sitemap" className="text-white"><small>Sitemap</small></a>
                                </li>
                            </ul>
                        </div>

                        <div className="col-lg-1 col-md-2 mb-0 pb-0 ">
                            <p className="fw-bold mv-d-none pt-3 mv-py-0">Quick Links</p>
                            <ul className="list-unstyled qli">
                                <li>
                                    <a href="https://pro.idesign.market/terms" className="text-white"><small>Terms & Conditions</small></a>
                                </li>
                                <li>
                                    <a href="https://pro.idesign.market/cookie-policy" className="text-white"><small>Cookie Policy</small></a>
                                </li>
                                <li>
                                    <a href="https://pro.idesign.market/privacy-policy" className="text-white"><small>Privacy Policy</small></a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-2 col-md-3  mb-0 pb-0 mt-4 mt-md-0">
                            <p className="fw-bold  pt-3 mv-py-0">Find Professional</p>
                            <ul className="list-unstyled qli">
                                <li  className='mv-my-0' >
                                    <a href="https://www.idesign.market/find-professionals/interior-designers" className="text-white"><small>Interior Designer</small></a>
                                </li>
                                <li>
                                    <a href="https://www.idesign.market/find-professionals/contractors" className="text-white"><small>Contractor</small></a>
                                </li>
                                <li>
                                    <a href="https://www.idesign.market/find-professionals/modular-kitchens" className="text-white"><small>Modular Factory</small></a>
                                </li>
                            </ul>
                        </div>

                        <div className="col-lg-3 col-md-3 mb-4 mb-md-0 ">
                            <section >
                                <div>
                                    {/*Grid row*/}
                                    <div className="row d-flex flex-column justify-content-center">
                                        {/*Grid column*/}
                                        <div className="col-auto">
                                            <p className="pt-3 pb-0">
                                                <strong>Sign up for our newsletter</strong>
                                            </p>
                                        </div>

                                        <div>
                                            <div className="input-group d-flex mv-justify-content-center" style={{ flexWrap: "nowrap" }}>
                                                <div className="form-outline mv-text-align-center">
                                                    <input type="search" id="form1" className="form-control cl-white" style={{ backgroundColor: "#464646" }} onInput={(e) => {
                                                        setSubLet(e.target.value)
                                                    }} placeholder="Search" />
                                                </div>
                                                <button type="button" className="btn btn-primary bg-sec-blue" onClick={() => {
                                                    submitLetter();
                                                }} >
                                                    Subscribe
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <br />
                            <section className="mb-4 p-2 py-0">
                                {/* Facebook */}
                                <a className="btn btn-outline-light btn-floating m-1" href="https://www.facebook.com/idesign.market/" role="button"><i className="fab fa-facebook-f" /></a>
                                <a className="btn btn-outline-light btn-floating m-1" href="https://api.whatsapp.com/send/?phone=919289347893&text&app_absent=0" role="button"><i className="fab fa-whatsapp" /></a>

                                <a className="btn btn-outline-light btn-floating m-1" href="https://www.instagram.com/iDesign.market/" role="button"><i className="fab fa-instagram" /></a>
                                <a className="btn btn-outline-light btn-floating m-1" href="https://www.youtube.com/channel/UCZYsSoot4r9eZSPJk6F7-xw" role="button"><i className="fab fa-youtube" /></a>

                            </section>
                        </div>

                        {/*Grid column*/}
                    </div>
                    <hr />
                    <div className="p-5 py-1 mv-px-0" >
                        <h5 className="text-align-start">Locations</h5>
                        <ul className="locations text-align-start">
                            <span> <a href="https://www.idesign.market/find-professionals/interior-designers-in-Delhi" >Interior Designers in Delhi</a> </span>
                            <span> <a href="https://www.idesign.market/find-professionals/interior-designers-in-Mumbai" >Interior Designers in Mumbai</a> </span>
                            <span> <a href="https://www.idesign.market/find-professionals/interior-designers-in-Gurugram" >Interior Designers in Gurugram</a> </span>
                            <span> <a href="https://www.idesign.market/find-professionals/interior-designers-in-Faridabad" >Interior Designers in Faridabad</a> </span>
                            <span> <a href="https://www.idesign.market/find-professionals/interior-designers-in-Noida" >Interior Designers in Noida</a> </span>
                            <span> <a href="https://www.idesign.market/find-professionals/interior-designers-in-Ghaziabad" >Interior Designers in Ghaziabad</a> </span>
                            <span> <a href="https://www.idesign.market/find-professionals/interior-designers-in-Bengaluru" >Interior Designers in Bengaluru</a> </span>
                            <span> <a href="https://www.idesign.market/find-professionals/interior-designers-in-Hyderabad" >Interior Designers in Hyderabad</a> </span>
                            <span> <a href="https://www.idesign.market/find-professionals/interior-designers-in-Pune" >Interior Designers in Pune</a> </span>
                            <span> <a href="https://www.idesign.market/find-professionals/interior-designers-in-Jaipur" >Interior Designers in Jaipur</a> </span>
                            <span> <a href="https://www.idesign.market/find-professionals/interior-designers-in-Chandigarh" >Interior Designers in Chandigarh</a> </span>
                            <span> <a href="https://www.idesign.market/find-professionals/interior-designers-in-Lucknow" >Interior Designers in Lucknow</a> </span>
                            <span> <a href="https://www.idesign.market/find-professionals/interior-designers-in-Indore" >Interior Designers in Indore</a> </span>
                            <span> <a href="https://www.idesign.market/find-professionals/interior-designers-in-Ahmedabad" >Interior Designers in Ahmedabad</a> </span>
                            <span> <a href="https://www.idesign.market/find-professionals/interior-designers-in-Chennai" >Interior Designers in Chennai</a> </span>
                            <span> <a href="https://www.idesign.market/find-professionals/interior-designers-in-Kolkata" >Interior Designers in Kolkata</a> </span>
                        </ul>
                    </div>
                    <div className="p-5 py-1 mv-px-0" >
                        <h5 className="text-align-start">Interior Designs</h5>
                        <ul className="locations text-align-start">
                            <span> <a href="https://www.idesign.market/design-ideas/bedroom-interior-designs" >Bedroom Interior Designs</a> </span>
                            <span> <a href="https://www.idesign.market/design-ideas/home-interior-designs" >Home Interior Designs</a> </span>
                            <span> <a href="https://www.idesign.market/design-ideas/living-room-interior-designs" >Living Room Interior Designs</a> </span>
                            <span> <a href="https://www.idesign.market/design-ideas/kitchen-interior-designs" >Kitchen Interior Designs</a> </span>
                            <span> <a href="https://www.idesign.market/design-ideas/office-interior-designs" >Office Interior Designs</a> </span>
                            <span> <a href="https://www.idesign.market/design-ideas/flat-apartment-interior-designs" >Flat Apartment Interior Designs</a> </span>
                            <span> <a href="https://www.idesign.market/design-ideas/bathroom-interior-designs" >Bathroom Interior Designs</a> </span>
                            <span> <a href="https://www.idesign.market/design-ideas/wall-interior-designs" >Wall Interior Designs</a> </span>
                            <span> <a href="https://www.idesign.market/design-ideas/pooja-room-interior-designs" >Pooja Room Interior Designs</a> </span>
                            <span> <a href="https://www.idesign.market/design-ideas/tv-unit-interior-designs" >TV Unit Interior Designs</a> </span>
                            <span> <a href="https://www.idesign.market/design-ideas/wardrobe-interior-designs" >Wardrobe Interior Designs</a> </span>
                            <span> <a href="https://www.idesign.market/design-ideas/dining-room-interior-designs" >Dining Room Interior Designs</a> </span>
                            <span> <a href="https://www.idesign.market/design-ideas/kid-room-interior-designs" >Kids Room Interior Designs</a> </span>
                            <span> <a href="https://www.idesign.market/design-ideas/study-room-interior-designs" >Study Room Interior Designs</a> </span>
                            <span> <a href="https://www.idesign.market/design-ideas/scandinavian-interior-designs" >Scandinavian Interior Designs</a> </span>
                            <span> <a href="https://www.idesign.market/design-ideas/contemporary-interior-designs" >Contemporary Interior Designs</a> </span>
                        </ul>
                    </div>
                </div>

                <div className="text-center p-3" style={{ backgroundColor: '#464646' }}>
                    2022 © iDesign.
                    <a className="text-white" href="https://mdbootstrap.com/"> All rights reserved</a>
                </div>
                {/* <div className='d-none mv-d-block' style={{ height: "50px" }}></div> */}
                {/* Copyright */}
            </footer>
            {/* Footer */}
        </section>

    )
}

export default Footer
