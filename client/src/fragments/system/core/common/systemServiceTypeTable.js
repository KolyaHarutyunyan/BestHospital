import React from "react";
import { systemCoreCommonStyle } from "./style";
import { SystemServiceTypeTHead, SystemServiceTypeTBody } from "./core";

export const SystemServiceTypeTable = ({ serviceTypes = [] }) => {
   const classes = systemCoreCommonStyle();

   return (
      <div className={classes.serviceTypeTableStyle}>
         <SystemServiceTypeTHead />
         {serviceTypes.map((serviceType, index) => (
            <SystemServiceTypeTBody key={index} serviceType={serviceType} />
         ))}
      </div>
   );
};
