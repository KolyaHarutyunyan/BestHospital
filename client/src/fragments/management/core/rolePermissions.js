import React, { useState } from "react";
import { managementFragments } from "./style";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Colors, Images, useGlobalStyles, useGlobalTextStyles } from "@eachbase/utils";
import {
  AddCircle,
  DeleteButton,
  CloseButton, SimpleModal, DeleteElement, CheckboxesTags, NoInfoYet
} from "@eachbase/components";
import { useDispatch, useSelector } from "react-redux";
import {roleActions} from '@eachbase/store'


export const RolePermissions = ({ permissionsList }) => {
  const [show, setShowInput] = useState(false);
  const [open, setOpen] = useState(false)
  const [permission, sePermission] =useState('')
  const classes = managementFragments();
  const globalClasses = useGlobalTextStyles();
  const dispatch = useDispatch()

  const {role} = useSelector((state)=>({
    role: state.roles.role
    })
  )

  const handleOpenClose =( id )=>{
    setOpen(!open)
    sePermission(id)
  }

  const deletePermissions =() =>{
    const data = {
      roleId:role.id,
      permissionId:permission,

    }
    dispatch(roleActions.deleteRolePermission(data))
    setOpen(!open)
    sePermission('')
  }

  const addPermissions = (permission) =>{


    if(permission.length) {

      const body ={
        roleId:role.id,
        permissionId:permission[permission.length - 1].id
      }
      dispatch( roleActions.addRolePermission(body) )
    }

  }

  return (
    <div className={classes.tableStyle}>
      <div className={classes.tableHeadRoleStyle}>
        <div className={classes.rolePermissionsStyle}>
          <AccountCircleIcon
            style={{
              width: "36px",
              height: "36px",
              color: Colors.ThemePurple,
            }}
          />
          <p>Role Permissions</p>
        </div>
      </div>

      <div className={classes.rolePermissionStyle} >
        <div className={classes.roleNameStyle}>
          <div>
            <span>{role && role.permissions  ? role.title : ''  }</span>
          </div>
          {role  && role.title   ?
          <div>
            {show === false ? (
              <AddCircle
                handleCLic={() => setShowInput(true)}
                text={"Add Permissions"}
              />
            ) : (
              <CloseButton handleCLic={() => setShowInput(false)} />
            )}
          </div>
          : null}
        </div>

        {show === true && (
          <div className={classes.tablePermissionsBodyStyle}>
            <CheckboxesTags
              handleChange={addPermissions}
              permissionsList={permissionsList}
              label={"Select Permissions*"}
              placeholder={'Permissions'}
            />
          </div>
        )}
        {role && role.permissions ? role.permissions.map((i,j) => (
          <div key={j} className={classes.tablePermissionsBodyContentStyle}>
            <div>
              <img src={Images.checked} alt={"checked"} />
              <p>{i.title}</p>
            </div>

            <div>
              <DeleteButton toolTipTitle={"Remove Permission"} handleClick={() => handleOpenClose(i.id)} />
            </div>
          </div>
        )) :

       <NoInfoYet text={'Select Role'} />
        }

      </div>

      <SimpleModal
        handleOpenClose = {handleOpenClose}
        openDefault={open}
        content={
          <DeleteElement
            text={'Delete Permission?'}
            className={classes}
            handleClose={handleOpenClose}
            handleDel={deletePermissions}
            // info={permission && permission.title}
          />
        }
      />
    </div>
  );
};
