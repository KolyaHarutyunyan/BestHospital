import React from "react";
import { ServiceTHead, ServiceTBody } from "./core";
import { fundingSourceCommonStyle } from "./styles";

export const ServiceTable = ({ services = [] }) => {
   const classes = fundingSourceCommonStyle();

   return (
      <div className={classes.serviceTableStyle}>
         <ServiceTHead />
         {services.map((service, index) => (
            <ServiceTBody key={index} service={service} />
         ))}
      </div>
   );
};
