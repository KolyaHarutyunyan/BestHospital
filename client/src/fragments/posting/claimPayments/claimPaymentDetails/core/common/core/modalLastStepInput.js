import React from "react";

export const ModalLastStepInput = ({ claims, selectedClaimId }) => {
   const selectedClaim = claims.find((claim) => claim._id === selectedClaimId);

   return <div>modalLastStepInput {selectedClaim?._id}</div>;
};
