import React, { useState } from "react";
import { managementFragments } from "./style";
import {DeleteButton, SearchAndFilter, SimpleModal, DeleteElement, SimpleToolTip, Loader} from "@eachbase/components";
import { Images } from "@eachbase/utils";
import { roleActions } from "@eachbase/store";
import {useDispatch, useSelector} from "react-redux";
import { getRoleById } from "../../../store/role/role.action";

export const Role = ({ key, roleInfo }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false)
  const [role, setRole] =useState('')
  const [activeRole, setActiveRole] =useState('')

  const { httpOnLoad } = useSelector((state) => ({
    httpOnLoad: state.httpOnLoad
  }));

  const handleOpenClose =( id )=>{
    setOpen(!open)
    setRole(id)
  }

  const searchRole = (ev) => {
    dispatch(roleActions.searchRoles(ev.target.value));
  };

  const openRolePermission = (role) => {
    // dispatch(roleActions.getRoleById(role.id));
    dispatch(roleActions.openRole(role));

    setActiveRole(role.title)
  };

  const deleteRole =() =>{
    dispatch(roleActions.deleteRole(role.id))
    setOpen(!open)
    setRole('id')
  }

  const classes = managementFragments();
  return (
    <div key={key} className={classes.tableStyle}>
      <div className={classes.tableHeadStyle}>
        <SearchAndFilter
          handleSearch={(ev) => searchRole(ev)}
          title={"Role"}
        />
      </div>

      {httpOnLoad.length ? <Loader style={'relative'}/> : roleInfo && roleInfo.length ? roleInfo.map((item, j) => (
            <div
              onClick={() => openRolePermission(item)}
              key={j}
              className={activeRole === item.title ? classes.tableBodyBottomActive : classes.tableBodyBottom}
            >
              <div className={classes.tableBodyStyle}>
                <div>
                  <img
                    src={Images.accessManagementUser}
                    alt={"accessManagementUser"}
                  />
                  <p>{item.title}</p>

                  <span>{item.description > 50 ? `${item.description.slice(0,50)}...` : item.description}</span>
                </div>
                <div>
                  <DeleteButton toolTipTitle={"Remove Role"} handleClick={() =>  handleOpenClose(item)} />
                </div>
              </div>
            </div>
          ))
        : "No Roles"}


      <SimpleModal
        handleOpenClose = {handleOpenClose}
        openDefault={open}
        content={
          <DeleteElement
            text={'Delete Role?'}
            className={classes}
            handleClose={handleOpenClose}
            handleDel={deleteRole}
            info={role && role.title}
          />
        }
      />

    </div>
  );
};
