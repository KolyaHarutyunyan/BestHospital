import React, { Fragment } from "react";
import { TopBar, Main, Footer } from "fragments";
import { ToastContainer } from "react-toastify";

function App() {
   window.onbeforeunload = function () {
      window.scrollTo(0, 0);
   };
   return (
      <Fragment>
         <div className="App">
            <TopBar />
            <Main />
            <Footer />
         </div>
         <ToastContainer position={"bottom-right"} />
      </Fragment>
   );
}

export default App;
