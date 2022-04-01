import React from "react";
import { UserInputsDropdown, ValidationInput } from "@eachbase/components";
import { billTableStyle } from "./styles";

const addAllTextToTheList = (list = []) =>
   !!list[0]?.length ? ["All", ...list] : ["All"];

export const BillFiltersSelectors = ({
   clientsNames = [],
   payorsNames = [],
   passPayorHandler,
   selectedPayor,
   passClientHandler,
   selectedClient,
   changeDateInput,
   filteredDate,
}) => {
   const classes = billTableStyle();

   return (
      <div className={classes.filtersBoxStyle}>
         <UserInputsDropdown
            label={"Payor"}
            dropdownOptions={addAllTextToTheList(payorsNames)}
            onPass={passPayorHandler}
            selected={selectedPayor}
            dropdownClassName={classes.filterDropStyle}
         />
         <UserInputsDropdown
            label={"Client"}
            dropdownOptions={addAllTextToTheList(clientsNames)}
            onPass={passClientHandler}
            selected={selectedClient}
            dropdownClassName={classes.filterDropStyle}
         />
         <ValidationInput
            inputLabel={"Submitted Date"}
            variant={"outlined"}
            name={"filterDate"}
            onChange={changeDateInput}
            value={filteredDate}
            type={"date"}
            size={"small"}
            style={classes.dateInputStyle}
         />
      </div>
   );
};
