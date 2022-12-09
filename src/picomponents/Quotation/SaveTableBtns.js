import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import desquoContext from '../../picontext/DashBoard/desquoContext';
import { postReq } from '../../piservices/apis';
import { tabs } from '../../piservices/compCommon';
import expf from '../../piservices/constants';

const SaveTableBtns = ({ className, setProgress }) => {

    const context = useContext(desquoContext);
    const { fields, setFields, newCats } = context;

    const [saveData, setSaveData] = useState();

    const { id } = useParams();

    const handleSend = async () => {
        try {
            setProgress(40);
            await init();
            setProgress(60);
            await postReq(expf?.quoapi + "/api/main-quotation/set-approve-status", saveData);
            setProgress(100); 
        } catch (error) {

        }
    }

    const init = async () => {
        let x = newCats;
        let payload = [];
        let f = { totalApproveable: 0, hasIsApproved: 0, isApproved: 0, totalBOQvalue: 0, designFee: 5000, gst: 18 };
        for (let k = 0; k < Object.keys(x)?.length; k++) {
            let tab = Object.keys(x)[k];
            if (x[tab]) {
                f[tab] = 0;
                for (let i = 0; i < x[tab]?.length; i++) {
                    if (x[tab][i]) {
                        for (let j = 0; j < x[tab][i]?.item?.length; j++) {
                            if (x[tab] && x[tab][i] && x[tab][i]?.item[j]) {
                                f.totalApproveable++;
                                if (x[tab][i]?.item[j]?.quantity >= 0 && x[tab][i]?.item[j]?.price >= 0) {
                                    f[tab] += parseInt(x[tab][i]?.item[j]?.quantity) * parseInt(x[tab][i]?.item[j]?.price);
                                }

                                if (x[tab][i]?.item[j]?.isApproved !== undefined) {
                                    f.hasIsApproved++;
                                    if (x[tab][i]?.item[j]?.isApproved === 1) {
                                        f.isApproved++;
                                    }
                                    payload.push({
                                        "workType": (tabs.indexOf(tab) + 1), //1 onsite , 2 fur, 3kitchen
                                        "projectId": id,
                                        "workTypeId": x[tab][i]?._id,
                                        "itemId": x[tab][i]?.item[j]?._id,
                                        "status": x[tab][i]?.item[j]?.isApproved
                                    })
                                }

                            }
                        }
                    }
                }
                f.totalBOQvalue += f[tab];
            }
        }

        f.totalBOQvalue = f.totalBOQvalue + f.designFee ;
        f.totalBOQvalue += parseInt((f.totalBOQvalue * (f.gst / 100)) * 100) / 100;
        setFields({ ...f });
        setSaveData(payload);
    }

    useEffect(() => {
        init();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newCats])
    return (
        <div>
            <div className={`d-flex w-100 pb-lg-3 lg-position-fixed bottom-0 start-0 bg-white ${className}`}>
                <div className='w-50 px-lg-1'>
                    <button type="button" className="btn btn-block btn-outline-info px-3 lg-br-0" data-mdb-ripple-color="dark" onClick={() => {
                        handleSend();
                    }}  >Send</button>
                </div>
                <div className='w-50 px-lg-1'>
                    <button type="button" className={`btn btn-block ${fields?.isApproved === fields.totalApproveable ? "bg-sec-blue cl-white" : "btn-dark "} px-3 box-shadow-none lg-br-0`} disabled={fields?.isApproved === fields?.totalApproveable ? false : true} data-mdb-ripple-color="dark" onClick={() => {
                        handleSend();
                    }} >Approve</button>
                </div>
            </div>
        </div>
    )
}

export default SaveTableBtns
