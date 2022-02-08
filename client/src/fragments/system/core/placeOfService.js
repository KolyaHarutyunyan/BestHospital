import React, { useEffect, useState } from "react";
import { AddButton, NoItemText, SlicedText, ValidationInput } from "@eachbase/components";
import { useDispatch } from "react-redux";
import { FindLoad, FindSuccess, Images } from "@eachbase/utils";
import { systemItemStyles } from "./styles";
import { systemActions } from "@eachbase/store";

const credentialBtn = {
   maxWidth: "209px",
   width: "100%",
   flex: "0 0 209px",
   padding: 0,
};

export const PlaceOfService = ({ globalJobs, removeItem, openModal }) => {
   const dispatch = useDispatch();
   const classes = systemItemStyles();

   const [inputs, setInputs] = useState({ name: "", code: "" });
   const [error, setError] = useState("");

   const handleChange = (e) => {
      setInputs((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
      error === e.target.name && setError("");
   };

   const handleSubmit = () => {
      let data = {
         name: inputs.name,
         code: inputs.code,
      };
      if (inputs.name) {
         dispatch(systemActions.createPlaceGlobal(data));
      } else {
         setError(!inputs.name ? "name" : !inputs.code ? "name" : "Input is not filled");
      }
   };

   const editJob = (modalType, modalId) => {
      openModal(modalType, modalId);
   };

   const isDisabled = inputs.name && inputs.code;

   const loader = FindLoad("CREATE_PLACE_GLOBAL");
   const success = FindSuccess("CREATE_PLACE_GLOBAL");

   useEffect(() => {
      if (success) {
         setInputs({
            name: "",
            code: "",
         });
      }
   }, [success.length]);

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
               placeholder={"Name*"}
            />

            <ValidationInput
               style={classes.codInputStyle}
               onChange={handleChange}
               value={inputs.code}
               variant={"outlined"}
               name={"code"}
               type={"number"}
               placeholder={"Code*"}
            />
            <AddButton
               type={"CREATE_PLACE_GLOBAL"}
               disabled={!isDisabled}
               styles={credentialBtn}
               loader={!!loader.length}
               handleClick={handleSubmit}
               text="Add Place of Service"
            />
         </div>
         <p className={classes.title}>Place of Services</p>
         <div className={classes.credentialTable}>
            {globalJobs && globalJobs.length ? (
               globalJobs.map((item, index) => {
                  return (
                     <div className={classes.item} key={index}>
                        <div className={classes.text}>
                           <SlicedText type={"responsive"} size={25} data={`${item.name} - `} />
                           <span>{`${item.code}`}</span>
                        </div>
                        <div className={classes.icons}>
                           <img
                              src={Images.edit}
                              onClick={() =>
                                 editJob("editPlaceTitles", {
                                    name: item.name,
                                    code: item.code,
                                    jobId: item._id,
                                 })
                              }
                              alt="edit"
                           />
                           <img
                              src={Images.remove}
                              alt="delete"
                              onClick={() =>
                                 removeItem({
                                    id: item._id,
                                    name: item.name,
                                    type: "editPlaceTitles",
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
