import React, { useEffect } from 'react'
import { useContext } from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import desquoContext from '../../../picontext/DashBoard/desquoContext';
import { improveInput, InvalidClass } from '../../../piservices/compCommon'; 
import LeadModal from '../../QuickQuotation/LeadModal';
import constants from "../../../piservices/constants";
import { postReq } from '../../../piservices/apis';
import { getLoginId } from '../../../piservices/authService';
import Header from '../../Quotation/SideBar/Header';

const NewQuoBasicData = ({ setProgress }) => {
    const context = useContext(desquoContext);
    const { selectedLead } = context;
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        trigger,
        setValue
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
                "projectLocation": selectedLead.city,
                "name": selectedLead.name,
                "emailId": selectedLead.email,
                "location": selectedLead.city,
                "config": selectedLead.config,
                "budget": selectedLead.budget,
                "requirements": selectedLead.propertyType,
                "renovationTimeline": selectedLead.renovationTimeline,
                "designerId": getLoginId()
            });
            if (res && !res.error) {
                navigate("/quick-quotation/req/" + res?.data?._id);
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
        improveInput();
    }, []);

    useEffect(() => {
        setValue("lead", selectedLead?.name || "");

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedLead]);

    return (
        <div className="vh-100 bg-white overflow-auto">
            <ToastContainer />
            <Header sideBardivclassName="expander" sideclassName="d-none d-lg-block" className="" />
            <div className=" d-flex mt-md-5 justify-content-center px-0 px-md-2">
                <div className=' w-100'>

                    <form onSubmit={handleSubmit(onSubmit, onError)} className="px-0 px-md-3 p-md-3 bg-white m-auto mv-w-100  br-5 br-8  " style={{ width: "756px" }}>
                        <div className="border mv-border-none br-5" >
                            <div className="form-outline border-bottom br-5 h5 mb-0 p-3 px-md-5">
                                Existing Project / Lead
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
                                <div className=" br-5  my-3 mb-0 ">
                                    <div className="  mb-0 droparrow">

                                        <input style={errors.lead && InvalidClass} name="lead" type="text" className="form-control form-control-lg bg-white" disabled  data-mdb-toggle="modal"  placeholder="Search or Select Lead" data-mdb-target="#LeadModal"
                                            {...register("lead", {
                                                required: "Lead is required",
                                            })}
                                            onKeyUp={() => {
                                                trigger("lead");
                                            }} >
                                        </input>
                                        {/* <label className="form-label" htmlFor="colFormLabelLg">Search or Select Lead</label> */}
                                    </div>
                                </div>
                                <LeadModal />
                                {errors.lead && (
                                    <small className="text-danger">{errors.lead.message}</small>
                                )}

                                <div className="d-flex justify-content-start w-100 mv-position-fixed bottom-0 start-0 mb-2 mt-4">
                                    <div className="px-2 mv-w-100 nxtBtn">
                                        <button type="submit" className="btn btn-primary btn-lg btn-block bg-base-blue box-shadow-none ">Continue</button>
                                    </div>
                                    <div className="px-2 mv-w-100 bckBtn mv-bg-white text-align-center br-8" >
                                        <Link to="/quick-quotation/start" className="btn  btn-lg cl-grey1 box-shadow-none mb-0 mv-bg-white bg-grey1">Back</Link>
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

export default NewQuoBasicData
