import React, { useContext } from 'react'
import desquoContext from '../../picontext/DashBoard/desquoContext';
import { putCm } from '../../piservices/compCommon';

const QuoBOQSummary = ({ className }) => {
    const context = useContext(desquoContext);
    const { fields } = context;
    return (
        <div className={className}>

            <div className="accordion accordion-flush boqsum  xl-dark-box-shadow mb-4 mb-xl-0 pb-2" style={{
                borderRadius: '45px 45px 0px 0px'
            }} id="accordionExample">
                <div className="accordion-item border xl-border-none br-5 bg-transparent">

                    <div id="collapseOne" className={`bg-white accordion-collapse collapse ${window.innerWidth > 767 ? "show" : ""}`} aria-labelledby="headingOne" data-mdb-parent="#accordionExample">
                        <div className="accordion-body p-0 pb-2">
                            <div className={` mt-2 px-3 pt-2 br-5 ${className}`}>
                                <p className="cl-grey1 pfs-12 pb-2 border-bottom  ">
                                    BOQ Summary
                                </p>
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <p className="mb-2">Design Fees :</p>
                                    </div>
                                    <div>
                                        <p className="mb-2">₹ {putCm(fields?.designFee) || 0}</p>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <p className="mb-2">Onsite :</p>
                                    </div>
                                    <div>
                                        <p className="mb-2">₹  {putCm(fields?.onSite) || 0}</p>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <p className="mb-2">Furniture :</p>
                                    </div>
                                    <div>
                                        <p className="mb-2">₹  {putCm(fields?.furniture) || 0}</p>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <p className="mb-2">Kitchen :</p>
                                    </div>
                                    <div>
                                        <p className="mb-2">₹  {putCm(fields?.kitchen) || 0}</p>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <p className="mb-2">GST :</p>
                                    </div>
                                    <div>
                                        <p className="mb-2">{fields?.gst} %</p>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                    <h2 className="accordion-header" id="headingOne">
                        <div className="accordion-button pt-0 pb-0  box-shadow-none px-3" type="button" data-mdb-toggle="collapse" data-mdb-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            <div className="d-flex justify-content-md-between pt-3 border-top  w-100 dv-noafter">
                                <div className="me-3">
                                    <p className='cl-black fw-bold'>Total BOQ Amount :</p>
                                </div>
                                <div>
                                    <p className='text-success fw-bold'>₹ {putCm(fields?.totalBOQvalue) || 0}</p>
                                </div>
                            </div>
                        </div>
                    </h2>
                </div>
            </div>
        </div>

    )
}

export default QuoBOQSummary
