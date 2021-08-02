import React, { useState } from "react";
import { AddButton, ButtonsTab } from "../buttons";
import { wrapperStyle } from "./styles";
import { PermissionsList, RoleHooks } from "@eachbase/utils";
import { DeleteElement, SimpleModal } from "../modal";

export const TableWrapper = ({
  buttonsTab,
  buttonsTabAddButton,
  children,
  firstButton,
  secondButton,
  addButtonText, body,
  openCloseInfo, handleOpenClose,
}) => {
  const classes = wrapperStyle();



  return (
    <div>
      {buttonsTab && (
        <div className={classes.buttonsTabStyle}>
          {/* { RoleHooks(PermissionsList.ADD_OFFICES_BUTTON_TAB) && */}
          <ButtonsTab first={firstButton} second={secondButton} />
          {/* } */}
          {buttonsTabAddButton && (
            // RoleHooks(PermissionsList.ADD_OFFICES_BUTTON) &&
            <div className={classes.addButton}>
              <SimpleModal
                addButton={addButtonText}
                content={body}
                handleOpenClose={handleOpenClose}
                openDefault={openCloseInfo}
              />
            </div>
          )}
        </div>
      )}
      {children}
    </div>
  );
};
