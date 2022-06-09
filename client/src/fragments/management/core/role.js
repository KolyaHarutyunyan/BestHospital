import React, { useContext, useEffect, useState } from "react";
import { managementFragments } from "./style";
import {
   DeleteButton,
   SearchAndFilter,
   SimpleModal,
   DeleteElement,
   Loader,
   NoItemText,
   NoYet,
   PaginationItem,
} from "@eachbase/components";
import { FindLoad, FindSuccess, Images, PaginationContext } from "@eachbase/utils";
import { httpRequestsOnSuccessActions, roleActions } from "@eachbase/store";
import { useDispatch, useSelector } from "react-redux";
import { SlicedText } from "@eachbase/components";

export const Role = ({
   key,
   roleInfo = [],
   handleGetPage,
   page,
   roleLoader,
   rolesCount,
}) => {
   const classes = managementFragments();

   const dispatch = useDispatch();

   const { handlePageChange, pageIsChanging } = useContext(PaginationContext);

   const [open, setOpen] = useState(false);
   const [role, setRole] = useState("");
   const [activeRole, setActiveRole] = useState("");
   const [title, setTitle] = useState("");

   const { httpOnLoad } = useSelector((state) => ({
      httpOnLoad: state.httpOnLoad,
   }));

   const handleOpenClose = (item) => {
      setTitle(item?.title);
      setOpen((prevState) => !prevState);
      setRole(item?.id);
   };

   const changePage = (number) => {
      if (page === number) return;
      handlePageChange(true);
      let start = number > 1 ? number - 1 + "0" : 0;
      dispatch(roleActions.getRole({ limit: 10, skip: start }));
      handleGetPage(number);
   };

   // const searchRole = (ev) => {
   //   dispatch(roleActions.searchRoles(ev.target.value));
   // };

   const openRolePermission = (role) => {
      dispatch(roleActions.openRole(role));
      setActiveRole(role.title);
   };

   const deleteRole = () => {
      dispatch(roleActions.deleteRole(role));
   };

   const loader = FindLoad("DELETE_ROLE");
   const success = FindSuccess("DELETE_ROLE");

   useEffect(() => {
      if (!!success.length) {
         setOpen(false);
         setRole("id");
         setActiveRole("");
         dispatch(httpRequestsOnSuccessActions.removeSuccess("DELETE_ROLE"));
      }
   }, [success]);

   if (roleLoader && pageIsChanging) {
      return <Loader circleSize={50} />;
   }

   if (!!httpOnLoad.length && httpOnLoad[0] === "GET_PERMISSIONS")
      return <Loader style={"relative"} />;

   if (!roleInfo?.length) return <NoItemText text={"No Roles Yet"} />;

   return (
      <>
         <div key={key} className={classes.tableStyle}>
            <div className={classes.tableHeadStyle}>
               <SearchAndFilter title={"Role"} />
            </div>
            <div className={classes.scroll}>
               <div>
                  {roleInfo.map((item, j) => (
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
                                 data={item && item.title}
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
                  ))}
               </div>
               <PaginationItem
                  page={page}
                  listLength={roleInfo.length}
                  entries={roleInfo.length}
                  count={rolesCount}
                  handleReturn={(number) => changePage(number)}
               />
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
