import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import { postReq } from '../../../piservices/apis';
import { getLoginId } from '../../../piservices/authService';
import { improveInput, InvalidClass } from '../../../piservices/compCommon'; 
import constants from "../../../piservices/constants";
import Header from '../../Quotation/SideBar/Header';

const NewQuoBasicData2 = ({ setProgress }) => {

    const navigate = useNavigate();
    const [sendMail, setSendMail] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        trigger,
    } = useForm();

    const onSubmit = (data, e) => {
        handleFormSubmit(data)
    };
    const onError = (errors, e) => console.log(errors, e);

    const handleFormSubmit = async (data) => {
        try {
            await setProgress(30);
            const res = await postReq(constants.quoapi + "/api/quick_quotation/add_new_project", {
                "isLead": false,
                "projectName": data.name,
                "projectLocation": data.location,
                "name": data.clientName,
                "emailId": data.clientEmailId,
                "location": "",
                "config": "",
                "budget": "",
                "requirements": "Full Home",
                "renovationTimeline": "immediately",
                "designerId": getLoginId()
            });
            if (res && !res.error) {
                navigate("/new-quotation/" + res?.data?._id);
            }
            await setProgress(100);
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

    useEffect(() => {
        if (!getLoginId()) {
            document.getElementById("loginBtn")?.click();
            return;
        } 
        improveInput();
    }, []);

    return (
        <div className="vh-100 bg-white overflow-auto">
            <ToastContainer />
            <Header sideBardivclassName="expander" sideclassName="d-none d-lg-block" className="" />
            <div className=" d-flex mt-md-5 justify-content-center px-0 px-md-2">
                <div className=' w-100'>

                    <form onSubmit={handleSubmit(onSubmit, onError)} className="px-0 px-md-3 p-md-3 bg-white m-auto mv-w-100  br-5 br-8  " style={{ width: "756px" }}>
                        <div className="border mv-border-none br-5" >
                            <div className="form-outline border-bottom br-5 h5 mb-0 p-3 px-md-5">
                                Add New Project
                            </div>
                            <div className="p-4 px-3 px-md-5 ">

                                <div className="br-5 form-outline border my-3 mb-0" >
                                    <div className="form-outline br-5 mb-0">
                                        <input style={errors.name && InvalidClass} name="name" type="text" className="form-control form-control-lg" id="colFormLabelLg1"
                                            {...register("name", {
                                                required: "Name is Required",
                                            })}
                                            onKeyUp={() => {
                                                trigger("name");
                                            }}
                                        />

                                        <label className="form-label pt-2 " htmlFor="colFormLabelLg">Project Name</label>
                                    </div>
                                </div>
                                {errors.name && (
                                    <small className="text-danger">{errors.name.message}</small>
                                )}
                                <div className="br-5 form-outline border my-3 mb-0" >
                                    <div className="form-outline br-5 mb-0">
                                        <input style={errors.location && InvalidClass} name="location" type="text" className="form-control form-control-lg" id="colFormLabelLg1"
                                            {...register("location", {
                                                required: "Location is Required",
                                            })}
                                            onKeyUp={() => {
                                                trigger("location");
                                            }}
                                        />

                                        <label className="form-label pt-2 " htmlFor="colFormLabelLg">Project Location</label>
                                    </div>
                                </div>
                                {errors.location && (
                                    <small className="text-danger">{errors.location.message}</small>
                                )}
                                <div className="br-5 form-outline border my-3 mb-0" >
                                    <div className="form-outline br-5 mb-0">
                                        <input style={errors.clientName && InvalidClass} name="clientName" type="text" className="form-control form-control-lg" id="colFormLabelLg1"
                                            {...register("clientName", {
                                                required: "Client Name is Required",
                                            })}
                                            onKeyUp={() => {
                                                trigger("clientName");
                                            }}
                                        />

                                        <label className="form-label pt-2 " htmlFor="colFormLabelLg">Client Name</label>
                                    </div>
                                </div>
                                {errors.clientName && (
                                    <small className="text-danger">{errors.clientName.message}</small>
                                )}
                                <div className="form-check mt-3">
                                    <input className="form-check-input" type="checkbox"   id="flexCheckChecked" checked={sendMail || false} onChange={(e)=>{
                                        setSendMail(e.target.checked)
                                    }} />
                                    <label className="form-check-label" htmlFor="flexCheckChecked">Share project link with client </label>
                                </div>

                                {sendMail && <div className="br-5 form-outline border my-3 mb-0" >
                                    <div className="form-outline br-5 mb-0">
                                        <input style={errors.clientEmailId && InvalidClass} name="clientEmailId" type="text" className="form-control form-control-lg" id="colFormLabelLg1"
                                            {...register("clientEmailId", {
                                                required: "Client Email Id is Required",
                                            })}
                                            onKeyUp={() => {
                                                trigger("clientEmailId");
                                            }}
                                        />

                                        <label className="form-label pt-2 " htmlFor="colFormLabelLg">Client Email Id</label>
                                    </div>
                                </div>}
                                {errors.clientEmailId && (
                                    <small className="text-danger">{errors.clientEmailId.message}</small>
                                )}

                                <div className="d-flex justify-content-start w-100 mv-position-fixed bottom-0 start-0 mb-2 mt-4">
                                    <div className="px-2 mv-w-100 nxtBtn">
                                        <button type="submit" className="btn btn-primary btn-lg btn-block bg-base-blue box-shadow-none ">Continue</button>
                                    </div>
                                    <div className="px-2 mv-w-100 bckBtn mv-bg-white text-align-center br-8" >
                                        <Link to="/new-quotation/start" className="btn  btn-lg cl-grey1 box-shadow-none mb-0 mv-bg-white bg-grey1">Back</Link>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default NewQuoBasicData2
