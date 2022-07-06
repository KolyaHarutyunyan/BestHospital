import React, { Fragment, useContext } from "react";
import { TopBar, Footer, BookDemoSection } from "fragments";
import { ToastContainer } from "react-toastify";
import { Routers } from "router/route";
import { SimpleModal } from "components";
import { BookDemoContext } from "utils";

function App() {
   window.onbeforeunload = function () {
      window.scrollTo(0, 0);
   };

   const { bookDemoModalIsOpen, handleModalOpenClose } = useContext(BookDemoContext);

   return (
      <Fragment>
         <div className="App">
            <TopBar />
            <Routers />
            <Footer />
         </div>
         <ToastContainer position={"bottom-right"} />
         <SimpleModal
            openDefault={bookDemoModalIsOpen}
            closeModal={handleModalOpenClose}
            content={<BookDemoSection onClose={handleModalOpenClose} />}
            disableScrollLock={true}
         />
      </Fragment>
   );
}

export default App;
