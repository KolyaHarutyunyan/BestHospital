import React from "react";
import { paginationStyle } from "./style";
import Pagination from "@material-ui/lab/Pagination";

export const PaginationItem = ({
   count,
   handleChangePage,
   page,
   listLength,
   limitCountNumber = 1,
}) => {
   const classes = paginationStyle();

   const firsCountNumber = page <= 1 ? 1 : (page - 1) * limitCountNumber + 1;
   const shownCountNumber = page <= 1 ? listLength : firsCountNumber - 1 + listLength;

   return (
      <div className={classes.PaginationWrapper}>
         <div>
            <p className={classes.showCountText}>
               {`Showing ${firsCountNumber} to ${shownCountNumber} of ${count} entries`}{" "}
            </p>
         </div>
         <Pagination
            onChange={(event, val) => handleChangePage(val, "vvv")}
            page={page}
            count={count && Math.ceil(count / limitCountNumber)}
            color={"primary"}
         />
      </div>
   );
};
