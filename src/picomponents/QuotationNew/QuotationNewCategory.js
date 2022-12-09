import React, { useContext, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import desquoContext from '../../picontext/DashBoard/desquoContext';
import QuotationNewItem from './QuotationNewItem'
import dcheck from './images/check_circle-1.png'; 
import dcancel from './images/cancel-1.png'; 
const QuotationNewCategory = ({ idx }) => {
    const context = useContext(desquoContext);
    const { newCats, setNewCats } = context;

    const [searchParams] = useSearchParams();
    const tab = searchParams.get("tab") || "onSite";
    const [selectApproved, setSelectApproved] = useState();

    const checkedAllCat = (selectApproved  && (Object.keys(selectApproved)?.filter((f) => selectApproved[f])?.length === newCats[tab][idx]?.item.filter((f) => f.isApproved === undefined)?.length)) ;

    const viewbtns = (selectApproved && Object.keys(selectApproved)?.filter((f)=> selectApproved[f])?.length > 1 );

    const handleCheckAllCat = (e) => {
        setSelectApproved();
        let x = {};
        for (let i = 0; i < newCats[tab][idx]?.item?.length; i++) {
            if (newCats[tab][idx]?.item[i]?.isApproved === undefined) {
                x[newCats[tab][idx]?.item[i]?._id] = e.target.checked;
            }
        }
        setSelectApproved(x);
    }

    const handleApproved = (val) => {
        let x = newCats; 
        for (let i = 0; i < newCats[tab][idx]?.item?.length; i++) {
            if (newCats[tab][idx]?.item[i]?.isApproved === undefined && selectApproved[newCats[tab][idx]?.item[i]?._id]) {
                newCats[tab][idx].item[i].isApproved = val;
            }
        }
        setNewCats({ ...x });
    }

    return (
        <div className={`m-2 br-5 border-none box-shadow-none accordion-item blue-border overflow-hidden ${tab}Cats`} idx={idx} >
            <h6 className="bg-blue-light border-none box-shadow-none accordion-header py-2 d-flex align-items-center justify-content-between" id={`flush-heading${idx}X`}>
                <div className='ps-3' style={{
                    width: "290px"
                }}>
                    {/* <i className="fas fa-timescl-grey1  me-4 pfs-14 cursor-pointer" /> */}
                    {(newCats[tab][idx]?.item.filter((f) => f.isApproved !== undefined)?.length < newCats[tab][idx]?.item?.length -1) && <input className="form-check-input " type="checkbox" checked={checkedAllCat || false} onChange={(e) => {
                        handleCheckAllCat(e);
                    }} />}
                    {!viewbtns ? <span className='pfs-14 fw-bold cl-black itemname ' >{newCats[tab][idx]?.name}</span> :
                        <span className='ms-2'>
                            <span className=" cursor-pointer text-success" onClick={() => {
                                handleApproved(1);
                                setSelectApproved();

                            }} >
                                <img src={dcheck} alt="" width={17} />
                                <span className='ms-1 pfs-14' >Approved</span>
                            </span>
                            <span className=" cursor-pointer text-danger ms-3 " onClick={() => {
                                handleApproved(0);
                                setSelectApproved();
                            }}>
                                <img src={dcancel} alt="" width={14} height={14} />
                                <span className='ms-1 pfs-14' >Reject</span>
                            </span>
                        </span>
                    }
                </div>
                <button className={`bg-blue-light border-none box-shadow-none accordion-button ${(newCats[tab][idx]?.open) ? "" : "collapsed"} py-2 d-flex w-auto`} type="button" data-mdb-toggle="collapse" data-mdb-target={`#flush-collapse${idx}X`} aria-expanded={(newCats[tab][idx]?.open) ? "true" : "false"} aria-controls={`flush-collapse${idx}X`} onClick={(e) => {
                    setTimeout(() => {
                        let x = newCats;
                        x[tab][idx].open = (e.target.getAttribute("aria-expanded") === "true" ? true : false);
                        setNewCats({ ...x });
                    }, 700)
                }} >

                </button>
            </h6>
            <div id={`flush-collapse${idx}X`} className={`bg-blue-light p-2 px-md-3 py-2  pt-0 border-none box-shadow-none accordion-collapse collapse ${(newCats[tab][idx]?.open) ? "show" : ""}`} aria-labelledby={`flush-heading${idx}X`}  >
                <div className="bg-white border-none box-shadow-none accordion-body br-5 px-2 px-md-4 py-4 pb-0">

                    {newCats[tab][idx] && newCats[tab][idx]?.item?.map((e, i) => {
                        return <QuotationNewItem key={tab + idx + i} idx={idx} itx={i} setSelectApproved={setSelectApproved} selectApproved={selectApproved} viewbtns={viewbtns}   />
                    })}

                    <div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuotationNewCategory
