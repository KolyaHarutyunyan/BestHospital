import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { Loader, NoItemText, PaginationItem } from "@eachbase/components";
import { StaffCredentialTable } from "./common";
import { PaginationContext, getSkipCount, FindLoad } from "@eachbase/utils";
import { serviceSingleStyles } from ".";
import { adminActions } from "@eachbase/store";

export const StaffCredentials = ({
   credentialData = [],
   globalCredentials,
   page,
   handleGetPage,
   credentialsCount,
   credentialLoader,
}) => {
   const classes = serviceSingleStyles();

   const dispatch = useDispatch();

   const _limit = 7;

   const { pageIsChanging, handlePageChange } = useContext(PaginationContext);

   const changePage = (number) => {
      if (page === number) return;
      handlePageChange(true);
      const _skip = getSkipCount(number, _limit);
      dispatch(adminActions.getCredential({ limit: _limit, skip: _skip }));
      handleGetPage(number);
   };

   return (
      <div className={classes.staffCredentialBoxStyle}>
         {!!credentialData.length ? (
            <>
               {credentialLoader && pageIsChanging ? (
                  <div className={classes.loaderContainerStyle}>
                     <Loader circleSize={50} />
                  </div>
               ) : (
                  <StaffCredentialTable
                     staffCredentials={credentialData}
                     globalCredentials={globalCredentials}
                  />
               )}
               <PaginationItem
                  listLength={credentialData.length}
                  page={page}
                  handleChangePage={(number) => changePage(number)}
                  count={credentialsCount}
                  limitCountNumber={_limit}
               />
            </>
         ) : (
            <NoItemText text="No Credentials Yet" />
         )}
      </div>
   );
};
