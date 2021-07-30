import React, {useEffect} from "react";
import { useHistory } from "react-router-dom";
import { BranchesTable } from "@eachbase/fragments";
import { TableWrapper } from "@eachbase/components";
// import { branchActions } from "@eachbase/store";
import {useDispatch, useSelector} from "react-redux";

export const Branches = ({}) => {
  const history =useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    // dispatch( branchActions.getBranches())
  }, []);

  return (
    <TableWrapper
      firstButton={"Active"}
      secondButton={"Inactive"}
      addButton={"Add Branch"}
      buttonsTab={true}
      buttonsTabAddButton={true}
      handleClick={() => history.push('/createBranch')}
    >
      <BranchesTable/>
    </TableWrapper>
  );
};
