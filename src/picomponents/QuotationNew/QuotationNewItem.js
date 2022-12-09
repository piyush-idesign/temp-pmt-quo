import React, { useContext } from 'react'
import desquoContext from '../../picontext/DashBoard/desquoContext';
import { putCm } from '../../piservices/compCommon';
import addImage from "./images/addImage.png";
import parse from 'html-react-parser';
import { useSearchParams } from 'react-router-dom';
import dcheck from './images/check_circle-1.png';
import noClickCheck from './images/check_circle-2.png';
import clikedcheck from './images/check_circle.png';
import dcancel from './images/cancel-1.png';
import clikedcancel from './images/cancel-2.png';
import noClickcancel from './images/cancel.png';

const QuotationNewItem = ({ idx, itx, selectApproved, setSelectApproved, viewbtns }) => {
    const context = useContext(desquoContext);
    const { newCats, setNewCats, action, setAction } = context;
    const [searchParams] = useSearchParams();
    const tab = searchParams.get("tab") || "onSite";

    const handleApproved = (value) => {
        let x = newCats;
        x[tab][idx].item[itx]["isApproved"] = value;
        setNewCats({ ...x });
        let y = selectApproved;
        if (y) {
            delete y[newCats[tab][idx]?.item[itx]?._id];
            setSelectApproved({ ...y });
        }

    }

    const checkedCat = selectApproved && selectApproved[newCats[tab][idx]?.item[itx]?._id];

    const handleCheckCat = (e) => {
        setSelectApproved({ ...selectApproved, [newCats[tab][idx]?.item[itx]?._id]: e.target.checked })
    }
    return (
        <div>
            <div className="d-flex flex-wrap flex-md-nowrap w-100 py-0   mb-md-1 pfs-14 align-items-center">
                <div className="d-flex ms-md-2  mv-w-100 itemdesc " style={{
                    width: "45%"
                }} >

                    <div className="d-flex ">
                        {newCats[tab][idx]?.item[itx]?.isApproved === undefined && <div className="me-3 d-none d-md-block "   >
                            <input className="form-check-input me-0 pe-0" type="checkbox" checked={checkedCat || false} onChange={(e) => {
                                handleCheckCat(e);
                            }} />
                        </div>}
                        <div className="position-relative">
                            <div className='img-div br-5 position-relative' style={{
                                backgroundImage: `url("${newCats[tab][idx]?.item[itx]?.image || addImage}")`
                            }}   >

                            </div>

                        </div>
                    </div>
                    <div className=" w-100  ms-3  " id={`editabledesc${tab + idx + itx}`} >

                        <div className=' pfs-14  scb-none w-100 h-100 overflow-auto' id={`desc${tab + idx + itx}`}  > {parse(newCats[tab][idx]?.item[itx]?.itemdesc || "")}</div>

                    </div>
                </div>


                <div className="d-flex mv-w-100" style={{
                    width: "25%"
                }} >
                    <div className='text-center ps-md-2' style={{
                        width: "35%"
                    }} >
                        <div className="text-center d-md-none my-2">
                            Unit
                        </div>
                        <div className="">
                            {newCats[tab][idx]?.item[itx]?.unit || ""}
                        </div>
                    </div>
                    <div className='text-center pe-2' style={{
                        width: "30%"
                    }} >
                        <div >
                            <div className="text-center d-md-none my-2">
                                Quantity
                            </div>
                            <div className="px-1 overflow-auto thin-scb">
                                {putCm(newCats[tab][idx]?.item[itx]?.quantity) || ""}
                            </div>
                        </div>
                    </div>
                    <div className='text-center' style={{
                        width: "35%"
                    }} >

                        <div >
                            <div className="text-center d-md-none my-2">
                                Price
                            </div>
                            <div className="px-1 overflow-auto thin-scb">
                                {putCm(newCats[tab][idx]?.item[itx]?.price) || ""}
                            </div>
                        </div>
                    </div>

                </div>
                <div className="d-flex mv-w-100   flex-md-row pay align-items-center" style={{
                    width: "30%"
                }} >

                    <div className='text-start text-md-center fw-bold overflow-auto thin-scb  mx-2 ws-nowrap mv-w-75' style={{
                        width: "50%"
                    }} >
                        <span className='cl-black'>₹ {putCm((newCats[tab][idx]?.item[itx]?.quantity * newCats[tab][idx]?.item[itx]?.price) || "00")}</span> <span className="d-md-none pfs-12 fw-normal ms-2 ">Amount</span>
                    </div>
                    <div className='text-md-center d-flex align-items-center justify-content-end justify-content-lg-center' style={{
                        width: "50%"
                    }} >
                        <button type="button" className={`btn btn-sm ${(action?.comments && action?.idx === idx && action?.itx === itx) ? "btn-outline-info" : "border xl-border-none"}  btn-rounded d-flex align-items-center px-2 py-1 mt-1 mt-lg-1 box-shadow-none`} data-mdb-ripple-color="dark" onClick={() => {
                            setAction({ comments: true, idx: idx, itx: itx });
                        }} >
                            <span className='position-relative' >
                                <i className="far fa-comment-alt cursor-pointer" />
                                {newCats[tab][idx].item[itx]?.comments?.length > 0 && <span className="position-absolute badge  rounded-circle bg-danger " style={{
                                    transform: "scale(0.6)",
                                    top: "-6px",
                                    right: "-10px",
                                }} >
                                    <span>{newCats[tab][idx].item[itx]?.comments?.length}</span>
                                </span>}
                            </span>

                            <span className='ms-2 d-none d-xl-block' >Comment  </span> </button>
                        {!viewbtns && <div className='d-flex ps-1 align-items-center'>
                            <div>
                                {newCats[tab][idx].item[itx]["isApproved"] === undefined && <img src={dcheck} alt="" className='cursor-pointer' width={20} onClick={() => {
                                    handleApproved(1);
                                }} />}
                                {newCats[tab][idx].item[itx]["isApproved"] === 1 && <img src={clikedcheck} alt="" className=' ' width={17} />}
                                {newCats[tab][idx].item[itx]["isApproved"] === 0 && <img src={noClickCheck}  alt="" style={{
                                    opacity : "0.4"
                                }} width={17} />}
                            </div>
                            <div className="ms-2">
                                {newCats[tab][idx].item[itx]["isApproved"] === 0 && <img src={clikedcancel} alt="" className='  ' width={17} height={17} />}
                                {newCats[tab][idx].item[itx]["isApproved"] === 1 && <img src={noClickcancel} alt="" style={{
                                    opacity : "0.4"
                                }} width={17} height={17} />}
                                {newCats[tab][idx].item[itx]["isApproved"] === undefined && <img src={dcancel} alt="" className='cursor-pointer' width={17} height={17} onClick={() => {
                                    handleApproved(0);
                                }} />}
                            </div>
                        </div>}
                    </div>

                </div>

            </div>
            <hr />
        </div>
    )
}

export default QuotationNewItem