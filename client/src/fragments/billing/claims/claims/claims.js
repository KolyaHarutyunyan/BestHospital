import React, { useContext } from "react";
import { claimsStyle } from "./styles";
import {
   AddButton,
   Loader,
   NoItemText,
   PaginationItem,
} from "@eachbase/components";
import { DrawerContext, PaginationContext } from "@eachbase/utils";
import { claimActions } from "@eachbase/store";
import { useDispatch } from "react-redux";
import { ClaimTable } from "./core";
import { useHistory } from "react-router";

export const ClaimsFragment = ({
   claims = [],
   claimsQty,
   page,
   handleGetPage,
   claimsLoader,
}) => {
   const classes = claimsStyle();

   const history = useHistory();

   const dispatch = useDispatch();

   const { open } = useContext(DrawerContext);
   const { handlePageChange } = useContext(PaginationContext);

   const claimsTableClassName = `${classes.claimsTableStyle} ${
      open ? "narrow" : ""
   }`;

   const changePage = (number) => {
      if (page === number) return;
      handlePageChange(true);
      let start = number > 1 ? number - 1 + "0" : 0;
      dispatch(claimActions.getClaims({ limit: 10, skip: start }));
      handleGetPage(number);
   };

   return (
      <div>
         <div className={classes.addButton}>
            <AddButton
               text={"Generate Claim"}
               handleClick={() => history.push("/generateClaim")}
            />
         </div>
         {!!claims.length ? (
            <div className={classes.tableAndPaginationBoxStyle}>
               <div className={classes.tableBoxStyle}>
                  {claimsLoader ? (
                     <div className={classes.loaderContainerStyle}>
                        <Loader circleSize={50} />
                     </div>
                  ) : (
                     <div className={claimsTableClassName}>
                        <ClaimTable claims={claims} />
                     </div>
                  )}
               </div>
               <PaginationItem
                  listLength={claims.length}
                  page={page}
                  handleReturn={(number) => changePage(number)}
                  count={claimsQty}
                  entries={claims.length}
               />
            </div>
         ) : (
            <NoItemText text={"No Claims Yet"} />
         )}
      </div>
   );
};
