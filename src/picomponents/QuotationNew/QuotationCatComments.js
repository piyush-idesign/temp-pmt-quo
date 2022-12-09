import React, { useContext, useEffect } from 'react'
import { useInputValue } from 'react-haiku';
import { useSearchParams } from 'react-router-dom';
import desquoContext from '../../picontext/DashBoard/desquoContext';
import { getReq, postReq } from '../../piservices/apis';
import expf from '../../piservices/constants';
import CommentCard from './CommentCard';

const QuotationCatComments = ({ setProgress }) => {
    const context = useContext(desquoContext);
    const { action, setAction, newCats, setNewCats, homData } = context;
    const [inputVal, setInputVal] = useInputValue();

    const [searchParams] = useSearchParams();
    const tab = searchParams.get("tab") || "onSite";

    const handleSaveComment = async () => {
        let x = newCats;
        if (!x[tab][action.idx]?.item[action.itx]?.comments) {
            x[tab][action.idx].item[action.itx].comments = [];
        }
        let comdata = {
            type: 2,
            name: homData?.name || "Anonymous",
            user_id: homData?._id,
            text: inputVal,
            "itemId": newCats[tab][action.idx]?.item[action.itx]?._id,
        }
        x[tab][action.idx]?.item[action.itx]?.comments.push(comdata)
        setNewCats({ ...x });
        setInputVal("");
        setProgress(50);
        try {
            await postReq(expf?.quoapi + "/api/main-quotation/comment-items?itemId=" + newCats[tab][action.idx]?.item[action.itx]?._id, comdata)
        } catch (error) {
            console.log(error);
        }
        setProgress(100);
    }

    const init = async () => {
        setProgress(60);
        try {
            const comm = await getReq(expf?.quoapi + "/api/main-quotation/get-comments?itemId=" + newCats[tab][action.idx]?.item[action.itx]?._id);
            if (comm && !comm.error) {
                let x = newCats;
                x[tab][action.idx].item[action.itx].comments = comm?.data || [];
                setNewCats({ ...x });
            }

        } catch (error) {

        }
        setProgress(100);
    }
    useEffect(() => {
        if (action?.comments) {
            init();
        }


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [action])

    return (
        <div>
            <div className="p-3">
                <div className="d-flex justify-content-between w-100">
                    <h5>Comment</h5>
                    <i className="fas fa-times cl-grey1 " onClick={() => {
                        setAction({ ...action, comments: false });
                    }} style={{
                        fontSize: "19px"
                    }} />
                </div>
                <hr />
                <div className="mt-4">
                    <div className='min-vh-100' >
                        {newCats[tab] && newCats[tab][action.idx]?.item[action.itx]?.comments?.map((e, i) => {
                            return <CommentCard key={i} data={e} />
                        }).reverse()}
                    </div>
                </div>
            </div>
            <div className="bg-grey1 p-3 position-sticky bottom-0">
                <div className="d-flex w-100">
                    <div className="w-100 pe-3">
                        <input type="search" id="form1" className="form-control" placeholder='Write Comments...' onKeyUp={(e) => {
                            if (e.key === "Enter") {
                                handleSaveComment();
                            }
                        }} value={inputVal} onChange={setInputVal} />
                    </div>
                    <button type="button" className="btn btn-base-secondary box-shadow-none btn-floating" onClick={() => {
                        handleSaveComment();
                    }}>
                        <i className="fas fa-paper-plane" />
                    </button>
                </div>

            </div>
        </div>
    )
}

export default QuotationCatComments
