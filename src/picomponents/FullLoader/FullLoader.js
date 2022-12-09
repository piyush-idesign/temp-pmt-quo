import React, { useRef  } from 'react'
import { Link } from 'react-router-dom';
import "./index.css";
import imgx from "./logo.webp"
import imgx2 from "./no-found.gif"
import imgx3 from "../PiAlert/Images/Warn.png"
const FullLoader = (props) => {
    const ref = useRef();


    return (
        <div className={`container w-100 position-relative  m-auto ${props.className}`} style={props.style} >
            <div className="text-align-center mb-4" >
                {props.msg ? <img src={imgx2} width={200} alt="" /> :
                    <div className='position-relative'>
                        <img src={imgx} alt="" width={100} />

                    </div>}

            </div>
            <div ref={ref} className="text-align-center" >
                {props.msg ? <div>
                    <p>{props.msg}</p>
                    {props?.to && <Link to={props?.to || "/find-professionals"} type="button" className="btn btn-info box-shadow-none bg-sec-blue w-75 Request Quotation " style={{ maxWidth: "200px" }} >{props?.label || "Find Professionals"}</Link>}
                    <br />

                </div> :
                    <div>

                        <div className="fp-loading-bar m-auto">
                            <div className="fp-progress-bar" />
                         </div>
                        <div className="ne" style={{ marginTop: "-20px", zIndex: "9999999999" }} >
                            <div className="accordion accordion-flush mb-2" id="accordionFlushExample">
                                <div className="accordion-item bg-transparent ">
                                    <h2 className="accordion-header d-flex align-items-center justify-content-center w-100" id="flush-headingOne">
                                        <img src={imgx3} className="me-2 " width={20} alt=""  />
                                        <button className="btn btn-lg collapsed bg-transparent  box-shadow-none p-0" type="button" data-mdb-toggle="collapse" data-mdb-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                            <h5 className='mb-1'> Network Error</h5>
                                        </button>
                                    </h2>
                                    <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-mdb-parent="#accordionFlushExample">
                                        <div className="accordion-body justify-content-start text-align-start mx-2">
                                            <p className='mb-0'>Try...</p>
                                            <small> <li> Checking The Connection</li></small>
                                            <small> <li>Reloading Page</li></small>
                                            <small> <li> Clearing Cache</li></small>
                                            <small> <li>Checking the proxy, firewall, and DNS configuration</li></small>
                                            <small> <li>Again . Server May Be Down</li></small>
                                            <small> <li>Contacting <a href="https://pro.idesign.market/contact">Admin</a>  In Case Of Emergency</li></small>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                }
            </div>
        </div>

    )
}

export default FullLoader
