import ClearIcon from "@material-ui/icons/Clear";
import { Colors } from "@eachbase/utils";
import React from "react";
import { buttonsStyle } from "./styles";
import { HtmlTooltip } from "../messages";

export const DeleteButton = ({ handleClick, toolTipTitle }) => {
  const classes = buttonsStyle();
  return (
      <button onClick={handleClick} className={classes.deleteButtonStyle}>
        <HtmlTooltip title={<div>{toolTipTitle}</div>} placement="top-end">
          <ClearIcon
            style={{
              color: Colors.ThemeRed,
              width: "22px",
              height: "22px",
              marginTop: "4px"
            }}
          />
        </HtmlTooltip>
      </button>
  );
}
