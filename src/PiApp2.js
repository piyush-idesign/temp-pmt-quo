import './PiApp.css';
import './piindex.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import NotFound from './picomponents/NotFound/NotFound';
import PiAlert from './picomponents/PiAlert/PiAlert';
import { useEffect, useState } from 'react';
import DesQuoState from './picontext/DashBoard/dashState';
import QuotationView from './picomponents/Quotation/QuotationView';
import Quotation from './picomponents/Quotation/Quotation';
import QuotationSave from './picomponents/Quotation/QuotationSave';
import LoadingBar from "react-top-loading-bar";
import QuoStart from './picomponents/QuickQuotation/QuoStart';
import QuoBasicData from './picomponents/QuickQuotation/QuoBasicData';
import QuotationReqirements from './picomponents/QuickQuotation/QuotationRequirements';
import QuotationNeedsQuestions from './picomponents/QuickQuotation/QuotationNeedsQuestions';
import DesignerProfile from './picomponents/QuickQuotation/DesignerProfile';
import QuoBasicData2 from './picomponents/QuickQuotation/QuoBasicData2';
import QuoCongrats from './picomponents/Quotation/QuoCongrats';
import QuickQuotationView from './picomponents/QuickQuotation/QuickQuotationView';
import QuickQuotationSave from './picomponents/QuickQuotation/QuickQuotationSave';
import QuickQuoCongrats from './picomponents/QuickQuotation/QuickQuoCongrats';


function PiApp() {
  const [progress, setProgress] = useState(0);

  const routes = [
    { path: "/", element: <Quotation /> },
    { path: "/quotation", element: <Quotation setProgress={setProgress} /> },
    { path: "/quotation/:tab", element: <Quotation setProgress={setProgress} /> },
    { path: "/quotation/:tab/:quickTab", element: <Quotation setProgress={setProgress} /> },
    { path: "/quotation/view", element: <QuotationView setProgress={setProgress} /> },
    { path: "/quotation/view/:id/:homeOwnerId", element: <QuotationView setProgress={setProgress} /> },
    { path: "/quotation/save", element: <QuotationSave setProgress={setProgress} /> },
    { path: "/quotation/save/:id/:homeOwnerId", element: <QuotationSave setProgress={setProgress} /> },
   
    { path: "/quick-quotation/start", element: <QuoStart setProgress={setProgress} /> },
    { path: "/quick-quotation/details", element: <QuoBasicData setProgress={setProgress} /> },
    { path: "/quick-quotation/new-details", element: <QuoBasicData2 setProgress={setProgress} /> },
    { path: "/quick-quotation/req/", element: <QuotationReqirements setProgress={setProgress} /> },
    { path: "/quick-quotation/req/:id", element: <QuotationReqirements setProgress={setProgress} /> },
    { path: "/quick-quotation/need/", element: <QuotationNeedsQuestions setProgress={setProgress}  /> },
    { path: "/quick-quotation/need/:id", element: <QuotationNeedsQuestions setProgress={setProgress}  /> },
    { path: "/quotation/congrats/:id", element: <QuoCongrats /> },
    { path: "/quick-quotation/congrats/:id", element: <QuickQuoCongrats /> },
    { path: "/quick-quotation/view/:id/", element: <QuickQuotationView  setProgress={setProgress}  /> },
    { path: "/quick-quotation/profile/:id/:designerId", element: <DesignerProfile setProgress={setProgress}  /> },
    { path: "/quick-quotation/save/:id/", element: <QuickQuotationSave setProgress={setProgress} /> },
  ]


  useEffect(() => {
    // if (window.location.pathname.length > 1 && window.location.pathname.slice(-1) === "/") {
    //   window.location.pathname = window.location.pathname.slice(0, -1);
    // }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="App">
      {/* <Helmet>
        <link rel="alternate" href={window.location.href} hreflang="en-in" />
      </Helmet> */}
      <DesQuoState>
        <Router basename="/quo-beta/" >
          <LoadingBar color="linear-gradient(90deg, #49B7CF 0%, #D9EFF4 0%, #49B7CF 100%)" progress={progress} height={3} />
          <Routes>
            {routes.map((e, i) => {
              return <Route exact path={e.path} element={e.element} key={i} />
            })}
            <Route path="*" element={<NotFound status={404} />} />
            <Route path="/404" element={<NotFound status={404} />} />
          </Routes>
          <button className='d-none' data-mdb-toggle="modal" data-mdb-target="#piAlertModal" id='alertbtn'></button>
        </Router>
        <PiAlert />
      </DesQuoState>

    </div>
  );
}

export default PiApp;
