import { Table } from "@material-ui/core";
import React from "react";
import { ClaimTBody, ClaimTHead } from "./common";
import { claimsCoreStyle } from "./styles";

export const ClaimTable = ({ claims = [] }) => {
   const classes = claimsCoreStyle();

   return (
      <div className={classes.claimTableStyle}>
         <Table>
            <ClaimTHead />
            <ClaimTBody claims={claims} />
         </Table>
      </div>
   );
};
