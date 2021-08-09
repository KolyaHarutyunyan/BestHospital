import React from "react";
import {CustomBreadcrumbs, AddModalButton} from "@eachbase/components";
import {wrapperStyle} from "./styles";
import {SimpleModal} from "../modal";

export const TableWrapperGeneralInfo =
    ({
         children,
         body,
         openCloseInfo,
         handleOpenClose,
         title,
         parent,
         parentLink
     }) => {
        const classes = wrapperStyle();

        return (
            <React.Fragment>
                <div className={classes.inactiveActiveHeader}>
                    <CustomBreadcrumbs className={classes.breadcrumb} parent={parent} child={title}
                                       parentLink={parentLink}/>
                    <AddModalButton text='inactive' handleClick={handleOpenClose}/>
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
