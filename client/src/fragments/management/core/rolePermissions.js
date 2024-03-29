import React, {useEffect, useState} from "react";
import {managementFragments} from "./style";
import {FindLoad, FindSuccess, Images, transformPermission} from "@eachbase/utils";
import {
    AddCircle,
    DeleteButton,
    CloseButton,
    SimpleModal,
    DeleteElement,
    CheckboxesTags,
    NoInfoYet,
} from "@eachbase/components";
import {useDispatch, useSelector} from "react-redux";
import {httpRequestsOnSuccessActions, roleActions} from "@eachbase/store";

export const RolePermissions = ({permissionsList}) => {
    const [show, setShowInput] = useState(false);
    const [open, setOpen] = useState(false);
    const [permission, sePermission] = useState("");
    const [title, setTitle] = useState("");
    const classes = managementFragments();
    const dispatch = useDispatch();
   const loader = FindLoad("DELETE_ROLE_PERMISSION");
   const success = FindSuccess("DELETE_ROLE_PERMISSION");

    const {role} = useSelector((state) => ({
        role: state.roles.role,
    }));

    const handleOpenClose = (item) => {
        setOpen((prevState) => !prevState);
        sePermission(item?.id);
        setTitle(item?.title);
    };

    const deletePermissions = () => {
        const data = {
            roleId: role.id,
            permissionId: permission,
        };
        dispatch(roleActions.deleteRolePermission(data));
    };

    const addPermissions = (permission) => {
        if (permission.length) {
            const body = {
                roleId: role.id,
                permissionId: permission[permission.length - 1].id,
            };
            dispatch(roleActions.addRolePermission(body));
        }
    };

    const filter = permissionsList.filter(function (array_el) {
        return (
            role &&
            role.permissions &&
            role.permissions.filter(function (anotherOne_el) {
                return anotherOne_el.id === array_el.id;
            }).length === 0
        );
    });

    useEffect(() => {
        if (!!success.length) {
            setOpen(false);
            sePermission("");
            setTitle("");
            dispatch(httpRequestsOnSuccessActions.removeSuccess("DELETE_ROLE_PERMISSION"));
        }
    }, [success]);

    return (
        <div className={classes.tableStyle}>
            <div className={classes.tableRoleHeadStyle}>
                <div className={classes.rolePermissionsStyle}>
                    <div className={classes.permissionIcon}>
                        <img src={Images.accessManagementFill} alt={"accessManagementFill"}/>
                    </div>
                    <p>Role Permissions</p>
                </div>
            </div>

            <div style={{marginTop: "8px"}} className={classes.tableRoleStyle}>
                <div className={classes.roleNameStyle}>
                    <div>
                        <span>{role && role.permissions ? role.title : ""}</span>
                    </div>
                    {role && role.title ? (
                        <div>
                            {show === false ? (
                                <AddCircle
                                    handleCLic={() => setShowInput(true)}
                                    text={"Add Permissions"}
                                />
                            ) : (
                                <CloseButton handleCLic={() => setShowInput(false)}/>
                            )}
                        </div>
                    ) : null}
                </div>

                {show === true && (
                    <div className={classes.tablePermissionsBodyStyle}>
                        <CheckboxesTags
                            handleChange={addPermissions}
                            permissionsList={filter}
                            label={"Select Permissions"}
                            placeholder={"Permissions"}
                        />
                    </div>
                )}

                <div className={classes.scrollPermission}>
                    {role && role.permissions ? (
                        role.permissions.map((i, j) => (
                            <div key={j} className={classes.tablePermissionsBodyContentStyle}>
                                <div>
                                    <img src={Images.checked} alt={"checked"}/>
                                    <p>{transformPermission(i.title)}</p>
                                </div>

                                <div>
                                    <DeleteButton
                                        toolTipTitle={"Remove Permission"}
                                        handleClick={() => handleOpenClose(i)}
                                    />
                                </div>
                            </div>
                        ))
                    ) : (
                        <NoInfoYet text={"Select Role"}/>
                    )}
                </div>
            </div>

            <SimpleModal
                handleOpenClose={handleOpenClose}
                openDefault={open}
                content={
                    <DeleteElement
                        loader={!!loader.length}
                        info={title}
                        text={"Delete Permission?"}
                        className={classes}
                        handleClose={handleOpenClose}
                        handleDel={deletePermissions}
                    />
                }
            />
        </div>
    );
};
