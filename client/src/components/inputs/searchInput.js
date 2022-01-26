import React, { useRef } from "react";
import { inputsStyle } from "./styles";

export const SearchInput = ({
   searchInputClassName,
   searchInputType,
   searchInputValue,
   onSearchInputChange,
   searchInputPlaceholder,
}) => {
   const classes = inputsStyle();
   const searchInputRef = useRef();

   return (
      <div
         className={`${classes.searchInputBoxStyle} ${searchInputClassName}`}
         onClick={() => searchInputRef.current.focus()}
      >
         <input
            ref={searchInputRef}
            type={searchInputType ? searchInputType : "search"}
            value={searchInputValue}
            onChange={onSearchInputChange}
            placeholder={searchInputPlaceholder}
         />
      </div>
   );
};
