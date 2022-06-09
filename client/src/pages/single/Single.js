import React, { useEffect, useState } from "react";
import { TableWrapper } from "@eachbase/components";
import { FundingSourceTable, CreateFundingSource } from "@eachbase/fragments";
import { fundingSourceActions } from "@eachbase/store";
import { useDispatch } from "react-redux";

export const Single = ({}) => {
   const dispatch = useDispatch();
   const [open, setOpen] = useState(false);

   useEffect(() => {
      dispatch(fundingSourceActions.getFundingSource({ status: "ACTIVE" }));
   }, []);

   const handleOpenClose = () => {
      setOpen((prevState) => !prevState);
   };

   return (
      <>
         <TableWrapper
            firstButton={"Active"}
            secondButton={"Inactive"}
            addButton={"Add Funding Source"}
            buttonsTab={true}
            buttonsTabAddButton={true}
            addButtonText={"Add Funding Source"}
            handleOpenClose={handleOpenClose}
            openCloseInfo={open}
            body={<CreateFundingSource handleClose={handleOpenClose} />}
         >
            <FundingSourceTable />
         </TableWrapper>
      </>
   );
};
