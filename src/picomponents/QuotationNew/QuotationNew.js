import React, { useContext, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useSearchParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import SaveTableBtns from '../Quotation/SaveTableBtns';
import Header from '../Quotation/SideBar/Header';
import ShowPath from '../ShowPath/ShowPath';
import house from "../Quotation/images/house.png";
import piggybank from "../Quotation/images/piggybank.png";
import desquoContext from '../../picontext/DashBoard/desquoContext';
import QuotationScratch from './QuotationScratch';
import "./index.css";
import QuotationCatComments from './QuotationCatComments';
import { isMd, putCm } from '../../piservices/compCommon';
import commenticon from './images/commenticon.png';
import QuoBOQSummary from '../Quotation/QuoBOQSummary';
import expf from '../../piservices/constants';
import axios from 'axios';
import { getLoginId } from '../../piservices/authService';

import { useConfirmExit } from 'react-haiku';
const QuotationNew = ({ setProgress }) => {
    useConfirmExit(true);

    const [searchParams, setSearchParams] = useSearchParams();

    const context = useContext(desquoContext);
    const { fields, action, draggable, setDraggable, setDraggableItem, homData, setHomData, initialQuo } = context;

    const setTab = async (e) => {
        if (e.target.getAttribute("tab")) {
            await setSearchParams({
                ...Object.fromEntries([...searchParams]),
                tab: e.target.getAttribute("tab"),
            });
        }
    };

    function isPresent(e) {
        return true;
    }

    const init = async () => {
        await axios
            .get(
                expf?.proapi + `/homeOwner/getHomeOwner?homeOwner_id=${getLoginId()}`
            )
            .then((res) => {
                setHomData(res?.data?.data[0])
                return res.data;
            })
            .catch((err) => {
                console.log(err);
            });
    }
    useEffect(() => {
        init();


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
 
    return (((initialQuo?.isDraft === "false" || (!initialQuo?.isDraft)) && (initialQuo ? Object.keys(initialQuo)?.length > 0 : true) ) &&
        <div id="body" onClick={() => {
            if (draggable === true) {
                setDraggable(false);
                setDraggableItem(false);
            }
        }}>
            <Helmet>
                <link rel="canonical" href={`${window.location.href}`} />
            </Helmet>
            <Header sideclassName="d-none d-lg-block" sideBardivclassName="expander" className="d-none d-lg-block" />

            <div className="das-main-box quoview">
                <ToastContainer />
                <div className="d-flex flex-column flex-lg-row mt-3 mt-lg-0">
                    <div className=" w-100 w-lg-75  mv-border-none bg-white quoview">
                        <div className=" mainDiv w-100 bg-white pt-md-2">
                            <div
                                className="px-md-2 lg-position-fixed  w-100 bg-white top-0 border-bottom"
                                style={{
                                    zIndex: 1,
                                }}
                            >
                                <ShowPath
                                    className="pfs-14"
                                    pathshowerClass="mb-0"
                                    path={[
                                        JSON.stringify({ label: "Quotation", link: "/quotation" }),
                                        JSON.stringify({
                                            label: "Vikash",
                                            link: "",
                                        }),
                                    ]}
                                />
                                <div className="d-flex justify-content-between align-items-center  px-md-3">
                                    <div
                                        className="d-flex cursor-pointer overflow-auto scb-none pitabs pfs-14"
                                        onClick={(e) => {
                                            setTab(e);
                                        }}
                                    >
                                        {isPresent("onSite") && <button
                                            className={`btn btn-link mx-2 ws-nowrap 
                                        ${(searchParams.get("tab") === "onSite" || !searchParams.get("tab"))
                                                    ? "cl-sec-blue blue-bottom"
                                                    : "cl-grey1"
                                                }
                                        mb-0 pb-2 p-hover px-2 pfs-14 br-0 `}
                                            tab="onSite"
                                        >
                                            Onsite & Civil works
                                        </button>}

                                        {isPresent("furniture") && <button
                                            className={`btn btn-link mx-2 ws-nowrap
                                         ${searchParams.get("tab") ===
                                                    "furniture"
                                                    ? "cl-sec-blue blue-bottom"
                                                    : "cl-grey1"
                                                } 
                                         mb-0 pb-2 p-hover px-2 pfs-14 br-0 `}
                                            tab="furniture"
                                        >
                                            Furniture, Decor & Wardrobe
                                        </button>}

                                        {isPresent("kitchen") && <button
                                            className={`btn btn-link mx-2 ws-nowrap ${searchParams.get("tab") === "kitchen"
                                                ? "cl-sec-blue blue-bottom"
                                                : "cl-grey1"
                                                } mb-0 pb-2 p-hover px-2 pfs-14 br-0 `}
                                            tab="kitchen"
                                        >
                                            Kitchen & Accessories
                                        </button>}
                                    </div>
                                    <div className=" align-items-center d-none d-md-flex">

                                        <div className='me-3'>
                                            <span className="position-relative">
                                                <img src={commenticon} alt="" width={20} />
                                                <span className="position-absolute badge  rounded-circle bg-danger " style={{
                                                    transform: "scale(0.4)",
                                                    top: "-6px",
                                                    right: "-10px",
                                                }} >
                                                    <span className="opacity-0">a</span>
                                                </span>
                                            </span>
                                            <span className="cl-sec-blue pfs-14 ms-2">Comment</span>
                                        </div>
                                        <div className="d-flex align-items-center  ">
                                            <div className="dropdown br-5 d-none">
                                                <button
                                                    className="btn btn-link  cl-black fw-bold p-1"
                                                    id="sortCatDesignIdeas"
                                                    data-mdb-toggle="dropdown"
                                                    aria-expanded="false"
                                                >
                                                    <span className="mv-d-none">: </span>
                                                    <span className="d-md-none">
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                        <img
                                                            src="https://www.shareicon.net/data/2015/09/19/643067_square_512x512.png"
                                                            width={13}
                                                            alt=""
                                                            style={{ marginRight: "-10px" }}
                                                        />
                                                    </span>
                                                </button>
                                                <ul
                                                    className="dropdown-menu"
                                                    aria-labelledby="sortCatDesignIdeas"
                                                >
                                                    <li>
                                                        <a className="dropdown-item" href="#!">
                                                            Trending
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a className="dropdown-item" href="#!">
                                                            Recent
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="d-lg-none">
                                <br />
                                <br />
                                <br />
                            </div>
                            <div className=' py-md-3 px-md-4'>

                                <QuotationScratch setProgress={setProgress} />
                                <QuoBOQSummary className="d-lg-none" />
                                <SaveTableBtns className="d-lg-none" setProgress={setProgress} />
                            </div>
                            <div className="d-lg-none">
                                <br />
                                <br />
                                <br /><br />
                            </div>
                        </div>
                    </div>
                    <div className={`w-100 w-lg-25 border bg-white  overflow-auto scb-none  position-fixed end-0 mv-top-0" ${action?.addItem || action?.comments ? "mv-top-0 lg-vh-100 lg-max-h-auto" : "d-none d-lg-block"}`} style={{
                        maxHeight: isMd ? window.innerHeight : window.innerHeight - 70,
                        zIndex: 9999,
                    }} >
                        {action?.comments && <div>
                            <QuotationCatComments setProgress={setProgress} />
                        </div>}

                        {!action?.addItem && !action?.comments && <div className='min-vh-100  p-3 '>
                            <SaveTableBtns className="lg-d-none" setProgress={setProgress} />
                            <div className="border my-2 px-3 py-2 br-5">
                                <span className="cl-grey1 pfs-12">Total BOQ value</span>
                                <h4 className="fw-bold">₹ {putCm(fields?.totalBOQvalue) || 0}</h4>
                            </div>

                            <QuoBOQSummary />
                            <div className="border my-2 px-3 py-2 br-5">
                                <div className="d-flex w-100 justify-content-between">
                                    <div>
                                        <h5 className="mb-0">{homData?.name || "Not Provided"}</h5>
                                        <span className="cl-grey1 pfs-12">{homData?.location || "Not Provided"}</span>
                                    </div>
                                    <div>
                                        <span className="badge badge-sec-secondary rounded-pill px-2 fw-normal">
                                            {homData?.renovationTimeline || "Not Provided"}
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <div className="me-3">
                                        <img src={house} width={12} alt="" />
                                        <span className="ms-2 pfs-12">{homData?.config || "Not Provided"}</span>
                                    </div>
                                    <div>
                                        <img src={piggybank} width={12} alt="" />
                                        <span className="ms-2 pfs-12">{homData?.budget || "Not Provided"}</span>
                                    </div>
                                    <div>
                                        <img src={piggybank} width={12} alt="" />
                                        <span className="ms-2 pfs-12">{homData?.propertyType || "Not Provided"}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="border my-2 p-3 br-5">
                                <p className="cl-grey1 pfs-12 mb-2">Booking Amount</p>
                                <h4 className="fw-bold">₹ {fields?.totalBOQvalue || 0}</h4>
                                <button className="btn btn-outline-info mt-3  btn-block">
                                    Pay Booking Amount
                                </button>
                            </div>

                            <div className="border my-2 px-3 py-2 br-5">
                                <span className="cl-grey1 pfs-16">Disclaimer</span>
                                <p>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting
                                    industry. Lorem Ipsum has been the industry's standard dummy
                                    text ever since the 1500s
                                </p>
                            </div>
                        </div>}
                        <br />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuotationNew