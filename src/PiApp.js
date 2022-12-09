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
import LoadingBar from "react-top-loading-bar"; 
import QuotationNew from './picomponents/QuotationNew/QuotationNew'; 


function PiApp() {
  const [progress, setProgress] = useState(0);

  const routes = [ 
    { path: "/new-quotation/:id", element: <QuotationNew setProgress={setProgress} /> }
    

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
        <Router >
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
