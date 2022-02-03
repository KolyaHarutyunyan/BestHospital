import React from "react";
import { useHistory } from "react-router-dom";
import { billingItemStyle } from "./styles";

export const BillingItem = ({ billingItem, index }) => {
   const classes = billingItemStyle();
   console.log("billingItem ", billingItem);

   const history = useHistory();
   return (
      <div>
         <h1 style={{ cursor: "pointer" }} onClick={() => history.push(`/billing/${index}`)}>
            {`billing item ${index} here`}
         </h1>
      </div>
   );
};
