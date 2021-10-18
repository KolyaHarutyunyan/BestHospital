import React from "react";
import {CustomBreadcrumbs, AddModalButton} from "@eachbase/components";
import {wrapperStyle} from "./styles";
import {SimpleModal} from "../modal";
import {Colors} from "@eachbase/utils";

export const TableWrapperGeneralInfo =
    ({
         children,
         body,
         openCloseInfo,
         handleOpenClose,
         title,
         parent,
         parentLink,
         activeInactiveText
     }) => {
        const classes = wrapperStyle();

        const inactivateButtonStyle = {
            height: 36,
            backgroundColor: activeInactiveText ==="active" ? Colors.BackgroundBlue : Colors.ThemeRed,
            padding: '0 24px'
        }

        return (
            <React.Fragment>
                <div className={classes.inactiveActiveHeader}>
                    <CustomBreadcrumbs className={classes.breadcrumb} parent={parent} child={title}
                                       parentLink={parentLink}/>
                    {/*<AddModalButton btnStyles={inactivateButtonStyle} text={activeInactiveText} handleClick={handleOpenClose}/>*/}
                </div>
                <div className={classes.addButton}>
                    <SimpleModal
                        content={body}
                        handleOpenClose={handleOpenClose}
                        openDefault={openCloseInfo}
                    />
                </div>
                {children}
            </React.Fragment>
        );
    };
