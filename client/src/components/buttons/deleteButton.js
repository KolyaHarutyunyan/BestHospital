import React from "react";
import { buttonsStyle } from "./styles";
import ClearIcon from "@material-ui/icons/Clear";
import { Colors } from "@eachbase/utils";
import { SimpleTooltip } from "@eachbase/components";

export const DeleteButton = ({ handleClick, toolTipTitle }) => {
   const classes = buttonsStyle();
   return (
      <button onClick={handleClick} className={classes.deleteButtonStyle}>
         <SimpleTooltip title={<div>{toolTipTitle}</div>} placement="top-end">
            <ClearIcon
               style={{
                  color: Colors.ThemeRed,
                  width: "22px",
                  height: "22px",
                  marginTop: "4px",
               }}
            />
         </SimpleTooltip>
      </button>
   );
};
