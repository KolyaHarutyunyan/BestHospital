import React from "react";
import { SelectInput, ValidationInput } from "@eachbase/components";
import { enumValues, ErrorText } from "@eachbase/utils";

const smallInputStyles = { width: "215px", marginBottom: "-12px" };
const inputStyles = { width: "446px", marginBottom: "-12px" };
const errorStyles = { marginTop: "12px" };

export const FirstStepInputs = ({
   inputs,
   error,
   handleChange,
   mappedClients,
   hasInfo,
}) => {
   return (
      <div>
         <ValidationInput
            styles={inputStyles}
            errorStyle={errorStyles}
            variant={"outlined"}
            name={"paymentAmount"}
            type={"number"}
            label={"Amount*"}
            onChange={handleChange}
            value={inputs.paymentAmount}
            typeError={error === "paymentAmount" && ErrorText.field}
            disabled={hasInfo}
         />
         <SelectInput
            name={"client"}
            label={"Client*"}
            handleSelect={handleChange}
            value={inputs.client}
            list={mappedClients}
            type={"id"}
            typeError={error === "client" && ErrorText.selectField}
            disabled={hasInfo}
         />
         <ValidationInput
            styles={inputStyles}
            errorStyle={errorStyles}
            variant={"outlined"}
            name={"paymentDate"}
            onChange={handleChange}
            value={inputs.paymentDate}
            type={"date"}
            typeError={error === "paymentDate" && ErrorText.field}
         />
         <div style={{ display: "flex" }}>
            <SelectInput
               styles={{ ...smallInputStyles, marginRight: "16px" }}
               errorStyle={errorStyles}
               name={"paymentType"}
               label={"Payment Type*"}
               handleSelect={handleChange}
               value={inputs.paymentType}
               language={enumValues.PAYMENT_TYPES}
               typeError={error === "paymentType" && ErrorText.field}
            />
            <ValidationInput
               styles={smallInputStyles}
               errorStyle={errorStyles}
               variant={"outlined"}
               name={"checkNumber"}
               type={"number"}
               label={"Check Number*"}
               onChange={handleChange}
               value={inputs.checkNumber}
               typeError={error === "checkNumber" && ErrorText.field}
            />
         </div>
      </div>
   );
};
