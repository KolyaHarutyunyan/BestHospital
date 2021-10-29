import React, {useEffect, useState} from "react";
import {
    AddModalButton,
    CheckboxesTags,
    CloseButton, Toast,
    ValidationInput
} from "@eachbase/components";
import {managementFragments} from "./style";
import {globalModals, useGlobalTextStyles} from '@eachbase/utils'
import {useDispatch, useSelector} from "react-redux";
import {httpRequestsOnErrorsActions, httpRequestsOnSuccessActions, roleActions} from "@eachbase/store";

export const AddRoleModal = ({handleClose, permissionsList}) => {
    const classes = managementFragments();
    const globalModalsClasses = globalModals();
    const globalText = useGlobalTextStyles();
    const [error, setError] = useState('')
    const [roleName, setRoleName] = useState('')
    const [permissions, setPermissions] = useState('')
    const [description, setDescription] = useState('')
    const dispatch = useDispatch()

    const {httpOnLoad, httpOnError, httpOnSuccess} = useSelector((state) => ({
        httpOnLoad: state.httpOnLoad,
        httpOnError: state.httpOnError,
        httpOnSuccess: state.httpOnSuccess
    }));

    const addRole = () => {
        const permissionsList = []
        for (let i of permissions) {
            permissionsList.push(i.id)
        }

        if (roleName && permissions && description) {
            const body = {
                "title": roleName,
                "description": description,
                "permissions": permissionsList,
            }
            dispatch(roleActions.createRole(body))

        } else {
            !roleName ? setError('role') :
                !permissions ? setError('permissions') :
                    !description ? setError('description') : ''

        }
    }
    const success = httpOnSuccess.length && httpOnSuccess[0].type === 'CREATE_ROLE'
    const loader = httpOnLoad.length && httpOnLoad[0] === 'CREATE_ROLE'
    const errorText = httpOnError.length && httpOnError[0].error



    useEffect(() => {
        if (success) {
            dispatch(httpRequestsOnSuccessActions.removeSuccess(httpOnSuccess[0].type ))
            handleClose()
        }
    }, [success]);

    const handleChange = (ev) => {
        if(httpOnError.length) {
            dispatch(httpRequestsOnErrorsActions.removeError(httpOnError[0].type))
        }
        setRoleName(ev.target.value)
        if (error === 'role') setError('')
    }
    const changePermissions = (ev) => {
        setPermissions(ev)
        if (error === 'permissions') setError('')
    }
    const changeDescription = (ev) => {
        setDescription(ev.target.value)
        if (error === 'description') setError('')
    }


    return (
        <div className={globalModalsClasses.smallModalWrapper}>
            <div className={globalModalsClasses.smallModalClose}>
                <CloseButton handleCLic={handleClose}/>
            </div>

            <div className={globalModalsClasses.modalWrapperContent}>
                <p className={globalText.modalTitle}>Want to Add Role?</p>
                <p className={globalText.modalText}>To add new role in the system, please set the name and
                    assign permissions to that role.</p>

                <ValidationInput
                    onChange={handleChange}
                    typeError={error === 'role' ? true :
                        errorText === 'A role with this title already exists' ? 'A role with this title already exists' : ''}
                    style={classes.input}
                    value={roleName}
                    variant={"outlined"}
                    name={"outlined"}
                    label={"Set Role Name*"}
                    type={"text"}
                />

                <CheckboxesTags
                    typeError={error === 'permissions'}
                    handleChange={changePermissions}
                    permissionsList={permissionsList}
                    label={"Select Permissions*"}
                    placeholder={'Permissions'}
                />

                <ValidationInput
                    onChange={changeDescription}
                    typeError={error === 'description'}
                    className={classes.inputDescription}
                    variant={"outlined"}
                    name={"description"}
                    value={description}
                    label={"Role Description"}
                    type={"text"}
                    multiline={true}
                />
                <p className={classes.maxCharacter}>Max 100 characters</p>

                <AddModalButton
                    loader={loader}
                    styles={{marginTop: '16px'}} handleClick={addRole} text={'Add'}/>

            </div>
        </div>
    )
}
