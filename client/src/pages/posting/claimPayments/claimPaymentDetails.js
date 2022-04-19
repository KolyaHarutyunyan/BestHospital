import React from "react";
import { ClaimPaymentDetailsFragment } from "@eachbase/fragments";
import { CustomBreadcrumbs } from "@eachbase/components";

export const ClaimPaymentDetails = () => {
   return (
      <>
         <div>
            <CustomBreadcrumbs
               parent={"Claim Payments"}
               child={"Claim Payment Details"}
               parentLink={"/claimPayments"}
            />
         </div>
         <ClaimPaymentDetailsFragment />
      </>
   );
};
