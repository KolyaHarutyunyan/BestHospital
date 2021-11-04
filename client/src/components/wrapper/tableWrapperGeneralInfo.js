import React from "react";
import {CustomBreadcrumbs, AddModalButton, SelectStatusInput} from "@eachbase/components";
import {wrapperStyle} from "./styles";
import {SimpleModal} from "../modal";
import {Colors} from "@eachbase/utils";
import {inputStyle} from "../../fragments/client/clientSingle/core/styles";

export const TableWrapperGeneralInfo =
    ({
         children,
         body,
         openCloseInfo,
         handleOpenClose,
         title,
         parent,
         parentLink,

         inputs,
         list,
         handleChange,
     }) => {
        const classes = wrapperStyle();

        return (
            <React.Fragment>
                <div className={classes.inactiveActiveHeader}>
                    <CustomBreadcrumbs className={classes.breadcrumb} parent={parent} child={title}
                                       parentLink={parentLink}/>

                    {/*<SelectStatusInput*/}
                    {/*    errorFalse={true}*/}
                    {/*    styles={inputStyle}*/}
                    {/*    name={"active"}*/}
                    {/*    handleSelect={handleChange}*/}
                    {/*    value={inputs ? inputs : status}*/}
                    {/*    list={list}*/}
                    {/*    className={classes.inputTextField}*/}
                    {/*/>*/}
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
