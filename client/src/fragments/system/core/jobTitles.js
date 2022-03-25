import React, { useEffect, useState } from "react";
import {
   AddButton,
   NoItemText,
   SlicedText,
   ValidationInput,
} from "@eachbase/components";
import { useDispatch } from "react-redux";
import { FindLoad, FindSuccess, Images, isNotEmpty } from "@eachbase/utils";
import { systemItemStyles } from "./styles";
import { httpRequestsOnSuccessActions, systemActions } from "@eachbase/store";

const credentialBtn = {
   maxWidth: "174px",
   width: "100%",
   flex: "0 0 174px",
   padding: 0,
};

export const JobTitles = ({ globalJobs, removeItem, openModal }) => {
   const dispatch = useDispatch();
   const classes = systemItemStyles();

   const [inputs, setInputs] = useState({ name: "" });
   const [error, setError] = useState("");

   const handleChange = (e) => {
      setInputs((prevState) => ({
         ...prevState,
         [e.target.name]: e.target.value,
      }));
      error === e.target.name && setError("");
   };

   const handleSubmit = () => {
      if (isNotEmpty(inputs.name)) {
         const data = {
            name: inputs.name,
         };

         dispatch(systemActions.createJobGlobal(data));
      } else {
         setError(!isNotEmpty(inputs.name) ? "name" : "");
      }
   };

   const editJob = (modalType, modalId) => {
      openModal(modalType, modalId);
   };

   const isDisabled = isNotEmpty(inputs.name);

   const loader = FindLoad("CREATE_JOB_GLOBAL");
   const success = FindSuccess("CREATE_JOB_GLOBAL");

   useEffect(() => {
      if (!!success.length) {
         setInputs({
            name: "",
         });
         httpRequestsOnSuccessActions.removeSuccess("CREATE_JOB_GLOBAL");
      }
   }, [success]);

   return (
      <>
         <div className={`${classes.flexContainer} ${classes.headerSize}`}>
            <ValidationInput
               style={classes.credentialInputStyle}
               onChange={handleChange}
               value={inputs.name}
               variant={"outlined"}
               name={"name"}
               type={"text"}
               placeholder={"Job Titles*"}
            />
            <AddButton
               type={"CREATE_JOB_GLOBAL"}
               disabled={!isDisabled}
               styles={credentialBtn}
               loader={!!loader.length}
               handleClick={handleSubmit}
               text="Add Job Title"
            />
         </div>
         <p className={classes.title}>Job Titles</p>
         <div className={classes.credentialTable}>
            {globalJobs && globalJobs.length ? (
               globalJobs.map((jobItem, index) => {
                  return (
                     <div className={classes.item} key={index}>
                        <p>
                           <SlicedText
                              type={"responsive"}
                              size={25}
                              data={jobItem.name}
                           />
                        </p>
                        <div className={classes.icons}>
                           <img
                              src={Images.edit}
                              onClick={() =>
                                 editJob("editJobTitles", {
                                    jobTitle: jobItem.name,
                                    jobId: jobItem._id,
                                 })
                              }
                              alt="edit"
                           />
                           <img
                              src={Images.remove}
                              alt="delete"
                              onClick={() =>
                                 removeItem({
                                    id: jobItem._id,
                                    name: jobItem.name,
                                    type: "editJobTitles",
                                 })
                              }
                           />
                        </div>
                     </div>
                  );
               })
            ) : (
               <NoItemText text="No Items Yet" />
            )}
         </div>
      </>
   );
};
