import React from "react";
import { wrapperStyle } from "./styles";
import { Images } from "@eachbase/utils";
import { SimpleTooltip } from "@eachbase/components";

export const CheckedItemsQtyInfoWrapper = ({
   wrapperClassName,
   onClickButton,
   children,
}) => {
   const classes = wrapperStyle();

   const qtyInfoClassName = `${classes.qtyInfoContainerStyle} ${wrapperClassName}`;

   return (
      <div className={qtyInfoClassName}>
         <SimpleTooltip title={"Close"} placement={"top-start"}>
            <button
               type="button"
               className={classes.uncheckButnStyle}
               onClick={onClickButton}
            >
               <img src={Images.uncheck} alt="" />
            </button>
         </SimpleTooltip>
         {children}
      </div>
   );
};