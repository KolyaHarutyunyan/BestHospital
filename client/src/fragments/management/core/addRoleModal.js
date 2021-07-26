import React, { useState } from "react";
import {
  AddModalButton,
  CheckboxesTags,
  CloseButton,
  ValidationInput
} from "@eachbase/components";
import { managementFragments } from "./style";
import {globalModals, useGlobalTextStyles} from '@eachbase/utils'
import { useDispatch } from "react-redux";
import { roleActions } from "@eachbase/store";

export const AddRoleModal =({handleClose, permissionsList})=>{
  const classes = managementFragments();
  const globalModalsClasses = globalModals();
  const globalText = useGlobalTextStyles();
  const [error, setError] = useState('')
  const dispatch = useDispatch()
    const [inputs, setInputs] = useState({});

  const addRole =()=>{
    const permissionsList = []
    for(let i of inputs.permissions){
      permissionsList.push(i.id)
    }
     if(inputs.roleName && inputs.permissions) {
       const body ={
         "title": inputs.title,
         "description": inputs.description,
         "permissions": inputs.permissions,
       }
       dispatch(roleActions.createRole(body))
       handleClose()
     }
     else if(!inputs.roleName){
       setError('title')
     }
     else if(!inputs.description){
         setError('description')
     }
     else if(!inputs.permissions){
       setError('permissions')
     }
  }

    const handleChange = e => setInputs(prevState =>
            ({ ...prevState, [e.target.name]: e.target.value }),
        error === e.target.name && setError(''),
    );

  return(
    <div className={globalModalsClasses.smallModalWrapper}>
      <div className={globalModalsClasses.smallModalClose}>
      <CloseButton handleCLic={handleClose}/>
      </div>
      <div className={globalModalsClasses.modalWrapperContent}>
        <p className={globalText.modalTitle}>Want to Add Role?</p>
        <p className={globalText.modalText}>To add new role in the system, please set the name and assign<br/> permissions to that role.</p>
        <ValidationInput
          onChange={handleChange}
          typeError={error === 'role'}
          style={classes.input}
          variant={"outlined"}
          name={"roleName"}
          label={"Set Role Name*"}
          type={"text"}
        />
        <CheckboxesTags
          typeError={error === 'permissions'}
          handleChange={handleChange}
          permissionsList={permissionsList}
          label={"Select Permissions*"}
          placeholder={'Permissions'}
          name={'permissions'}
        />
        <ValidationInput
          onChange={handleChange}
          typeError={error === 'role'}
          className={classes.inputDescription}
          variant={"outlined"}
          name={"description"}
          label={"Role Description"}
          type={"text"}
          value={inputs.description}
          multiline={true}
        />
        <p>Max 100 characters</p>
        <AddModalButton styles={{marginTop:'16px'}} handleClick={addRole} text={'Add'} />
      </div>

    </div>
  )
}