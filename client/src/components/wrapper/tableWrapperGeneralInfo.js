import React, {useState} from "react";
import {CustomBreadcrumbs, AddModalButton, InactiveModal, CloseButton} from "@eachbase/components";
import {wrapperStyle} from "./styles";
import {PermissionsList, RoleHooks} from "@eachbase/utils";
import {DeleteElement, SimpleModal} from "../modal";

export const TableWrapperGeneralInfo =
    ({
         children,
         body,
         openCloseInfo, handleOpenClose,
     }) => {
        const classes = wrapperStyle();

        return (
            <React.Fragment>
                {/* { RoleHooks(PermissionsList.ADD_OFFICES_BUTTON_TAB) && */}
                <div className={classes.inactiveActiveHeader}>
                    <CustomBreadcrumbs className={classes.breadcrumb} parent='Staff' child='Staff Member Name' parentLink='/staff'/>
                    <AddModalButton text='inactive' handleClick={handleOpenClose}/>
                </div>
                {/* } */}
                {/*// RoleHooks(PermissionsList.ADD_OFFICES_BUTTON) &&*/}
                <div className={classes.addButton}>
                    <SimpleModal
                        // addButton={addButtonText}
                        content={body}
                        handleOpenClose={handleOpenClose}
                        openDefault={openCloseInfo}
                    />
                </div>
                {children}
            </React.Fragment>
        );
    };
