import {roleStyles} from "./styles";
import {CheckboxesTags, DeleteElement, NoItemText, SimpleModal} from "@eachbase/components";
import {RoleItem} from "./rollItem";
import React, {useEffect, useState} from "react";
import {authActions} from "@eachbase/store";
import {useParams} from "react-router-dom";
import {FindLoad, FindSuccess} from "@eachbase/utils";
import {useDispatch} from "react-redux";

export const Role = ({rolesList, accessList, sendItem, handleRemoveSelected, newList}) => {
    const params = useParams()
    const dispatch = useDispatch()
    const classes = roleStyles()
    const [index, setIndex] = useState(0)
    const [item, setItem] = useState('')
    const [open, setOpen] = useState(false)
    const loader = FindLoad('REMOVE_ACCESS')
    const success = FindSuccess('REMOVE_ACCESS')

    const getRoleItemId = (item) => {
        setItem(item)
        setOpen(!open)
    }

    const handleOpenCloseDel = () => {
        setItem('')
        setOpen(!open)
    }

    const handleOpen = (item, j) => {
        setIndex(j)
        setItem(item)
        sendItem(item)
    }

    const addPermissions = (item) => {
        if (item.length) {
            dispatch(authActions.assignAccess(params.id, item[item.length - 1].id))
        }
    }

    const handleDelete = () => {
        dispatch(authActions.removeAccess(params.id, item.id))
    }

    useEffect(() => {
        if (success.length) {
            setItem('')
            setIndex(0)
            setOpen(!open)
            handleRemoveSelected && handleRemoveSelected()
        }
    }, [success])

    return (
        <div className={classes.roleWrapper}>
            <CheckboxesTags
                handleChange={addPermissions}
                permissionsList={newList}
                label={"Add Role"}
                placeholder={'Add Role'}
            />
            <div className={classes.roleItemContainer}>
                {
                    accessList && accessList.roles ? accessList.roles.map((item, j) => (
                            <RoleItem
                                key={j}
                                handleOpen={() => handleOpen(item, j)}
                                handleClick={() => getRoleItemId(item)}
                                roleItem={item.title}
                                active={index === j}
                            />
                        ))
                        :
                        <NoItemText text={'No Roles Yet'}/>
                }
            </div>

            <SimpleModal
                openDefault={open}
                handleOpenClose={handleOpenCloseDel}
                content={
                    <DeleteElement
                        loader={!!loader.length}
                        text='Do you wont delete Role?'
                        info={item?.title}
                        handleDel={handleDelete}
                        handleClose={handleOpenCloseDel}/>}
            />
        </div>
    )
}