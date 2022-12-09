import React, { useState } from 'react'
import { toast, ToastContainer } from "react-toastify";
import { baseUrl, singleOptionSelect, singleOptionSelectError } from '../../../piservices/compCommon';
import imgx from "../../QuickQuotation/images/img.svg"
import imgx2 from "../../QuickQuotation/images/img2.svg"
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import Header from '../../Quotation/SideBar/Header';
const NewQuoStart = ({ setProgress }) => {

    const [activeOptionBox, setActiveOptionBox] = useState("");
    const [errors, setErrors] = useState();
    const onError = () => singleOptionSelectError("option-form1");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(errors)
        try {
            if (activeOptionBox && activeOptionBox.trim() !== "") {
                console.log(activeOptionBox)
                navigate("/new-quotation/" + activeOptionBox);

                // await setProgress(30);
                // await updateBasicDetails("workRequirements", { "requirements": activeOptionBox }).then((e) => {
                //     if (e?.status) {
                //     }
                // });
                // await setProgress(100);
            } else {
                setErrors(" * Select at least one option")
                onError();
            }
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
    };
    const handleActiveState = (e) => {
        setActiveOptionBox(document.querySelector("#option-form1 .option-box.active").getAttribute("value"));
    }

    useEffect(() => {
        singleOptionSelect("option-form1");
    }, []);
    return (
        <form onSubmit={handleSubmit} className="vh-100  bg-white  overflow-auto">
            <ToastContainer />
            <Header sideBardivclassName="expander" sideclassName="d-none d-lg-block" />
            <div className=" d-flex mt-5 justify-content-center px-2">
                <div>
                    <h3 className='text-align-center mb-5 mv-h1 mx-auto' style={{ maxWidth: "400px" }} >Hi, your quotation will take 4 - 5 mins</h3>
                    <p className='text-align-center mb-5 mx-auto cl-grey1 h6' style={{ maxWidth: "400px" }} >Quotation Required For ?</p>

                    <section className="p-3 pt-0 m-auto br-5 mv-px-0 mv-w-100  br-8">
                        <div id="option-form1" >
                            <div className="d-flex flex-wrap"  >
                                <a href={`${baseUrl}/new-quotation/new-details`} className="p-1  w-50">
                                    <div className="border  br-8 bg-white d-flex flex-column justify-content-center text-align-center align-items-center p-4 option-box" value="new-details" onClick={handleActiveState} >
                                        <img src={imgx} alt="" width={50} />
                                        <p className="cl-black mb-1 mt-3">
                                            {/* Full Home Interiors */}
                                            New Project

                                        </p>
                                    </div>
                                </a>
                                <a href={`${baseUrl}/new-quotation/details`} className="p-1  w-50">
                                    <div className="border h-100 br-8 bg-white d-flex flex-column justify-content-center text-align-center align-items-center p-4 option-box" value="details" onClick={handleActiveState} >
                                        <img src={imgx2} alt="" width={50} />
                                        <p className="cl-black mb-1 mt-3 ws-nowrap">
                                            Existing Project/Lead
                                        </p>
                                    </div>
                                </a>

                            </div>
                            <div className="form-outline br-5 my-3 mb-0 w-100 text-align-center">
                                <input name="services" type="hidden" className="form-control form-control-lg" id="colFormLabelLg1" value={activeOptionBox}
                                />
                                {errors && (
                                    <small className="text-danger m-auto  ">{errors}</small>
                                )}
                            </div>
                            <br />
                        </div>
                    </section>
                </div>
            </div>
            <div className="d-none justify-content-center w-100 mv-position-fixed bottom-0 mb-3">
                <div className="px-2 mv-w-100 bckBtn mv-bg-white text-align-center br-8" >
                    <Link to="/dashboard/onboard/step1" className="btn  btn-lg cl-grey1 box-shadow-none mb-0 mv-bg-white">Back</Link>
                </div>
                <div className="px-2 w-100 nxtBtn">
                    <button type="submit" className="btn btn-primary btn-lg btn-block bg-base-blue box-shadow-none ">Next</button>
                </div>
            </div>
        </form>
    )
}

export default NewQuoStart
