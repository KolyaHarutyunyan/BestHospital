import React, { useState } from "react";
import { Images, transformPermission } from "@eachbase/utils";
import { dropdownsStyle } from "./styles";
import { CheckBoxInput } from "@eachbase/components";

export const CheckBoxDropdown = ({
   dropdownBoxClassName,
   dropdownClassName,
   dropdownOptions = [],
   dropdownTitle,
   onPass,
}) => {
   const classes = dropdownsStyle();
   const [dropdownIsShown, setDropdownIsShown] = useState(false);

   return (
      <>
         {dropdownIsShown && (
            <div className={classes.dropOverlayStyle} onClick={() => setDropdownIsShown(false)} />
         )}
         <div className={`${classes.dropdownBoxStyle} ${dropdownBoxClassName}`}>
            <div
               className={classes.showDropdownBoxStyle}
               onClick={() => setDropdownIsShown((prevState) => !prevState)}
            >
               <h6 className={classes.dropdownSelectedStyle}>{dropdownTitle}</h6>
               <div className={`${classes.dropArrowStyle} ${dropdownIsShown ? "rotate" : ""}`}>
                  <img src={Images.dropdownArrow} alt="" />
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
