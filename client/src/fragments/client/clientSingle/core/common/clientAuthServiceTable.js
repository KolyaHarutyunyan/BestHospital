import React from "react";
import { ClientAuthServiceTHead, ClientAuthServiceTBody } from "./core";
import { clientCommonStyle } from "./styles";

export const ClientAuthServiceTable = ({ authServices = [], authId, fundingId }) => {
   const classes = clientCommonStyle();

   return (
      <div className={classes.authServiceTableStyle}>
         <ClientAuthServiceTHead />
         {authServices.map((authService, index) => (
            <ClientAuthServiceTBody
               key={index}
               authService={authService}
               authId={authId}
               fundingId={fundingId}
            />
         ))}
      </div>
   );
};
