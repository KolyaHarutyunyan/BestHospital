import React, { useEffect } from "react";
import { TableWrapper } from "@eachbase/components";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AgentsTable } from "@eachbase/fragments";
import { agentActions, branchActions, officeActions } from "@eachbase/store";

export const Agents = ({}) => {
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(agentActions.getAgents())
  }, []);


  return (
    <TableWrapper
      firstButton={"Active"}
      secondButton={"Inactive"}
      addButton={"Agents"}
      buttonsTab={true}
      buttonsTabAddButton={true}
      handleClick={() => history.push('/createAgent')}
      addButtonText='gfgfg'
    >
      <AgentsTable />
    </TableWrapper>
  );
};
