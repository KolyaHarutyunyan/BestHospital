import React from "react";
import { useHistory } from "react-router-dom";
import { billItemStyle } from "./styles";

export const BillItem = ({ billItem, index }) => {
   const classes = billItemStyle();

   const history = useHistory();
   return (
      <div>
         <h1
            style={{ cursor: "pointer" }}
            onClick={() => history.push(`/bill/${index}`)}
         >
            {`bill item ${index} here`}
         </h1>
      </div>
   );
};
