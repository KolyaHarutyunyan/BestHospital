import React from "react";
import { staffCoreCommonStyle } from "./style";
import { SelectInput, ValidationInput } from "@eachbase/components";
import { enumValues, ErrorText } from "@eachbase/utils";
import moment from "moment";

export const CreateStaffThirdStep = ({
   inputs,
   handleChange,
   handleChangeLicense,
   license,
   error,
}) => {
   const classes = staffCoreCommonStyle();

   return (
      <div>
         <p className={classes.otherDetailsTitle}>Driver License</p>
         <ValidationInput
            variant={"outlined"}
            onChange={handleChangeLicense}
            value={license ? license.driverLicense : ""}
            type={"text"}
            label={"Driver License"}
            name="driverLicense"
            typeError={error === "driverLicense" ? ErrorText.field : ""}
         />
         <div className={classes.flexContainer}>
            <SelectInput
               style={classes.selectMargin}
               name={"state"}
               label={"Issuing State"}
               handleSelect={handleChangeLicense}
               value={license ? license.state : ""}
               language={enumValues.ISSUING_STATES}
               typeError={error === "state" ? ErrorText.selectField : ""}
            />
            <ValidationInput
               variant={"outlined"}
               onChange={handleChangeLicense}
               value={
                  license?.expireDate &&
                  moment(license?.expireDate).format().substring(0, 10)
               }
               type={"date"}
               label={"Expiration Date"}
               name="expireDate"
               typeError={error === "expireDate" ? ErrorText.field : ""}
            />
         </div>
         <p className={`${classes.otherDetailsTitle} ${classes.titlePadding}`}>Other</p>
         <SelectInput
            name={"residency"}
            label={"Residency Status"}
            handleSelect={handleChange}
            value={inputs.residency}
            language={enumValues.RESIDENCIES}
            typeError={error === "residency" ? ErrorText.selectField : ""}
         />
         <ValidationInput
            Length={9}
            variant={"outlined"}
            value={inputs.ssn}
            type={"number"}
            label={"SSN Number*"}
            name="ssn"
            onChange={handleChange}
            typeError={
               error === "ssn"
                  ? ErrorText.field
                  : error === ErrorText.ssnError
                  ? ErrorText.ssnError
                  : ""
            }
         />
         <div className={classes.flexContainer}>
            <SelectInput
               style={classes.selectMargin}
               name={"gender"}
               label={"Gender*"}
               handleSelect={handleChange}
               value={inputs.gender}
               language={enumValues.GENDER_OPTIONS}
               typeError={error === "gender" ? ErrorText.selectField : ""}
            />
            <ValidationInput
               variant={"outlined"}
               onChange={handleChange}
               value={
                  inputs.birthday && moment(inputs.birthday).format().substring(0, 10)
               }
               type={"date"}
               label={"Date of Birth*"}
               name="birthday"
               typeError={error === "birthday" ? ErrorText.field : ""}
            />
         </div>
      </div>
   );
};
