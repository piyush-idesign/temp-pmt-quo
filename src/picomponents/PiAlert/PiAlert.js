import React, { useContext } from 'react'
import warn from "./Images/Warn.png"
import parse from 'html-react-parser';
import desquoContext from '../../picontext/DashBoard/desquoContext';

const PiAlert = (props) => {

    const context = useContext(desquoContext);
    const { paData } = context;

    return (
        <div>
            <div>
                {/* Button trigger modal */}

                {/* Modal */}
                <div className="modal fade"
                    id="piAlertModal"
                    data-mdb-backdrop="static"
                    data-mdb-keyboard="false"
                    aria-hidden="true"
                    tabIndex={-1}
                    aria-labelledby="piAlertModalLabel"  >
                    <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "430px" }} >
                        <div className="modal-content">
                            <div className="modal-body pb-1 pt-4">
                                <div className="d-flex flex-column justify-content-center text-align-center align-items-center">
                                    {!paData?.noimg && (paData?.successImg ? <img src="https://cdn4.iconfinder.com/data/icons/logistic-delivery-17/40/Done_ok_success_tick_check-512.png" alt="" width={60} /> : <img src={warn} alt="" width={30} />)}
                                    <p className='px-5 mt-3' >
                                        {parse(paData?.title || "Nothing To Show")}
                                    </p>
                                </div>
                            </div>
                            <div className="modal-footer justify-content-center border-none pt-0 pb-4">
                                <button type="button" className="btn btn-primary bg-sec-blue box-shadow-none" onClick={  paData?.onClick }  data-mdb-dismiss="modal" >{paData?.submitTxt || "Yes"}</button>
                                <button type="button" className={`btn btn-secondary bg-grey1 cl-grey1 box-shadow-none px-3 ${paData.cancelClass}`} data-mdb-dismiss="modal">{paData?.cancelTxt || "No"}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PiAlert
