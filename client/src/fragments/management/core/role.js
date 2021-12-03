import React, {useEffect, useState} from "react";
import {managementFragments} from "./style";
import {
    DeleteButton, SearchAndFilter,
    SimpleModal, DeleteElement,
    Loader, NoItemText, NoYet,
} from "@eachbase/components";
import {FindLoad, FindSuccess, Images} from "@eachbase/utils";
import {roleActions} from "@eachbase/store";
import {useDispatch, useSelector} from "react-redux";
import {SlicedText} from "@eachbase/components";

export const Role = ({key, roleInfo}) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false)
  const [role, setRole] = useState('')
  const [activeRole, setActiveRole] = useState('')
  const [title, setTitle] = useState('')
  const classes = managementFragments();

  const {httpOnLoad} = useSelector((state) => ({
    httpOnLoad: state.httpOnLoad
  }));

  const handleOpenClose = (item) => {
      setTitle(item.title)
    setOpen(!open)
    setRole(item.id)
  }

  // const searchRole = (ev) => {
  //   dispatch(roleActions.searchRoles(ev.target.value));
  // };

  const openRolePermission = (role) => {
    dispatch(roleActions.openRole(role));
    setActiveRole(role.title)
  };

  const deleteRole = () => {
    dispatch(roleActions.deleteRole(role))

  }

  const loader = FindLoad('DELETE_ROLE')
  const success = FindSuccess('DELETE_ROLE')

  useEffect(() =>{
      if(success.length){
          setOpen(!open)
          setRole('id')
          setActiveRole('')
          dispatch(roleActions.removeRole( ));
      }
  },[success])

  return (
      <div key={key} className={classes.tableStyle}>
        <div className={classes.tableHeadStyle}>
          <SearchAndFilter
              // handleSearch={(ev) => searchRole(ev)}
              title={"Role"}
              // custom={false}
          />
        </div>

        <div className={classes.scroll}>
          {httpOnLoad.length && httpOnLoad[0] === 'GET_PERMISSIONS' ?
              <Loader style={'relative'}/> : roleInfo && roleInfo.length ?
                  roleInfo.map((item, j) => (
                      <div
                          style={{margin:'4px',borderRadius:'8px'}}
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
                            <SlicedText type={'name'} size={10} data={item && item.title}/>
                            <SlicedText  fontSize={'14px'} type={'desc'} size={40} data={item && item.description}/>
                          </div>
                          <div>
                            <DeleteButton toolTipTitle={"Remove Role"}
                                          handleClick={() => handleOpenClose(item)}/>
                          </div>
                        </div>
                      </div>
                  ))
                  : <div className={classes.noItemPaddings}> <NoYet  text={'No Role Yet'}/></div>}
        </div>

        <SimpleModal
            handleOpenClose={handleOpenClose}
            openDefault={open}
            content={
              <DeleteElement
                  loader={!!loader.length}
                  text={'Delete Role?'}
                  className={classes}
                  handleClose={handleOpenClose}
                  handleDel={deleteRole}
                  info={title}
              />
            }
        />
      </div>
  );
};
