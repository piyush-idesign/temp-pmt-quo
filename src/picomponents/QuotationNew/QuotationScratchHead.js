import React from 'react'

const QuotationScratchHead = () => {

    return (
        <div className="  w-100 py-3 pb-md-1 mb-md-1 mb-4  mv-d-none px-5 cl-grey1 d-none d-md-flex">
            <div className="d-flex ms-2" style={{
                width: "45%"
            }} >
                <div className="px-4 ms-5">
                    Item name & Description
                </div>
            </div>


            <div className="d-flex" style={{
                width: "25%"
            }} >
                <div className='text-center' style={{
                    width: "35%"
                }} >
                    Unit
                </div>
                <div className='text-center' style={{
                    width: "30%"
                }} >
                    Quantity
                </div>
                <div className='text-center ' style={{
                    width: "35%"
                }} >
                    Price
                </div>

            </div>
            <div className="d-flex" style={{
                width: "30%"
            }} >
                <div className='text-center' style={{
                    width: "50%"
                }} >
                    Amount
                </div>
                <div className='text-end' style={{
                    width: "50%"
                }} >
                    Comment
                </div>
            </div>

        </div>
    )
}

export default QuotationScratchHead