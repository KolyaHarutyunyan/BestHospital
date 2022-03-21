import React, { useState } from "react";
import { dropdownsStyle } from "./styles";
import { ActiveInactiveStatus } from "@eachbase/utils";

export const UserInputsDropdown = ({
   label,
   dropdownOptions = [],
   onPass,
   selected,
   dropdownTitle,
   dropdownClassName,
}) => {
   const [dropdownIsShown, setDropdownIsShown] = useState(false);
   const classes = dropdownsStyle();
   const itemClassName = ActiveInactiveStatus(selected);
   const chooseOptionHandler = (option) => {
      onPass(option);
      setDropdownIsShown(false);
   };

   return (
      <>
         {dropdownIsShown && (
            <div
               className={classes.dropOverlayStyle}
               onClick={() => setDropdownIsShown(false)}
            />
         )}
         <div className={`${classes.userDropStyle} ${dropdownClassName}`}>
            {label && <p className="userDropLabel"> {label} </p>}
            <div className={`dropdown-box ${dropdownIsShown ? "focused" : ""}`}>
               <div
                  className="show-dropdown-box"
                  onClick={() => setDropdownIsShown((prevState) => !prevState)}
               >
                  <h6
                     className={`dropdown-selected ${classes.optionStyle} ${itemClassName}`}
                  >
                     {selected ? selected : dropdownTitle}
                  </h6>
                  <i className={`${dropdownIsShown ? "active" : ""}`} />
               </div>
               {dropdownIsShown && (
                  <ul className="dropdown-options">
                     {dropdownOptions.map((option, index) => {
                        const itemClassName = ActiveInactiveStatus(option);
                        return (
                           <li
                              key={index}
                              className={`${classes.optionStyle} ${itemClassName}`}
                              onClick={() => chooseOptionHandler(option)}
                           >
                              <span
                                 className={`dropdown-option-title ${
                                    option === selected ? "selected-title" : ""
                                 }`}
                              >
                                 {option}
                              </span>
                           </li>
                        );
                     })}
                  </ul>
               )}
            </div>
         </div>
      </>
   );
};
