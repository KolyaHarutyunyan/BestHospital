import React from "react";
import { Images, transformPermission } from "@eachbase/utils";
import { dropdownsStyle } from "./styles";
import { CheckBoxInput } from "@eachbase/components";

export const CheckBoxDropdown = ({
   dropdownBoxClassName,
   dropdownClassName,
   dropdownOptions = [],
   dropdownTitle,
   handleDropdownOpenClose,
   onCloseDropdown,
   dropdownIsShown,
   onPass,
   checkboxError,
}) => {
   const classes = dropdownsStyle();

   return (
      <>
         {dropdownIsShown && <div className={classes.dropOverlayStyle} onClick={onCloseDropdown} />}
         <div
            className={`${classes.dropdownBoxStyle} ${
               checkboxError ? "error" : ""
            } ${dropdownBoxClassName}`}
         >
            <div className={classes.showDropdownBoxStyle} onClick={handleDropdownOpenClose}>
               <h6 className={classes.dropdownSelectedStyle}>{dropdownTitle}</h6>
               <div className={`${classes.dropArrowStyle} ${dropdownIsShown ? "rotate" : ""}`}>
                  <img src={Images.dropdownArrowFilledBlue} alt="" />
               </div>
            </div>
            {dropdownIsShown && (
               <div className={`${classes.dropdownStyle} ${dropdownClassName}`}>
                  {dropdownOptions.map((option, index) => {
                     return (
                        <CheckBoxInput
                           key={index}
                           inputId={index}
                           inputChecked={option.isChecked}
                           onInputChange={(evt) => {
                              onPass({
                                 ...option,
                                 isChecked: evt.target.checked,
                              });
                           }}
                           inputLabel={transformPermission(option.title)}
                        />
                     );
                  })}
               </div>
            )}
         </div>
      </>
   );
};
