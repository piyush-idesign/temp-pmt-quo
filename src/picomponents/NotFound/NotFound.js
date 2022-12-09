import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../Footer/Footer'
import "./index.css"
const NotFound = () => {
  const [startGame, setStartGame] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      if (window.location.href.includes("404")) {
        navigate("/find-professionals")
      }
    }, [10000])

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <Helmet>
        <link rel="canonical" href={`${window.location.href}`} />
        <title>Not Found | iDesign Market</title>
      </Helmet>
      <section className="vh-100 gradient-form bg-white" >
        <div className="py-5 h-100 mv-py-0">
          <div className="row d-flex justify-content-center align-items-center h-100 py-5 mv-py-0"  >
            <div className="col-xl-10 py-5 mv-py-0" >
              <div className="  rounded-3 text-black">
                <div className="row g-0" style={{ flexFlow: 'wrap-reverse' }} >
                  <div className="col-lg-6" >
                    <div className=" p-md-5 mx-md-4">
                      <div className='mv-text-align-center px-3'>
                        <section className="error-container mv-text-align-center">
                          <span>4</span>
                          <span><span className="screen-reader-text">0</span></span>
                          <span>4</span>
                        </section>
                        <h2 className='fw-bold' >Oops!, You weren’t supposed to see this.</h2>
                        <p className='my-4 mb-2'>The page you are looking for no longer exists.</p>
                        <p className='fw-bold'><span>Return to </span><Link to="/" className="cl-sec-blue">homepage , </Link> <Link to="/find-professionals" className="cl-sec-blue">find professinals , </Link> <Link to="/explore-projects" className="cl-sec-blue">explore project</Link>   </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex align-items-center" style={{ minHeight: "30vh" }} >
                    <div className="four_zero_four_bg" onClick={(e) => {
                      setStartGame(true);
                      // e.target.remove();
                    }}>
                    </div>
                    {startGame && ""}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default NotFound