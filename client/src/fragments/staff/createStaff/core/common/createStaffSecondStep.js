import React from "react";
import { ErrorText } from "@eachbase/utils";
import { AddressInput } from "@eachbase/components";

export const CreateStaffSecondStep = ({
   inputStyle,
   staffGeneral,
   enteredAddress,
   setFullAddress,
   handleAddressChange,
   error,
}) => {
   return (
      <div>
         <AddressInput
            handleSelectValue={handleAddressChange}
            onTrigger={setFullAddress}
            Value={"Street Address*"}
            flex="block"
            info={staffGeneral}
            styles={inputStyle}
            errorBoolean={error === "enteredAddress" ? ErrorText.field : ""}
            enteredValue={enteredAddress}
         />
      </div>
   );
};
