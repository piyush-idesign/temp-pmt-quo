import React from 'react'
import { timeSince } from '../../piservices/compCommon';

const CommentCard = ({ data }) => {
    const { name, text, type, createdAt } = data;
    return (
        <div>
            <div className="d-flex w-100">
                <div>
                    <div className="bg-lb-blue d-flex align-items-center justify-content-center cl-white h6 text-uppercase rounded-circle me-2" style={{ width: 35, height: 35 }}><span>{name.slice(0, 1) || "A"}</span></div>
                </div>

                <div className="w-100">
                    <div className="d-flex justify-content-between w-100">
                        <div>
                            <h6 className="fw-bold mb-1">{name}</h6>
                            <p className="cl-grey1 mb-1  pfs-12">
                                {type === 1 && "Designer"}
                                {type === 2 && "Homeowner"}
                            </p>
                        </div>
                        <p className="cl-grey1 mb-0">
                            {createdAt ? timeSince(new Date(createdAt)) : timeSince(new Date())} ago
                        </p>
                    </div>
                    <p className="cl-grey1 mb-1">
                        {text}
                    </p>
                </div>

            </div>
            <hr className='opacity-0' />
        </div>
    )
}

export default CommentCard
