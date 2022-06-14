import React from "react";
import { ClientEnrollmentTHead, ClientEnrollmentTBody } from "./core";
import { clientCommonStyle } from "./styles";

export const ClientEnrollmentTable = ({ enrollments = [] }) => {
   const classes = clientCommonStyle();

   return (
      <div className={classes.enrollmentTableStyle}>
         <ClientEnrollmentTHead />
         {enrollments.map((enrollment, index) => (
            <ClientEnrollmentTBody key={index} enrollment={enrollment} />
         ))}
      </div>
   );
};
