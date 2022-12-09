import React, { useContext, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import { useParams } from 'react-router-dom/dist';
import desquoContext from '../../picontext/DashBoard/desquoContext';
import { getReq } from '../../piservices/apis';
import { tabs } from '../../piservices/compCommon';
import expf from '../../piservices/constants';
import QuotationNewCategory from './QuotationNewCategory'
import QuotationScratchHead from './QuotationScratchHead'

const QuotationScratch = ({ setProgress }) => {

  const { id } = useParams();
  const context = useContext(desquoContext);
  const { newCats, setNewCats , setInitialQuo } = context;
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab") || "onsite";

  const init = async () => {
    setProgress(30);
    const quo = await getReq(
      expf.quoapi +
      "/api/main-quotation/get-quotation-by-projectId?projectId=" + id
    );

    if (quo?.data?.length > 0) {
      let x = quo?.data[quo?.data?.length - 1];

      setProgress(60);
      setInitialQuo({ ...x });

      let tempx = {};
      for (let k = 0; k < tabs?.length; k++) {
        let tab = tabs[k];
        if (x[tab]) {
          let temptab = [];
          for (let i = 0; i < x[tab]?.length; i++) {
            if (x[tab][i]) {
              temptab.push({ ...x[tab][i], item: [] });
              for (let j = 0; j < x[tab][i]?.item?.length; j++) {
                if (x[tab] && x[tab][i] && x[tab][i]?.item[j]) {
                  temptab[temptab?.length - 1].item.push(x[tab][i]?.item[j]);
                }
              }
            }
          }
          tempx[tab] = temptab;
        }
      }
      setNewCats({ ...tempx });
    }else{
      setInitialQuo({});
    }
    setProgress(100);

  }
  useEffect(() => {
    init();


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <div className="position-relative pfs-14 bg-white br-5" >
        <QuotationScratchHead />
      </div>
      <div className="accordion accordion-borderless border-none newquoacc  drag-sort-enable" id="accordionFlushExampleX" >
        {newCats && newCats[tab] && newCats[tab]?.map((e, i) => {
          return <QuotationNewCategory key={i} idx={i} />
        })}
      </div>

    </div>
  )
}

export default QuotationScratch