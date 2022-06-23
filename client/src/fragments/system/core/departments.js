import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AddButton, NoItemText, SlicedText, ValidationInput } from "@eachbase/components";
import {
   ErrorText,
   FindLoad,
   FindSuccess,
   Images,
   isNotEmpty,
   makeCapitalize,
} from "@eachbase/utils";
import { systemItemStyles } from "./styles";
import { httpRequestsOnSuccessActions, systemActions } from "@eachbase/store";

const credentialBtn = {
   maxWidth: "174px",
   width: "100%",
   flex: "0 0 174px",
   padding: 0,
};

export const Departments = ({ globalDepartments, removeItem, openModal }) => {
   const classes = systemItemStyles();

   const dispatch = useDispatch();

   const loader = FindLoad("CREATE_DEPARTMENT_GLOBAL");
   const success = FindSuccess("CREATE_DEPARTMENT_GLOBAL");

   useEffect(() => {
      if (!!success.length) {
         setInputs({});
         dispatch(httpRequestsOnSuccessActions.removeSuccess("CREATE_DEPARTMENT_GLOBAL"));
      }
   }, [success]);

   const [inputs, setInputs] = useState({});
   const [error, setError] = useState("");

   function handleChange(e) {
      setInputs((prevState) => ({
         ...prevState,
         [e.target.name]: e.target.value,
      }));
      error === e.target.name && setError("");
   }

   function editDepartment(modalType, modalId) {
      openModal(modalType, modalId);
   }

   function handleSubmit() {
      if (isNotEmpty(inputs.name)) {
         const data = { name: inputs.name };
         dispatch(systemActions.createDepartmentGlobal(data));
      } else {
         setError(!isNotEmpty(inputs.name) ? "name" : "");
      }
   }

   return (
      <Fragment>
         <div className={`${classes.flexContainer} ${classes.headerSize}`}>
            <ValidationInput
               style={classes.credentialInputStyle}
               onChange={handleChange}
               value={inputs.name}
               variant={"outlined"}
               name={"name"}
               type={"text"}
               placeholder={"Name*"}
               typeError={error === "name" ? ErrorText.field : ""}
            />
            <AddButton
               type={"CREATE_DEPARTMENT_GLOBAL"}
               loader={!!loader.length}
               styles={credentialBtn}
               handleClick={handleSubmit}
               text="Add Department"
            />
         </div>
         <p className={classes.title}>Departments</p>
         <div className={classes.credentialTable}>
            {globalDepartments && globalDepartments.length ? (
               globalDepartments.map((departmentItem, index) => {
                  return (
                     <div className={classes.item} key={index}>
                        <p>
                           <span>
                              <SlicedText
                                 type={"responsive"}
                                 size={25}
                                 data={makeCapitalize(departmentItem.name)}
                              />
                           </span>
                           {departmentItem.type}
                        </p>
                        <div className={classes.icons}>
                           <img
                              src={Images.edit}
                              onClick={() =>
                                 editDepartment("editDepartment", {
                                    departmentName: departmentItem.name,
                                    departmentID: departmentItem.id,
                                 })
                              }
                              alt="edit"
                           />
                           {/* <img
                              src={Images.remove}
                              alt="delete"
                              onClick={() =>
                                 removeItem({
                                    id: departmentItem.id,
                                    name: departmentItem.name,
                                    type: "editDepartment",
                                 })
                              }
                           /> */}
                        </div>
                     </div>
                  );
               })
            ) : (
               <NoItemText text="No Departments Yet" />
            )}
         </div>
      </Fragment>
   );
};
