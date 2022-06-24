import React, { Fragment, useContext } from "react";
import { Loader, NoItemText, PaginationItem } from "@eachbase/components";
import { systemItemStyles } from "./styles";
import { CreateEditServiceType, SystemServiceTypeTable } from "./common";
import { FindLoad, getSkipCount, PaginationContext } from "@eachbase/utils";
import { systemActions } from "@eachbase/store";
import { useDispatch } from "react-redux";

export const ServiceType = ({
   globalServices = [],
   serviceTypesQty = 0,
   page,
   handleGetPage,
}) => {
   const classes = systemItemStyles();

   const { pageIsChanging, handlePageChange } = useContext(PaginationContext);

   const loader = FindLoad("GET_SERVICES");

   const dispatch = useDispatch();

   const _limit = 7;

   function changePage(number) {
      if (page === number) return;
      handlePageChange(true);
      const _skip = getSkipCount(number, _limit);
      dispatch(systemActions.getServices({ limit: _limit, skip: _skip }));
      handleGetPage(number);
   }

   return (
      <Fragment>
         <CreateEditServiceType />
         <p className={classes.title}>Service Type</p>
         {!!globalServices.length ? (
            <>
               {!!loader.length && pageIsChanging ? (
                  <div className={classes.loaderStyle}>
                     <Loader circleSize={50} height={"100%"} />
                  </div>
               ) : (
                  <SystemServiceTypeTable serviceTypes={globalServices} />
               )}
               <PaginationItem
                  listLength={globalServices.length}
                  page={page}
                  handleChangePage={(number) => changePage(number)}
                  count={serviceTypesQty}
                  limitCountNumber={_limit}
               />
            </>
         ) : (
            <NoItemText text="No Service Types Yet" />
         )}
      </Fragment>
   );
};
