import React  from "react";
import { ButtonsTab } from "../buttons";
import { wrapperStyle } from "./styles";
import { SimpleModal } from "../modal";

export const TableWrapper = ({
  buttonsTab,
  buttonsTabAddButton,
  children,
  firstButton,
  secondButton,
  addButtonText, body,
  openCloseInfo, handleOpenClose,getActive,getInactive
}) => {
  const classes = wrapperStyle();

  return (
    <div>
      {buttonsTab && (
        <div className={classes.buttonsTabStyle}>
          <ButtonsTab
              getActive={getActive}
              getInactive={getInactive}
              first={firstButton}
              second={secondButton}
          />

          {buttonsTabAddButton && (
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
