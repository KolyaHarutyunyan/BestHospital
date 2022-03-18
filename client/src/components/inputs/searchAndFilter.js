import React from "react";
import { inputsStyle } from "./styles";
import { Images } from "@eachbase/utils";

export const SearchAndFilter = ({
   title,
   type,
   custom,
   handleClick,
   style,
   iconsAreLight,
}) => {
   const classes = inputsStyle();

   const _iconSrc = iconsAreLight
      ? type === "arrow"
         ? Images.dropdownArrowWhite
         : type === "latestEarliest"
         ? Images.latestEarliestWhite
         : Images.aToZWhite
      : type === "arrow"
      ? Images.dropdownArrowBlue
      : type === "latestEarliest"
      ? Images.latestEarliest
      : Images.aToZ;

   return (
      <div className={classes.searchInputWrapper}>
         <div className={`${classes.searchInputTitle} ${style}`}>
            <span>{title}</span>
            {custom !== false && (
               <img onClick={handleClick} src={_iconSrc} alt={"filter icon"} />
            )}
         </div>
      </div>
   );
};
