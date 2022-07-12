import React, { useContext } from "react";
import { Button } from "components";
import { homeFifthBoxContentSubtitle, homeFifthBoxContentTitle } from "../constants";
import { BookDemoContext } from "utils";

export const SeeForYourself = () => {
   const { handleModalOpenClose } = useContext(BookDemoContext);

   return (
      <div className="home-fifth-box">
         <div className="fifth-box-content-box">
            <div className="content-container">
               <h4 className="content-title">{homeFifthBoxContentTitle}</h4>
               <p className="content-subtitle">{homeFifthBoxContentSubtitle}</p>
               <Button
                  buttonType={"button"}
                  buttonClassName={"book-demo"}
                  onClickButton={handleModalOpenClose}
               >
                  Book Demo
               </Button>
            </div>
         </div>
      </div>
   );
};
