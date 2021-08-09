import { roleStyles } from "./styles";
import {SelectInputWidthTags} from "@eachbase/components";
import React from "react";

export const Role = () =>{
    const classes = roleStyles()

    const permissionsList = ['title1','title2','title3']

    return (
        <div className={classes.role}>
            <SelectInputWidthTags permissionsList={permissionsList} />
            <p>role screen</p>
        </div>
    )
}