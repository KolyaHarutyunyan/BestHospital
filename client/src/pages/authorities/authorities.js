import React from "react";
import { useHistory } from "react-router-dom";
import { TableWrapper } from "@eachbase/components";
import { AuthoritiesTable } from "@eachbase/fragments";

export const Authorities = ({}) => {
  const history =useHistory()
  return (
    <TableWrapper
      firstButton={"Active"}
      secondButton={"Inactive"}
      addButton={"Add MC Authority"}
      buttonsTab={true}
      buttonsTabAddButton={true}
      handleClick={() => history.push('/createAuthorities')}
    >
      <AuthoritiesTable />
    </TableWrapper>
  );
};
