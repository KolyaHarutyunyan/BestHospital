import React from "react";
import { Button, Card } from "components";
import { helpCenterHeaderContentSubtitle, helpCenterHeaderContentTitle } from "./constants";

export const HelpCenterFragment = () => {
   return (
      <div className="help-center-fragment">
         <Card cardClassName={"help-center-page-cover"}>
            <div className="help-center-header">
               <div className="header-content">
                  <h1 className="content-title">{helpCenterHeaderContentTitle}</h1>
                  <h6 className="content-subtitle">{helpCenterHeaderContentSubtitle}</h6>
                  <Button
                     buttonType={"button"}
                     buttonClassName={"contact-support-button"}
                     onClickButton={() => {}}
                  >
                     Contact Support
                  </Button>
               </div>
            </div>
         </Card>
         <Card cardBackgroundColor={""}>help center main</Card>
      </div>
   );
};
