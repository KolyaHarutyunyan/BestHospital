import React from "react";
import { staffSingleCoreCommonStyle } from "./style";
import { StaffCredentialTHead, StaffCredentialTBody } from "./core";

export const StaffCredentialTable = ({ staffCredentials = [], globalCredentials }) => {
   const classes = staffSingleCoreCommonStyle();

   return (
      <div className={classes.staffCredentialTableStyle}>
         <StaffCredentialTHead />
         {staffCredentials.map((staffCredential, index) => (
            <StaffCredentialTBody
               key={index}
               staffCredential={staffCredential}
               globalCredentials={globalCredentials}
            />
         ))}
      </div>
   );
};
