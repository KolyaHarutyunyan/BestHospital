import React from "react";
import { TopBar, Main, Footer } from "fragments";
import { ToastContainer } from "react-toastify";

function App() {
   window.onbeforeunload = function () {
      window.scrollTo(0, 0);
   };
   return (
      <div className="App">
         <TopBar />
         <Main />
         <Footer />
         <ToastContainer position={"bottom-right"} />
      </div>
   );
}

export default App;
