import React from "react";
import { inputsStyle } from "./styles";
import { Images } from "@eachbase/utils";

export const SearchAndFilter = ({
   title,
   type,
   custom,
   handleClick,
   style,
}) => {
   const classes = inputsStyle();
   return (
      <div className={classes.searchInputWrapper}>
         <div className={`${classes.searchInputTitle} ${style}`}>
            <span>{title}</span>
            {custom !== false && (
               <img
                  onClick={handleClick}
                  src={
                     type === "arrow"
                        ? Images.dropdownArrowBlue
                        : type === "latestEarliest"
                        ? Images.latestEarliest
                        : Images.aToZ
                  }
                  alt={"filter icon"}
               />
            )}
         </div>
      </div>
   );
};
