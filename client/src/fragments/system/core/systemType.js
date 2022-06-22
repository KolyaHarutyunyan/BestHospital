import React, { Fragment, useContext } from "react";
import { Loader, NoItemText, PaginationItem } from "@eachbase/components";
import { systemItemStyles } from "./styles";
import { CreateEditServiceType, SystemServiceTypeTable } from "./common";
import { PaginationContext } from "@eachbase/utils";
import { systemActions } from "@eachbase/store";
import { useDispatch } from "react-redux";

export const ServiceType = ({
   globalServices = [],
   serviceTypesQty = 0,
   page,
   handleGetPage,
   serviceTypesLoader,
}) => {
   const classes = systemItemStyles();

   const { pageIsChanging, handlePageChange } = useContext(PaginationContext);

   const dispatch = useDispatch();

   function changePage(number) {
      if (page === number) return;
      handlePageChange(true);
      let start = number > 1 ? number - 1 + "0" : 0;
      dispatch(systemActions.getServices({ limit: 10, skip: start }));
      handleGetPage(number);
   }

   return (
      <Fragment>
         <CreateEditServiceType />
         <p className={classes.title}>Service Type</p>
         {serviceTypesLoader && pageIsChanging ? (
            <Loader circleSize={50} height={"200px"} />
         ) : !!globalServices.length ? (
            <>
               <SystemServiceTypeTable serviceTypes={globalServices} />
               <PaginationItem
                  listLength={globalServices.length}
                  page={page}
                  handleReturn={(number) => changePage(number)}
                  count={serviceTypesQty}
                  entries={globalServices.length}
               />
            </>
         ) : (
            <NoItemText text="No Service Types Yet" />
         )}
      </Fragment>
   );
};
