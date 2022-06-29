import React from "react";
import { TopBar, Footer } from "fragments";
import { ToastContainer } from "react-toastify";
import { Routers } from "router/route";

function App() {
   window.onbeforeunload = function () {
      window.scrollTo(0, 0);
   };
   return (
      <div className="App">
         <TopBar />
         <Routers />
         <Footer />
         <ToastContainer position={"bottom-right"} />
      </div>
   );
}

export default App;
