import React, { useEffect } from "react";
import { TableWrapper } from "@eachbase/components";
import { HumanResourcesTable, AdminInfo } from "@eachbase/fragments";
import { useHistory } from "react-router-dom";
import { adminActions } from "@eachbase/store";
import { useDispatch, useSelector } from "react-redux";

export const HumanResources = ({}) => {
   const history = useHistory();
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(adminActions.getAdmins({ status: "ACTIVE" }));
   }, []);

   const { adminInfoById } = useSelector((state) => ({
      adminInfoById: state.admins.adminInfoById,
   }));

   return (
      <>
         {!adminInfoById ? (
            <TableWrapper
               firstButton={"Active"}
               secondButton={"Inactive"}
               addButton={"Add User"}
               buttonsTab={true}
               buttonsTabAddButton={true}
               handleClick={() => history.push("/createAdmin")}
            >
               <HumanResourcesTable />
            </TableWrapper>
         ) : (
            <AdminInfo info={adminInfoById} />
         )}
      </>
   );
};
