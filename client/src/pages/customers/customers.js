import React from "react";
import { customersStyle } from "./styles";
import { AddButton, ButtonsTab } from "@eachbase/components";
import { CustomersTable } from "@eachbase/fragments";

export const Customers = ({}) => {
  const classes = customersStyle();
  return (
    <div>
      <div className={classes.customersStyle}>
        <ButtonsTab first={"Active"} second={"Inactive"} />

        <AddButton text={"Add Customer"} />
      </div>

      <CustomersTable />
    </div>
  );
};