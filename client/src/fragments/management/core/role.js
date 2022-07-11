import React, { useContext, useEffect, useState } from "react";
import { managementFragments } from "./style";
import {
   DeleteButton,
   SearchAndFilter,
   SimpleModal,
   DeleteElement,
   Loader,
   NoItemText,
   PaginationItem,
} from "@eachbase/components";
import {
   FindLoad,
   FindSuccess,
   getSkipCount,
   Images,
   makeCapitalize,
   PaginationContext,
} from "@eachbase/utils";
import { httpRequestsOnSuccessActions, roleActions } from "@eachbase/store";
import { useDispatch, useSelector } from "react-redux";
import { SlicedText } from "@eachbase/components";

export const Role = ({
   key,
   roleInfo,
   handleGetPage,
   page,
   roleLoader,
   rolesCount = 11,
}) => {
   const _limit = 10;
   const classes = managementFragments();

   const dispatch = useDispatch();

   const { handlePageChange, pageIsChanging } = useContext(PaginationContext);

   const [open, setOpen] = useState(false);
   const [role, setRole] = useState("");
   const [activeRole, setActiveRole] = useState("");
   const [title, setTitle] = useState("");

   const handleOpenClose = (item) => {
      setTitle(item?.title);
      setOpen((prevState) => !prevState);
      setRole(item?.id);
   };



   const changePage = (number) => {
      if (page === number) return;
      handlePageChange(true);
      const _skip = getSkipCount(number, _limit);
      dispatch(roleActions.getRole({ limit: _limit, skip: _skip }));
      handleGetPage(number);
   };

   const openRolePermission = (role) => {
      dispatch(roleActions.openRole(role));
      setActiveRole(role.title);
   };

   const deleteRole = () => {
      dispatch(roleActions.deleteRole(role));
   };

   const loader = FindLoad("DELETE_ROLE");
   const success = FindSuccess("DELETE_ROLE");
   const getLoader = FindLoad('GET_PERMISSIONS')

   useEffect(() => {
      if (!!success.length) {
         setOpen(false);
         setRole("id");
         setActiveRole("");
         dispatch(roleActions.removeRole())
         dispatch(httpRequestsOnSuccessActions.removeSuccess("DELETE_ROLE"));
      }
   }, [success]);

   if (getLoader?.length) {
      return <Loader style={"relative"} />;
   }

   return (
      <>
         <div key={key} className={classes.tableStyle}>
            <div className={classes.tableHeadStyle}>
               <SearchAndFilter title={"Role"} />
            </div>
            <div className={classes.scroll}>
               {roleLoader && pageIsChanging ? (
                  <Loader circleSize={50} />
               ) : (
                  <div>
                     {roleInfo?.length ? (roleInfo.map((item, j) => (
                           <div
                              style={{ margin: "4px", borderRadius: "8px" }}
                              onClick={() => openRolePermission(item)}
                              key={j}
                              className={
                                 activeRole === item.title
                                    ? classes.tableBodyBottomActive
                                    : classes.tableBodyBottom
                              }
                           >
                              <div className={classes.tableBodyStyle}>
                                 <div>
                                    <img
                                       src={Images.accessManagementUser}
                                       alt={"accessManagementUser"}
                                    />
                                    <SlicedText
                                       type={"name"}
                                       size={10}
                                       data={item && makeCapitalize(item.title)}
                                    />
                                    <SlicedText
                                       fontSize={"14px"}
                                       type={"desc"}
                                       size={40}
                                       data={item && item.description}
                                    />
                                 </div>
                                 <div>
                                    <DeleteButton
                                       toolTipTitle={"Remove Role"}
                                       handleClick={() => handleOpenClose(item)}
                                    />
                                 </div>
                              </div>
                           </div>
                        ))
                     ) : (
                        <NoItemText text={"No Roles Yet"} />
                     )}
                  </div>
               )}

               {!roleLoader &&
                   <PaginationItem
                       page={page}
                       listLength={roleInfo?.length}
                       count={rolesCount}
                       limitCountNumber={_limit}
                       handleChangePage={(number) => changePage(number)}
                   />
               }
            </div>
            <SimpleModal
               handleOpenClose={handleOpenClose}
               openDefault={open}
               content={
                  <DeleteElement
                     loader={!!loader.length}
                     text={"Delete Role?"}
                     className={classes}
                     handleClose={handleOpenClose}
                     handleDel={deleteRole}
                     info={title}
                  />
               }
            />
         </div>
      </>
   );
};
