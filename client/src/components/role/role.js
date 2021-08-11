import {roleStyles} from "./styles";
import {SelectInputWidthTags} from "@eachbase/components";
import {RoleItem} from "./rollItem";
import React, {useState} from "react";

export const Role = () => {
    const classes = roleStyles()

    const permissionsList = ['Role Name ', 'Role Name 1', 'Role Name 2', 'Role Name 3', 'Role Name 4'];

    const [rollName, setRollName] = useState([])

    const getCheckboxValues = (checkboxValues) => {
        setRollName(checkboxValues)
    }

    const getRoleItemId = (id) =>{
        alert(`index: ${id}`);
    }

    return (
        <div className={classes.roleWrapper}>
            <SelectInputWidthTags checkedItems={getCheckboxValues} permissionsList={permissionsList}/>
            <div className={classes.roleItemContainer}>
                {
                    rollName.length ? rollName.map((roleItem, index) => {
                        return (
                            <RoleItem handleClick={()=>getRoleItemId(index)} roleItem={roleItem}/>
                        )
                    }) : null
                }
            </div>
        </div>
    )
}